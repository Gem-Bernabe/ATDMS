"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Globe,
  Home,
  Shield,
  Users,
  LogOut,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/modal";
import { useAuthUserStore } from "@/services/user";

// Mock data remains unchanged
// ...

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Zustand store for authentication
  const { authUser, clearAuthUser } = useAuthUserStore();

  // Check authentication on component mount
  useEffect(() => {
    if (!authUser) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [authUser]);

  const handleLogout = () => {
    clearAuthUser(); // Clear the user session
    toast.success("You have been successfully logged out.");
    router.push("/login"); // Redirect to the login page
  };

  const handleModalClose = () => {
    setModalOpen(false);
    handleLogout();
  };

  if (!authUser) {
    return (
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div>
          <h2 className="text-lg font-semibold">Login Required</h2>
          <p className="mt-2">You must be logged in to access this page.</p>
        </div>
      </Modal>
    );
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardContent
            setActivePage={setActivePage}
            notifications={[] /* Add your notifications data */}
          />
        );
      // Add cases for other pages...
      default:
        return (
          <DashboardContent
            setActivePage={setActivePage}
            notifications={[] /* Add your notifications data */}
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
        <Sidebar
          className={`transition-all duration-300 ${
            isCollapsed ? "w-16" : "w-64"
          }`}
        >
          <SidebarHeader className="relative p-4">
            <h1
              className={`text-2xl font-bold text-blue-600 transition-opacity duration-300 ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Tourism Admin
            </h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
                Main Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[{ icon: Home, label: "Dashboard", page: "dashboard" }]
                    // Add more menu items here
                    .map(({ icon: Icon, label, page }) => (
                      <SidebarMenuItem key={page}>
                        <Button
                          variant={activePage === page ? "secondary" : "ghost"}
                          className={`w-full justify-start ${
                            isCollapsed ? "px-2" : "px-4"
                          }`}
                          onClick={() => setActivePage(page)}
                        >
                          <Icon
                            className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`}
                          />
                          {!isCollapsed && <span>{label}</span>}
                        </Button>
                      </SidebarMenuItem>
                    ))}
                  <SidebarMenuItem>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        isCollapsed ? "px-2" : "px-4"
                      }`}
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {!isCollapsed && <span>Logout</span>}
                    </Button>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
              </h2>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            {renderPage()}
          </main>
        </div>
      </div>
      <ToastContainer />
    </SidebarProvider>
  );
}

// Sub-components remain unchanged...
