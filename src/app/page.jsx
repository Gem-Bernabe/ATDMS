"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Coffee, Wifi, Dumbbell, Search, Map, LifeBuoy, Sparkles, Car, ChevronDown, Users, Info, Sun, Waves, Mountain, Camera, Utensils, Plane } from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";


const hotels = [
  {
    id: 1,
    name: "Costa Pacifica",
    rating: 4.5,
    price: 8250,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/bb/65/a8/costa-pacifica.jpg?w=1200&h=-1&s=1",
    location: "Baler, Aurora",
    amenities: ["wifi", "gym", "restaurant", "pool", "spa"],
  },
  {
    id: 2,
    name: "Bay's Inn Resort",
    rating: 4.2,
    price: 6600,
    image:
      "https://pix8.agoda.net/property/60263241/0/ea45117c4c9930d33d6b9749a4a5055c.jpeg?ce=0&s=1024x",
    location: "Baler, Aurora",
    amenities: ["wifi", "restaurant", "parking"],
  },
  {
    id: 3,
    name: "Aliya Surf Camp",
    rating: 4.0,
    price: 5500,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/12/a7/3f/e8/img-20180324-064351-largejpg.jpg",
    location: "Baler, Aurora",
    amenities: ["wifi", "parking", "restaurant"],
  },
  {
    id: 4,
    name: "Pacific Waves Inn",
    rating: 4.3,
    price: 7150,
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/424217898.jpg?k=ef05b39cde8869464caabf8c31d4ed4145431c2d978ac3b3e931616730465e4c&o=&hp=1",
    location: "Baler, Aurora",
    amenities: ["wifi", "restaurant", "parking"],
  },
  {
    id: 5,
    name: "Nalu Surf Camp",
    rating: 4.6,
    price: 8800,
    image:
      "https://nalusurfcamp.ph/wp-content/uploads/2022/03/nalu-about-us-1.png",
    location: "Baler, Aurora",
    amenities: ["wifi", "restaurant", "parking", "pool"],
  },
  {
    id: 6,
    name: "S.M.A.R.T Beach House Aurora",
    rating: 4.1,
    price: 6050,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/7f/a6/0b/20160226-081837-largejpg.jpg?w=1200&h=-1&s=1",
    location: "Baler, Aurora",
    amenities: ["wifi", "parking", "restaurant"],
  },
];

const amenitiesOptions = [
  { value: "wifi", label: "Wi-Fi", icon: Wifi, description: "Free Wi-Fi available" },
  { value: "gym", label: "Gym", icon: Dumbbell, description: "Fully equipped fitness center" },
  { value: "restaurant", label: "Restaurant", icon: Coffee, description: "On-site dining options" },
  { value: "pool", label: "Pool", icon: LifeBuoy, description: "Swimming pool access" },
  { value: "spa", label: "Spa", icon: Sparkles, description: "Relaxing spa services" },
  { value: "parking", label: "Parking", icon: Car, description: "Free parking available" },
];

const attractions = [
  {
    name: "Sabang Beach",
    description:
      "A 2-kilometer stretch of gray sand beach known for its surfing waves. Perfect for beginners and experienced surfers alike.",
    icon: Waves,
  },
  {
    name: "Dicasalarin Cove",
    description:
      "A secluded white sand beach surrounded by rolling hills. Offers breathtaking views and is ideal for swimming and picnics.",
    icon: Sun,
  },
  {
    name: "Diguisit Falls",
    description:
      "A series of cascading waterfalls surrounded by lush greenery. A great spot for nature lovers and photographers.",
    icon: Mountain,
  },
];

