
import WorkoutCard from "./WorkoutCard";

interface CalendarWeekProps {
  weekNumber: number;
  workouts: Array<{
    day: number;
    warmup: string;
    intervals: Array<{ type: 'run' | 'walk', duration: string }>;
    cooldown: string;
    completed?: boolean;
  }>;
}

const CalendarWeek = ({ weekNumber, workouts }: CalendarWeekProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Week {weekNumber}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <WorkoutCard
            key={`${weekNumber}-${workout.day}`}
            week={weekNumber}
            day={workout.day}
            warmup={workout.warmup}
            intervals={workout.intervals}
            cooldown={workout.cooldown}
            completed={workout.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarWeek;
