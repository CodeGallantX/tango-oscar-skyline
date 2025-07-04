
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
  Download, 
  Search, 
  Calendar,
  Receipt
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookingHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterAircraft, setFilterAircraft] = useState("");
  const { toast } = useToast();

  const [bookingHistory] = useState([
    {
      id: "TO-098",
      departure: "JFK",
      destination: "LAX",
      date: "2024-06-15",
      time: "14:30",
      aircraft: "Gulfstream G650",
      passengers: 6,
      amount: "$42,000",
      status: "Completed",
      invoiceId: "INV-2024-098"
    },
    {
      id: "TO-097",
      departure: "MIA",
      destination: "TEB",
      date: "2024-06-08",
      time: "11:20",
      aircraft: "Falcon 7X",
      passengers: 4,
      amount: "$28,500",
      status: "Completed",
      invoiceId: "INV-2024-097"
    },
    {
      id: "TO-096",
      departure: "LAX",
      destination: "SFO",
      date: "2024-05-28",
      time: "09:45",
      aircraft: "Citation X+",
      passengers: 3,
      amount: "$18,000",
      status: "Completed",
      invoiceId: "INV-2024-096"
    },
    {
      id: "TO-095",
      departure: "CDG",
      destination: "JFK",
      date: "2024-05-20",
      time: "16:15",
      aircraft: "Bombardier Global 7500",
      passengers: 8,
      amount: "$65,000",
      status: "Completed",
      invoiceId: "INV-2024-095"
    },
    {
      id: "TO-094",
      departure: "LHR",
      destination: "DXB",
      date: "2024-05-10",
      time: "22:30",
      aircraft: "Gulfstream G650ER",
      passengers: 5,
      amount: "$58,000",
      status: "Completed",
      invoiceId: "INV-2024-094"
    }
  ]);

  const filteredHistory = bookingHistory.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !filterYear || booking.date.startsWith(filterYear);
    const matchesAircraft = !filterAircraft || booking.aircraft === filterAircraft;
    
    return matchesSearch && matchesYear && matchesAircraft;
  });

  const handleDownloadInvoice = (invoiceId, bookingId) => {
    toast({
      title: "Invoice Downloaded",
      description: `Invoice ${invoiceId} for booking ${bookingId} has been downloaded.`,
    });
    
    // Simulate download
    console.log(`Downloading invoice ${invoiceId} for booking ${bookingId}`);
  };

  const getTotalAmount = () => {
    return filteredHistory.reduce((total, booking) => {
      return total + parseFloat(booking.amount.replace('$', '').replace(',', ''));
    }, 0).toLocaleString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Booking History</h1>
          <p className="text-muted-foreground">Your completed private jet flights</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className="bg-bronze/20 text-bronze border-bronze/30">
            {filteredHistory.length} Flights
          </Badge>
          <p className="text-sm text-muted-foreground">
            Total: <span className="text-bronze font-semibold">${getTotalAmount()}</span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search Flights</Label>
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
              <Label htmlFor="year">Year</Label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="aircraft">Aircraft Type</Label>
              <Select value={filterAircraft} onValueChange={setFilterAircraft}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue placeholder="All Aircraft" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  <SelectItem value="all">All Aircraft</SelectItem>
                  <SelectItem value="Gulfstream G650">Gulfstream G650</SelectItem>
                  <SelectItem value="Bombardier Global 7500">Bombardier Global 7500</SelectItem>
                  <SelectItem value="Falcon 7X">Falcon 7X</SelectItem>
                  <SelectItem value="Citation X+">Citation X+</SelectItem>
                  <SelectItem value="Gulfstream G650ER">Gulfstream G650ER</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((booking) => (
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
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.time}</span>
                  </div>

                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {booking.status}
                  </Badge>

                  <div className="text-right">
                    <p className="font-semibold text-bronze">{booking.amount}</p>
                    <p className="text-xs text-muted-foreground">{booking.passengers} passengers</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadInvoice(booking.invoiceId, booking.id)}
                  className="border-bronze text-bronze hover:bg-bronze hover:text-black"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No flight history found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingHistory;
