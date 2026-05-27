"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Code2,
  Database,
  FileCode2,
  Github,
  GitBranch,
  LayoutDashboard,
  Lock,
  MonitorPlay,
  PanelLeft,
  Play,
  Plus,
  Rocket,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const navItems = [
  "Overview",
  "Create Playgrounds",
  "GitHub Imports",
  "Editor Workflow",
  "AI Assistant",
  "Persistence",
];

const featureCards = [
  {
    title: "Template Playgrounds",
    description:
      "Start a project from React, Next.js, Vue, Angular, Hono, or Express templates and open it directly in the browser editor.",
    icon: Plus,
  },
  {
    title: "GitHub Repository Import",
    description:
      "Sign in with GitHub, browse your repositories, select one, and generate a playground from its source files.",
    icon: Github,
  },
  {
    title: "Monaco Code Editor",
    description:
      "Edit files with a modern editor experience, file tabs, syntax highlighting, and save support.",
    icon: Code2,
  },
  {
    title: "WebContainer Runtime",
    description:
      "Mount playground files in a browser runtime, install dependencies, run commands, and preview the app.",
    icon: MonitorPlay,
  },
  {
    title: "AI Coding Panel",
    description:
      "Use the side assistant for code questions, suggestions, explanations, and workflow support inside the playground.",
    icon: Bot,
  },
  {
    title: "Project Dashboard",
    description:
      "Manage recent projects, favorites, duplicate playgrounds, delete old work, and jump back into active sessions.",
    icon: LayoutDashboard,
  },
];

const workflowSteps = [
  {
    title: "Authenticate",
    description: "Continue with GitHub so VibeCodeEditor can read your repositories securely.",
    icon: Lock,
  },
  {
    title: "Choose a Source",
    description: "Create from a starter template or select an existing GitHub repository.",
    icon: GitBranch,
  },
  {
    title: "Edit in Playground",
    description: "Browse the file tree, open files, edit code, and save changes to the playground snapshot.",
    icon: FileCode2,
  },
  {
    title: "Run and Preview",
    description: "Use the WebContainer terminal and preview panel to test your app without leaving the browser.",
    icon: Terminal,
  },
];

const supportedTemplates = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Hono",
  "Express",
];

const githubImportNotes = [
  "Fetches repositories through the authenticated GitHub session.",
  "Imports source files into the same JSON tree used by template playgrounds.",
  "Skips heavy folders such as node_modules, build, dist, coverage, and .git.",
  "Creates a playground record and opens /playground/[id] after selection.",
];

const editorCapabilities = [
  {
    label: "Explorer",
    text: "Create, rename, delete, and organize files and folders from the playground sidebar.",
  },
  {
    label: "Tabs",
    text: "Open multiple files and switch between active editor buffers quickly.",
  },
  {
    label: "Save",
    text: "Persist the current template tree through the playground save action.",
  },
  {
    label: "Preview",
    text: "Mount files to WebContainer and run the project in a browser preview panel.",
  },
];

