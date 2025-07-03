
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="glass-card max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-bronze/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="w-8 h-8 text-bronze" />
          </div>
          <h1 className="text-4xl font-bold text-bronze mb-4">404</h1>
          <h2 className="text-xl font-semibold mb-2">Flight Path Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The page you're looking for seems to have taken a different route.
          </p>
          <Button 
            onClick={() => window.location.href = "/dashboard"}
            className="bg-bronze hover:bg-bronze-dark text-black font-semibold"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
