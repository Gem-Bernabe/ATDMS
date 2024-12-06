"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Building2,
  Search,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Card,
  CardContent,
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

export default function SanLuisPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("All");
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Fetch data
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        // Replace this URL with your API endpoint or database fetching logic
        const response = await fetch("/api/sanluis/accommodations");
        const data = await response.json();
        setAccommodations(data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  // Logout handler
  const handleLogout = () => {
    // Replace with your auth logout logic
    router.push("/login");
  };

  const filteredAccommodations = accommodations.filter(
    (accommodation) =>
      (selectedMunicipality === "All" ||
        accommodation.municipality === selectedMunicipality) &&
      (accommodation.establishmentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        accommodation.municipality
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-center border-b">
          <span className="text-xl font-semibold">San Luis Dashboard</span>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="flex flex-col space-y-1 px-3">
            <Button
              variant="ghost"
              className={`justify-start ${
                pathname === "/" ? "bg-gray-100" : ""
              }`}
              asChild
            >
              <Link href="/">
                <Building2 className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="ghost"
              className={`justify-start ${
                pathname === "/settings" ? "bg-gray-100" : ""
              }`}
              asChild
            >
              <Link href="/settings">
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="justify-start mt-auto"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white px-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search establishments..."
                className="w-[300px] pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <h1 className="mb-6 text-3xl font-bold">San Luis Overview</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Establishments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : accommodations.length}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Establishments</h2>
            <Card className="mt-4">
              {loading ? (
                <div className="flex h-32 items-center justify-center">
                  <p>Loading data...</p>
                </div>
              ) : filteredAccommodations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Establishment Name</TableHead>
                      <TableHead>Municipality</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccommodations.map((accommodation) => (
                      <TableRow key={accommodation.id}>
                        <TableCell className="font-medium">
                          {accommodation.establishmentName}
                        </TableCell>
                        <TableCell>{accommodation.municipality}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex h-32 items-center justify-center">
                  <p>No establishments found.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}