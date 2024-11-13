"use client";

import * as React from "react";
import {
  Activity,
  Bell,
  ChevronDown,
  Globe,
  Home,
  LineChart,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
} from "recharts";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Mock data for the chart
const visitorData = [
  { month: "Jan", visitors: 4000 },
  { month: "Feb", visitors: 3000 },
  { month: "Mar", visitors: 5000 },
  { month: "Apr", visitors: 4500 },
  { month: "May", visitors: 6000 },
  { month: "Jun", visitors: 7000 },
];

// Mock data for activity log
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

export default function Dashboard() {
  const [activePage, setActivePage] = React.useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardContent setActivePage={setActivePage} />;
      case "inspectors":
        return <InspectorManagement />;
      case "clients":
        return <ClientOversight />;
      case "compliance":
        return <ComplianceMonitoring />;
      case "statistics":
        return <TourismStatistics />;
      case "alerts":
        return <AlertsNotifications />;
      case "activityLog":
        return <ActivityLog />;
      default:
        return <DashboardContent setActivePage={setActivePage} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar>
          <SidebarHeader>
            <h1 className="text-2xl font-bold text-blue-600 p-4">
              SuperAdmin Dashboard
            </h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActivePage("dashboard")}
                      isActive={activePage === "dashboard"}
                    >
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActivePage("inspectors")}
                      isActive={activePage === "inspectors"}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      <span>Inspector Management</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActivePage("clients")}
                      isActive={activePage === "clients"}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Client Oversight</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActivePage("compliance")}
                      isActive={activePage === "compliance"}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Compliance Monitoring</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActivePage("statistics")}
                      isActive={activePage === "statistics"}
                    >
                      <LineChart className="mr-2 h-4 w-4" />
                      <span>Tourism Statistics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActivePage("alerts")}
                      isActive={activePage === "alerts"}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Alerts & Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActivePage("activityLog")}
                      isActive={activePage === "activityLog"}
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      <span>Activity Log</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
              </h2>
              <div className="flex items-center">
                <SidebarTrigger className="mr-4" />
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {renderPage()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function DashboardContent({ setActivePage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Inspector Management</CardTitle>
          <CardDescription>
            Manage and monitor inspector activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setActivePage("inspectors")}>
            View Inspectors
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Client Oversight</CardTitle>
          <CardDescription>
            Track tourism clients and their activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setActivePage("clients")}>View Clients</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance Monitoring</CardTitle>
          <CardDescription>
            Ensure adherence to tourism regulations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setActivePage("compliance")}>
            View Compliance
          </Button>
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
              <AreaChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
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
            {activityLogData.map((activity) => (
              <div key={activity.id} className="mb-4">
                <p className="font-semibold">{activity.action}</p>
                <p className="text-sm text-gray-500">
                  Client: {activity.client} | Inspector: {activity.inspector}
                </p>
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
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inspector Management</h2>
      <p>
        Here you can manage and monitor inspector activities, assign tasks, and
        review performance.
      </p>
    </div>
  );
}

function ClientOversight() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Client Oversight</h2>
      <p>
        This section allows you to track tourism clients, their compliance
        status, and recent activities.
      </p>
    </div>
  );
}

function ComplianceMonitoring() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Compliance Monitoring</h2>
      <p>
        Monitor and ensure adherence to tourism regulations. View compliance
        reports and address issues.
      </p>
    </div>
  );
}

function TourismStatistics() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Tourism Statistics & Analytics
      </h2>
      <p>
        Analyze tourism trends, visitor statistics, and generate reports for
        informed decision-making.
      </p>
    </div>
  );
}

function AlertsNotifications() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Alerts & Notifications</h2>
      <p>
        View and manage system alerts, compliance notifications, and important
        updates.
      </p>
    </div>
  );
}

function ActivityLog() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Activity Log</h2>
      <p>
        Review all system activities, including actions by inspectors, clients,
        and automated processes.
      </p>
      <ScrollArea className="h-[400px] mt-4">
        {activityLogData.map((activity) => (
          <Card key={activity.id} className="mb-4">
            <CardHeader>
              <CardTitle>{activity.action}</CardTitle>
              <CardDescription>{activity.timestamp}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Client:</strong> {activity.client}
              </p>
              <p>
                <strong>Inspector:</strong> {activity.inspector}
              </p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
