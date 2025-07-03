
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plane, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter,
  Calendar,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAircraft, setFilterAircraft] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const { toast } = useToast();

  const [bookings] = useState([
    {
      id: "TO-001",
      departure: "JFK",
      destination: "LAX", 
      date: "2024-07-15",
      time: "14:30",
      aircraft: "Gulfstream G650",
      passengers: 8,
      status: "Confirmed",
      amount: "$45,000"
    },
    {
      id: "TO-002",
      departure: "LAX",
      destination: "LHR",
      date: "2024-07-20", 
      time: "09:15",
      aircraft: "Bombardier Global 7500",
      passengers: 6,
      status: "Pending",
      amount: "$72,000"
    },
    {
      id: "TO-003",
      departure: "MIA",
      destination: "CDG",
      date: "2024-07-25",
      time: "16:45",
      aircraft: "Falcon 7X",
      passengers: 4,
      status: "Confirmed",
      amount: "$38,500"
    }
  ]);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAircraft = !filterAircraft || booking.aircraft === filterAircraft;
    const matchesDate = !filterDate || booking.date === filterDate;
    const matchesDestination = !filterDestination || booking.destination === filterDestination;
    
    return matchesSearch && matchesAircraft && matchesDate && matchesDestination;
  });

  const handleModifyBooking = (bookingId) => {
    toast({
      title: "Modify Booking",
      description: `Opening modification form for booking ${bookingId}`,
    });
  };

  const handleCancelBooking = (bookingId) => {
    toast({
      title: "Cancel Booking",
      description: `Cancellation request submitted for booking ${bookingId}`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Confirmed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-bronze/20 text-bronze border-bronze/30";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Current Bookings</h1>
          <p className="text-muted-foreground">Manage your scheduled flights</p>
        </div>
        <Badge className="bg-bronze/20 text-bronze border-bronze/30">
          {filteredBookings.length} Active Bookings
        </Badge>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Bookings</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by ID, airport..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="aircraft">Aircraft Type</Label>
              <Select value={filterAircraft} onValueChange={setFilterAircraft}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue placeholder="All Aircraft" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="">All Aircraft</SelectItem>
                  <SelectItem value="Gulfstream G650">Gulfstream G650</SelectItem>
                  <SelectItem value="Bombardier Global 7500">Bombardier Global 7500</SelectItem>
                  <SelectItem value="Falcon 7X">Falcon 7X</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>

            <div>
              <Label htmlFor="destination">Destination</Label>
              <Select value={filterDestination} onValueChange={setFilterDestination}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue placeholder="All Destinations" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="">All Destinations</SelectItem>
                  <SelectItem value="LAX">Los Angeles (LAX)</SelectItem>
                  <SelectItem value="LHR">London (LHR)</SelectItem>
                  <SelectItem value="CDG">Paris (CDG)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="glass-card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bronze/20 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-bronze" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-bronze text-lg">{booking.id}</h3>
                    <p className="text-sm text-muted-foreground">{booking.aircraft}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{booking.departure}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-medium">{booking.destination}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.date} at {booking.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.passengers} passengers</span>
                  </div>

                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>

                  <div className="text-right">
                    <p className="font-semibold text-bronze">{booking.amount}</p>
                    <p className="text-xs text-muted-foreground">Total Cost</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleModifyBooking(booking.id)}
                    className="border-bronze text-bronze hover:bg-bronze hover:text-black"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Modify
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id)}
                    className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Plane className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No bookings found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters or create a new booking.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Bookings;
