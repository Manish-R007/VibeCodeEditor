"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Github, AlertCircle } from "lucide-react"
import { signIn } from "next-auth/react"

interface GitHubAuthGuardProps {
  isOpen: boolean
  onClose: () => void
  onAuthenticated?: () => void
}

export default function GitHubAuthGuard({ isOpen, onClose }: GitHubAuthGuardProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleGitHubLogin = async () => {
    setIsAuthenticating(true)
    try {
      await signIn("github", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error('GitHub login failed:', error)
      setIsAuthenticating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-[#E93F3F]" size={24} />
            <DialogTitle>GitHub Authentication Required</DialogTitle>
          </div>
          <DialogDescription className="mt-2">
            To access your GitHub repositories, you need to authenticate with GitHub first. This allows VibeCode to fetch and manage your repositories securely.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Why do we need this?</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Access your personal GitHub repositories</li>
              <li>• Work with code in our editor</li>
              <li>• Your token is stored securely</li>
            </ul>
          </div>

          <Button
            onClick={handleGitHubLogin}
            disabled={isAuthenticating}
            className="w-full bg-[#E93F3F] hover:bg-[#d93f3f] text-white"
          >
            <Github className="mr-2" size={18} />
            {isAuthenticating ? "Authenticating..." : "Authenticate with GitHub"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We only request access to your repositories. We won&apos;t post anything without your permission.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
