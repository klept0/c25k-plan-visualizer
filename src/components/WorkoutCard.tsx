
import { Play, Clock, Footprints } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WorkoutCardProps {
  week: number;
  day: number;
  warmup: string;
  intervals: Array<{ type: 'run' | 'walk', duration: string }>;
  cooldown: string;
  completed?: boolean;
}

const WorkoutCard = ({ week, day, warmup, intervals, cooldown, completed = false }: WorkoutCardProps) => {
  const totalDuration = intervals.reduce((acc, interval) => {
    const minutes = parseInt(interval.duration.split(' ')[0]);
    return acc + minutes;
  }, 5 + 5); // warmup + cooldown

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
              {totalDuration} min
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
            {intervals.map((interval, index) => (
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
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Cooldown:</span> {cooldown}
        </div>

        <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
          <Play className="h-4 w-4" />
          Start Workout
        </button>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
