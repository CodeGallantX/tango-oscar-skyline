
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit,
  Save,
  Upload,
  Star,
  Shield,
  Plane
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    passportId: "US123456789",
    address: "123 Park Avenue, New York, NY 10001",
    dateOfBirth: "1985-03-15",
    nationality: "United States",
    emergencyContact: "Jane Doe - +1 (555) 765-4321",
    preferredAirports: "JFK, LAX, LHR",
    dietaryRestrictions: "None",
    membershipTier: "Diamond",
    memberSince: "2019",
    totalFlights: 47,
    totalMiles: "1,250,000"
  });

  const handleInputChange = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    setIsEditing(false);
    console.log("Updated profile:", userProfile);
  };

  const handleAvatarUpload = () => {
    toast({
      title: "Avatar Upload",
      description: "Avatar upload functionality would be implemented here.",
    });
  };

  const getMembershipColor = (tier) => {
    switch(tier) {
      case "Diamond": return "bg-gradient-to-r from-blue-400 to-purple-600";
      case "Platinum": return "bg-gradient-to-r from-gray-400 to-gray-600";
      case "Gold": return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      default: return "bg-gradient-to-r from-bronze to-bronze-dark";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-bronze hover:bg-bronze-dark text-black font-semibold"
        >
          {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="glass-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                  <AvatarFallback className="bg-bronze text-black text-xl font-bold">
                    {userProfile.firstName[0]}{userProfile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  onClick={handleAvatarUpload}
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-bronze hover:bg-bronze-dark text-black"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardTitle className="text-bronze">
              {userProfile.firstName} {userProfile.lastName}
            </CardTitle>
            <CardDescription>{userProfile.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`${getMembershipColor(userProfile.membershipTier)} p-4 rounded-lg text-white text-center`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5" />
                <span className="font-semibold">{userProfile.membershipTier} Member</span>
              </div>
              <p className="text-sm opacity-90">Since {userProfile.memberSince}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-bronze">{userProfile.totalFlights}</p>
                <p className="text-xs text-muted-foreground">Total Flights</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-bronze">{userProfile.totalMiles}</p>
                <p className="text-xs text-muted-foreground">Miles Flown</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-bronze flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Your basic profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={userProfile.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={userProfile.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userProfile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={userProfile.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={userProfile.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={userProfile.nationality}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={userProfile.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-background/50 border-border/50 focus:border-bronze"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Travel Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Travel Information
          </CardTitle>
          <CardDescription>Your travel preferences and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="passportId">Passport ID</Label>
              <Input
                id="passportId"
                name="passportId"
                value={userProfile.passportId}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
            <div>
              <Label htmlFor="preferredAirports">Preferred Airports</Label>
              <Input
                id="preferredAirports"
                name="preferredAirports"
                value={userProfile.preferredAirports}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., JFK, LAX, LHR"
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={userProfile.emergencyContact}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
            <div>
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
              <Input
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={userProfile.dietaryRestrictions}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., Vegetarian, Gluten-free"
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
