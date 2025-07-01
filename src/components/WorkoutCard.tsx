
import { Play, Clock, Footprints, AlertCircle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkoutInterval } from "@/data/fullC25kProgram";

interface WorkoutCardProps {
  week: number;
  day: number;
  warmup: string;
  intervals: WorkoutInterval[];
  cooldown: string;
  tips: string;
  duration: number;
  completed?: boolean;
  safetyNotes?: string;
  onWorkoutStart?: (week: number, day: number) => void;
}

const WorkoutCard = ({ 
  week, 
  day, 
  warmup, 
  intervals, 
  cooldown, 
  tips, 
  duration, 
  completed = false, 
  safetyNotes,
  onWorkoutStart 
}: WorkoutCardProps) => {
  const handleStartWorkout = () => {
    if (onWorkoutStart) {
      onWorkoutStart(week, day);
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:scale-105 ${
      completed ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-blue-50'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Week {week}, Day {day}
          </CardTitle>
          <div className="flex items-center gap-2">
            {completed && <Badge variant="secondary" className="bg-green-100 text-green-800">✓ Done</Badge>}
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {duration} min
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Warmup:</span> {warmup}
        </div>
        
        <div className="space-y-2">
          <div className="font-medium text-gray-700 flex items-center gap-2">
            <Footprints className="h-4 w-4" />
            Main Workout:
          </div>
          <div className="flex flex-wrap gap-2">
            {intervals.slice(0, 8).map((interval, index) => (
              <Badge 
                key={index}
                variant={interval.type === 'run' ? 'default' : 'secondary'}
                className={`text-xs ${
                  interval.type === 'run' 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {interval.type === 'run' ? '🏃‍♂️' : '🚶‍♂️'} {interval.duration}
              </Badge>
            ))}
            {intervals.length > 8 && (
              <Badge variant="outline" className="text-xs">
                +{intervals.length - 8} more
              </Badge>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Cooldown:</span> {cooldown}
        </div>

        {tips && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <span className="font-medium">Tip:</span> {tips}
              </div>
            </div>
          </div>
        )}

        {safetyNotes && (
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-700">
                <span className="font-medium">Safety:</span> {safetyNotes}
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={handleStartWorkout}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          disabled={completed}
        >
          <Play className="h-4 w-4" />
          {completed ? 'Completed' : 'Start Workout'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
