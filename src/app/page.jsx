"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Coffee,
  Wifi,
  Dumbbell,
  Search,
  Map,
  LifeBuoy,
  Sparkles,
  Car,
  ChevronDown,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const hotels = [
  {
    id: 1,
    name: "Costa Pacifica",
    rating: 4.5,
    price: 150,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/bb/65/a8/costa-pacifica.jpg?w=1200&h=-1&s=1",
    location: "Baler, Aurora",
    amenities: ["wifi", "gym", "restaurant", "pool", "spa"],
  },
  {
    id: 2,
    name: "Bay's Inn Resort",
    rating: 4.2,
    price: 120,
    image:
      "https://pix8.agoda.net/property/60263241/0/ea45117c4c9930d33d6b9749a4a5055c.jpeg?ce=0&s=1024x",
    location: "Baler, Aurora",
    amenities: ["wifi", "restaurant", "parking"],
  },
  {
    id: 3,
    name: "Aliya Surf Camp",
    rating: 4.0,
    price: 100,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/12/a7/3f/e8/img-20180324-064351-largejpg.jpg",
    location: "Baler, Aurora",
    amenities: ["wifi", "parking", "restaurant"],
  },
  {
    id: 4,
    name: "Pacific Waves Inn",
    rating: 4.3,
    price: 130,
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/424217898.jpg?k=ef05b39cde8869464caabf8c31d4ed4145431c2d978ac3b3e931616730465e4c&o=&hp=1",
    location: "Baler, Aurora",
    amenities: ["wifi", "restaurant", "parking"],
  },
  {
    id: 5,
    name: "Nalu Surf Camp",
    rating: 4.6,
    price: 160,
    image:
      "https://nalusurfcamp.ph/wp-content/uploads/2022/03/nalu-about-us-1.png",
    location: "Baler, Aurora",
    amenities: ["wifi", "restaurant", "parking", "pool"],
  },
  {
    id: 6,
    name: "S.M.A.R.T Beach House Aurora",
    rating: 4.1,
    price: 110,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/7f/a6/0b/20160226-081837-largejpg.jpg?w=1200&h=-1&s=1",
    location: "Baler, Aurora",
    amenities: ["wifi", "parking", "restaurant"],
  },
];

const amenitiesOptions = [
  { value: "wifi", label: "Wi-Fi", icon: Wifi },
  { value: "gym", label: "Gym", icon: Dumbbell },
  { value: "restaurant", label: "Restaurant", icon: Coffee },
  { value: "pool", label: "Pool", icon: LifeBuoy },
  { value: "spa", label: "Spa", icon: Sparkles },
  { value: "parking", label: "Parking", icon: Car },
];

function HotelListingComponent() {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortOption, setSortOption] = useState("rating");
  const [showMap, setShowMap] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 4;

  useEffect(() => {
    let result = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))
    );

    if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredHotels(result);
    setCurrentPage(1);
  }, [searchTerm, selectedAmenities, sortOption]);

  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const toggleAllAmenities = (checked) => {
    if (checked) {
      setSelectedAmenities(amenitiesOptions.map((amenity) => amenity.value));
    } else {
      setSelectedAmenities([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200">
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Central Aurora Explorer
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost">About</Button>
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/login")}
            >
              Hotel Accommodation Inspection
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Discover Central Aurora
          </h2>
          <p className="text-xl text-gray-600">
            Find your perfect stay in the heart of Aurora
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 flex flex-wrap gap-4 items-center justify-between bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="search">Search Hotels</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="search"
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <Label>Amenities</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Select Amenities
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Amenities</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={selectedAmenities.length === amenitiesOptions.length}
                  onCheckedChange={toggleAllAmenities}
                >
                  Select All
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                {amenitiesOptions.map((amenity) => (
                  <DropdownMenuCheckboxItem
                    key={amenity.value}
                    checked={selectedAmenities.includes(amenity.value)}
                    onCheckedChange={() => toggleAmenity(amenity.value)}
                  >
                    <amenity.icon className="mr-2 h-4 w-4" />
                    {amenity.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="sort">Sort By</Label>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating (High to Low)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowMap(!showMap)}
            className="min-w-[120px]"
          >
            {showMap ? "Hide Map" : "Show Map"}
            <Map className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {showMap ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8 bg-white p-4 rounded-lg shadow-md"
            >
              <div className="relative w-full aspect-[16/9] bg-white rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.9999999999995!2d121.56000000000002!3d15.760000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c00000000001%3A0x0000000000000000!2sBaler%2C%20Aurora%2C%20Philippines!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                  width="90%"
                  height="90%"
                  frameBorder="0"
                  style={{ border: 15 }}
                  allowFullScreen={false}
                  aria-hidden="false"
                  tabIndex={0}
                  title="Map of Central Aurora Hotels"
                ></iframe>
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md">
                  <p className="text-sm font-semibold">Central Aurora Region</p>
                  <p className="text-xs text-muted-foreground">
                    Showing {filteredHotels.length} hotels
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              >
                {currentHotels.map((hotel, index) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-800">
                            ${hotel.price}/night
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle>{hotel.name}</CardTitle>
                        <CardDescription className="flex items-center mt-2">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          {hotel.rating.toFixed(1)}
                        </CardDescription>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {hotel.amenities.map((amenity) => {
                            const amenityOption = amenitiesOptions.find(
                              (a) => a.value === amenity
                            );
                            if (amenityOption) {
                              return (
                                <span
                                  key={amenity}
                                  className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center"
                                >
                                  <amenityOption.icon className="h-3 w-3 mr-1" />
                                  {amenityOption.label}
                                </span>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              <div className="flex justify-center gap-2">
                {Array.from(
                  { length: Math.ceil(filteredHotels.length / hotelsPerPage) },
                  (_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  )
                )}
              </div>
            </>
          )}
        </AnimatePresence>
      </main>
      <footer className="bg-white py-8 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Central Aurora Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HotelListingComponent;
