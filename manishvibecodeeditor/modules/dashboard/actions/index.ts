"use server";

import db from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/action";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import type { TemplateFolder } from "@/modules/playground/lib/path-to-json";


export const toogleStarMarked = async (playgroundId:string,isChecked: boolean) => {
        const user = await getCurrentUser()
        const userId = user?.id
        if(!userId){
            throw new Error("User Id is required")
        }

        try {
            if(isChecked){
                await db.starMark.create({
                    data: {
                        userId: userId,
                        PlaygroundId:playgroundId,
                        isMarked: isChecked
                    }
                })
            }else{
                await db.starMark.deleteMany({
                    where:{
                         
                            userId:userId,
                            PlaygroundId:playgroundId
                        
                    }
                })
            }

            revalidatePath('/dashboard')
            return {success: true,isMarked: isChecked}
        } catch (error) {
            console.log(error);
            return {
                success: false,
                error: "failed to update problem"
            }
            
        }
}
export const getAllPlayGroundForUser = async() => {
    const user = await getCurrentUser()
    if (!user?.id) {
        return []
    }

    try {
        const playground = await db.playground.findMany({
            where: {
                userId: user.id
            },
            include : {
                user: true,
                StarMark:{
                    where:{
                        userId:user.id
                    },
                    select:{
                        isMarked:true
                    }
                }
            }
        })
        return playground;
    } catch (error) {
        console.error("Failed to fetch playgrounds:", error);
        return []
    }
}

export const createPlayground = async (data:{
    title: string;
    template: "REACT" | "NEXTJS" | "ANGULAR" | "VUE" | "HONO" | "EXPRESS";
    description?: string;
}) => {
    const user = await getCurrentUser()
    if (!user?.id) {
        throw new Error("User Id is required")
    }

    const {title,template,description} = data
    try {
        const playground = await db.playground.create({
           data: {
            title: title,
            templates: template,
            description: description,
            userId: user.id
           }

        })
        revalidatePath('/dashboard')
        return playground
        
       
    } catch (error) {
        console.error(error)
    }
}

type GitHubRepoInput = {
    name: string;
    fullName: string;
    description?: string | null;
    language?: string | null;
    defaultBranch?: string | null;
}

type GitHubTreeItem = {
    path: string;
    type: "blob" | "tree" | string;
    size?: number;
    sha: string;
}

type GitHubTreeResponse = {
    tree?: GitHubTreeItem[];
}

type GitHubBlobResponse = {
    content?: string;
    encoding?: string;
}

const MAX_IMPORTED_FILES = 120;
const MAX_IMPORTED_FILE_SIZE = 512 * 1024;

const ignoredGithubFolders = new Set([
    ".git",
    ".next",
    ".turbo",
    ".vercel",
    "node_modules",
    "dist",
    "build",
    "coverage",
    ".cache",
])

const ignoredGithubFiles = new Set([
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".env",
    ".env.local",
    ".DS_Store",
])

const inferTemplateFromLanguage = (
    language?: string | null
): "REACT" | "NEXTJS" | "ANGULAR" | "VUE" | "HONO" | "EXPRESS" => {
    const normalizedLanguage = language?.toLowerCase()

    if (normalizedLanguage === "vue") return "VUE"
    if (normalizedLanguage === "typescript" || normalizedLanguage === "javascript") return "REACT"

    return "REACT"
}

const shouldImportPath = (filePath: string, size = 0) => {
    const parts = filePath.split("/")
    const fileName = parts[parts.length - 1]

    if (parts.some((part) => ignoredGithubFolders.has(part))) return false
    if (ignoredGithubFiles.has(fileName)) return false
    if (size > MAX_IMPORTED_FILE_SIZE) return false

    return true
}

