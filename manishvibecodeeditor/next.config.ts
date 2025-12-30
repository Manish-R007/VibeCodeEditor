import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Google (for Google OAuth profile pictures)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      
      // GitHub (for GitHub OAuth profile pictures)
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      
      // Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      
      // Gravatar
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
      },
      
      // Imgur
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      
      // Placeholder images
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      
      // Add any other image hosts your app uses
    ],
  },
  
  // Optional: If using app directory features
  experimental: {
    // Add any experimental features here
  },
};

export default nextConfig;