import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Code, Zap, Shield, Users, Sparkles, Rocket, Terminal, GitBranch, Cpu, Lock, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized engine and instant code execution.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Get intelligent code suggestions, auto-completion, and bug detection powered by advanced AI.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your code is protected with enterprise-grade security and local-first architecture.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative",
      description: "Real-time collaboration features to code together with your team seamlessly.",
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Multi-Language",
      description: "Support for 50+ programming languages with language-specific tooling.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Deploy Anywhere",
      description: "One-click deployment to your favorite cloud platforms and services.",
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Git Integrated",
      description: "Built-in Git support with visual diff tools and seamless branching.",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Smart Debugging",
      description: "Advanced debugging tools with breakpoints, watch variables, and call stacks.",
    },
  ];

  const testimonials = [
    {
      quote: "VibeCode transformed how our team writes code. The AI suggestions are incredibly accurate!",
      author: "Alex Chen",
      role: "Senior Developer @TechCorp",
    },
    {
      quote: "I've tried many editors, but VibeCode's performance and features are unmatched.",
      author: "Maria Rodriguez",
      role: "Lead Engineer @StartupXYZ",
    },
    {
      quote: "The collaborative features saved us hours of work. A game-changer for remote teams.",
      author: "David Kim",
      role: "CTO @InnovateLabs",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Developers" },
    { value: "100K+", label: "Projects Created" },
    { value: "50+", label: "Languages Supported" },
    { value: "99.9%", label: "Uptime" },
  ];

  const codeExamples = [
    { language: "JavaScript", code: "const greet = () => 'Hello VibeCode!';" },
    { language: "Python", code: "def greet():\n    return 'Hello VibeCode!'" },
    { language: "TypeScript", code: "const greet = (): string => 'Hello VibeCode!';" },
    { language: "Rust", code: "fn greet() -> &'static str {\n    \"Hello VibeCode!\"\n}" },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center my-5">
        <Image src={"/hero.svg"} alt="Hero-Section" height={500} width={500} />
        
        <h1 className="text-5xl md:text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 dark:from-rose-400 dark:via-red-400 dark:to-pink-400 tracking-tight leading-[1.3] px-4">
          Vibe Code With Intelligence
        </h1>
        
        <p className="mt-6 text-xl md:text-2xl text-center text-gray-700 dark:text-gray-300 max-w-3xl px-4">
          The next-generation code editor powered by artificial intelligence
        </p>
      </div>

      <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-6 max-w-2xl">
        VibeCode Editor is a powerful and intelligent code editor that enhances
        your coding experience with advanced features and seamless integration.
        It is designed to help you write, debug, and optimize your code
        efficiently.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link href={"/dashboard"}>
          <Button variant={"brand"} className="mb-4" size={"lg"}>
            Get Started Free
            <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        </Link>
        <Link href={"/features"}>
          <Button variant={"outline"} size={"lg"}>
            <Code className="w-4 h-4 mr-2" />
            Explore Features
          </Button>
        </Link>
      </div>
      
      <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        No credit card required • Free forever plan available
      </div>

      {/* Stats Section */}
      <div className="w-full py-16 px-4 mt-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
                  {stat.value}
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Everything You Need to Code Better
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Packed with features that developers love, designed to make you more productive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-lg w-fit mb-4">
                    <div className="text-rose-500 dark:text-rose-400">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Write Code in Any Language
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Full language support with syntax highlighting, linting, and intelligent suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {codeExamples.map((example, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm font-mono text-gray-400">{example.language}</span>
                </div>
                <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Loved by Developers Worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-full -translate-y-10 translate-x-10" />
                <CardContent className="pt-6">
                  <div className="text-2xl text-gray-400 mb-4">"</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                    {testimonial.quote}
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-2xl mb-8">
            <Rocket className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Coding Experience?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already coding smarter with VibeCode
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/dashboard"}>
              <Button variant={"brand"} size={"lg"} className="px-8 py-6 text-lg">
                <Rocket className="w-5 h-5 mr-2" />
                Start Coding Free Today
              </Button>
            </Link>
            <Link href={"/docs"}>
              <Button variant={"outline"} size={"lg"}>
                <Globe className="w-4 h-4 mr-2" />
                View Documentation
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Free plan includes all core features • No time limit • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}