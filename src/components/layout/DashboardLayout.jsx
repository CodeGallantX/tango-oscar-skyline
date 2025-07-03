
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import BookJetButton from "../BookJetButton";

const DashboardLayout = () => {
  return (
    <SidebarProvider collapsedWidth={72}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
        <BookJetButton />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
