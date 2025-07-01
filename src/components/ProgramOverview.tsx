
import { Trophy, Calendar, Target, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgramOverview = () => {
  const stats = [
    { icon: Calendar, label: "Duration", value: "9 Weeks" },
    { icon: Target, label: "Workouts", value: "27 Sessions" },
    { icon: Heart, label: "Frequency", value: "3x per week" },
    { icon: Trophy, label: "Goal", value: "5K Run" }
  ];

  return (
    <div className="text-center space-y-8 mb-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Couch to 5K
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform from couch potato to 5K runner in just 9 weeks with this proven training program
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <stat.icon className="h-8 w-8 mx-auto text-blue-500" />
            </CardHeader>
            <CardContent className="pt-0">
              <CardTitle className="text-lg font-bold text-gray-800">{stat.value}</CardTitle>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">How it works</h3>
        <p className="text-gray-600 leading-relaxed">
          The C25K program gradually builds your running endurance through a structured mix of walking and running intervals. 
          Each week progressively increases running time while decreasing walking breaks, safely preparing your body for a full 5K run.
        </p>
      </div>
    </div>
  );
};

export default ProgramOverview;
