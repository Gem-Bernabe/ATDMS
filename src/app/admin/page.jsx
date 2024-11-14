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

// Mock data
const hotels = [
  {
    id: 1,
    name: "Seaside Resort",
    lastInspection: "2023-05-15",
    status: "Scheduled",
    nextInspection: "2023-11-15",
  },
  {
    id: 2,
    name: "Mountain View Hotel",
    lastInspection: "2023-06-20",
    status: "Pending",
    nextInspection: "2023-12-20",
  },
  {
    id: 3,
    name: "City Center Inn",
    lastInspection: "2023-04-10",
    status: "Overdue",
    nextInspection: "2023-10-10",
  },
  {
    id: 4,
    name: "Riverside Lodge",
    lastInspection: "2023-07-05",
    status: "Completed",
    nextInspection: "2024-01-05",
  },
  {
    id: 5,
    name: "Sunset Beach Hotel",
    lastInspection: "2023-08-01",
    status: "Scheduled",
    nextInspection: "2024-02-01",
  },
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
    {
      name: "Safety",
      score: 8,
      maxScore: 10,
      comments: "Fire extinguishers need updating",
    },
    {
      name: "Staff Service",
      score: 10,
      maxScore: 10,
      comments: "Excellent staff interaction and responsiveness",
    },
    {
      name: "Amenities",
      score: 7,
      maxScore: 10,
      comments: "Pool area needs maintenance",
    },
    {
      name: "Food Quality",
      score: 9,
      maxScore: 10,
      comments: "High-quality meals, diverse menu options",
    },
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

  // Get auth user from Zustand store
  const { authUser, clearAuthUser } = useAuthUserStore();

  // Check if user is authenticated on component mount and whenever authUser changes
  useEffect(() => {
    if (!authUser) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [authUser]);

  const handleModalClose = () => {
    setModalOpen(false);
    clearAuthUser(); // Optionally clear the auth user upon closing the modal
    router.push("/login"); // Redirect to login page
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

  const handleLogout = () => {
    // Implement logout logic here
    toast("You have been successfully logged out.");
  };

  const handleApprovalRequest = () => {
    setCurrentForm((prev) => ({ ...prev, status: "Pending Approval" }));
    toast("The inspection form has been sent to the superadmin for approval.");
  };

  const handleScheduleInspection = () => {
    toast(
      `New inspection scheduled for ${
        selectedHotel.name
      } on ${selectedDate.toDateString()}.`
    );
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
          <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">
              <a href="/">Municipality Inspector</a>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Hotel Inspections</CardTitle>
                  <CardDescription>
                    Overview of hotel inspections in the municipality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Input
                      className="w-64"
                      placeholder="Search hotels..."
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={() => setSearchTerm("")}>
                      <Search className="mr-2 h-4 w-4" /> Clear Search
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hotel Name</TableHead>
                        <TableHead>Last Inspection</TableHead>
                        <TableHead>Next Inspection</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHotels.map((hotel) => (
                        <TableRow key={hotel.id}>
                          <TableCell>{hotel.name}</TableCell>
                          <TableCell>{hotel.lastInspection}</TableCell>
                          <TableCell>{hotel.nextInspection}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(hotel.status)}>
                              {hotel.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedHotel(hotel)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Inspection Calendar</CardTitle>
                  <CardDescription>
                    Schedule and view upcoming inspections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleScheduleInspection}>
                    <CalendarIcon className="mr-2 h-4 w-4" /> Schedule
                    Inspection
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{selectedHotel.name} - Inspection Details</CardTitle>
                <CardDescription>
                  Last inspected on {selectedHotel.lastInspection}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="form">
                  <TabsList>
                    <TabsTrigger value="form">Inspection Form</TabsTrigger>
                    <TabsTrigger value="schedule">
                      Inspection Schedule
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="form">
                    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                      <h3 className="text-lg font-semibold mb-2"></h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Inspected by {currentForm.inspector} on{" "}
                        {currentForm.inspectionDate}
                      </p>
                      {currentForm.categories.map((category, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-medium">{category.name}</h4>
                          <div className="flex justify-between items-center">
                            <span>
                              Score: {category.score}/{category.maxScore}
                            </span>
                            <Badge>
                              {(
                                (category.score / category.maxScore) *
                                100
                              ).toFixed(0)}
                              %
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {category.comments}
                          </p>
                        </div>
                      ))}
                      <div className="mt-6">
                        <h4 className="font-medium">Overall Comments</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {currentForm.overallComments}
                        </p>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-medium">Status</h4>
                        <Badge className={getStatusColor(currentForm.status)}>
                          {currentForm.status}
                        </Badge>
                      </div>
                      {currentForm.status === "Pending" && (
                        <Button
                          className="mt-4"
                          onClick={handleApprovalRequest}
                        >
                          <Clock className="mr-2 h-4 w-4" /> Request Inspection
                          Approval
                        </Button>
                      )}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="schedule">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="inspectionDate">
                            Inspection Date
                          </Label>
                          <Input id="inspectionDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="inspector">Assigned Inspector</Label>
                          <Input id="inspector" placeholder="Inspector name" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add any notes or special instructions for this inspection"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={handleApprovalRequest}
                        >
                          <Clock className="mr-2 h-4 w-4" /> Request Approval
                        </Button>
                        <Button onClick={handleScheduleInspection}>
                          <CheckCircle className="mr-2 h-4 w-4" /> Confirm
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SidebarProvider>
  );
}
