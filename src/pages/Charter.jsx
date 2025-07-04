import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, MapPin, Calendar, Users, Clock, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Charter = () => {
  const { toast } = useToast();
  const [bookingForm, setBookingForm] = useState({
    departure: "",
    destination: "",
    date: "",
    passengers: "",
    aircraft: ""
  });

  const aircraftFleet = [
    {
      id: "gulfstream-g650",
      name: "Gulfstream G650",
      category: "Ultra Long Range",
      passengers: "14-19",
      range: "7,000 nm",
      speed: "Mach 0.925",
      price: "$8,500/hr",
      features: ["WiFi", "Full Galley", "Bedroom", "Conference Area"]
    },
    {
      id: "bombardier-global-7500",
      name: "Bombardier Global 7500",
      category: "Ultra Long Range", 
      passengers: "14-19",
      range: "7,700 nm",
      speed: "Mach 0.925",
      price: "$9,200/hr",
      features: ["4 Living Spaces", "Full Kitchen", "Master Suite", "Entertainment System"]
    },
    {
      id: "citation-x",
      name: "Cessna Citation X+",
      category: "Super Mid Size",
      passengers: "8-12",
      range: "3,460 nm", 
      speed: "Mach 0.935",
      price: "$4,800/hr",
      features: ["High Speed", "Spacious Cabin", "Advanced Avionics"]
    },
    {
      id: "falcon-7x",
      name: "Dassault Falcon 7X",
      category: "Heavy Jet",
      passengers: "12-16",
      range: "5,950 nm",
      speed: "Mach 0.90",
      price: "$6,500/hr", 
      features: ["Three Engines", "Large Cabin", "Advanced Flight Deck"]
    }
  ];

  const handleInputChange = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.departure || !bookingForm.destination || !bookingForm.date || !bookingForm.passengers || !bookingForm.aircraft) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Charter Request Submitted",
      description: "Our aviation team will contact you within 15 minutes to confirm your booking.",
    });
    
    // Reset form
    setBookingForm({
      departure: "",
      destination: "",
      date: "",
      passengers: "",
      aircraft: ""
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-bronze/20 rounded-xl flex items-center justify-center">
          <Plane className="w-6 h-6 text-bronze" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Private Jet Charter</h1>
          <p className="text-gray-400">Book your exclusive flight experience</p>
        </div>
      </div>

      {/* Booking Form */}
      <Card className="bg-black/50 border-bronze/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-bronze text-xl">Charter Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Departure Location</label>
                <Input
                  placeholder="Enter departure city/airport"
                  value={bookingForm.departure}
                  onChange={(e) => handleInputChange("departure", e.target.value)}
                  className="bg-black/30 border-bronze/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Destination</label>
                <Input
                  placeholder="Enter destination city/airport"
                  value={bookingForm.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  className="bg-black/30 border-bronze/30 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Departure Date</label>
                <Input
                  type="datetime-local"
                  value={bookingForm.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="bg-black/30 border-bronze/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Number of Passengers</label>
                <Select value={bookingForm.passengers} onValueChange={(value) => handleInputChange("passengers", value)}>
                  <SelectTrigger className="bg-black/30 border-bronze/30 text-white">
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-bronze/30">
                    <SelectItem value="1-4">1-4 Passengers</SelectItem>
                    <SelectItem value="5-8">5-8 Passengers</SelectItem>
                    <SelectItem value="9-12">9-12 Passengers</SelectItem>
                    <SelectItem value="13-16">13-16 Passengers</SelectItem>
                    <SelectItem value="17-plus">17+ Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Preferred Aircraft</label>
              <Select value={bookingForm.aircraft} onValueChange={(value) => handleInputChange("aircraft", value)}>
                <SelectTrigger className="bg-black/30 border-bronze/30 text-white">
                  <SelectValue placeholder="Select aircraft type" />
                </SelectTrigger>
                <SelectContent className="bg-black border-bronze/30">
                  {aircraftFleet.map((aircraft) => (
                    <SelectItem key={aircraft.id} value={aircraft.id}>
                      {aircraft.name} - {aircraft.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-bronze hover:bg-bronze/80 text-black">
              Request Charter Quote
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Fleet Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Our Premium Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aircraftFleet.map((aircraft) => (
            <Card key={aircraft.id} className="bg-black/50 border-bronze/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-full my-2 rounded-lg">
                  <img src="https://resources.globalair.com/specs/images/GulfstreamG650_Exterior.webp" alt={`${aircraft.name} - Tango Oscar`} className="w-full h-full object-fit rounded-lg" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-bronze">{aircraft.name}</CardTitle>
                    <Badge variant="outline" className="text-bronze border-bronze/50 mt-2">
                      {aircraft.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{aircraft.price}</p>
                    <p className="text-gray-400">per hour</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-bronze" />
                    <span className="text-gray-300">{aircraft.passengers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-bronze" />
                    <span className="text-gray-300">{aircraft.range}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-bronze" />
                    <span className="text-gray-300">{aircraft.speed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-bronze" />
                    <span className="text-gray-300">Luxury</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {aircraft.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="bg-bronze/20 text-bronze">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charter;
