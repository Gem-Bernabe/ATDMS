"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Printer } from "lucide-react";

export default function InspectionPreview() {
  // Remove this line
  // const [activeTab, setActiveTab] = useState("establishment");

  const formData = {
    date: "2024-11-24",
    municipality: "San Luis",
    barangay: "Dibut",
    establishmentName: "Seaside Resort",
    address: "Dibut, San Luis",
    contact: "123-456-7890",
    accreditation: "ACC-12345",
    expiration: "2025-12-31",
    license: "LGU-67890",
    contactPerson: "John Doe",
    designation: "Manager",
    socialMedia: "@seaside_resort",
    email: "info@seasideresort.com",
    facebook: "facebook.com/seasideresort",
    instagram: "@seaside_resort",
    twitter: "@seaside_resort",
    website: "www.seasideresort.com",
    bookingCompany: "Booking.com",
    acRooms: {
      single: 10,
      double: 15,
      couple: 8,
      family: 5,
      barkada: 3,
    },
    fanRooms: {
      single: 5,
      double: 8,
      couple: 4,
      family: 3,
      barkada: 2,
    },
    acCottages: [2, 3, 1],
    nonAcCottages: [3, 2, 1],
    tents: [5, 3, 2],
    facilities: {
      diningOutlets: ["Restaurants", "Bar/Cocktail Lounge"],
      conference: ["Convention Hall", "Meeting Room"],
      marineRecreation: ["Kayaking", "Snorkeling", "Paddle Boarding"],
      sportsRecreation: ["Basketball Court", "Beach Volleyball"],
    },
    swimmingPools: {
      adult: { number: 1, depth: "1.5m", size: "10m x 20m" },
      children: { number: 1, depth: "0.5m", size: "5m x 10m" },
    },
    otherActivities: [
      "Generator set",
      "Wifi",
      "CCTV",
      "Pet-Friendly",
      "Spa Facilities",
    ],
    availablePromos: ["Summer Promo", "Holiday Promo", "Senior/PWD Discount"],
    employees: {
      localMale: 15,
      localFemale: 20,
      foreignMale: 2,
      foreignFemale: 1,
    },
    jobSurvey: {
      staffCount: 38,
      employmentTypes: {
        male: [10, 5, 2, 3, 1, 1],
        female: [12, 8, 3, 4, 2, 1],
      },
      positions: [
        { title: "SUPERVISOR", male: 2, female: 1 },
        { title: "MANAGER", male: 1, female: 1 },
        { title: "HOUSEKEEPER", male: 3, female: 5 },
        { title: "FRONT DESK OFFICER", male: 2, female: 3 },
        { title: "CHEF/COOK", male: 3, female: 2 },
        { title: "WAITER/WAITRESS", male: 4, female: 6 },
      ],
    },
  };

  const renderSection = (title, data) => (
    <Card className="mt-6 border-none shadow-none print:break-inside-avoid print:mt-4">
      <CardHeader className="print:p-2">
        <CardTitle className="text-lg font-bold print:text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="print:p-2">
        <Table>
          <TableBody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow key={key} className="print:text-sm">
                <TableCell className="font-medium">{key}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderRoomTable = (title, rooms) => (
    <Card className="mt-6 border-none shadow-none print:break-inside-avoid print:mt-4">
      <CardHeader className="print:p-2">
        <CardTitle className="text-lg font-bold print:text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="print:p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="print:text-sm">Type</TableHead>
              <TableHead className="print:text-sm">Number of Rooms</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(rooms).map(([type, number]) => (
              <TableRow key={type} className="print:text-sm">
                <TableCell className="font-medium">{type}</TableCell>
                <TableCell>{number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderFacilities = (title, facilities) => (
    <Card className="mt-6 border-none shadow-none print:break-inside-avoid print:mt-4">
      <CardHeader className="print:p-2">
        <CardTitle className="text-lg font-bold print:text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="print:p-2">
        {Object.entries(facilities).map(([category, items]) => (
          <div key={category} className="mb-4 print:mb-2">
            <h3 className="font-semibold mb-2 print:text-sm print:mb-1">
              {category}
            </h3>
            <ul className="list-disc list-inside print:list-inside print:text-sm">
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderEmployees = (title, employees) => (
    <Card className="mt-6 border-none shadow-none print:break-inside-avoid print:mt-4">
      <CardHeader className="print:p-2">
        <CardTitle className="text-lg font-bold print:text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="print:p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="print:text-sm">Category</TableHead>
              <TableHead className="print:text-sm">Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(employees).map(([category, number]) => (
              <TableRow key={category} className="print:text-sm">
                <TableCell className="font-medium">{category}</TableCell>
                <TableCell>{number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderJobSurvey = (title, survey) => (
    <Card className="mt-6 border-none shadow-none print:break-inside-avoid print:mt-4">
      <CardHeader className="print:p-2">
        <CardTitle className="text-lg font-bold print:text-base">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="print:p-2">
        <p className="mb-4 print:mb-2 print:text-sm">
          Total Staff Count: {survey.staffCount}
        </p>
        <h3 className="font-semibold mb-2 print:text-sm print:mb-1">
          Employment Types
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="print:text-sm">Type</TableHead>
              <TableHead className="print:text-sm">Male</TableHead>
              <TableHead className="print:text-sm">Female</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              "FULL-TIME",
              "REGULAR",
              "PART-TIME",
              "CONTRACTUAL",
              "PROBATIONARY",
              "ON CALL",
            ].map((type, index) => (
              <TableRow key={type} className="print:text-sm">
                <TableCell className="font-medium">{type}</TableCell>
                <TableCell>{survey.employmentTypes.male[index]}</TableCell>
                <TableCell>{survey.employmentTypes.female[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h3 className="font-semibold mb-2 mt-4 print:text-sm print:mb-1 print:mt-2">
          Positions
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="print:text-sm">Position</TableHead>
              <TableHead className="print:text-sm">Male</TableHead>
              <TableHead className="print:text-sm">Female</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {survey.positions.map((position, index) => (
              <TableRow key={index} className="print:text-sm">
                <TableCell className="font-medium">{position.title}</TableCell>
                <TableCell>{position.male}</TableCell>
                <TableCell>{position.female}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-4 sm:p-8 print:p-0 print:bg-white print:min-h-0">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-4 print:hidden"
        >
          <Link href="/edit">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Edit
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button>
              Submit <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 print:mb-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-md p-4 print:shadow-none print:p-0">
            <Image
              src="https://www.vantagehunt.com/assets/images/vh/aurora-province-logo.jpg"
              alt="Aurora Province Logo"
              width={80}
              height={80}
              priority
              style={{ objectFit: "cover" }}
              className="print:w-16 print:h-16"
            />
            <div className="text-center flex-grow px-4 my-4 sm:my-0">
              <h1 className="text-sm font-semibold text-gray-700 print:text-xs">
                Republic of the Philippines
              </h1>
              <h2 className="text-xl sm:text-2xl font-bold text-blue-800 my-2 print:text-lg print:my-1">
                PROVINCIAL GOVERNMENT OF AURORA
              </h2>
              <h3 className="text-base sm:text-lg text-gray-600 print:text-sm">
                {formData.municipality}
              </h3>
              <h4 className="text-base sm:text-lg font-semibold text-blue-700 print:text-sm">
                Provincial Tourism Office
              </h4>
            </div>
            <Image
              src="https://www.aurora.ph/images/aurora.png"
              alt="Aurora Province Right Logo"
              width={80}
              height={80}
              className="print:w-16 print:h-16"
            />
          </div>
        </motion.header>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="print:mt-4"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-800 mb-4 print:text-lg print:mb-2">
            Accommodation Inspection Form
          </h1>
          <p className="text-center text-gray-600 mb-8 print:hidden">
            As of {formData.date} 2024
          </p>

          <Tabs defaultValue="establishment" className="w-full print:hidden">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="establishment">Establishment</TabsTrigger>
              <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <TabsContent value="establishment">
                {renderSection("Establishment Details", {
                  "Name of Establishment": formData.establishmentName,
                  "Business Address": formData.address,
                  "Contact Number": formData.contact,
                  "Accreditation Number": formData.accreditation,
                  "Expiration Date": formData.expiration,
                  "LGU License Number": formData.license,
                  "Contact Person": formData.contactPerson,
                  Designation: formData.designation,
                  "Social Media Account": formData.socialMedia,
                  "Email/Gmail": formData.email,
                  Facebook: formData.facebook,
                  Instagram: formData.instagram,
                  Twitter: formData.twitter,
                  "Other Website": formData.website,
                  "Booking Company": formData.bookingCompany,
                })}
              </TabsContent>
              <TabsContent value="accommodations">
                {renderRoomTable("Air Conditioned Rooms", formData.acRooms)}
                {renderRoomTable("Fan Rooms", formData.fanRooms)}
                {renderSection("Cottages and Tents", {
                  "AC Cottages": formData.acCottages.join(", "),
                  "Non-AC Cottages": formData.nonAcCottages.join(", "),
                  Tents: formData.tents.join(", "),
                })}
              </TabsContent>
              <TabsContent value="facilities">
                {renderFacilities(
                  "Facilities and Amenities",
                  formData.facilities
                )}
                {renderSection("Swimming Pools", {
                  "Adult Pool": `Number: ${formData.swimmingPools.adult.number}, Depth: ${formData.swimmingPools.adult.depth}, Size: ${formData.swimmingPools.adult.size}`,
                  "Children's Pool": `Number: ${formData.swimmingPools.children.number}, Depth: ${formData.swimmingPools.children.depth}, Size: ${formData.swimmingPools.children.size}`,
                })}
                {renderSection("Other Activities and Services", {
                  Activities: formData.otherActivities.join(", "),
                })}
                {renderSection("Available Promos", {
                  Promos: formData.availablePromos.join(", "),
                })}
              </TabsContent>
              <TabsContent value="employees">
                {renderEmployees("Number of Employees", formData.employees)}
                {renderJobSurvey("Job Survey", formData.jobSurvey)}
              </TabsContent>
            </ScrollArea>
          </Tabs>
          <div className="hidden print:block print:mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {renderSection("Establishment Details", {
                  "Name of Establishment": formData.establishmentName,
                  "Business Address": formData.address,
                  "Contact Number": formData.contact,
                  "Accreditation Number": formData.accreditation,
                  "Expiration Date": formData.expiration,
                  "LGU License Number": formData.license,
                })}
              </div>
              <div>
                {renderSection("Contact Information", {
                  "Contact Person": formData.contactPerson,
                  Designation: formData.designation,
                  "Email/Gmail": formData.email,
                  "Social Media": formData.socialMedia,
                  Facebook: formData.facebook,
                  Instagram: formData.instagram,
                  Twitter: formData.twitter,
                  Website: formData.website,
                  "Booking Company": formData.bookingCompany,
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                {renderRoomTable("Air Conditioned Rooms", formData.acRooms)}
              </div>
              <div>{renderRoomTable("Fan Rooms", formData.fanRooms)}</div>
            </div>
            {renderSection("Cottages and Tents", {
              "AC Cottages": formData.acCottages.join(", "),
              "Non-AC Cottages": formData.nonAcCottages.join(", "),
              Tents: formData.tents.join(", "),
            })}
            {renderFacilities("Facilities and Amenities", formData.facilities)}
            {renderSection("Swimming Pools", {
              "Adult Pool": `Number: ${formData.swimmingPools.adult.number}, Depth: ${formData.swimmingPools.adult.depth}, Size: ${formData.swimmingPools.adult.size}`,
              "Children's Pool": `Number: ${formData.swimmingPools.children.number}, Depth: ${formData.swimmingPools.children.depth}, Size: ${formData.swimmingPools.children.size}`,
            })}
            {renderSection("Other Activities and Services", {
              Activities: formData.otherActivities.join(", "),
            })}
            {renderSection("Available Promos", {
              Promos: formData.availablePromos.join(", "),
            })}
            {renderEmployees("Number of Employees", formData.employees)}
            {renderJobSurvey("Job Survey", formData.jobSurvey)}
          </div>
        </motion.main>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            &copy; {new Date().getFullYear()} Provincial Government of Aurora.
            All rights reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
