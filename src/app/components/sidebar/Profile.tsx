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
import { NightModeSwitch } from "@/app/components/sidebar/night-mode";
import { useCurrentUser } from "@/hooks/use-current-user";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const user = useCurrentUser();
  const fallBackText =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("") || "NA";
  const RenderDrawer = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="hover:w-9 hover:h-9">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{fallBackText}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <NightModeSwitch />
          </DropdownMenuItem>
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
