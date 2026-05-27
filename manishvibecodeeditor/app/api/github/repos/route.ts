import { auth } from '@/auth'
import { NextResponse } from 'next/server'

type GitHubRepository = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  default_branch: string
}

export async function GET() {
  try {
    const session = await auth()

    console.log('GitHub Token:', session?.user?.githubToken ? 'Present' : 'Missing')

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!session.user.githubToken) {
      return NextResponse.json(
        { 
          error: 'GitHub token not found. Please login with GitHub first.',
          message: 'User needs to authenticate with GitHub to access repositories'
        },
        { status: 403 }
      )
    }

    const response = await fetch('https://api.github.com/user/repos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.user.githubToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('GitHub API error:', response.status, errorData)
      throw new Error(`GitHub API returned ${response.status}: ${errorData}`)
    }

    const repos = (await response.json()) as GitHubRepository[]

    const formattedRepos = repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      defaultBranch: repo.default_branch,
    }))

    return NextResponse.json(formattedRepos)
  } catch (error) {
    console.error('Error fetching repos:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch repositories',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

