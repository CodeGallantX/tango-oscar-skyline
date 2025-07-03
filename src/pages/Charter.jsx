
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Clock,
  Star,
  Fuel,
  Shield,
  Wifi
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Charter = () => {
  const { toast } = useToast();
  
  const [charterForm, setCharterForm] = useState({
    aircraft: "",
    departure: "",
    destination: "",
    date: "",
    time: "",
    passengers: "",
    requirements: ""
  });

  const aircraftOptions = [
    { value: "gulfstream-g650", label: "Gulfstream G650", range: "7,000 nm", passengers: "19" },
    { value: "bombardier-global-7500", label: "Bombardier Global 7500", range: "7,700 nm", passengers: "19" },
    { value: "cessna-citation-x", label: "Cessna Citation X", range: "3,460 nm", passengers: "12" },
    { value: "embraer-legacy-650", label: "Embraer Legacy 650", range: "3,900 nm", passengers: "14" },
    { value: "dassault-falcon-7x", label: "Dassault Falcon 7X", range: "5,950 nm", passengers: "16" }
  ];

  const handleInputChange = (e) => {
    setCharterForm({
      ...charterForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setCharterForm({
      ...charterForm,
      [name]: value
    });
  };

  const handleSubmitCharter = (e) => {
    e.preventDefault();
    toast({
      title: "Charter Request Submitted",
      description: "Our team will contact you within 15 minutes to confirm your flight details.",
    });
    
    console.log("Charter request:", charterForm);
    
    // Reset form
    setCharterForm({
      aircraft: "",
      departure: "",
      destination: "",
      date: "",
      time: "",
      passengers: "",
      requirements: ""
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Private Jet Charter</h1>
          <p className="text-muted-foreground">Book your luxury private jet experience</p>
        </div>
        <Badge className="bg-bronze/20 text-bronze border-bronze/30">
          <Star className="w-4 h-4 mr-1" />
          Premium Fleet
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charter Booking Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <Plane className="w-5 h-5" />
              Charter Request
            </CardTitle>
            <CardDescription>Submit your private jet charter request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitCharter} className="space-y-4">
              <div>
                <Label htmlFor="aircraft">Aircraft Type</Label>
                <Select value={charterForm.aircraft} onValueChange={(value) => handleSelectChange('aircraft', value)}>
                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                    <SelectValue placeholder="Select aircraft" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                    {aircraftOptions.map((aircraft) => (
                      <SelectItem key={aircraft.value} value={aircraft.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{aircraft.label}</span>
                          <span className="text-xs text-muted-foreground">
                            Range: {aircraft.range} | Passengers: {aircraft.passengers}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departure">Departure City</Label>
                  <Input
                    id="departure"
                    name="departure"
                    placeholder="New York, NY"
                    value={charterForm.departure}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="Paris, France"
                    value={charterForm.destination}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Departure Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={charterForm.date}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Departure Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={charterForm.time}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
                <div>
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select value={charterForm.passengers} onValueChange={(value) => handleSelectChange('passengers', value)}>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                      <SelectItem value="1-2">1-2 Passengers</SelectItem>
                      <SelectItem value="3-6">3-6 Passengers</SelectItem>
                      <SelectItem value="7-12">7-12 Passengers</SelectItem>
                      <SelectItem value="13-19">13-19 Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Special Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Catering preferences, ground transportation, special requests..."
                  value={charterForm.requirements}
                  onChange={handleInputChange}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-bronze hover:bg-bronze-dark text-black font-semibold">
                <Plane className="w-4 h-4 mr-2" />
                Request Charter Quote
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Fleet Overview */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <Star className="w-5 h-5" />
              Our Premium Fleet
            </CardTitle>
            <CardDescription>World-class aircraft at your service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aircraftOptions.slice(0, 3).map((aircraft) => (
                <div key={aircraft.value} className="glass-card p-4 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bronze/20 rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-bronze" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-bronze">{aircraft.label}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {aircraft.range}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {aircraft.passengers} pax
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Wifi className="w-3 h-3 mr-1" />
                      WiFi
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Security
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Fuel className="w-3 h-3 mr-1" />
                      Long Range
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Coverage */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Global Coverage
          </CardTitle>
          <CardDescription>Available worldwide with 24/7 support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-bronze" />
              </div>
              <h3 className="font-semibold text-bronze mb-2">24/7 Availability</h3>
              <p className="text-sm text-muted-foreground">Ready to fly anytime, anywhere in the world</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-bronze" />
              </div>
              <h3 className="font-semibold text-bronze mb-2">Safety First</h3>
              <p className="text-sm text-muted-foreground">Highest safety standards and certified pilots</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-bronze" />
              </div>
              <h3 className="font-semibold text-bronze mb-2">Luxury Service</h3>
              <p className="text-sm text-muted-foreground">White-glove service from departure to arrival</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charter;
