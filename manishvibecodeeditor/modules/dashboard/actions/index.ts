"use server";

import db from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/action";
import { revalidatePath } from "next/cache";


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
                await db.starMark.delete({
                    where:{
                        userId_PlaygroundId:{
                            userId:userId,
                            PlaygroundId:playgroundId
                        }
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

    try {
        const playground = await db.playground.findMany({
            where: {
                userId: user?.id
            },
            include : {
                user: true,
                StarMark:{
                    where:{
                        userId:user?.id
                    },
                    select:{
                        isMarked:true
                    }
                }
            }
        })
        return playground;
    } catch (error) {
        console.error(error);
        
    }
}

export const createPlayground = async (data:{
    title: string;
    template: "REACT" | "NEXTJS" | "ANGULAR" | "VUE" | "HONO" | "EXPRESS";
    description?: string;
}) => {
    const user = await getCurrentUser()

    const {title,template,description} = data
    try {
        const playground = await db.playground.create({
           data: {
            title: title,
            templates: template!,
            description: description,
            userId: user?.id!
           }

        })
       
    } catch (error) {
        console.error(error)
    }
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
        
    }
}