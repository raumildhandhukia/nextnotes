"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/app/components/logout";

interface ProfileProps {
  userInfo: any;
}

const Profile: React.FC<ProfileProps> = ({ userInfo }) => {
  const fallBackText =
    userInfo.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("") || "NA";
  const RenderDrawer = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="hover:w-9 hover:h-9">
            <AvatarImage
              src={userInfo.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{fallBackText}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{userInfo.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return <RenderDrawer />;
};

export default Profile;
