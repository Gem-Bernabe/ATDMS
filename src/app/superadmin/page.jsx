"use client"

import React, { useState } from "react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const tabContent = {
    dashboard: <DashboardContent />,
    users: <UsersContent />,
    clients: <ClientsContent />,
    inspectors: <InspectorsContent />,
    activity: <ActivityContent />,
    settings: <SettingsContent />
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <div className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <HomeIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <SidebarButton icon={LayoutDashboardIcon} label="Dashboard" tab="dashboard" activeTab={activeTab} onClick={handleTabClick} />
            <SidebarButton icon={UserIcon} label="Users" tab="users" activeTab={activeTab} onClick={handleTabClick} />
            <SidebarButton icon={FolderIcon} label="Clients" tab="clients" activeTab={activeTab} onClick={handleTabClick} />
            <SidebarButton icon={ClipboardIcon} label="Inspectors" tab="inspectors" activeTab={activeTab} onClick={handleTabClick} />
            <SidebarButton icon={ActivityIcon} label="Activity" tab="activity" activeTab={activeTab} onClick={handleTabClick} />
            <SidebarButton icon={SettingsIcon} label="Settings" tab="settings" activeTab={activeTab} onClick={handleTabClick} />
          </TooltipProvider>
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <HomeIcon className="h-6 w-6" />
              <h1 className="text-xl font-bold">Acme Inc</h1>
            </Link>
            <div className="text-muted-foreground">Superadmin Dashboard</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                  <img
                    src="/placeholder.svg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                    style={{ aspectRatio: "36/36", objectFit: "cover" }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          {tabContent[activeTab] || <DashboardContent />}
        </main>
      </div>
    </div>
  )
}

function SidebarButton({ icon: Icon, label, tab, activeTab, onClick }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
            activeTab === tab ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          }`}
          onClick={() => onClick(tab)}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{label}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

function DashboardContent() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Overview</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Monitor the overall performance of your business.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Users</CardDescription>
                  <CardTitle className="text-4xl">12,345</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+5% from last month</div>
                </CardContent>
                <CardFooter>
                  <Progress value={5} aria-label="5% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Clients</CardDescription>
                  <CardTitle className="text-4xl">3,456</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+2% from last month</div>
                </CardContent>
                <CardFooter>
                  <Progress value={2} aria-label="2% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Inspectors</CardDescription>
                  <CardTitle className="text-4xl">789</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+3% from last month</div>
                </CardContent>
                <CardFooter>
                  <Progress value={3} aria-label="3% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Activity</CardDescription>
                  <CardTitle className="text-4xl">1,234</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">+8% from last month</div>
                </CardContent>
                <CardFooter>
                  <Progress value={8} aria-label="8% increase" />
                </CardFooter>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>User Activity</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Monitor user activity and engagement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart className="w-full aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Client Acquisition</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Track new client acquisition and retention.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className="w-full aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Inspector Performance</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Monitor inspector productivity and efficiency.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart className="w-full aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Activity Log</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              View recent activity and events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2023-06-01 10:15 AM</TableCell>
                  <TableCell>User Created</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>New user account created</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-06-02 2:30 PM</TableCell>
                  <TableCell>Client Added</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>New client added to the system</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-06-03 9:00 AM</TableCell>
                  <TableCell>Inspector Assigned</TableCell>
                  <TableCell>Bob Johnson</TableCell>
                  <TableCell>Inspector assigned to a new project</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-06-04 4:45 PM</TableCell>
                  <TableCell>User Deleted</TableCell>
                  <TableCell>Alice Lee</TableCell>
                  <TableCell>User account deleted</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2023-06-05 11:20 AM</TableCell>
                  <TableCell>Client Updated</TableCell>
                  <TableCell>Tom Wilson</TableCell>
                  <TableCell>Client information updated</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UsersContent() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage and view user information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Alice Johnson</TableCell>
              <TableCell>alice@example.com</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bob Smith</TableCell>
              <TableCell>bob@example.com</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Charlie Brown</TableCell>
              <TableCell>charlie@example.com</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Inactive</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ClientsContent() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Clients</CardTitle>
        <CardDescription>Manage and view client information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Acme Corp</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>john@acme.com</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>XYZ Industries</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@xyz.com</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>123 Enterprises</TableCell>
              <TableCell>Bob Johnson</TableCell>
              <TableCell>bob@123.com</TableCell>
              <TableCell>Inactive</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function InspectorsContent() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Inspectors</CardTitle>
        <CardDescription>Manage and view inspector information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Emma Wilson</TableCell>
              <TableCell>Electrical</TableCell>
              <TableCell>emma@example.com</TableCell>
              <TableCell>Available</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Michael Brown</TableCell>
              <TableCell>Structural</TableCell>
              <TableCell>michael@example.com</TableCell>
              <TableCell>On Assignment</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sarah Lee</TableCell>
              <TableCell>Plumbing</TableCell>
              <TableCell>sarah@example.com</TableCell>
              <TableCell>Available</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function ActivityContent() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>View recent activity and events.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-06-01 10:15 AM</TableCell>
              <TableCell>User Created</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>New user account created</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-06-02 2:30 PM</TableCell>
              <TableCell>Client Added</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>New client added to the system</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-06-03 9:00 AM</TableCell>
              <TableCell>Inspector Assigned</TableCell>
              <TableCell>Bob Johnson</TableCell>
              <TableCell>Inspector assigned to a new project</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-06-04 4:45 PM</TableCell>
              <TableCell>User Deleted</TableCell>
              <TableCell>Alice Lee</TableCell>
              <TableCell>User account deleted</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-06-05 11:20 AM</TableCell>
              <TableCell>Client Updated</TableCell>
              <TableCell>Tom Wilson</TableCell>
              <TableCell>Client information updated</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function SettingsContent() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage application settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage your email notifications</p>
            </div>
            <Button>Configure</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Security</h3>
              <p className="text-sm text-muted-foreground">Update your security preferences</p>
            </div>
            <Button>Update</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Appearance</h3>
              <p className="text-sm text-muted-foreground">Customize the look and feel</p>
            </div>
            <Button>Customize</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function LayoutDashboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  )
}

function ClipboardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

