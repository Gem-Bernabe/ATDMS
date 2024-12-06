import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";

function StatCard({ title, value, change }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          +{change}% from last month
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={change} aria-label={`${change}% increase`} />
      </CardFooter>
    </Card>
  );
}

function BarChart(props) {
  // Bar chart implementation (same as in the original code)
}

function LineChart(props) {
  // Line chart implementation (same as in the original code)
}

export default function DashboardContent() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Card className="col-span-full xl:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Overview</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Monitor the overall performance of your business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard title="Users" value="12,345" change={5} />
            <StatCard title="Clients" value="3,456" change={2} />
            <StatCard title="Inspectors" value="789" change={3} />
          </div>
        </CardContent>
      </Card>
      <Card className="xl:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>User Activity</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Monitor user activity and engagement over time.
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
            Track new client acquisition and retention rates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart className="w-full aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="xl:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Inspector Performance</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Monitor inspector productivity and efficiency metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart className="w-full aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="xl:col-span-3">
        <CardHeader className="pb-3">
          <CardTitle>Activity Log</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            View recent activity and events across the platform.
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
  );
}
