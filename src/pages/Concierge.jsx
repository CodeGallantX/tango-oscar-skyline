
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Headphones, Hotel, Ship, ChefHat, Calendar, MapPin, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Concierge = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("request");
  const [requestForm, setRequestForm] = useState({
    service: "",
    location: "",
    date: "",
    guests: "",
    budget: "",
    details: ""
  });

  const services = [
    { icon: Hotel, name: "Luxury Hotels", description: "5-star accommodations worldwide" },
    { icon: Ship, name: "Yacht Charter", description: "Private yacht rentals and cruises" },
    { icon: ChefHat, name: "Private Chef", description: "Michelin-starred dining experiences" },
    { icon: Calendar, name: "Event Planning", description: "Exclusive events and celebrations" },
    { icon: MapPin, name: "Travel Planning", description: "Bespoke travel itineraries" },
    { icon: Star, name: "VIP Experiences", description: "Exclusive access and entertainment" }
  ];

  const recentRequests = [
    {
      id: 1,
      service: "Yacht Charter",
      location: "Monaco",
      date: "2024-01-15",
      status: "Confirmed",
      details: "150ft yacht for 3 days"
    },
    {
      id: 2,
      service: "Private Chef",
      location: "Aspen",
      date: "2024-01-10",
      status: "In Progress",
      details: "New Year's Eve dinner for 12"
    },
    {
      id: 3,
      service: "Hotel Booking",
      location: "Dubai",
      date: "2024-01-05",
      status: "Completed",
      details: "Presidential suite at Burj Al Arab"
    }
  ];

  const handleInputChange = (field, value) => {
    setRequestForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestForm.service || !requestForm.location || !requestForm.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Concierge Request Submitted",
      description: "Our concierge team will contact you within 30 minutes.",
    });
    
    // Reset form
    setRequestForm({
      service: "",
      location: "",
      date: "",
      guests: "",
      budget: "",
      details: ""
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-bronze/20 rounded-xl flex items-center justify-center">
          <Headphones className="w-6 h-6 text-bronze" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Concierge Services</h1>
          <p className="text-gray-400">Your personal lifestyle management team</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-black/30 rounded-lg p-1 backdrop-blur-sm">
        <button
          onClick={() => setActiveTab("request")}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === "request"
              ? "bg-bronze text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          New Request
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === "history"
              ? "bg-bronze text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Request History
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-6 py-3 rounded-md font-medium transition-all ${
            activeTab === "chat"
              ? "bg-bronze text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Live Chat
        </button>
      </div>

      {/* New Request Tab */}
      {activeTab === "request" && (
        <div className="space-y-6">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="bg-black/50 border-bronze/20 backdrop-blur-sm hover:border-bronze/40 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bronze/20 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-bronze" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{service.name}</h3>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Request Form */}
          <Card className="bg-black/50 border-bronze/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-bronze">Submit Concierge Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Service Type</label>
                    <Select value={requestForm.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="bg-black/30 border-bronze/30 text-white">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-bronze/30">
                        <SelectItem value="luxury-hotels">Luxury Hotels</SelectItem>
                        <SelectItem value="yacht-charter">Yacht Charter</SelectItem>
                        <SelectItem value="private-chef">Private Chef</SelectItem>
                        <SelectItem value="event-planning">Event Planning</SelectItem>
                        <SelectItem value="travel-planning">Travel Planning</SelectItem>
                        <SelectItem value="vip-experiences">VIP Experiences</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Location</label>
                    <Input
                      placeholder="Enter location"
                      value={requestForm.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="bg-black/30 border-bronze/30 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Preferred Date</label>
                    <Input
                      type="date"
                      value={requestForm.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="bg-black/30 border-bronze/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Number of Guests</label>
                    <Select value={requestForm.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                      <SelectTrigger className="bg-black/30 border-bronze/30 text-white">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-bronze/30">
                        <SelectItem value="1-2">1-2 Guests</SelectItem>
                        <SelectItem value="3-5">3-5 Guests</SelectItem>
                        <SelectItem value="6-10">6-10 Guests</SelectItem>
                        <SelectItem value="11-20">11-20 Guests</SelectItem>
                        <SelectItem value="20+">20+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Budget Range</label>
                    <Select value={requestForm.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="bg-black/30 border-bronze/30 text-white">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-bronze/30">
                        <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                        <SelectItem value="25k-50k">$25k - $50k</SelectItem>
                        <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                        <SelectItem value="100k-250k">$100k - $250k</SelectItem>
                        <SelectItem value="250k+">$250k+</SelectItem>
                        <SelectItem value="no-limit">No Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Additional Details</label>
                  <Textarea
                    placeholder="Please provide specific requirements, preferences, or any special requests..."
                    value={requestForm.details}
                    onChange={(e) => handleInputChange("details", e.target.value)}
                    className="bg-black/30 border-bronze/30 text-white min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="w-full bg-bronze hover:bg-bronze/80 text-black">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Request History Tab */}
      {activeTab === "history" && (
        <div className="space-y-4">
          {recentRequests.map((request) => (
            <Card key={request.id} className="bg-black/50 border-bronze/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-white">{request.service}</h3>
                      <Badge 
                        variant={request.status === "Confirmed" ? "default" : request.status === "In Progress" ? "secondary" : "outline"}
                        className={
                          request.status === "Confirmed" 
                            ? "bg-green-500/20 text-green-400 border-green-500/30" 
                            : request.status === "In Progress"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-bronze/20 text-bronze border-bronze/30"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400">{request.details}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {request.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {request.date}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-bronze/30 text-bronze hover:bg-bronze/10">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Live Chat Tab */}
      {activeTab === "chat" && (
        <Card className="bg-black/50 border-bronze/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-bronze">Live Concierge Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-96 bg-black/30 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto">
                    <Headphones className="w-8 h-8 text-bronze" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Connect with a Concierge</h3>
                    <p className="text-gray-400">Our team is available 24/7 to assist you</p>
                  </div>
                  <Button className="bg-bronze hover:bg-bronze/80 text-black">
                    Start Chat
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Concierge;
