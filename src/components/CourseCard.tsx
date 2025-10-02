import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, CheckCircle2 } from "lucide-react";

export interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  duration: string;
  lessons: number;
  level: string;
  image: string;
  category: string;
  completed?: boolean;
}

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export const CourseCard = ({ course, onClick }: CourseCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card relative"
    >
      {course.completed && (
        <div className="absolute top-4 right-4 z-10 bg-success text-success-foreground rounded-full p-2 shadow-lg">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}
      
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {course.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>
        </div>
        
        <div>
          <h3 className="font-bold text-xl mb-2 text-card-foreground group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm font-medium text-foreground">
          {course.instructor}
        </p>
      </div>
    </Card>
  );
};
