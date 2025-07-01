
import React, { useState, useEffect } from 'react';
import ProgramOverview from "@/components/ProgramOverview";
import CalendarWeek from "@/components/CalendarWeek";
import UserProfileSetup from "@/components/UserProfileSetup";
import WorkoutTimer from "@/components/WorkoutTimer";
import { fullC25kProgram } from "@/data/fullC25kProgram";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState as useReactState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, User, BarChart3, Calendar, Download } from "lucide-react";

const Index = () => {
  const { 
    userProfile, 
    userProgress, 
    workoutSessions, 
    loading, 
    createUserProfile, 
    saveWorkoutSession,
    exportUserData 
  } = useUserProfile();
  
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showWorkoutTimer, setShowWorkoutTimer] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [view, setView] = useState<'program' | 'timer' | 'profile' | 'analytics'>('program');
  
  const totalWeeks = fullC25kProgram.length;

  // Set current week based on user progress
  useEffect(() => {
    if (userProgress) {
      setCurrentWeek(userProgress.currentWeek - 1);
    }
  }, [userProgress]);

  const nextWeek = () => {
    if (currentWeek < totalWeeks - 1) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const prevWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleWorkoutStart = (week: number, day: number) => {
    const weekData = fullC25kProgram[week - 1];
    const workout = weekData?.workouts.find(w => w.day === day);
    
    if (workout) {
      setSelectedWorkout({ ...workout, week });
      setShowWorkoutTimer(true);
      setView('timer');
    }
  };

  const handleWorkoutComplete = (completedIntervals: any[]) => {
    if (!selectedWorkout || !userProfile) return;
    
    const session = {
      id: crypto.randomUUID(),
      userId: userProfile.id,
      week: selectedWorkout.week,
      day: selectedWorkout.day,
      startTime: new Date(),
      endTime: new Date(),
      completed: true,
      intervals: completedIntervals,
      notes: '',
      rating: 5
    };
    
    saveWorkoutSession(session);
    setShowWorkoutTimer(false);
    setView('program');
  };

  const handleProfileCreated = (profileData: any) => {
    createUserProfile(profileData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your C25K profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return <UserProfileSetup onProfileCreated={handleProfileCreated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Welcome back, {userProfile.name}!
            </h1>
            <div className="flex gap-2">
              <Button 
                variant={view === 'program' ? 'default' : 'outline'}
                onClick={() => setView('program')}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Program
              </Button>
              <Button 
                variant={view === 'analytics' ? 'default' : 'outline'}
                onClick={() => setView('analytics')}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Progress
              </Button>
              <Button 
                variant={view === 'profile' ? 'default' : 'outline'}
                onClick={() => setView('profile')}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Profile
              </Button>
            </div>
          </div>

          {/* Progress Summary */}
          {userProgress && (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      Week {userProgress.currentWeek}
                    </div>
                    <div className="text-sm text-gray-600">Current Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {userProgress.completedWorkouts}
                    </div>
                    <div className="text-sm text-gray-600">Workouts Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(userProgress.totalRunningTime / 60)}
                    </div>
                    <div className="text-sm text-gray-600">Minutes Running</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {userProgress.achievements.length}
                    </div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        {view === 'program' && (
          <div className="space-y-8">
            <ProgramOverview />
            
            <div className="flex items-center justify-between">
              <Button 
                onClick={prevWeek} 
                disabled={currentWeek === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous Week
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Week {currentWeek + 1} of {totalWeeks}
                </p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentWeek + 1) / totalWeeks) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <Button 
                onClick={nextWeek} 
                disabled={currentWeek === totalWeeks - 1}
                variant="outline"
                className="flex items-center gap-2"
              >
                Next Week
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <CalendarWeek 
              weekNumber={fullC25kProgram[currentWeek].week}
              workouts={fullC25kProgram[currentWeek].workouts}
              onWorkoutStart={handleWorkoutStart}
              completedWorkouts={workoutSessions
                .filter(s => s.week === currentWeek + 1)
                .map(s => s.day)
              }
            />
          </div>
        )}

        {view === 'timer' && selectedWorkout && (
          <div className="flex justify-center">
            <WorkoutTimer
              intervals={selectedWorkout.intervals}
              onWorkoutComplete={handleWorkoutComplete}
              audioEnabled={userProfile.preferences.audioEnabled}
            />
          </div>
        )}

        {view === 'analytics' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProgress?.achievements && userProgress.achievements.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Recent Achievements</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProgress.achievements.slice(-5).map((achievement) => (
                          <Badge key={achievement.id} variant="secondary" className="flex items-center gap-1">
                            <span>{achievement.icon}</span>
                            {achievement.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold mb-2">Workout History</h3>
                    <div className="space-y-2">
                      {workoutSessions.slice(-5).map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium">Week {session.week}, Day {session.day}</span>
                            <span className="text-sm text-gray-600 ml-2">
                              {session.startTime.toLocaleDateString()}
                            </span>
                          </div>
                          <Badge variant={session.completed ? "default" : "secondary"}>
                            {session.completed ? "Completed" : "Partial"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {view === 'profile' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Personal Info</h3>
                    <p className="text-sm text-gray-600">Name: {userProfile.name}</p>
                    <p className="text-sm text-gray-600">Age: {userProfile.age}</p>
                    <p className="text-sm text-gray-600">Weight: {userProfile.weight} {userProfile.weightUnit}</p>
                    <p className="text-sm text-gray-600">Fitness Level: {userProfile.fitnessLevel}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Preferences</h3>
                    <p className="text-sm text-gray-600">Preferred Time: {userProfile.preferredTime}</p>
                    <p className="text-sm text-gray-600">Rest Days: {userProfile.restDays.join(', ')}</p>
                    <p className="text-sm text-gray-600">Language: {userProfile.language}</p>
                    <p className="text-sm text-gray-600">Audio Enabled: {userProfile.preferences.audioEnabled ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    onClick={exportUserData}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export My Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
