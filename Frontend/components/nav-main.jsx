"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();
  const [openMenu, setOpenMenu] = useState(null);


  const handleSubItemClick = () => {
    if (isMobile) {
      setOpenMenu(null);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const isActive = pathname.includes(item.url);
          const isOpen = openMenu === index || isActive; // Keep active menu open

          return (
            <SidebarMenuItem key={item.title}>
              {item.items && item.items.length > 0 ? (
                <Collapsible
                  key={item.title}
                  open={isOpen}
                  onOpenChange={() => setOpenMenu(isOpen ? null : index)}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`hover:bg-gray-800 hover:text-white
                        group-data-[state=open]/collapsible:bg-gray-800 
                        group-data-[state=open]/collapsible:text-white ${isOpen ? "bg-gray-800 text-white hover:bg-gray-800 hover:text-white" : ""
                        }`}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight
                        className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-90" : ""
                          }`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname.includes(subItem.title);

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={{
                                  pathname: `/portal`,
                                  query: { event: subItem.title },
                                }}
                                onClick={() => {
                                  if (isMobile) {
                                    setTimeout(() => {
                                      setOpenMobile(false); // Close sidebar after a short delay
                                    }, 300); // Adjust delay time (200ms) as needed
                                  }
                                }}
                                className={`block w-full px-4 py-2 hover:bg-gray-800 ${isSubActive ? "bg-gray-800 text-white" : isMobile ? "text-black" : "text-white"
                                  }`}
                                aria-current={isSubActive ? "page" : undefined}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  className={`hover:bg-gray-800 hover:text-white ${isMobile ? "text-black" : "text-white"
                    }`}
                >
                  <a href={item.url} className={`flex items-center w-full`}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}