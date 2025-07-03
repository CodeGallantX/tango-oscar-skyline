
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Globe, 
  Clock, 
  Palette,
  Volume2,
  Mail,
  Smartphone,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    language: "en",
    timezone: "America/New_York",
    currency: "USD",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    flightAlerts: true,
    bookingConfirmations: true,
    promotionalEmails: false,
    soundEnabled: true,
    darkMode: false,
    compactView: false
  });

  const handleToggleChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelectChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
    console.log("Settings saved:", settings);
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" }
  ];

  const timezoneOptions = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" }
  ];

  const currencyOptions = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bronze">Settings</h1>
          <p className="text-muted-foreground">Customize your dashboard experience</p>
        </div>
        <Button onClick={saveSettings} className="bg-bronze hover:bg-bronze-dark text-black font-semibold">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Language & Region */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language & Region
          </CardTitle>
          <CardDescription>Set your preferred language, timezone, and currency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSelectChange('language', value)}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSelectChange('timezone', value)}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  {timezoneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => handleSelectChange('currency', value)}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-bronze">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-border/50">
                  {currencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage how you receive updates and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-bronze">Notification Methods</h4>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-bronze" />
                <div>
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggleChange('emailNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-bronze" />
                <div>
                  <Label className="text-base font-medium">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive text messages</p>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggleChange('smsNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-bronze" />
                <div>
                  <Label className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser and app notifications</p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggleChange('pushNotifications')}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-bronze">Notification Types</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Flight Alerts</Label>
                <p className="text-sm text-muted-foreground">Delays, gate changes, boarding</p>
              </div>
              <Switch
                checked={settings.flightAlerts}
                onCheckedChange={() => handleToggleChange('flightAlerts')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Booking Confirmations</Label>
                <p className="text-sm text-muted-foreground">New bookings and changes</p>
              </div>
              <Switch
                checked={settings.bookingConfirmations}
                onCheckedChange={() => handleToggleChange('bookingConfirmations')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Promotional Emails</Label>
                <p className="text-sm text-muted-foreground">Special offers and updates</p>
              </div>
              <Switch
                checked={settings.promotionalEmails}
                onCheckedChange={() => handleToggleChange('promotionalEmails')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Interface Settings
          </CardTitle>
          <CardDescription>Customize the look and feel of your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Sound Effects</Label>
                <p className="text-sm text-muted-foreground">Enable notification sounds</p>
              </div>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={() => handleToggleChange('soundEnabled')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Use dark theme (experimental)</p>
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={() => handleToggleChange('darkMode')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SettingsIcon className="w-5 h-5 text-bronze" />
              <div>
                <Label className="text-base font-medium">Compact View</Label>
                <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
              </div>
            </div>
            <Switch
              checked={settings.compactView}
              onCheckedChange={() => handleToggleChange('compactView')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Settings Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-bronze flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Current Configuration
          </CardTitle>
          <CardDescription>Summary of your current settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 glass-card">
              <Globe className="w-8 h-8 text-bronze mx-auto mb-2" />
              <p className="text-sm font-medium">Language</p>
              <p className="text-xs text-muted-foreground">
                {languageOptions.find(l => l.value === settings.language)?.label}
              </p>
            </div>
            <div className="text-center p-4 glass-card">
              <Clock className="w-8 h-8 text-bronze mx-auto mb-2" />
              <p className="text-sm font-medium">Timezone</p>
              <p className="text-xs text-muted-foreground">
                {timezoneOptions.find(t => t.value === settings.timezone)?.label.split(' ')[0]}
              </p>
            </div>
            <div className="text-center p-4 glass-card">
              <Bell className="w-8 h-8 text-bronze mx-auto mb-2" />
              <p className="text-sm font-medium">Notifications</p>
              <p className="text-xs text-muted-foreground">
                {settings.emailNotifications ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <div className="text-center p-4 glass-card">
              <Volume2 className="w-8 h-8 text-bronze mx-auto mb-2" />
              <p className="text-sm font-medium">Sound</p>
              <p className="text-xs text-muted-foreground">
                {settings.soundEnabled ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
