// app/auth/sign-in/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <Image src={"/login.svg"} alt="manish" width={400} height={400} className="mb-10"/>
      {/* Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign-in method
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              Error: {error}. Please try again.
            </div>
          )}
          
          <Button 
            onClick={handleGoogleSignIn} 
            variant="outline" 
            className="w-full"
          >
            <Chrome className="mr-2 h-4 w-4" />
            <span>Sign in with Google</span>
          </Button>
          
          <Button 
            onClick={handleGithubSignIn} 
            variant="outline" 
            className="w-full"
          >
            <Github className="mr-2 h-4 w-4" />
            <span>Sign in with GitHub</span>
          </Button>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 w-full">
            By signing in, you agree to our{" "}
            <a href="#" className="underline hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;