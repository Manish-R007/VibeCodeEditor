'use client'

import React from 'react';
import { 
  BookOpen, 
  Code, 
  MessageSquare, 
  Play, 
  Star, 
  Copy, 
  Trash2, 
  Edit,
  Search,
  Zap,
  Cpu,
  Sparkles,
  Terminal,
  FileCode,
  Shield,
  Users,
  Download,
  Share2,
  Eye,
  Save,
  ChevronRight,
  ExternalLink,
  Plus,
  Send,
  Brain,
  Code2,
  GitBranch,
  Cloud,
  Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DocumentationPage() {
  const frameworks = [
    { id: 'react', name: 'React', icon: '⚛️', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
    { id: 'vue', name: 'Vue.js', icon: '🟢', color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
    { id: 'angular', name: 'Angular', icon: '🟥', color: 'from-red-500/20 to-rose-500/20 border-red-500/30' },
    { id: 'nextjs', name: 'Next.js', icon: '▲', color: 'from-gray-800/30 to-black border-gray-700/50' },
    { id: 'svelte', name: 'Svelte', icon: '🟧', color: 'from-orange-500/20 to-amber-500/20 border-orange-500/30' },
    { id: 'nuxt', name: 'Nuxt.js', icon: '🟩', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30' },
  ];

  const playgrounds = [
    { id: 1, name: 'React Dashboard', framework: 'react', lastEdited: '2 hours ago', starred: true, description: 'Modern admin dashboard with charts' },
    { id: 2, name: 'Vue E-commerce', framework: 'vue', lastEdited: '1 day ago', starred: false, description: 'Full-featured online store' },
    { id: 3, name: 'Next.js Blog', framework: 'nextjs', lastEdited: '3 days ago', starred: true, description: 'SSR blog with MDX support' },
    { id: 4, name: 'Svelte Portfolio', framework: 'svelte', lastEdited: '1 week ago', starred: false, description: 'Interactive portfolio website' },
  ];

  const aiMessages = [
    { id: 1, sender: 'ai', content: 'I notice you\'re working on a React component. Would you like me to optimize the useEffect hooks?', time: '10:30 AM' },
    { id: 2, sender: 'user', content: 'Yes, please suggest improvements for performance', time: '10:32 AM' },
    { id: 3, sender: 'ai', content: 'I recommend combining multiple useEffect hooks and adding useMemo for expensive calculations. Also, consider React.memo for the component.', time: '10:33 AM' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] opacity-10" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Moving Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-500/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 7}s`,
              }}
            />
          ))}
        </div>

        {/* Shimmer Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-shimmer" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer delay-1000" />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg shadow-lg shadow-blue-500/20">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CodePlay
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">Live</span>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors group">
                <BookOpen className="h-4 w-4 inline mr-2 group-hover:text-blue-400 transition-colors" />
                Docs
              </a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors group">
                <Play className="h-4 w-4 inline mr-2 group-hover:text-purple-400 transition-colors" />
                Playground
              </a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors group">
                <Users className="h-4 w-4 inline mr-2 group-hover:text-pink-400 transition-colors" />
                Community
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documentation..."
                className="pl-10 w-64 bg-gray-800/50 border-gray-700/50 text-gray-200 placeholder:text-gray-500 focus:border-blue-500/50"
              />
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-400">
              <Sparkles className="h-5 w-5" />
            </Button>
            <Avatar className="border-2 border-gray-700">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600">CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container px-6 py-8 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Documentation Navigation */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-100">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Getting Started', 'Playground Guide', 'AI Features', 'Framework Support', 'API Reference', 'Best Practices'].map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 group transition-all duration-200"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors" />
                    {item}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Playgrounds</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    12
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">AI Sessions</span>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    47
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Saved Code</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                    128
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* Hero Section */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 border border-gray-800/50 backdrop-blur-sm p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="h-10 w-10 text-blue-400 animate-pulse" />
                      <div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          Interactive AI Playground
                        </h1>
                        <p className="text-gray-400 text-lg mt-2">
                          Create, edit, and test code in real-time with intelligent AI assistance
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/20">
                        <Play className="h-4 w-4" />
                        New Playground
                      </Button>
                      <Button variant="outline" className="gap-2 border-gray-700 text-gray-300 hover:bg-gray-800/50">
                        <FileCode className="h-4 w-4" />
                        View Examples
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="relative">
                      <div className="w-40 h-40 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full animate-spin-slow" />
                      <Code2 className="h-20 w-20 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Tabs */}
            <Tabs defaultValue="playgrounds" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-gray-800/50 p-1 rounded-xl">
                <TabsTrigger 
                  value="playgrounds" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:border data-[state=active]:border-blue-500/30 text-gray-400 data-[state=active]:text-white gap-2 rounded-lg"
                >
                  <Play className="h-4 w-4" />
                  Playgrounds
                </TabsTrigger>
                <TabsTrigger 
                  value="documentation" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:border data-[state=active]:border-blue-500/30 text-gray-400 data-[state=active]:text-white gap-2 rounded-lg"
                >
                  <BookOpen className="h-4 w-4" />
                  Documentation
                </TabsTrigger>
                <TabsTrigger 
                  value="ai-chat" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/20 data-[state=active]:to-purple-600/20 data-[state=active]:border data-[state=active]:border-blue-500/30 text-gray-400 data-[state=active]:text-white gap-2 rounded-lg"
                >
                  <MessageSquare className="h-4 w-4" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>

              {/* Playgrounds Tab */}
              <TabsContent value="playgrounds" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Your Playgrounds</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800/50">
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New
                    </Button>
                  </div>
                </div>

                {/* Framework Selection */}
                <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-white">Select Framework</CardTitle>
                    <CardDescription className="text-gray-400">Choose a framework to start coding</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {frameworks.map((fw) => (
                        <button
                          key={fw.id}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 bg-gradient-to-br ${fw.color} hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group`}
                        >
                          <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{fw.icon}</span>
                          <span className="font-medium text-gray-200 group-hover:text-white">{fw.name}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Playground List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {playgrounds.map((playground) => (
                    <Card 
                      key={playground.id} 
                      className="bg-gray-900/40 backdrop-blur-sm border-gray-800/50 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge 
                                className={`bg-gradient-to-r ${frameworks.find(f => f.id === playground.framework)?.color} text-gray-200`}
                              >
                                {frameworks.find(f => f.id === playground.framework)?.icon}
                                {playground.framework}
                              </Badge>
                              {playground.starred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 animate-pulse" />
                              )}
                            </div>
                            <h3 className="font-bold text-lg text-white">{playground.name}</h3>
                            <p className="text-sm text-gray-400 mb-1">{playground.description}</p>
                            <p className="text-xs text-gray-500">Last edited {playground.lastEdited}</p>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="hover:bg-blue-500/20 hover:text-blue-400">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-purple-500/20 hover:text-purple-400">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-yellow-500/20 hover:text-yellow-400">
                              <Star className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:bg-red-500/20 hover:text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800/50">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 border-0">
                            <Code className="h-4 w-4 mr-2" />
                            Edit Code
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* AI Chat Tab */}
              <TabsContent value="ai-chat" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Chat Interface */}
                  <Card className="lg:col-span-2 bg-gray-900/60 backdrop-blur-sm border-gray-800/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-white">
                        <MessageSquare className="h-5 w-5 text-blue-400" />
                        AI Code Assistant
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Ask questions, generate code, or debug issues in real-time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Chat Messages */}
                        <ScrollArea className="h-[400px] rounded-lg border border-gray-800/50 p-4 bg-gray-900/30">
                          {aiMessages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`mb-4 ${msg.sender === 'ai' ? 'text-left' : 'text-right'}`}
                            >
                              <div className={`inline-block max-w-[80%] rounded-xl p-4 ${msg.sender === 'ai' 
                                ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 text-gray-200' 
                                : 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg shadow-blue-500/20'
                              }`}>
                                <div className="flex items-center gap-2 mb-2">
                                  {msg.sender === 'ai' ? (
                                    <Brain className="h-4 w-4 text-blue-400" />
                                  ) : (
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600">U</AvatarFallback>
                                    </Avatar>
                                  )}
                                  <span className="text-xs font-medium">
                                    {msg.sender === 'ai' ? 'AI Assistant' : 'You'}
                                  </span>
                                </div>
                                <p>{msg.content}</p>
                                <p className="text-xs opacity-70 mt-2 text-right">{msg.time}</p>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                        
                        {/* Chat Input */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ask AI about your code..."
                            className="flex-1 bg-gray-800/50 border-gray-700/50 text-gray-200 placeholder:text-gray-500 focus:border-blue-500/50"
                          />
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Tools Sidebar */}
                  <Card className="bg-gray-900/60 backdrop-blur-sm border-gray-800/50">
                    <CardHeader>
                      <CardTitle className="text-white">AI Tools</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start gap-2 border-gray-700 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30">
                        <Code className="h-4 w-4" />
                        Generate Code
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 border-gray-700 text-gray-300 hover:bg-green-500/20 hover:text-green-400 hover:border-green-500/30">
                        <Search className="h-4 w-4" />
                        Find Bugs
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 border-gray-700 text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-400 hover:border-yellow-500/30">
                        <Zap className="h-4 w-4" />
                        Optimize Code
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 border-gray-700 text-gray-300 hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/30">
                        <FileCode className="h-4 w-4" />
                        Convert Code
                      </Button>
                      
                      <Separator className="bg-gray-800/50" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Inline Suggestions</span>
                          <Switch className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">Auto-save</span>
                          <Switch className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">AI Code Review</span>
                          <Switch className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-800/50 py-8 relative z-10">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Terminal className="h-6 w-6 text-blue-400" />
              <div>
                <span className="text-lg font-semibold text-white">CodePlay</span>
                <p className="text-xs text-gray-500">AI-Powered Development Platform</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <GitBranch className="h-4 w-4 inline mr-1" />
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Built with ❤️ for developers • Secured with <Lock className="h-3 w-3 inline" /> end-to-end encryption
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}