"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

export default function AccommodationInspectionForm() {
  const [date, setDate] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      <header className="bg-white shadow-md relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Image
              src="/aurora.png"
              alt="Left Logo"
              width={80}
              height={80}
              className="rounded-full border-4 border-blue-500"
            />
            <div className="text-center flex-grow px-4">
              <h1 className="text-sm font-semibold text-gray-700">
                Republic of the Philippines
              </h1>
              <h2 className="text-2xl font-bold text-blue-800 my-2">
                PROVINCIAL GOVERNMENT OF AURORA
              </h2>
              <h3 className="text-lg text-gray-600">Baler</h3>
              <h4 className="text-lg font-semibold text-blue-700">
                Provincial Tourism Office
              </h4>
            </div>
            <Image
              src="/placeholder.svg"
              alt="Right Logo"
              width={80}
              height={80}
              className="rounded-full border-4 border-green-500"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-800">
              Accommodation Inspection Form
            </CardTitle>
            <p className="text-center text-gray-600">
              As of{" "}
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="inline-block w-40"
              />{" "}
              2024
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="municipality">Municipality</Label>
                  <Input id="municipality" />
                </div>
                <div>
                  <Label htmlFor="establishment">Name of Establishment</Label>
                  <Input id="establishment" />
                </div>
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" type="tel" />
                </div>
                <div>
                  <Label htmlFor="accreditation">Accreditation Number</Label>
                  <Input id="accreditation" />
                </div>
                <div>
                  <Label htmlFor="expiration">Expiration Date</Label>
                  <Input id="expiration" type="date" />
                </div>
                <div>
                  <Label htmlFor="license">LGU License Number</Label>
                  <Input id="license" />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input id="contactPerson" />
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" />
                </div>
                <div>
                  <Label htmlFor="socialMedia">Social Media Account</Label>
                  <Input id="socialMedia" />
                </div>
                <div>
                  <Label htmlFor="email">Email/Gmail</Label>
                  <Input id="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" />
                </div>
                <div>
                  <Label htmlFor="website">Other Website</Label>
                  <Input id="website" />
                </div>
                <div>
                  <Label htmlFor="bookingCompany">
                    Booking Company, Please Specify (Option)
                  </Label>
                  <Input id="bookingCompany" />
                </div>
              </div>

              {/* Air Conditioned Room Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Air Conditioned Room Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Types of rooms</TableHead>
                        <TableHead>Number of rooms</TableHead>
                        <TableHead>Type of Bed</TableHead>
                        <TableHead>Bed Maximum capacity</TableHead>
                        <TableHead>Room rate</TableHead>
                        <TableHead>Room Amenities</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {["Single", "Double", "Couple", "Family", "Barkada"].map(
                        (type) => (
                          <TableRow key={type}>
                            <TableCell>{type}</TableCell>
                            <TableCell>
                              <Input type="number" />
                            </TableCell>
                            <TableCell>
                              <Input />
                            </TableCell>
                            <TableCell>
                              <Input type="number" />
                            </TableCell>
                            <TableCell>
                              <Input type="number" />
                            </TableCell>
                            <TableCell>
                              <Input />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Label htmlFor="totalAcRooms">Total No. of Rooms</Label>
                    <Input id="totalAcRooms" type="number" />
                  </div>
                </CardContent>
              </Card>

              {/* Fan Room Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Fan Room Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Types of rooms</TableHead>
                        <TableHead>Number of rooms</TableHead>
                        <TableHead>Type of Bed</TableHead>
                        <TableHead>Bed Maximum capacity</TableHead>
                        <TableHead>Room rate</TableHead>
                        <TableHead>Room Amenities</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {["Single", "Double", "Couple", "Family", "Barkada"].map(
                        (type) => (
                          <TableRow key={type}>
                            <TableCell>{type}</TableCell>
                            <TableCell>
                              <Input type="number" />
                            </TableCell>
                            <TableCell>
                              <Input />
                            </TableCell>
                            <TableCell>
                              <Input type="number" />
                            </TableCell>
                            <TableCell>
                              <Input type="number" />
                            </TableCell>
                            <TableCell>
                              <Input />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Label htmlFor="totalFanRooms">Total No. of Rooms</Label>
                    <Input id="totalFanRooms" type="number" />
                  </div>
                </CardContent>
              </Card>

              {/* Air-Conditioned Cottages/Villas Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Air-Conditioned Cottages/Villas Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Number/Name of Cottages/Villas</TableHead>
                        <TableHead>
                          Cottage/Villas size / Bed size available
                        </TableHead>
                        <TableHead>Capacity (pax)</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Cottage/villas Amenities</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3].map((index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input />
                          </TableCell>
                          <TableCell>
                            <Input />
                          </TableCell>
                          <TableCell>
                            <Input type="number" />
                          </TableCell>
                          <TableCell>
                            <Input type="number" />
                          </TableCell>
                          <TableCell>
                            <Input />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 space-y-2">
                    <div>
                      <Label htmlFor="totalAcCottages">
                        Total Number of Cottage/Villas
                      </Label>
                      <Input id="totalAcCottages" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="acCottagesBathrooms">
                        Number of Comfort room & Bathroom available
                      </Label>
                      <Input id="acCottagesBathrooms" type="number" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Non-Aircon Cottages/Villas Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Non-Aircon Cottages/Villas Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Number/Name of Cottages/Villas</TableHead>
                        <TableHead>Cottage/villas size</TableHead>
                        <TableHead>Bed size available</TableHead>
                        <TableHead>Capacity (pax)</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Cottage/Villas Amenities</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3].map((index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input />
                          </TableCell>
                          <TableCell>
                            <Input />
                          </TableCell>
                          <TableCell>
                            <Input />
                          </TableCell>
                          <TableCell>
                            <Input type="number" />
                          </TableCell>
                          <TableCell>
                            <Input type="number" />
                          </TableCell>
                          <TableCell>
                            <Input />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 space-y-2">
                    <div>
                      <Label htmlFor="totalNonAcCottages">
                        Total Number of Cottages
                      </Label>
                      <Input id="totalNonAcCottages" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="nonAcCottagesBathrooms">
                        Number of Comfort room & Bathroom available
                      </Label>
                      <Input id="nonAcCottagesBathrooms" type="number" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tents Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Tents Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Number/Name of Tents</TableHead>
                        <TableHead>Cottage/Villas size</TableHead>
                        <TableHead>Bed size available</TableHead>
                        <TableHead>Capacity (pax)</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Amenities</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3].map((index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input />
                          </TableCell>
                          <TableCell>
                            <Input />
                          </TableCell>
                          <TableCell>
                            <Input />
                          </TableCell>
                          <TableCell>
                            <Input type="number" />
                          </TableCell>
                          <TableCell>
                            <Input type="number" />
                          </TableCell>
                          <TableCell>
                            <Input />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 space-y-2">
                    <div>
                      <Label htmlFor="totalTents">Total Number of Tents</Label>
                      <Input id="totalTents" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="tentsBathrooms">
                        Number of Comfort room & bathroom available on the site
                      </Label>
                      <Input id="tentsBathrooms" type="number" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Facilities/Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Facilities/Amenities (Check all that are available)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Dining outlets</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          "Restaurants",
                          "Bar/Cocktail Lounge",
                          "Coffee Shop",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.toLowerCase().replace(/\s+/g, "-")}
                            />
                            <Label
                              htmlFor={item.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {item}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          "Restaurants",
                          "Bar/Cocktail Lounge",
                          "Coffee Shop",
                        ].map((item) => (
                          <div key={item}>
                            <Label
                              htmlFor={`${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-capacity`}
                            >
                              Capacity
                            </Label>
                            <Input
                              id={`${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-capacity`}
                              type="number"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">
                        Conference/Convention
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          "Convention Hall",
                          "Conference Hall",
                          "Function Hall",
                          "Meeting Room",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.toLowerCase().replace(/\s+/g, "-")}
                            />
                            <Label
                              htmlFor={item.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {item}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          "Convention Hall",
                          "Conference Hall",
                          "Function Hall",
                          "Meeting Room",
                        ].map((item) => (
                          <div key={item}>
                            <Label
                              htmlFor={`${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-capacity`}
                            >
                              Capacity
                            </Label>
                            <Input
                              id={`${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-capacity`}
                              type="number"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          "Convention Hall",
                          "Conference Hall",
                          "Function Hall",
                          "Meeting Room",
                        ].map((item) => (
                          <div key={item}>
                            <Label
                              htmlFor={`${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-ac-price`}
                            >
                              AC Price
                            </Label>
                            <Input
                              id={`${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-ac-price`}
                              type="number"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          "Convention Hall",
                          "Conference Hall",
                          "Function Hall",
                          "Meeting Room",
                        ].map((item) => (
                          <div key={item}>
                            <Label
                              htmlFor={`${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-non-ac-price`}
                            >
                              Non-AC Price
                            </Label>
                            <Input
                              id={`${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-non-ac-price`}
                              type="number"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Marine Recreation</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                          "Kayaking",
                          "Board Surfing",
                          "Snorkeling",
                          "Paddle Boarding",
                          "Scuba Diving",
                          "Free Diving",
                          "Kite Surfing",
                          "Banana boat",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.toLowerCase().replace(/\s+/g, "-")}
                            />
                            <Label
                              htmlFor={item.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {item}
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2">
                          <Checkbox id="other-marine" />
                          <Label htmlFor="other-marine">Others</Label>
                          <Input placeholder="Specify" className="w-40" />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Number of device/equipment for rent</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(9)].map((_, index) => (
                              <Input
                                key={index}
                                type="number"
                                placeholder={`Item ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Price</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(9)].map((_, index) => (
                              <Input
                                key={index}
                                type="number"
                                placeholder={`Price ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Sports Recreation</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          "Basketball Court",
                          "Tennis Court",
                          "Badminton Court",
                          "Volleyball Court",
                          "Beach Volleyball",
                          "Table Tennis",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.toLowerCase().replace(/\s+/g, "-")}
                            />
                            <Label
                              htmlFor={item.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {item}
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2">
                          <Checkbox id="other-outdoor" />
                          <Label htmlFor="other-outdoor">
                            Other Outdoor Games
                          </Label>
                          <Input placeholder="Specify" className="w-40" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="indoor-games" />
                          <Label htmlFor="indoor-games">Indoor Games</Label>
                          <Input placeholder="Specify" className="w-40" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Swimming Pool Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Swimming Pool Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Number</TableHead>
                        <TableHead>Depth</TableHead>
                        <TableHead>Size</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Adult Pool</TableCell>
                        <TableCell>
                          <Input type="number" />
                        </TableCell>
                        <TableCell>
                          <Input />
                        </TableCell>
                        <TableCell>
                          <Input />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Children Pool</TableCell>
                        <TableCell>
                          <Input type="number" />
                        </TableCell>
                        <TableCell>
                          <Input />
                        </TableCell>
                        <TableCell>
                          <Input />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Other Activities, Facilities & Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Other Activities, Facilities & Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      "Generator set",
                      "Bonfire",
                      "Wifi",
                      "CCTV",
                      "Pet-Friendly",
                      "Videoke Rental",
                      "ATV Rental",
                      "Bicycle Rental",
                      "Motorcycle Rental",
                      "Spa Facilities",
                      "Gym",
                      "Souvenir Shop",
                      "Laundry Shop",
                      "Beauty Salon/Parlor",
                      "Barber Shop",
                      "Foreign Currency Exchange",
                      "Retail Shop/Sari-sari Store",
                      "Transport Service",
                      "Security Guard",
                      "Parking Valet",
                      "Surfing Instructor",
                      "Free Dive Instructor",
                      "Scuba Dive Instructor",
                      "Life Guard",
                      "Tour Guide",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.toLowerCase().replace(/\s+/g, "-")}
                        />
                        <Label
                          htmlFor={item.toLowerCase().replace(/\s+/g, "-")}
                        >
                          {item}
                        </Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="other-activities" />
                      <Label htmlFor="other-activities">Others</Label>
                      <Input placeholder="Specify" className="w-40" />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Availability</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Item 1" />
                        <Input placeholder="Item 2" />
                        <Input placeholder="Item 3" />
                        <Input placeholder="Item 4" />
                      </div>
                    </div>
                    <div>
                      <Label>Price</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="number" placeholder="Price 1" />
                        <Input type="number" placeholder="Price 2" />
                        <Input type="number" placeholder="Price 3" />
                        <Input type="number" placeholder="Price 4" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="parking-capacity">
                        Parking Space Capacity
                      </Label>
                      <Input id="parking-capacity" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="parking-price">Parking Space Price</Label>
                      <Input id="parking-price" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="campsite-capacity">
                        Campsite/area Capacity
                      </Label>
                      <Input id="campsite-capacity" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="campsite-price">
                        Campsite/area Price
                      </Label>
                      <Input id="campsite-price" type="number" />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "Common Kitchen", id: "common-kitchen" },
                      { label: "Common sink", id: "common-sink" },
                      { label: "Common Grilling Site", id: "common-grilling" },
                      { label: "Common Bathroom", id: "common-bathroom" },
                      { label: "Common Restroom", id: "common-restroom" },
                      { label: "Open Shower", id: "open-shower" },
                    ].map((item) => (
                      <div key={item.id}>
                        <Label htmlFor={`${item.id}-number`}>
                          {item.label} Number
                        </Label>
                        <Input id={`${item.id}-number`} type="number" />
                        <Label htmlFor={`${item.id}-charge`} className="mt-2">
                          {item.label} Charge
                        </Label>
                        <Input id={`${item.id}-charge`} type="number" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Available Promos */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Promos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      "Packages",
                      "Advance Booking",
                      "Summer Promo",
                      "Holiday Promo",
                      "Return Client Rate",
                      "Corporate rate",
                      "Government Discount",
                      "Senior/PWD Discount",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.toLowerCase().replace(/\s+/g, "-")}
                        />
                        <Label
                          htmlFor={item.toLowerCase().replace(/\s+/g, "-")}
                        >
                          {item}
                        </Label>
                        {[
                          "Corporate rate",
                          "Government Discount",
                          "Senior/PWD Discount",
                        ].includes(item) && (
                          <Input placeholder="Specify" className="w-40" />
                        )}
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Checkbox id="other-promos" />
                      <Label htmlFor="other-promos">Others</Label>
                      <Input placeholder="Specify" className="w-40" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Number of Employees */}
              <Card>
                <CardHeader>
                  <CardTitle>Number of Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Local Male</TableHead>
                        <TableHead>Local Female</TableHead>
                        <TableHead>Foreign Male</TableHead>
                        <TableHead>Foreign Female</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Employees</TableCell>
                        <TableCell>
                          <Input type="number" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalMale">
                        Total Number of Male Employees
                      </Label>
                      <Input id="totalMale" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="totalFemale">
                        Total Number of Female Employees
                      </Label>
                      <Input id="totalFemale" type="number" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Confirmation Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle>Confirmation Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Before submitting, please confirm that you have reviewed and
                    completed the following:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confirm-basic-info" />
                      <Label htmlFor="confirm-basic-info">
                        Basic establishment information is complete and accurate
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confirm-room-info" />
                      <Label htmlFor="confirm-room-info">
                        Room information (AC, Fan, Cottages, Villas, Tents) is
                        filled out correctly
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confirm-facilities" />
                      <Label htmlFor="confirm-facilities">
                        Facilities and amenities are accurately checked
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confirm-activities" />
                      <Label htmlFor="confirm-activities">
                        Activities, services, and promos are properly indicated
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confirm-employees" />
                      <Label htmlFor="confirm-employees">
                        Employee information is complete
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confirm-all"
                        checked={isConfirmed}
                        onCheckedChange={(checked) => setIsConfirmed(!!checked)}
                      />
                      <Label htmlFor="confirm-all">
                        {" "}
                        I confirm that all information in this form is complete
                        and accurate{" "}
                      </Label>{" "}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" disabled={!isConfirmed}>
                Submit Inspection Form
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-blue-800 text-white py-4 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Provincial Government of Aurora.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