const stackItems = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Prisma",
  "MongoDB",
  "NextAuth",
  "Monaco Editor",
  "WebContainer API",
  "Tailwind CSS",
  "shadcn/ui",
];

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-[#0b0d10] text-slate-100">
      <section className="border-b border-white/10 bg-[linear-gradient(135deg,#10151f_0%,#0b0d10_42%,#161114_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:px-8">
          <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10">
                <Terminal className="size-5 text-red-400" />
              </span>
              <span>
                <span className="block text-lg font-semibold">VibeCodeEditor</span>
                <span className="block text-sm text-slate-400">Project documentation</span>
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-slate-100 hover:bg-white/10">
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 size-4" />
                  Dashboard
                </Link>
              </Button>
              <Button asChild className="bg-red-500 text-white hover:bg-red-600">
                <Link href="/dashboard">
                  <Play className="mr-2 size-4" />
                  Start Coding
                </Link>
              </Button>
            </div>
          </header>

          <div className="grid gap-10 lg:grid-cols-[1fr_390px] lg:items-end">
            <div className="max-w-3xl">
              <Badge className="mb-5 border-red-500/25 bg-red-500/10 text-red-200 hover:bg-red-500/10">
                Browser IDE with GitHub-powered playgrounds
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Build, import, edit, and run projects from one focused workspace.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                VibeCodeEditor combines authenticated GitHub imports, starter templates, a Monaco-powered editor,
                WebContainer previews, and an AI coding panel into a single playground workflow.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {supportedTemplates.map((template) => (
                  <Badge key={template} variant="secondary" className="bg-white/8 text-slate-200 hover:bg-white/12">
                    {template}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/35 p-5 shadow-2xl shadow-black/30">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-yellow-300" />
                  <span className="size-3 rounded-full bg-emerald-400" />
                </div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-300">
                  Live flow
                </Badge>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                  <span className="text-red-300">select</span> github repository
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                  <span className="text-sky-300">create</span> playground snapshot
                </div>
                <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                  <span className="text-emerald-300">open</span> Monaco editor and preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-6">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                <BookOpen className="size-4 text-red-300" />
                Contents
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    <ArrowRight className="size-3" />
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="rounded-lg border border-red-500/20 bg-red-500/8 p-4">
              <p className="text-sm font-medium text-red-100">Core idea</p>
              <p className="mt-2 text-sm leading-6 text-red-100/75">
                A playground is a saved project workspace. It can begin from a template or from an imported GitHub repository.
              </p>
            </div>
          </div>
        </aside>

        <section className="space-y-10">
          <section id="overview" className="space-y-5">
            <div className="flex items-center gap-3">
              <Rocket className="size-5 text-red-300" />
              <h2 className="text-2xl font-semibold text-white">Overview</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border-white/10 bg-white/[0.035] text-slate-100">
                    <CardHeader className="space-y-4">
                      <span className="flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/5">
                        <Icon className="size-5 text-red-300" />
                      </span>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-slate-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section id="create-playgrounds" className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_330px]">
              <div>
                <div className="flex items-center gap-3">
                  <Workflow className="size-5 text-red-300" />
                  <h2 className="text-2xl font-semibold text-white">Create Playgrounds</h2>
                </div>
                <p className="mt-4 text-slate-400">
                  The dashboard gives you two creation paths: create from a supported starter template or import from GitHub.
                  Both paths end in the same editor experience.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {workflowSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.title} className="rounded-md border border-white/10 bg-black/20 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <Icon className="size-5 text-red-300" />
                          <span className="text-xs text-slate-500">Step {index + 1}</span>
                        </div>
                        <h3 className="font-medium text-white">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{step.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#0f1319] p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <PanelLeft className="size-4 text-red-300" />
                  Dashboard actions
                </div>
                <div className="mt-5 space-y-3">
                  <div className="rounded-md border border-white/10 bg-white/5 p-4">
                    <Plus className="mb-3 size-5 text-red-300" />
                    <p className="font-medium text-white">Add New</p>
                    <p className="mt-1 text-sm text-slate-400">Choose a starter template and project name.</p>
                  </div>
                  <div className="rounded-md border border-white/10 bg-white/5 p-4">
                    <Github className="mb-3 size-5 text-red-300" />
                    <p className="font-medium text-white">Open GitHub Repository</p>
                    <p className="mt-1 text-sm text-slate-400">Select a repository and create a playground.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Tabs defaultValue="github" className="space-y-5">
            <TabsList className="grid h-auto grid-cols-2 rounded-lg border border-white/10 bg-white/[0.03] p-1 md:grid-cols-4">
              <TabsTrigger value="github" className="gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Github className="size-4" />
                GitHub
              </TabsTrigger>
              <TabsTrigger value="editor" className="gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Code2 className="size-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="ai" className="gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Sparkles className="size-4" />
                AI
              </TabsTrigger>
              <TabsTrigger value="data" className="gap-2 data-[state=active]:bg-red-500 data-[state=active]:text-white">
                <Database className="size-4" />
                Data
              </TabsTrigger>
            </TabsList>

            <TabsContent id="github-imports" value="github" className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Github className="size-5 text-red-300" />
                <h2 className="text-2xl font-semibold text-white">GitHub Imports</h2>
              </div>
              <p className="mt-4 max-w-3xl text-slate-400">
                GitHub integration lets users move from a real repository list to an editable playground with one selection.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {githubImportNotes.map((note) => (
                  <div key={note} className="flex gap-3 rounded-md border border-white/10 bg-black/20 p-4">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-6 text-slate-300">{note}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent id="editor-workflow" value="editor" className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Code2 className="size-5 text-red-300" />
                <h2 className="text-2xl font-semibold text-white">Editor Workflow</h2>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {editorCapabilities.map((item) => (
                  <div key={item.label} className="rounded-md border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent id="ai-assistant" value="ai" className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Bot className="size-5 text-red-300" />
                <h2 className="text-2xl font-semibold text-white">AI Assistant</h2>
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="rounded-md border border-white/10 bg-black/20 p-5">
                  <p className="text-sm leading-6 text-slate-300">
                    The playground includes an AI side panel designed for code discussion, suggestions, and developer
                    assistance while files are open in the editor.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {["Ask about code", "Generate snippets", "Review changes"].map((item) => (
                      <div key={item} className="rounded-md bg-white/5 px-3 py-2 text-sm text-slate-300">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-md border border-red-500/20 bg-red-500/8 p-5">
                  <Sparkles className="mb-3 size-5 text-red-200" />
                  <p className="font-medium text-red-100">Designed for context</p>
                  <p className="mt-2 text-sm leading-6 text-red-100/75">
                    The panel lives inside the playground, so assistance stays close to the active project workflow.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent id="persistence" value="data" className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Save className="size-5 text-red-300" />
                <h2 className="text-2xl font-semibold text-white">Persistence</h2>
              </div>
              <p className="mt-4 text-slate-400">
                Playground metadata is stored with Prisma and MongoDB. File trees are persisted as JSON snapshots through
                the TemplateFile model, so imported repositories and edited templates load back into the same explorer.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  ["User", "Authentication profile and linked accounts."],
                  ["Playground", "Project title, template type, owner, and timestamps."],
                  ["TemplateFile", "Serialized file tree and saved editor content."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-md border border-white/10 bg-black/20 p-4">
                    <p className="font-medium text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <Settings2 className="size-5 text-red-300" />
                <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {stackItems.map((item) => (
                  <Badge key={item} variant="outline" className="border-white/10 bg-white/5 text-slate-300">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-emerald-300" />
                <h2 className="text-2xl font-semibold text-white">Security</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Authentication is handled with NextAuth. GitHub access is scoped through the connected session and used for
                repository reads during import.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-red-500/20 bg-red-500/8 p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Star className="size-5 text-red-200" />
                  <h2 className="text-2xl font-semibold text-white">Ready to build?</h2>
                </div>
                <p className="mt-3 text-red-100/75">
                  Open the dashboard, create a template playground, or import a GitHub repository into the editor.
                </p>
              </div>
              <Button asChild className="bg-white text-red-600 hover:bg-red-50">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
