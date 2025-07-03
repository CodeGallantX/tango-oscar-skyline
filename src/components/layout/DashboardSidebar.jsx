
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Calendar, 
  History, 
  CreditCard, 
  User, 
  Shield, 
  Headphones, 
  Settings,
  Plane,
  Car
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Bookings", url: "/dashboard/bookings", icon: Calendar },
  { title: "Booking History", url: "/dashboard/booking-history", icon: History },
  { title: "Private Jet Charter", url: "/dashboard/charter", icon: Plane },
  { title: "Luxury Chauffeur", url: "/dashboard/chauffeur", icon: Car },
  { title: "Payments", url: "/dashboard/payments", icon: CreditCard },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Security Settings", url: "/dashboard/security", icon: Shield },
  { title: "Concierge", url: "/dashboard/concierge", icon: Headphones },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const DashboardSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? "w-18" : "w-64"} collapsible>
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
              
            {!collapsed && (
              <div className="w-24 md:w-36">
                <img src="https://tango-oscar.vercel.app/logo.png" alt="logo" className="w-full h-full object-cover"/>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-bronze/80 text-xs font-semibold tracking-wider">
            NAVIGATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-bronze/20 text-bronze border-l-2 border-bronze"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-bronze"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Mobile trigger */}
      <div className="md:hidden">
        <SidebarTrigger className="absolute top-4 left-4 z-50" />
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
