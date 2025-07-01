
import ProgramOverview from "@/components/ProgramOverview";
import CalendarWeek from "@/components/CalendarWeek";
import { c25kProgram } from "@/data/c25kProgram";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const totalWeeks = c25kProgram.length;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <ProgramOverview />
        
        <div className="space-y-8">
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
            weekNumber={c25kProgram[currentWeek].week}
            workouts={c25kProgram[currentWeek].workouts}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
