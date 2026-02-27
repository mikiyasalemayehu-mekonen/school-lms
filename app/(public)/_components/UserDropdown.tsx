"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSignOut } from "@/hooks/use-signout";
import {
  BookOpen,
  Home,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react"
import Link from "next/link"


interface iAppProps {
    name?: string;
    email?: string;
    image?: string;

}

export function UserDropdown({name,  image}: iAppProps  ) {
    const handleSignOut = useSignOut()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="h-9 w-9">
          <AvatarImage src={image} alt="profile" />
          <AvatarFallback>{name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/" >
             <Home />
            Home
            </Link>

          </DropdownMenuItem >
          <DropdownMenuItem asChild>
           <Link href="/courses" >
             <BookOpen />
            Courses
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
           <Link href="/dashboard" >
             <LayoutDashboardIcon />
            Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
