"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Activity,
  AlertCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Globe,
  Home,
  Shield,
  Users,
  Plus,
  Info,
  CheckCircle2,
  MoreHorizontal,
  AlertTriangle,
  Bell,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Modal from "@/components/modal";
import { useAuthUserStore } from "@/services/user";

// Mock data (unchanged)
const visitorData = [
  { month: "Jan", visitors: 4000 },
  { month: "Feb", visitors: 3000 },
  { month: "Mar", visitors: 5000 },
  { month: "Apr", visitors: 4500 },
  { month: "May", visitors: 6000 },
  { month: "Jun", visitors: 7000 },
];

const clientRegistrationData = [
  { month: "Jan", clients: 20 },
  { month: "Feb", clients: 25 },
  { month: "Mar", clients: 30 },
  { month: "Apr", clients: 35 },
  { month: "May", clients: 40 },
  { month: "Jun", clients: 45 },
];

const inspectorsByMunicipality = [
  { name: "Baler", value: 15 },
  { name: "Maria Aurora", value: 10 },
  { name: "San Luis", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const activityLogData = [
  {
    id: 1,
    action: "Inspection completed",
    client: "Hotel A",
    inspector: "John Doe",
    timestamp: "2023-06-15 10:30 AM",
  },
  {
    id: 2,
    action: "Compliance check",
    client: "Restaurant B",
    inspector: "Jane Smith",
    timestamp: "2023-06-15 11:45 AM",
  },
  {
    id: 3,
    action: "New client registered",
    client: "Tour Agency C",
    inspector: "System",
    timestamp: "2023-06-15 02:15 PM",
  },
  {
    id: 4,
    action: "Alert: Non-compliance detected",
    client: "Bar D",
    inspector: "Mike Johnson",
    timestamp: "2023-06-15 04:00 PM",
  },
];

const inspectors = [
  {
    id: 1,
    name: "John Doe",
    municipality: "Baler",
    assignedClients: 15,
    lastInspection: "2023-06-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    municipality: "Maria Aurora",
    assignedClients: 12,
    lastInspection: "2023-06-12",
  },
  {
    id: 3,
    name: "Mike Johnson",
    municipality: "San Luis",
    assignedClients: 10,
    lastInspection: "2023-06-11",
  },
  {
    id: 4,
    name: "Emily Brown",
    municipality: "Baler",
    assignedClients: 14,
    lastInspection: "2023-06-13",
  },
  {
    id: 5,
    name: "Chris Lee",
    municipality: "Maria Aurora",
    assignedClients: 11,
    lastInspection: "2023-06-09",
  },
];

const clients = [
  {
    id: 1,
    name: "Seaside Resort",
    type: "Hotel",
    location: "Baler",
    status: "Compliant",
    lastInspection: "2023-06-10",
  },
  {
    id: 2,
    name: "Mountain View Restaurant",
    type: "Restaurant",
    location: "Maria Aurora",
    status: "Non-compliant",
    lastInspection: "2023-06-12",
  },
  {
    id: 3,
    name: "Adventure Tours",
    type: "Tour Agency",
    location: "San Luis",
    status: "Pending Review",
    lastInspection: "2023-06-11",
  },
  {
    id: 4,
    name: "Sunset Bar",
    type: "Bar",
    location: "Baler",
    status: "Compliant",
    lastInspection: "2023-06-13",
  },
  {
    id: 5,
    name: "Green Valley Inn",
    type: "Hotel",
    location: "Maria Aurora",
    status: "Compliant",
    lastInspection: "2023-06-09",
  },
];

const complianceData = [
  { category: "Hotels", compliant: 80, nonCompliant: 20 },
  { category: "Restaurants", compliant: 65, nonCompliant: 35 },
  { category: "Tour Agencies", compliant: 90, nonCompliant: 10 },
  { category: "Bars", compliant: 70, nonCompliant: 30 },
];

const recentIssues = [
  {
    id: 1,
    client: "Mountain View Restaurant",
    issue: "Expired health certificates",
    date: "2023-06-12",
    status: "Open",
  },
  {
    id: 2,
    client: "Adventure Tours",
    issue: "Incomplete safety equipment",
    date: "2023-06-11",
    status: "In Progress",
  },
  {
    id: 3,
    client: "Sunset Bar",
    issue: "Noise complaint",
    date: "2023-06-13",
    status: "Resolved",
  },
  {
    id: 4,
    client: "Green Valley Inn",
    issue: "Fire safety violation",
    date: "2023-06-09",
    status: "Open",
  },
];

const visitorDataExtended = [
  { month: "Jan", domestic: 5000, international: 2000 },
  { month: "Feb", domestic: 6000, international: 2500 },
  { month: "Mar", domestic: 7500, international: 3000 },
  { month: "Apr", domestic: 8000, international: 3500 },
  { month: "May", domestic: 9000, international: 4000 },
  { month: "Jun", domestic: 10000, international: 4500 },
];

const attractionsData = [
  { name: "Sabang Beach", visitors: 15000 },
  { name: "Ditumabo Falls", visitors: 10000 },
  { name: "Diguisit Falls", visitors: 8000 },
  { name: "Ermita Hill", visitors: 6000 },
  { name: "Baler Museum", visitors: 5000 },
];

const revenueData = [
  { category: "Accommodations", value: 5000000 },
  { category: "Food & Beverage", value: 3000000 },
  { category: "Transportation", value: 2000000 },
  { category: "Activities & Tours", value: 1500000 },
  { category: "Retail", value: 1000000 },
];

const alertsData = [
  {
    id: 1,
    type: "urgent",
    title: "Non-compliance Alert",
    message:
      "Mountain View Restaurant has failed to address expired health certificates.",
    timestamp: "2023-06-15 10:30 AM",
  },
  {
    id: 2,
    type: "warning",
    title: "Inspection Reminder",
    message: "Scheduled inspection for Seaside Resort is due tomorrow.",
    timestamp: "2023-06-15 11:45 AM",
  },
  {
    id: 3,
    type: "info",
    title: "New Client Registration",
    message: "Adventure Tours has completed their registration process.",
    timestamp: "2023-06-15 02:15 PM",
  },
  {
    id: 4,
    type: "success",
    title: "Compliance Achieved",
    message: "Sunset Bar has successfully addressed all compliance issues.",
    timestamp: "2023-06-15 04:00 PM",
  },
  {
    id: 5,
    type: "urgent",
    title: "Safety Violation",
    message:
      "Immediate action required: Fire safety violation at Green Valley Inn.",
    timestamp: "2023-06-16 09:30 AM",
  },
];

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(alertsData);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Get auth user from Zustand store
  const { authUser, clearAuthUser } = useAuthUserStore();

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardContent
            setActivePage={setActivePage}
            notifications={notifications}
          />
        );
      case "inspectors":
        return <InspectorManagement />;
      case "clients":
        return <ClientOversight />;
      case "compliance":
        return <ComplianceMonitoring />;
      case "statistics":
        return <TourismStatistics />;
      case "alerts":
        return (
          <AlertsNotifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      case "activityLog":
        return <ActivityLog notifications={notifications} />;
      default:
        return (
          <DashboardContent
            setActivePage={setActivePage}
            notifications={notifications}
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
                  {[
                    { icon: Home, label: "Dashboard", page: "dashboard" },
                    {
                      icon: Users,
                      label: "Inspector Management",
                      page: "inspectors",
                    },
                    { icon: Globe, label: "Client Oversight", page: "clients" },
                    {
                      icon: Shield,
                      label: "Compliance Monitoring",
                      page: "compliance",
                    },
                    {
                      icon: BarChart3,
                      label: "Tourism Statistics",
                      page: "statistics",
                    },
                    {
                      icon: AlertCircle,
                      label: "Alerts & Notifications",
                      page: "alerts",
                      hasDot: notifications.length > 0,
                    },
                    {
                      icon: Activity,
                      label: "Activity Log",
                      page: "activityLog",
                    },
                  ].map(({ icon: Icon, label, page, hasDot }) => (
                    <SidebarMenuItem key={page}>
                      <Button
                        variant={activePage === page ? "secondary" : "ghost"}
                        className={`w-full justify-start ${
                          isCollapsed ? "px-2" : "px-4"
                        }`}
                        onClick={() => setActivePage(page)}
                      >
                        <div className="relative">
                          <Icon
                            className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`}
                          />
                          {hasDot && (
                            <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                        {!isCollapsed && <span>{label}</span>}
                      </Button>
                    </SidebarMenuItem>
                  ))}
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
                  onClick={() => setActivePage("alerts")}
                  className="relative"
                >
                  <AlertCircle className="h-4 w-4" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                  )}
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            {renderPage()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
