
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  Clock, 
  MapPin, 
  Calendar, 
  User, 
  Headphones,
  TrendingUp,
  Shield,
  Star
} from "lucide-react";

const Dashboard = () => {
  const [userData] = useState({
    name: "John Doe",
    membershipTier: "Diamond",
    upcomingFlights: 2,
    totalFlights: 47,
    memberSince: "2019"
  });

  const [upcomingFlights] = useState([
    {
      id: "TO-001",
      departure: "JFK",
      destination: "LAX",
      date: "2024-07-15",
      time: "14:30",
      aircraft: "Gulfstream G650",
      status: "Confirmed"
    },
    {
      id: "TO-002", 
      departure: "LAX",
      destination: "LHR",
      date: "2024-07-20",
      time: "09:15",
      aircraft: "Bombardier Global 7500",
      status: "Pending"
    }
  ]);

  const getMembershipColor = (tier) => {
    switch(tier) {
      case "Diamond": return "bg-gradient-to-r from-blue-400 to-purple-600";
      case "Platinum": return "bg-gradient-to-r from-gray-400 to-gray-600";
      case "Gold": return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      default: return "bg-gradient-to-r from-bronze to-bronze-dark";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="glass-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-bronze mb-2">
              Welcome back, {userData.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready for your next luxury journey?
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`${getMembershipColor(userData.membershipTier)} p-4 rounded-lg text-white`}>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <div>
                  <p className="font-semibold">{userData.membershipTier}</p>
                  <p className="text-xs opacity-90">Member since {userData.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-bronze" />
              <span className="text-2xl font-bold text-bronze">{userData.upcomingFlights}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Flights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-bronze" />
              <span className="text-2xl font-bold text-bronze">{userData.totalFlights}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Member Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-bronze" />
              <span className="text-lg font-semibold text-bronze">{userData.membershipTier}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Concierge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-bronze" />
              <span className="text-sm font-medium text-bronze">24/7 Available</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Flights */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Upcoming Flights
          </CardTitle>
          <CardDescription>Your scheduled private jet flights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingFlights.map((flight) => (
              <div key={flight.id} className="glass-card p-4 hover:bg-white/10 transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bronze/20 rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-bronze" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-bronze">{flight.id}</h3>
                      <p className="text-sm text-muted-foreground">{flight.aircraft}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{flight.departure}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium">{flight.destination}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{flight.date} at {flight.time}</span>
                    </div>
                    
                    <Badge 
                      variant={flight.status === "Confirmed" ? "default" : "secondary"}
                      className={flight.status === "Confirmed" ? "bg-bronze text-black" : ""}
                    >
                      {flight.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card-hover cursor-pointer">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Flight Tracker
            </CardTitle>
            <CardDescription>Track your flights in real-time</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-bronze text-bronze hover:bg-bronze hover:text-black">
              View Tracker
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card-hover cursor-pointer">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              Concierge Services
            </CardTitle>
            <CardDescription>Premium lifestyle assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-bronze text-bronze hover:bg-bronze hover:text-black">
              Contact Concierge
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card-hover cursor-pointer">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Flight Analytics
            </CardTitle>
            <CardDescription>Your travel insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-bronze text-bronze hover:bg-bronze hover:text-black">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
