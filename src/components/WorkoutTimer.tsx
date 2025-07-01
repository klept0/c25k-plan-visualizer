
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Square, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { WorkoutInterval } from '@/data/fullC25kProgram';

interface WorkoutTimerProps {
  intervals: WorkoutInterval[];
  onWorkoutComplete: (completedIntervals: any[]) => void;
  onWorkoutStart?: () => void;
  audioEnabled?: boolean;
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ 
  intervals, 
  onWorkoutComplete, 
  onWorkoutStart,
  audioEnabled = true 
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedIntervals, setCompletedIntervals] = useState<any[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(audioEnabled);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Parse duration string to seconds
  const parseDuration = (duration: string): number => {
    const parts = duration.split(' ');
    const value = parseInt(parts[0]);
    const unit = parts[1];
    
    if (unit.includes('min')) {
      return value * 60;
    } else if (unit.includes('sec')) {
      return value;
    }
    return value * 60; // default to minutes
  };

  // Initialize timer when intervals change
  useEffect(() => {
    if (intervals.length > 0 && !workoutStarted) {
      setTimeRemaining(parseDuration(intervals[0].duration));
    }
  }, [intervals, workoutStarted]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Interval completed
            handleIntervalComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining]);

  // Audio setup
  useEffect(() => {
    if (isAudioEnabled && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.log('Audio not supported');
      }
    }
  }, [isAudioEnabled]);

  const playBeep = (frequency: number = 800, duration: number = 200) => {
    if (!isAudioEnabled || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000);
      
      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
    } catch (error) {
      console.log('Audio playback failed');
    }
  };

  const handleIntervalComplete = () => {
    const currentInterval = intervals[currentIntervalIndex];
    
    // Play completion sound
    playBeep(currentInterval.type === 'run' ? 1000 : 600, 300);
    
    // Record completed interval
    const completedInterval = {
      ...currentInterval,
      completed: true,
      actualDuration: parseDuration(currentInterval.duration),
    };
    
    setCompletedIntervals(prev => [...prev, completedInterval]);
    
    // Move to next interval or complete workout
    if (currentIntervalIndex < intervals.length - 1) {
      setCurrentIntervalIndex(prev => prev + 1);
      setTimeRemaining(parseDuration(intervals[currentIntervalIndex + 1].duration));
      
      // Play transition sound
      setTimeout(() => playBeep(800, 200), 500);
    } else {
      // Workout complete
      setIsRunning(false);
      setWorkoutStarted(false);
      playBeep(1200, 500); // Success sound
      onWorkoutComplete([...completedIntervals, completedInterval]);
    }
  };

  const handleStart = () => {
    if (!workoutStarted) {
      setWorkoutStarted(true);
      onWorkoutStart?.();
    }
    setIsRunning(true);
    playBeep(600, 150);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setWorkoutStarted(false);
    setCurrentIntervalIndex(0);
    setTimeRemaining(intervals.length > 0 ? parseDuration(intervals[0].duration) : 0);
    setCompletedIntervals([]);
  };

  const handleSkip = () => {
    if (currentIntervalIndex < intervals.length - 1) {
      // Mark current interval as skipped
      const skippedInterval = {
        ...intervals[currentIntervalIndex],
        completed: false,
        skipped: true,
        actualDuration: parseDuration(intervals[currentIntervalIndex].duration) - timeRemaining,
      };
      
      setCompletedIntervals(prev => [...prev, skippedInterval]);
      setCurrentIntervalIndex(prev => prev + 1);
      setTimeRemaining(parseDuration(intervals[currentIntervalIndex + 1].duration));
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentInterval = intervals[currentIntervalIndex];
  const progress = currentInterval ? 
    ((parseDuration(currentInterval.duration) - timeRemaining) / parseDuration(currentInterval.duration)) * 100 : 0;

  if (!currentInterval) {
    return <div>No workout data available</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Workout Timer
        </CardTitle>
        <div className="flex justify-center gap-2">
          <Badge variant="outline">
            Interval {currentIntervalIndex + 1} of {intervals.length}
          </Badge>
          <Badge 
            variant={currentInterval.type === 'run' ? 'default' : 'secondary'}
            className={currentInterval.type === 'run' ? 'bg-blue-500' : 'bg-gray-500'}
          >
            {currentInterval.type === 'run' ? '🏃‍♂️ RUN' : '🚶‍♂️ WALK'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-800 mb-2">
            {formatTime(timeRemaining)}
          </div>
          <div className="text-lg text-gray-600">
            {currentInterval.description || `${currentInterval.type} for ${currentInterval.duration}`}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              currentInterval.type === 'run' 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                : 'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-3">
          {!isRunning ? (
            <Button 
              onClick={handleStart}
              className="bg-green-500 hover:bg-green-600 text-white px-6"
            >
              <Play className="h-4 w-4 mr-2" />
              {workoutStarted ? 'Resume' : 'Start'}
            </Button>
          ) : (
            <Button 
              onClick={handlePause}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}
          
          <Button 
            onClick={handleStop}
            variant="outline"
            className="px-6"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
          
          <Button 
            onClick={handleSkip}
            variant="outline"
            className="px-6"
            disabled={!workoutStarted || currentIntervalIndex >= intervals.length - 1}
          >
            <SkipForward className="h-4 w-4 mr-2" />
            Skip
          </Button>
        </div>

        {/* Audio Toggle */}
        <div className="flex justify-center">
          <Button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            {isAudioEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
            Audio {isAudioEnabled ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Workout Progress */}
        <div className="text-center text-sm text-gray-600">
          <div>Progress: {completedIntervals.length} / {intervals.length} intervals</div>
          {completedIntervals.length > 0 && (
            <div className="mt-2">
              <div className="flex justify-center gap-1 flex-wrap">
                {completedIntervals.map((interval, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      interval.completed 
                        ? interval.type === 'run' ? 'bg-blue-500' : 'bg-gray-500'
                        : 'bg-red-300'
                    }`}
                    title={`${interval.type} - ${interval.completed ? 'Completed' : 'Skipped'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutTimer;
