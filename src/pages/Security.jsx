
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Car, 
  Users, 
  Fingerprint, 
  Key, 
  Eye,
  Lock,
  UserCheck,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Security = () => {
  const { toast } = useToast();
  
  const [securitySettings, setSecuritySettings] = useState({
    biometricLogin: true,
    twoFactorAuth: true,
    armoredTransport: false,
    personalEscort: true,
    securityScreening: true,
    privacyMode: false,
    backgroundChecks: true,
    emergencyProtocol: true
  });

  const [preferences, setPreferences] = useState({
    escortType: "Professional Security",
    transportType: "Luxury Armored",
    securityLevel: "High",
    emergencyContact: "+1 (555) 911-HELP"
  });

  const handleToggleChange = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Security Setting Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${!securitySettings[setting] ? 'enabled' : 'disabled'}.`,
    });
  };

  const handlePreferenceChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const savePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your security preferences have been updated successfully.",
    });
    console.log("Security preferences saved:", preferences);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Security Settings</h1>
          <p className="text-muted-foreground">Manage your security and privacy preferences</p>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <Shield className="w-4 h-4 mr-1" />
          Secure Profile
        </Badge>
      </div>

      {/* Authentication Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Authentication & Access
          </CardTitle>
          <CardDescription>Control how you access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Biometric Login</Label>
                <p className="text-sm text-muted-foreground">Use fingerprint or face recognition</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.biometricLogin}
              onCheckedChange={() => handleToggleChange('biometricLogin')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add extra security with SMS or app</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={() => handleToggleChange('twoFactorAuth')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Privacy Mode</Label>
                <p className="text-sm text-muted-foreground">Hide sensitive information by default</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.privacyMode}
              onCheckedChange={() => handleToggleChange('privacyMode')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Physical Security */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Physical Security Services
          </CardTitle>
          <CardDescription>Premium protection services for your travel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Armored Transport</Label>
                <p className="text-sm text-muted-foreground">Secure ground transportation to/from airports</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.armoredTransport}
              onCheckedChange={() => handleToggleChange('armoredTransport')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Personal Escort</Label>
                <p className="text-sm text-muted-foreground">Professional security personnel</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.personalEscort}
              onCheckedChange={() => handleToggleChange('personalEscort')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Enhanced Security Screening</Label>
                <p className="text-sm text-muted-foreground">Additional background checks for crew</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.securityScreening}
              onCheckedChange={() => handleToggleChange('securityScreening')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Emergency Protocol</Label>
                <p className="text-sm text-muted-foreground">Immediate response procedures</p>
              </div>
            </div>
            <Switch
              checked={securitySettings.emergencyProtocol}
              onCheckedChange={() => handleToggleChange('emergencyProtocol')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Preferences */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Security Preferences
          </CardTitle>
          <CardDescription>Customize your security service preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="escortType">Escort Type</Label>
              <Input
                id="escortType"
                name="escortType"
                value={preferences.escortType}
                onChange={handlePreferenceChange}
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
            <div>
              <Label htmlFor="transportType">Transport Type</Label>
              <Input
                id="transportType"
                name="transportType"
                value={preferences.transportType}
                onChange={handlePreferenceChange}
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
            <div>
              <Label htmlFor="securityLevel">Security Level</Label>
              <Input
                id="securityLevel"
                name="securityLevel"
                value={preferences.securityLevel}
                onChange={handlePreferenceChange}
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                name="emergencyContact"
                value={preferences.emergencyContact}
                onChange={handlePreferenceChange}
                className="bg-background/50 border-border/50 focus:border-bronze"
              />
            </div>
          </div>
          
          <Button 
            onClick={savePreferences}
            className="w-full md:w-auto bg-bronze hover:bg-bronze-dark text-black font-semibold"
          >
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Security Status */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Security Status
          </CardTitle>
          <CardDescription>Current security configuration overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 glass-card">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-400">Authentication</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
            <div className="text-center p-4 glass-card">
              <Car className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-yellow-400">Transport</p>
              <p className="text-xs text-muted-foreground">Standard</p>
            </div>
            <div className="text-center p-4 glass-card">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-400">Escort</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
            <div className="text-center p-4 glass-card">
              <AlertTriangle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-400">Emergency</p>
              <p className="text-xs text-muted-foreground">Ready</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
