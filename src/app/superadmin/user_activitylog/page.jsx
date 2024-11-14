"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  CheckCircle,
  X,
  Clock3,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UserActivityLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activities, setActivities] = useState([
    {
      id: 1,
      user: "John Doe",
      userType: "Inspector",
      response: "Completed Inspection",
      location: "Sunset Beach Resort",
      date: "June 15, 2024",
      status: "pending",
    },
    {
      id: 2,
      user: "Jane Smith",
      userType: "Inspector",
      response: "Started Inspection",
      location: "Mountain View Lodge",
      date: "June 14, 2024",
      status: "accepted",
    },
    {
      id: 3,
      user: "Bob Johnson",
      userType: "Inspector",
      response: "Submitted Report",
      location: "City Center Hotel",
      date: "June 13, 2024",
      status: "declined",
    },
    {
      id: 4,
      user: "Alice Brown",
      userType: "Client",
      response: "Updated Profile",
      location: "Lakeside Retreat",
      date: "June 12, 2024",
      status: "pending",
    },
    {
      id: 5,
      user: "Charlie Davis",
      userType: "Client",
      response: "Requested Inspection",
      location: "Mountain Chalet",
      date: "June 11, 2024",
      status: "accepted",
    },
    {
      id: 6,
      user: "Eva Wilson",
      userType: "Inspector",
      response: "Completed Training",
      location: "Tourism Department",
      date: "June 10, 2024",
      status: "accepted",
    },
    {
      id: 7,
      user: "Frank Miller",
      userType: "Client",
      response: "Submitted Complaint",
      location: "Seaside Inn",
      date: "June 9, 2024",
      status: "pending",
    },
  ]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [filterConfig, setFilterConfig] = useState({});

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      return (
        Object.entries(filterConfig).every(([key, value]) => {
          if (!value) return true;
          return String(activity[key])
            .toLowerCase()
            .includes(value.toLowerCase());
        }) &&
        (activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.response.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.userType.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [activities, filterConfig, searchTerm]);

  const sortedActivities = useMemo(() => {
    const sortableActivities = [...filteredActivities];
    sortableActivities.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableActivities;
  }, [filteredActivities, sortConfig]);

  const handleAction = (id, action) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, status: action } : activity
      )
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <Badge variant="success" className="bg-green-100 text-green-800">
            Accepted
          </Badge>
        );
      case "declined":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Declined
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="warning" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
    }
  };

  const getUserTypeBadge = (userType) => {
    switch (userType) {
      case "Inspector":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Inspector
          </Badge>
        );
      case "Client":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Client
          </Badge>
        );
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      );
    }
    return null;
  };

  const handleFilterChange = (key, value) => {
    setFilterConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Activity Log</CardTitle>
        <CardDescription>
          Monitor real-time activities of users across various locations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search activities"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[400px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  "user",
                  "userType",
                  "response",
                  "location",
                  "date",
                  "status",
                ].map((column) => (
                  <TableHead key={column}>
                    <div className="flex items-center justify-between">
                      <span
                        className="cursor-pointer"
                        onClick={() => requestSort(column)}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                        {getSortIcon(column)}
                      </span>
                      <Select
                        onValueChange={(value) =>
                          handleFilterChange(column, value)
                        }
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {Array.from(
                            new Set(activities.map((a) => String(a[column])))
                          ).map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-gray-500" />
                      {activity.user}
                    </div>
                  </TableCell>
                  <TableCell>{getUserTypeBadge(activity.userType)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{activity.response}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      {activity.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-2 h-4 w-4" />
                      {activity.date}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleAction(activity.id, "accepted")}
                        disabled={activity.status === "accepted"}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(activity.id, "declined")}
                        disabled={activity.status === "declined"}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction(activity.id, "pending")}
                        disabled={activity.status === "pending"}
                      >
                        <Clock3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default UserActivityLog;
