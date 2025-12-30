"use client";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import LogoutButton from "./logout-button";
import { useCurrentUser } from "../hooks/use-current-user";
import Link from "next/link";

const UserButton = () => {
  const user = useCurrentUser();

  // Debug logging
  useEffect(() => {
    console.log("UserButton - User data:", user);
    console.log("UserButton - User email:", user?.email);
    console.log("UserButton - User image:", user?.image);
  }, [user]);

  // If no user, show sign in button
  if (!user) {
    return (
      <Link href="/auth/login" className="text-sm px-3 py-1 bg-blue-500 text-white rounded">
        Sign In
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={cn("relative rounded-full cursor-pointer")}>
          <Avatar>
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback className="bg-blue-500">
              <User className="text-white h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-4" align="end">
        <DropdownMenuItem className="cursor-default">
          <span className="font-medium">{user?.name || "User"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-default">
          <span className="text-sm text-gray-500">{user?.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;