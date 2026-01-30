"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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

export function UserDropdown({name, email, image}: iAppProps  ) {
    const handleSignOut = useSignOut()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={image} alt="profile" />
            <AvatarFallback>{name?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
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
           <Link href="/course" >
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
