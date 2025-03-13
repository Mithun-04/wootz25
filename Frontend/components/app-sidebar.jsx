"use client"

import * as React from "react"
import {
  Home,
  CalendarHeart,
  GraduationCap,
  FileText,
  Users,
  LogOut,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { EventDisplay, TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Sample Data with Updated Icons
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/assets/evt3.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Events",
      url: "#",
      icon: CalendarHeart, 
      items: [
        {
          title: "Wootz Quest",
          url: "#",
        },
        {
          title: "MindSpark Arena",
          url: "#",
        },
        {
          title: "Wootz Maestro",
          url: "#",
        },
      ],
    },
    {
      title: "Workshops",
      url: "#",
      icon: GraduationCap, // Represents learning and workshops
      items: [
        {
          title: "Workshop 1",
          url: "#",
        },
      ],
    },
    {
      title: "Paper Presentation",
      url: "#",
      icon: FileText, // Represents academic or formal presentations
      items: [
        {
          title: "Paper Presentation 1",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <EventDisplay />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
