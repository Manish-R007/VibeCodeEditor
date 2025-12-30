import Link from "next/link";
import { Github as LucideGithub, Twitter, Linkedin, Mail, Heart, Code } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      href: "https://github.com",
      icon: <LucideGithub className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" />,
      label: "GitHub",
    },
    {
      href: "https://twitter.com",
      icon: <Twitter className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" />,
      label: "Twitter",
    },
    {
      href: "https://linkedin.com",
      icon: <Linkedin className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" />,
      label: "LinkedIn",
    },
    {
      href: "mailto:contact@vibecode.com",
      icon: <Mail className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" />,
      label: "Email",
    },
  ];

  const footerLinks = [
    {
      title: "Product",
      links: [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/releases", label: "Releases" },
        { href: "/roadmap", label: "Roadmap" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/docs", label: "Documentation" },
        { href: "/tutorials", label: "Tutorials" },
        { href: "/blog", label: "Blog" },
        { href: "/community", label: "Community" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy Policy" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/terms", label: "Terms of Service" },
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/cookies", label: "Cookie Policy" },
        { href: "/security", label: "Security" },
      ],
    },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-8 h-8 text-rose-500" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-500">
                VibeCode
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 max-w-md">
              A powerful, intelligent code editor that enhances your coding experience with 
              advanced features and seamless integration.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span>&copy; {new Date().getFullYear()} VibeCode Editor. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="hidden sm:inline">for developers</span>
          </div>

          {/* Additional Links */}
          <div className="flex gap-6 text-sm">
            <Link
              href="/sitemap"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Sitemap
            </Link>
            <Link
              href="/status"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Status
            </Link>
            <Link
              href="/support"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Mobile Copyright */}
        <div className="mt-8 text-center md:hidden">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            Made with <Heart className="w-3 h-3 inline text-rose-500 fill-rose-500" /> for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}