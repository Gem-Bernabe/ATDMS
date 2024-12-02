"use client";

import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Hotel,
  LogOut,
  Search,
  User,
  FileText,
  Home,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";
import { useAuthUserStore } from "@/services/user";

// Mock data for hotels and inspections
const hotels = [
  {
    id: 1,
    name: "Seaside Resort",
    lastInspection: "2023-05-15",
    status: "Scheduled",
    nextInspection: "2023-11-15",
  },
  // Other hotel data...
];

const inspectionForm = {
  hotelName: "Seaside Resort",
  inspectionDate: "2023-05-15",
  inspector: "John Doe",
  categories: [
    {
      name: "Cleanliness",
      score: 9,
      maxScore: 10,
      comments: "Very clean overall, minor issues in lobby",
    },
    // Other categories...
  ],
  overallComments:
    "Seaside Resort maintains a high standard of service and cleanliness. Some minor improvements needed in safety equipment and pool area maintenance.",
  status: "Pending",
};

export default function MunicipalityInspectorDashboard() {
  const [selectedHotel, setSelectedHotel] = React.useState(hotels[0]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentForm, setCurrentForm] = React.useState(inspectionForm);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Zustand store for authentication
  const { authUser, clearAuthUser } = useAuthUserStore();

  useEffect(() => {
    if (!authUser) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [authUser]);

  const handleLogout = () => {
    clearAuthUser(); // Clear user session
    toast.success("You have been successfully logged out.");
    router.push("/login"); // Redirect to login
  };

  if (!authUser) {
    return (
      <Modal isOpen={isModalOpen} onClose={handleLogout}>
        <div>
          <h2 className="text-lg font-semibold">Login Required</h2>
          <p className="mt-2">You must be logged in to access this page.</p>
        </div>
      </Modal>
    );
  }

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Scheduled":
        return "bg-blue-500";
      case "Pending Approval":
        return "bg-yellow-500";
      case "Overdue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center py-4">
            <img
              src="/municipality-logo.png"
              alt="Municipality Logo"
              className="h-12 w-auto"
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Hotel className="mr-2 h-4 w-4" />
                      <span>Hotels</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Inspection Forms</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          {/* Dashboard Content */}
          <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">
              Municipality Inspector Dashboard
            </h1>
            {/* Other sections like Hotel Inspections, Calendar, and Details */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </SidebarProvider>
  );
}
