
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock,
  Star,
  Shield,
  Zap,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Chauffeur = () => {
  const { toast } = useToast();
  
  const [bookingForm, setBookingForm] = useState({
    vehicle: "",
    pickup: "",
    destination: "",
    date: "",
    time: "",
    duration: "",
    passengers: "",
    requirements: ""
  });

  const vehicleOptions = [
    { value: "rolls-royce-phantom", label: "Rolls-Royce Phantom", capacity: "4", features: "Ultimate Luxury" },
    { value: "mercedes-s-class", label: "Mercedes S-Class", capacity: "4", features: "Executive Comfort" },
    { value: "bentley-mulsanne", label: "Bentley Mulsanne", capacity: "4", features: "British Elegance" },
    { value: "range-rover-autobiography", label: "Range Rover Autobiography", capacity: "7", features: "Luxury SUV" },
    { value: "mercedes-sprinter-vip", label: "Mercedes Sprinter VIP", capacity: "14", features: "Group Transport" }
  ];

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setBookingForm({
      ...bookingForm,
      [name]: value
    });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    toast({
      title: "Chauffeur Booking Confirmed",
      description: "Your luxury chauffeur will arrive 15 minutes early at your pickup location.",
    });
    
    console.log("Chauffeur booking:", bookingForm);
    
    // Reset form
    setBookingForm({
      vehicle: "",
      pickup: "",
      destination: "",
      date: "",
      time: "",
      duration: "",
      passengers: "",
      requirements: ""
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Luxury Chauffeur Service</h1>
          <p className="text-muted-foreground">Premium ground transportation worldwide</p>
        </div>
        <Badge className="bg-bronze/20 text-bronze border-bronze/30">
          <Star className="w-4 h-4 mr-1" />
          Elite Fleet
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <Car className="w-5 h-5" />
              Book Chauffeur
            </CardTitle>
            <CardDescription>Reserve your luxury vehicle and driver</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <Label htmlFor="vehicle">Vehicle Selection</Label>
                <Select value={bookingForm.vehicle} onValueChange={(value) => handleSelectChange('vehicle', value)}>
                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                    <SelectValue placeholder="Choose your vehicle" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                    {vehicleOptions.map((vehicle) => (
                      <SelectItem key={vehicle.value} value={vehicle.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{vehicle.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {vehicle.capacity} passengers | {vehicle.features}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    name="pickup"
                    placeholder="Hotel, Airport, Address"
                    value={bookingForm.pickup}
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
                    placeholder="Drop-off location"
                    value={bookingForm.destination}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Service Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Pickup Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={bookingForm.time}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Service Type</Label>
                  <Select value={bookingForm.duration} onValueChange={(value) => handleSelectChange('duration', value)}>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                      <SelectItem value="point-to-point">Point to Point</SelectItem>
                      <SelectItem value="hourly-2">2 Hours</SelectItem>
                      <SelectItem value="hourly-4">4 Hours</SelectItem>
                      <SelectItem value="hourly-8">8 Hours</SelectItem>
                      <SelectItem value="full-day">Full Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select value={bookingForm.passengers} onValueChange={(value) => handleSelectChange('passengers', value)}>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                      <SelectItem value="5-7">5-7 Passengers</SelectItem>
                      <SelectItem value="8+">8+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Special Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Child seats, accessibility needs, refreshments, special routes..."
                  value={bookingForm.requirements}
                  onChange={handleInputChange}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-bronze hover:bg-bronze-dark text-black font-semibold">
                <Car className="w-4 h-4 mr-2" />
                Book Chauffeur Service
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Fleet Showcase */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <Star className="w-5 h-5" />
              Premium Fleet
            </CardTitle>
            <CardDescription>Luxury vehicles with professional chauffeurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicleOptions.slice(0, 4).map((vehicle) => (
                <div key={vehicle.value} className="glass-card p-4 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bronze/20 rounded-lg flex items-center justify-center">
                      <Car className="w-6 h-6 text-bronze" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-bronze">{vehicle.label}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {vehicle.capacity} passengers
                        </span>
                        <span>{vehicle.features}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Features */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Service Excellence
          </CardTitle>
          <CardDescription>Why choose our chauffeur service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-bronze" />
              </div>
              <h3 className="font-semibold text-bronze mb-2">Professional Drivers</h3>
              <p className="text-sm text-muted-foreground">Licensed, trained, and background-checked</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-bronze" />
              </div>
              <h3 className="font-semibold text-bronze mb-2">Always On Time</h3>
              <p className="text-sm text-muted-foreground">Punctual service with real-time tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-bronze" />
              </div>
              <h3 className="font-semibold text-bronze mb-2">Instant Booking</h3>
              <p className="text-sm text-muted-foreground">Book now or schedule in advance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-bronze" />
              </div>
              <h3 className="font-semibold text-bronze mb-2">Global Coverage</h3>
              <p className="text-sm text-muted-foreground">Available in 500+ cities worldwide</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chauffeur;
