"use client"

import { LogOut } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "@/store/authSlice"


export function NavUser({ onLogout }) {

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user)?.user;
  console.log("NavUser:", user);

  if(user === undefined) {
    return (
      <div className="dashboard-container">
      </div>
    );
  }

  return (
 
        <SidebarMenuButton
          size="lg"
          className="flex items-center gap-2 rounded-lg p-2 text-left hover:bg-gray-950 hover:text-white"
          onClick={onLogout}
        >
          <div className="flex-1 text-sm">
            <span className="block font-semibold">{user?.name}</span>
            <span className="block text-xs text-muted-foreground">{user?.email}</span>
          </div>
          <LogOut className="size-5" onClick={() => { dispatch(handleLogout());
            window.location.href = "/";
           }} />
        </SidebarMenuButton>

  )
}
