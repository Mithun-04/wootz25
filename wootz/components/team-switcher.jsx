"use client"

import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar" // Import the sidebar hook

export function EventDisplay() {
  const { state } = useSidebar() // Get sidebar state

  return (

        <SidebarMenuButton
          size="lg"
          className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-800 hover:text-white"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {state === "expanded" && <div className="text-sm font-semibold">Wootz 25</div>}
        </SidebarMenuButton>
  )
}
