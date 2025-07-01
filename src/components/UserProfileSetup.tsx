
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProfile } from '@/types/user';
import { User, Heart, Target, Calendar, Volume2, Accessibility } from 'lucide-react';

interface UserProfileSetupProps {
  onProfileCreated: (profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ onProfileCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    weightUnit: 'kg' as 'kg' | 'lbs',
    gender: 'other' as 'male' | 'female' | 'other',
    fitnessLevel: 'beginner' as 'beginner' | 'some_experience' | 'active',
    goals: [] as string[],
    medicalConditions: [] as string[],
    preferredTime: '07:00',
    restDays: ['Saturday', 'Sunday'] as string[],
    language: 'en' as 'en' | 'es' | 'fr' | 'de' | 'pt',
    accessibility: {
      highContrast: false,
      largeFont: false,
      dyslexiaFont: false,
      screenReader: false,
    },
    preferences: {
      units: 'metric' as 'metric' | 'imperial',
      audioEnabled: true,
      notificationsEnabled: true,
      weatherIntegration: false,
    },
    integrations: {
      stravaEnabled: false,
      runkeeperEnabled: false,
      garminEnabled: false,
      intervalsEnabled: false,
      weatherEnabled: false,
      appleHealthEnabled: false,
      googleFitEnabled: false,
    }
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (category: string, field: string, value: string | number | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setProfileData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleRestDayToggle = (day: string) => {
    setProfileData(prev => ({
      ...prev,
      restDays: prev.restDays.includes(day)
        ? prev.restDays.filter(d => d !== day)
        : [...prev.restDays, day]
    }));
  };

  const handleSubmit = () => {
    const profile = {
      ...profileData,
      age: parseInt(profileData.age),
      weight: parseFloat(profileData.weight),
    };
    onProfileCreated(profile);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profileData.name.trim() !== '' && profileData.age !== '' && profileData.weight !== '';
      case 2:
        return true; // Optional fields
      case 3:
        return true; // Optional fields
      case 4:
        return true; // Optional fields
      default:
        return false;
    }
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to C25K!
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Step {currentStep} of {totalSteps}: Let's personalize your running journey
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter your age"
                    min="16"
                    max="100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="weight">Weight *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      value={profileData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="Enter weight"
                    />
                    <Select
                      value={profileData.weightUnit}
                      onValueChange={(value) => handleInputChange('weightUnit', value)}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={profileData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="fitness">Fitness Level</Label>
                  <Select
                    value={profileData.fitnessLevel}
                    onValueChange={(value) => handleInputChange('fitnessLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Complete Beginner</SelectItem>
                      <SelectItem value="some_experience">Some Experience</SelectItem>
                      <SelectItem value="active">Currently Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Goals & Preferences</h3>
              </div>
              
              <div>
                <Label>What are your running goals? (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'Complete 5K',
                    'Improve fitness',
                    'Lose weight',
                    'Reduce stress',
                    'Build routine',
                    'Social activity'
                  ].map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={profileData.goals.includes(goal)}
                        onCheckedChange={() => handleGoalToggle(goal)}
                      />
                      <Label htmlFor={goal} className="text-sm">{goal}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="preferred-time">Preferred Workout Time</Label>
                <Input
                  id="preferred-time"
                  type="time"
                  value={profileData.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                />
              </div>
              
              <div>
                <Label>Preferred Rest Days</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={profileData.restDays.includes(day)}
                        onCheckedChange={() => handleRestDayToggle(day)}
                      />
                      <Label htmlFor={day} className="text-xs">{day.slice(0, 3)}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Volume2 className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">App Preferences</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="audio"
                    checked={profileData.preferences.audioEnabled}
                    onCheckedChange={(checked) => handleNestedInputChange('preferences', 'audioEnabled', checked)}
                  />
                  <Label htmlFor="audio">Enable audio cues during workouts</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifications"
                    checked={profileData.preferences.notificationsEnabled}
                    onCheckedChange={(checked) => handleNestedInputChange('preferences', 'notificationsEnabled', checked)}
                  />
                  <Label htmlFor="notifications">Enable workout reminders</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="weather"
                    checked={profileData.preferences.weatherIntegration}
                    onCheckedChange={(checked) => handleNestedInputChange('preferences', 'weatherIntegration', checked)}
                  />
                  <Label htmlFor="weather">Show weather-based workout suggestions</Label>
                </div>
                
                <div>
                  <Label htmlFor="units">Measurement Units</Label>
                  <Select
                    value={profileData.preferences.units}
                    onValueChange={(value) => handleNestedInputChange('preferences', 'units', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (km, kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (miles, lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={profileData.language}
                    onValueChange={(value) => handleInputChange('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Accessibility className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Accessibility & Integrations</h3>
              </div>
              
              <div>
                <Label className="text-base font-medium">Accessibility Options</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="high-contrast"
                      checked={profileData.accessibility.highContrast}
                      onCheckedChange={(checked) => handleNestedInputChange('accessibility', 'highContrast', checked)}
                    />
                    <Label htmlFor="high-contrast">High contrast mode</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="large-font"
                      checked={profileData.accessibility.largeFont}
                      onCheckedChange={(checked) => handleNestedInputChange('accessibility', 'largeFont', checked)}
                    />
                    <Label htmlFor="large-font">Large font size</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dyslexia-font"
                      checked={profileData.accessibility.dyslexiaFont}
                      onCheckedChange={(checked) => handleNestedInputChange('accessibility', 'dyslexiaFont', checked)}
                    />
                    <Label htmlFor="dyslexia-font">Dyslexia-friendly font</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="screen-reader"
                      checked={profileData.accessibility.screenReader}
                      onCheckedChange={(checked) => handleNestedInputChange('accessibility', 'screenReader', checked)}
                    />
                    <Label htmlFor="screen-reader">Screen reader support</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-base font-medium">Fitness App Integrations (Optional)</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="strava"
                      checked={profileData.integrations.stravaEnabled}
                      onCheckedChange={(checked) => handleNestedInputChange('integrations', 'stravaEnabled', checked)}
                    />
                    <Label htmlFor="strava">Strava</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="runkeeper"
                      checked={profileData.integrations.runkeeperEnabled}
                      onCheckedChange={(checked) => handleNestedInputChange('integrations', 'runkeeperEnabled', checked)}
                    />
                    <Label htmlFor="runkeeper">RunKeeper</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="garmin"
                      checked={profileData.integrations.garminEnabled}
                      onCheckedChange={(checked) => handleNestedInputChange('integrations', 'garminEnabled', checked)}
                    />
                    <Label htmlFor="garmin">Garmin Connect</Label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  You can configure these integrations later in settings.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!isStepValid()}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                Complete Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileSetup;
