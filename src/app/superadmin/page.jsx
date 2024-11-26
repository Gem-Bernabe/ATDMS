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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "@/services/appwrite";

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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(alertsData);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Get auth user from Zustand store
  const { authUser, clearAuthUser } = useAuthUserStore();

  useEffect(() => {
    // Validate user on component mount
    if (authUser) {
      if (authUser.role === "superadmin") {
        setIsAuthorized(true);
        setIsLoading(false);
      } else {
        toast.error("Access denied! Superadmin role required.");
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

function DashboardContent({ setActivePage, notifications }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Key metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Inspectors:</span>
              <span className="font-bold">33</span>
            </div>
            <div className="flex justify-between">
              <span>Registered Clients:</span>
              <span className="font-bold">245</span>
            </div>
            <div className="flex justify-between">
              <span>Compliance Rate:</span>
              <span className="font-bold">92%</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Alerts:</span>
              <span className="font-bold text-red-500">
                {notifications.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Client Registrations</CardTitle>
          <CardDescription>Monthly new client trend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clientRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="clients"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Inspectors by Municipality</CardTitle>
          <CardDescription>Distribution across regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inspectorsByMunicipality}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {inspectorsByMunicipality.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center">
            {inspectorsByMunicipality.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center mx-2">
                <div
                  className="w-3 h-3 mr-1"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Visitor Statistics</CardTitle>
          <CardDescription>Monthly visitor trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {notifications.map((activity) => (
              <div key={activity.id} className="mb-4">
                <p className="font-semibold">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.message}</p>
                <p className="text-xs text-gray-400">{activity.timestamp}</p>
                <Separator className="mt-2" />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function InspectorManagement() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredInspectors = inspectors.filter(
    (inspector) =>
      inspector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspector.municipality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Inspector Management
        </h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Inspector
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inspectors</CardTitle>
          <CardDescription>
            Manage and monitor inspector activities, assign tasks, and review
            performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search inspectors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead>Assigned Clients</TableHead>
                <TableHead>Last Inspection</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInspectors.map((inspector) => (
                <TableRow key={inspector.id}>
                  <TableCell>{inspector.name}</TableCell>
                  <TableCell>{inspector.municipality}</TableCell>
                  <TableCell>{inspector.assignedClients}</TableCell>
                  <TableCell>{inspector.lastInspection}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Assign clients</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit inspector</DropdownMenuItem>
                        <DropdownMenuItem>Delete inspector</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ClientOversight() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Compliant":
        return "bg-green-500";
      case "Non-compliant":
        return "bg-red-500";
      case "Pending Review":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Client Oversight</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>
            Track tourism clients, their compliance status, and recent
            activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Inspection</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.type}</TableCell>
                  <TableCell>{client.location}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.lastInspection}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Schedule inspection</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit client</DropdownMenuItem>
                        <DropdownMenuItem>Delete client</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ComplianceMonitoring() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Compliance Monitoring
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Statistics</CardTitle>
            <CardDescription>
              Overview of compliance rates by business category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="compliant" stackId="a" fill="#4ade80" />
                  <Bar dataKey="nonCompliant" stackId="a" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Compliance Issues</CardTitle>
            <CardDescription>
              Latest reported compliance problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>{issue.client}</TableCell>
                    <TableCell>{issue.issue}</TableCell>
                    <TableCell>{issue.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          issue.status === "Open"
                            ? "bg-red-500"
                            : issue.status === "In Progress"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }
                      >
                        {issue.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TourismStatistics() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Tourism Statistics</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visitor Statistics</CardTitle>
            <CardDescription>
              Monthly domestic and international visitor trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorDataExtended}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="domestic" stroke="#8884d8" />
                  <Line
                    type="monotone"
                    dataKey="international"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Attractions</CardTitle>
            <CardDescription>Top visited tourist spots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attractionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visitors" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tourism Revenue Distribution</CardTitle>
            <CardDescription>
              Breakdown of tourism income by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {revenueData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AlertsNotifications({ notifications, setNotifications }) {
  const getAlertIcon = (type) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Alerts & Notifications
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            View and manage system alerts, compliance notifications, and
            important updates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {notifications.map((alert) => (
              <Card key={alert.id} className="mb-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {getAlertIcon(alert.type)}
                      <CardTitle className="text-lg ml-2">
                        {alert.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription>{alert.timestamp}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{alert.message}</p>
                </CardContent>
                <CardFooter>
                  <Badge
                    className={
                      alert.type === "urgent"
                        ? "bg-red-500"
                        : alert.type === "warning"
                        ? "bg-yellow-500"
                        : alert.type === "info"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }
                  >
                    {alert.type}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityLog({ notifications }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Activity Log</h2>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Track all actions and events in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {activityLogData.map((activity) => (
              <div key={activity.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{activity.action}</p>
                  <Badge variant="outline">{activity.timestamp}</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Client: {activity.client}
                </p>
                <p className="text-sm text-gray-500">
                  Inspector: {activity.inspector}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
