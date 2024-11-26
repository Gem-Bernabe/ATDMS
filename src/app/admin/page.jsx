"use client";

import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";
import { useAuthUserStore } from "@/services/user";
import { signOut } from "@/services/appwrite";

// Mock data for hotels
const hotels = [
  {
    id: 1,
    name: "Seaside Resort",
    lastInspection: "2023-05-15",
    status: "Scheduled",
    nextInspection: "2023-11-15",
  },
];

export default function MunicipalityInspectorDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(hotels[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { authUser, clearAuthUser } = useAuthUserStore();
  const router = useRouter();

  useEffect(() => {
    // Validate user on component mount
    if (authUser) {
      if (authUser.role === "admin") {
        setIsAuthorized(true);
        setIsLoading(false);
      } else {
        toast.error("Access denied! Admin role required.");
        setIsAuthorized(false);
        router.push("/login");
      }
    } else {
      toast.error("You must be logged in to access this page.");
      router.push("/login");
    }
  }, [authUser, router]);

  const handleLogout = async () => {
    try {
      await signOut(); // Log out the user
      clearAuthUser(); // Clear auth user from store
      toast.success("Successfully logged out.");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

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

  if (!isAuthorized) {
    return (
      <Modal isOpen onClose={handleLogout}>
        <div>
          <h2 className="text-lg font-semibold">Access Denied</h2>
          <p>You do not have permission to access this page.</p>
        </div>
      </Modal>
    );
  }

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
          <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">
              Municipality Inspector Dashboard
            </h1>

            {/* Hotel Inspection Table */}
            <Card>
              <CardHeader>
                <CardTitle>Hotels</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />
                <ScrollArea>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hotel Name</TableHead>
                        <TableHead>Last Inspection</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Next Inspection</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHotels.map((hotel) => (
                        <TableRow key={hotel.id}>
                          <TableCell>{hotel.name}</TableCell>
                          <TableCell>{hotel.lastInspection}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(hotel.status)}>
                              {hotel.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{hotel.nextInspection}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SidebarProvider>
  );
}
