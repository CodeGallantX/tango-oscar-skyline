
import { useState } from "react";
import { Plane, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const BookJetButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: "",
    passengers: "",
    requirements: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking request:", formData);
    toast({
      title: "Booking Request Submitted",
      description: "Our team will contact you within 15 minutes to confirm your private jet booking.",
      duration: 5000,
    });
    setIsOpen(false);
    setFormData({
      departure: "",
      destination: "",
      date: "",
      passengers: "",
      requirements: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-14 px-6 bg-bronze hover:bg-bronze-dark text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50">
          <Plane className="w-5 h-5 mr-2" />
          Book Jet
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card/95 backdrop-blur-md border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-bronze flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Book Your Private Jet
          </DialogTitle>
          <DialogDescription>
            Fill in the details and our team will contact you within 15 minutes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departure">Departure</Label>
              <Input
                id="departure"
                name="departure"
                placeholder="e.g., JFK"
                value={formData.departure}
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
                placeholder="e.g., LAX"
                value={formData.destination}
                onChange={handleInputChange}
                required
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date & Time</Label>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
            <div>
              <Label htmlFor="passengers">Passengers</Label>
              <Input
                id="passengers"
                name="passengers"
                type="number"
                placeholder="1-12"
                min="1"
                max="12"
                value={formData.passengers}
                onChange={handleInputChange}
                required
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="requirements">Special Requirements</Label>
            <Textarea
              id="requirements"
              name="requirements"
              placeholder="Catering, ground transport, etc."
              value={formData.requirements}
              onChange={handleInputChange}
              className="bg-background/50 border-border/50 focus:border-bronze"
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-bronze hover:bg-bronze-dark text-black font-semibold">
              Submit Booking Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookJetButton;
