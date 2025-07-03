
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Headphones, 
  Hotel, 
  Ship, 
  ChefHat, 
  Car, 
  Ticket,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Concierge = () => {
  const { toast } = useToast();
  
  const [requestForm, setRequestForm] = useState({
    service: "",
    location: "",
    date: "",
    details: "",
    budget: "",
    priority: "Medium"
  });

  const [requests] = useState([
    {
      id: "CR-001",
      service: "Hotel Booking",
      location: "Paris, France",
      date: "2024-07-20",
      status: "Completed",
      details: "5-star hotel reservation at The Ritz Paris"
    },
    {
      id: "CR-002", 
      service: "Yacht Charter",
      location: "Monaco",
      date: "2024-07-25",
      status: "In Progress",
      details: "120ft luxury yacht for 3 days"
    },
    {
      id: "CR-003",
      service: "Restaurant Reservation",
      location: "New York, NY",
      date: "2024-07-18",
      status: "Pending",
      details: "Table for 6 at Eleven Madison Park"
    }
  ]);

  const serviceOptions = [
    { value: "hotel", label: "Hotel Booking", icon: Hotel },
    { value: "yacht", label: "Yacht Charter", icon: Ship },
    { value: "chef", label: "Private Chef", icon: ChefHat },
    { value: "transport", label: "Ground Transport", icon: Car },
    { value: "events", label: "Event Tickets", icon: Ticket },
    { value: "other", label: "Other Request", icon: Headphones }
  ];

  const handleInputChange = (e) => {
    setRequestForm({
      ...requestForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setRequestForm({
      ...requestForm,
      [name]: value
    });
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    toast({
      title: "Concierge Request Submitted",
      description: "Our team will contact you within 30 minutes to discuss your request.",
    });
    
    console.log("Concierge request:", requestForm);
    
    // Reset form
    setRequestForm({
      service: "",
      location: "",
      date: "",
      details: "",
      budget: "",
      priority: "Medium"
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Progress": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Pending": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-bronze/20 text-bronze border-bronze/30";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Completed": return <CheckCircle className="w-4 h-4" />;
      case "In Progress": return <Clock className="w-4 h-4" />;
      case "Pending": return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Concierge Services</h1>
          <p className="text-muted-foreground">Your personal luxury lifestyle assistant</p>
        </div>
        <Badge className="bg-bronze/20 text-bronze border-bronze/30">
          <Star className="w-4 h-4 mr-1" />
          Premium Service
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Request Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              New Request
            </CardTitle>
            <CardDescription>Submit a new concierge service request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <Label htmlFor="service">Service Type</Label>
                <Select value={requestForm.service} onValueChange={(value) => handleSelectChange('service', value)}>
                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, Country"
                    value={requestForm.location}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date Needed</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={requestForm.date}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="details">Request Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Describe your requirements in detail..."
                  value={requestForm.details}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-bronze"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="$10,000 - $50,000"
                    value={requestForm.budget}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-bronze"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={requestForm.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
                    <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-bronze hover:bg-bronze-dark text-black font-semibold">
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Chat Assistant */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat Assistant
            </CardTitle>
            <CardDescription>Connect with your personal concierge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-64 bg-background/30 rounded-lg p-4 overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-bronze rounded-full flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-black" />
                    </div>
                    <div className="glass-card p-3 flex-1">
                      <p className="text-sm">Hello! I'm your personal concierge assistant. How can I help you today?</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 justify-end">
                    <div className="glass-card p-3 flex-1 max-w-xs">
                      <p className="text-sm">I need help booking a restaurant in Milan for next week.</p>
                    </div>
                    <div className="w-8 h-8 bg-bronze/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold">JD</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-bronze rounded-full flex items-center justify-center">
                      <Headphones className="w-4 h-4 text-black" />
                    </div>
                    <div className="glass-card p-3 flex-1">
                      <p className="text-sm">I'd be happy to help you with restaurant reservations in Milan. What type of cuisine are you interested in, and how many guests?</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
                <Button className="bg-bronze hover:bg-bronze-dark text-black">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Requests
          </CardTitle>
          <CardDescription>Your latest concierge service requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="glass-card p-4 hover:bg-white/10 transition-all duration-200">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bronze/20 rounded-lg flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-bronze" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-bronze">{request.id}</h3>
                      <p className="text-sm text-muted-foreground">{request.service}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div>
                      <p className="text-sm font-medium">{request.location}</p>
                      <p className="text-xs text-muted-foreground">{request.date}</p>
                    </div>
                    
                    <Badge className={getStatusColor(request.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status}
                      </div>
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3 pl-16">
                  <p className="text-sm text-muted-foreground">{request.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Concierge;
