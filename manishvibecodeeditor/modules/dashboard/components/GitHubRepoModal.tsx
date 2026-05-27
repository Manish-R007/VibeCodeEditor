"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Github, Loader2, Star, Wrench } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

interface Repository {
  id: number
  name: string
  fullName: string
  url: string
  description: string | null
  language: string | null
  stars: number
  defaultBranch: string
}

interface GitHubRepoModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (repo: Repository) => void | Promise<void>
  isSelecting?: boolean
  selectedRepoId?: number
}

export default function GitHubRepoModal({
  isOpen,
  onClose,
  onSelect,
  isSelecting = false,
  selectedRepoId,
}: GitHubRepoModalProps) {
  const { data: session, status } = useSession()
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAuthGuard, setShowAuthGuard] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (session?.user?.githubToken) {
        fetchRepositories()
      } else if (status === "authenticated") {
        setShowAuthGuard(true)
      }
    }
  }, [isOpen, session, status])

  const fetchRepositories = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/github/repos")

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.message || errorData.error || "Failed to fetch repositories"

        if (response.status === 403) {
          setShowAuthGuard(true)
          setLoading(false)
          return
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      setRepos(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load repositories"
      console.error("Error:", error)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectRepo = async (repo: Repository) => {
    await onSelect(repo)
  }

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog open={isOpen && !showAuthGuard} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github size={20} />
            Select GitHub Repository
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E93F3F]"
          />

          <div className="max-h-96 overflow-y-auto space-y-2">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin mr-2" />
                Loading repositories...
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {repos.length === 0 ? "No repositories found" : "No matching repositories"}
              </div>
            ) : (
              filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="p-3 border rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={async () => {
                    if (!isSelecting) {
                      await handleSelectRepo(repo)
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#E93F3F]">{repo.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {repo.description || "No description"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isSelecting}
                      onClick={async (e) => {
                        e.stopPropagation()
                        await handleSelectRepo(repo)
                      }}
                    >
                      {isSelecting && selectedRepoId === repo.id ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Creating
                        </>
                      ) : (
                        "Select"
                      )}
                    </Button>
                  </div>
                  <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <Wrench className="size-3" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="size-3" />
                      {repo.stars}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
