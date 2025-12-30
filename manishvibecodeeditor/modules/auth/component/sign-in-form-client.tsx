// app/auth/sign-in/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Github, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState("/");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    const callbackUrlParam = searchParams.get("callbackUrl");
    
    if (errorParam) {
      setError(errorParam);
    }
    
    if (callbackUrlParam) {
      setCallbackUrl(callbackUrlParam);
    }
  }, [searchParams]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Modern Minimal Gradient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/5 via-transparent to-blue-900/5" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />

      <Card className="w-full max-w-md bg-gray-900/90 backdrop-blur-xl border-gray-800/50 shadow-2xl relative z-10">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-900/30">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-400 pt-2">
            Sign in to access your workspace
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-red-300 text-sm text-center backdrop-blur-sm">
              Authentication failed. Please try again.
            </div>
          )}

          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-gray-600 transition-all duration-200 group hover:shadow-lg hover:shadow-purple-900/20"
            >
              <div className="flex items-center justify-center w-5 h-5 mr-3 bg-white rounded-full p-0.5">
                <Chrome className="w-4 h-4 text-gray-800" />
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                Continue with Google
              </span>
            </Button>

            <Button
              onClick={handleGithubSignIn}
              className="w-full h-12 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-gray-600 transition-all duration-200 group hover:shadow-lg hover:shadow-blue-900/20"
            >
              <Github className="w-5 h-5 mr-3 text-gray-300 group-hover:text-white transition-colors" />
              <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                Continue with GitHub
              </span>
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-gray-900 text-gray-500">
                Secure authentication
              </span>
            </div>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-500">
              By continuing, you agree to our{" "}
              <a 
                href="/terms" 
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-300 hover:to-blue-300 transition-all duration-200 font-medium"
              >
                Terms
              </a>{" "}
              and{" "}
              <a 
                href="/privacy" 
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-300 hover:to-blue-300 transition-all duration-200 font-medium"
              >
                Privacy Policy
              </a>
            </p>
            <p className="text-gray-600 text-xs mt-4 flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              Your data is encrypted and secure
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />
    </div>
  );
};

export default SignInPage;