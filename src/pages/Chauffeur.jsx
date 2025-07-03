
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, MapPin, Calendar, Users, Shield, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Chauffeur = () => {
  const { toast } = useToast();
  const [bookingForm, setBookingForm] = useState({
    pickup: "",
    destination: "",
    date: "",
    passengers: "",
    vehicle: "",
    duration: ""
  });

  const vehicleFleet = [
    {
      id: "rolls-royce-phantom",
      name: "Rolls-Royce Phantom",
      category: "Ultra Luxury Sedan",
      passengers: "4",
      features: ["Champagne Service", "Privacy Glass", "Massage Seats", "WiFi"],
      price: "$350/hr",
      description: "The epitome of luxury and elegance"
    },
    {
      id: "mercedes-s680-maybach",
      name: "Mercedes S680 Maybach",
      category: "Executive Sedan", 
      passengers: "4",
      features: ["Executive Seating", "Climate Control", "Premium Sound", "Security Package"],
      price: "$280/hr",
      description: "German engineering meets ultimate comfort"
    },
    {
      id: "bentley-mulsanne",
      name: "Bentley Mulsanne",
      category: "Luxury Sedan",
      passengers: "4", 
      features: ["Handcrafted Interior", "Premium Audio", "Privacy Partition", "Refreshment Bar"],
      price: "$320/hr",
      description: "British luxury and craftsmanship"
    },
    {
      id: "escalade-esv",
      name: "Cadillac Escalade ESV",
      category: "Luxury SUV",
      passengers: "7",
      features: ["Spacious Interior", "Entertainment System", "Tinted Windows", "Security Features"],
      price: "$220/hr",
      description: "Perfect for group transportation"
    },
    {
      id: "armored-suburban",
      name: "Armored Suburban",
      category: "Security Vehicle",
      passengers: "6",
      features: ["Ballistic Protection", "Run-flat Tires", "Secure Communications", "Emergency Features"],
      price: "$450/hr", 
      description: "Maximum security and protection"
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
    if (!bookingForm.pickup || !bookingForm.destination || !bookingForm.date || !bookingForm.vehicle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Chauffeur Service Booked",
      description: "Your luxury chauffeur will be confirmed within 10 minutes.",
    });
    
    // Reset form
    setBookingForm({
      pickup: "",
      destination: "",
      date: "",
      passengers: "",
      vehicle: "",
      duration: ""
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-bronze/20 rounded-xl flex items-center justify-center">
          <Car className="w-6 h-6 text-bronze" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Luxury Chauffeur Service</h1>
          <p className="text-gray-400">Premium ground transportation with professional drivers</p>
        </div>
      </div>

      {/* Booking Form */}
      <Card className="bg-black/50 border-bronze/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-bronze text-xl">Book Chauffeur Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Pickup Location</label>
                <Input
                  placeholder="Enter pickup address"
                  value={bookingForm.pickup}
                  onChange={(e) => handleInputChange("pickup", e.target.value)}
                  className="bg-black/30 border-bronze/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Destination</label>
                <Input
                  placeholder="Enter destination address"
                  value={bookingForm.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  className="bg-black/30 border-bronze/30 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Service Date & Time</label>
                <Input
                  type="datetime-local"
                  value={bookingForm.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="bg-black/30 border-bronze/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Passengers</label>
                <Select value={bookingForm.passengers} onValueChange={(value) => handleInputChange("passengers", value)}>
                  <SelectTrigger className="bg-black/30 border-bronze/30 text-white">
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-bronze/30">
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4 Passengers</SelectItem>
                    <SelectItem value="5-7">5-7 Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Service Duration</label>
                <Select value={bookingForm.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger className="bg-black/30 border-bronze/30 text-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-bronze/30">
                    <SelectItem value="point-to-point">Point to Point</SelectItem>
                    <SelectItem value="2-hours">2 Hours</SelectItem>
                    <SelectItem value="4-hours">4 Hours</SelectItem>
                    <SelectItem value="8-hours">8 Hours</SelectItem>
                    <SelectItem value="full-day">Full Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Preferred Vehicle</label>
              <Select value={bookingForm.vehicle} onValueChange={(value) => handleInputChange("vehicle", value)}>
                <SelectTrigger className="bg-black/30 border-bronze/30 text-white">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent className="bg-black border-bronze/30">
                  {vehicleFleet.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} - {vehicle.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-bronze hover:bg-bronze/80 text-black">
              Book Chauffeur Service
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Vehicle Fleet */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Our Premium Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicleFleet.map((vehicle) => (
            <Card key={vehicle.id} className="bg-black/50 border-bronze/20 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-bronze text-lg">{vehicle.name}</CardTitle>
                    <Badge variant="outline" className="text-bronze border-bronze/50 mt-2">
                      {vehicle.category}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{vehicle.price}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">{vehicle.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-bronze" />
                    <span className="text-gray-300">{vehicle.passengers} passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-bronze" />
                    <span className="text-gray-300">Premium</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300">Features:</p>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="bg-bronze/20 text-bronze text-xs">
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

export default Chauffeur;