function HeroSection() {
  return (
    <div className="relative h-[60vh] bg-cover bg-center flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Discover Central Aurora</h1>
        <p className="text-xl mb-8">Experience the beauty of Province of Central Aurora' hidden gem</p>
        <Link href="/hotels/booking">
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">Start Your Adventure</Button>
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-teal-600" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function HotelCard({ hotel, index }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      key={hotel.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
        <CardHeader className="p-0">
          <div className="relative">
            {isLoading ? (
              <Skeleton className="w-full h-48" />
            ) : (
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
                onLoad={() => setIsLoading(false)}
              />
            )}
            <Badge className="absolute top-2 right-2 bg-teal-600 text-white">
              ₱{hotel.price.toLocaleString()}/night
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold text-gray-800">{hotel.name}</CardTitle>
          <CardDescription className="flex items-center mt-2">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="font-medium text-gray-700">{hotel.rating.toFixed(1)}</span>
            <span className="ml-2 text-sm text-gray-500">{hotel.location}</span>
          </CardDescription>
          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities.map((amenity) => {
              const amenityOption = amenitiesOptions.find(
                (a) => a.value === amenity
              );
              if (amenityOption) {
                return (
                  <TooltipProvider key={amenity}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="outline" className="flex items-center border-teal-200 text-teal-700">
                          <amenityOption.icon className="h-3 w-3 mr-1" />
                          {amenityOption.label}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{amenityOption.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }
              return null;
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-gray-50 border-t border-gray-100">
          <Button variant="outline" className="flex items-center text-teal-600 hover:text-teal-700 hover:bg-teal-50">
            <Info className="h-4 w-4 mr-2" />
            More Info
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function HotelListingComponent() {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortOption, setSortOption] = useState("rating");
  const [showMap, setShowMap] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const hotelsPerPage = 4;

  useEffect(() => {
    let result = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedAmenities.length === 0 ||
          selectedAmenities.every((amenity) =>
            hotel.amenities.includes(amenity)
          ))
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md p-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Central Aurora Explorer
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">FAQ</Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">Book Now</Button>
          </nav>
        </div>
      </header>

      <HeroSection />

      <main className="container mx-auto p-4 space-y-12">
        <section className="py-12 bg-white rounded-lg shadow-md">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Central Aurora?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={Sun}
                title="Pristine Beaches"
                description="Miles of untouched coastline perfect for surfing and relaxation."
              />
              <FeatureCard
                icon={Users}
                title="Rich Culture"
                description="Experience the warm hospitality and traditions of Aurora."
              />
              <FeatureCard
                icon={Mountain}
                title="Adventure Sports"
                description="From surfing to trekking, adventure awaits at every corner."
              />
              <FeatureCard
                icon={Camera}
                title="Scenic Beauty"
                description="Capture breathtaking landscapes and unforgettable moments."
              />
            </div>
          </div>
        </section>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4 items-center justify-between bg-white p-6 rounded-lg shadow-md border border-gray-200"
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
              className="mb-8 bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="relative w-full aspect-[16/9] bg-white rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.9999999999995!2d121.56000000000002!3d15.760000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c00000000001%3A0x0000000000000000!2sBaler%2C%20Aurora%2C%20Philippines!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  aria-hidden="false"
                  tabIndex={0}
                  title="Map of Central Aurora Hotels"
                ></iframe>
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-md">
                  <p className="text-sm font-semibold">Central Aurora Region</p>
                  <p className="text-xs text-gray-500">
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
              >
                {currentHotels.length > 0 ? (
                  currentHotels.map((hotel, index) => (
                    <HotelCard key={hotel.id} hotel={hotel} index={index} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-xl font-semibold text-gray-600">
                      No hotels found matching your criteria.
                    </p>
                    <p className="text-gray-500 mt-2">
                      Try adjusting your filters or search terms.
                    </p>
                  </div>
                )}
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

        <section className="py-12 bg-white rounded-lg shadow-md">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Popular Attractions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {attractions.map((attraction) => (
                <Card key={attraction.name} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
                      <attraction.icon className="h-6 w-6 mr-2 text-teal-600" />
                      {attraction.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{attraction.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-teal-600 rounded-lg shadow-md text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Your Aurora Adventure?</h2>
            <p className="text-xl mb-8">Book your stay now and experience the wonders of Central Aurora!</p>
            <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-gray-100">
              Start Booking
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-300">Central Aurora Explorer is your gateway to discovering the hidden gems of the Philippines. We're dedicated to providing unforgettable experiences in this beautiful region.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Hotels</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Attractions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">Email: info@centralaurora.com</p>
              <p className="text-gray-300">Phone: +63 123 456 7890</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-white"><Plane className="h-6 w-6" /></a>
                <a href="#" className="text-gray-300 hover:text-white"><Camera className="h-6 w-6" /></a>
                <a href="#" className="text-gray-300 hover:text-white"><Utensils className="h-6 w-6" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; 2024 Central Aurora Explorer. All rights reserved.</p>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center"></div>
          <div className="flex flex-wrap items-center space-x-4 mt-2 md:mt-0">
          <p className="text-xs text-gray-400">Powered by Vercel</p>
          <p className="text-xs text-gray-400">By Aurora State College of Technology</p>
          <p className="text-xs text-gray-400">Partnered with Aurora Provincial Tourism Office</p>
        </div>
        </div>
      </footer>
    </div>
  );
}

export default HotelListingComponent;