const addFileToTemplateTree = (
    root: TemplateFolder,
    filePath: string,
    content: string
) => {
    const parts = filePath.split("/")
    const fileName = parts.pop()

    if (!fileName) return

    let currentFolder = root

    for (const folderName of parts) {
        let nextFolder = currentFolder.items.find(
            (item): item is TemplateFolder => "folderName" in item && item.folderName === folderName
        )

        if (!nextFolder) {
            nextFolder = { folderName, items: [] }
            currentFolder.items.push(nextFolder)
        }

        currentFolder = nextFolder
    }

    const lastDotIndex = fileName.lastIndexOf(".")
    const filename = lastDotIndex > 0 ? fileName.slice(0, lastDotIndex) : fileName
    const fileExtension = lastDotIndex > 0 ? fileName.slice(lastDotIndex + 1) : ""

    currentFolder.items.push({
        filename,
        fileExtension,
        content
    })
}

const fetchGithubRepoAsTemplate = async (
    repo: GitHubRepoInput,
    token: string
): Promise<TemplateFolder> => {
    const branch = repo.defaultBranch || "main"
    const treeUrl = `https://api.github.com/repos/${repo.fullName}/git/trees/${encodeURIComponent(branch)}?recursive=1`

    const treeResponse = await fetch(treeUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
        },
        cache: "no-store",
    })

    if (!treeResponse.ok) {
        const errorText = await treeResponse.text()
        throw new Error(`Failed to read repository tree: ${treeResponse.status} ${errorText}`)
    }

    const treeData = (await treeResponse.json()) as GitHubTreeResponse
    const filesToImport = (treeData.tree || [])
        .filter((item) => item.type === "blob" && shouldImportPath(item.path, item.size))
        .slice(0, MAX_IMPORTED_FILES)

    const templateTree: TemplateFolder = {
        folderName: repo.name,
        items: [],
    }

    for (const file of filesToImport) {
        const blobResponse = await fetch(`https://api.github.com/repos/${repo.fullName}/git/blobs/${file.sha}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json",
            },
            cache: "no-store",
        })

        if (!blobResponse.ok) continue

        const blobData = (await blobResponse.json()) as GitHubBlobResponse

        if (blobData.encoding !== "base64" || !blobData.content) continue

        const content = Buffer.from(blobData.content.replace(/\n/g, ""), "base64").toString("utf8")
        addFileToTemplateTree(templateTree, file.path, content)
    }

    return templateTree
}

export const createPlaygroundFromGitHubRepo = async (repo: GitHubRepoInput) => {
    const user = await getCurrentUser()
    const session = await auth()

    if (!user?.id) {
        throw new Error("User Id is required")
    }

    if (!session?.user?.githubToken) {
        throw new Error("GitHub token is required")
    }

    if (!repo.fullName) {
        throw new Error("GitHub repository full name is required")
    }

    const templateTree = await fetchGithubRepoAsTemplate(repo, session.user.githubToken)

    const playground = await db.playground.create({
        data: {
            title: repo.name,
            templates: inferTemplateFromLanguage(repo.language),
            description: repo.description || `Imported from GitHub: ${repo.fullName}`,
            userId: user.id,
            templateFiles: {
                create: {
                    content: JSON.stringify(templateTree),
                },
            },
        },
    })

    revalidatePath('/dashboard')
    return playground
}

export const deleteProjectById = async (id:string) => {
    try {
        await db.playground.delete({
            where:{
                id: id
            }
        })
        revalidatePath('/dashboard')
    } catch (error) {
        console.error(error)
    }
}

export const editProjectById = async (id:string,data:{
    title?: string;
    description?: string;
}) => {
    try {
        await db.playground.update({
            where:{
                id
            },
            data: data
        })
        revalidatePath('/dashboard')
    } catch (error) {
        console.log(error); 
    }
}

export const duplicateProjectById = async (id:string) => {
    try {
        const originalPlayGroundData = await db.playground.findUnique({
            where:{
                id
            }
        })

        if(!originalPlayGroundData){
            throw new Error("Original Playground not found")
        }

        const duplicatePlayground = await db.playground.create({
            data:{
                title: `${originalPlayGroundData.title} (copy)`,
                description:originalPlayGroundData.description,
                templates:originalPlayGroundData.templates,
                userId:originalPlayGroundData.userId
            }
        })

        revalidatePath('/dashboard')
        return duplicatePlayground
    } catch (error) {
        console.error(error)
    }
}
