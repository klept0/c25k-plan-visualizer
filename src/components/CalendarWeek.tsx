
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/data/fullC25kProgram";

interface CalendarWeekProps {
  weekNumber: number;
  workouts: Workout[];
  onWorkoutStart?: (week: number, day: number) => void;
  completedWorkouts?: number[];
}

const CalendarWeek = ({ weekNumber, workouts, onWorkoutStart, completedWorkouts = [] }: CalendarWeekProps) => {
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
            tips={workout.tips}
            duration={workout.duration}
            completed={completedWorkouts.includes(workout.day)}
            safetyNotes={workout.safety_notes}
            onWorkoutStart={onWorkoutStart}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarWeek;
