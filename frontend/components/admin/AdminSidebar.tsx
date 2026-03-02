'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, Building2, Settings, LogOut, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "All Properties", url: "/admin/properties/all", icon: Building2 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/50 transition-all duration-300 ease-in-out"
    >
      <SidebarContent>
        {/* Logo / Brand with hover animation */}
        <div className="px-6 py-8 border-b border-border/50">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-9 h-9 bg-linear-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="overflow-hidden">
              <h1 className="font-bold text-2xl tracking-tighter transition-all duration-300 group-hover:text-primary">
                Ground Link
              </h1>
              <p className="text-[10px] text-muted-foreground -mt-1 transition-all">ADMIN PANEL</p>
            </div>
          </div>
        </div>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs uppercase tracking-widest text-muted-foreground px-6 mb-3">
            MANAGEMENT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url || pathname.startsWith(item.url + '/');
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={cn(
                        "group relative h-11 transition-all duration-300 hover:bg-primary/10",
                        isActive && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      <Link href={item.url}>
                        <div className="flex items-center gap-3 relative z-10">
                          <item.icon 
                            className={cn(
                              "h-5 w-5 transition-all duration-300",
                              isActive && "scale-110"
                            )} 
                          />
                          <span className="transition-all duration-300">{item.title}</span>
                        </div>

                        {/* Active indicator - sliding bar */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full transition-all duration-300" />
                        )}

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout - with danger styling and animation */}
        <SidebarGroup className="mt-auto mb-6">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-red-600 hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-700 transition-all duration-300 group h-11"
                  asChild
                >
                  <button 
                    onClick={() => {
                      localStorage.removeItem('adminToken');
                      window.location.href = '/login';
                    }}
                  >
                    <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}