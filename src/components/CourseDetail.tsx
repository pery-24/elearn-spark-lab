import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, CheckCircle2, PlayCircle } from "lucide-react";
import { Course } from "./CourseCard";

interface CourseDetailProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleComplete: (courseId: number) => void;
}

export const CourseDetail = ({ course, isOpen, onClose, onToggleComplete }: CourseDetailProps) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{course.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video overflow-hidden rounded-lg bg-muted">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{course.category}</Badge>
            <Badge variant="outline">{course.level}</Badge>
            {course.completed && (
              <Badge className="bg-success text-success-foreground">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">About this course</h3>
            <p className="text-muted-foreground leading-relaxed">
              {course.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Lessons</p>
                <p className="font-semibold">{course.lessons} lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{course.duration}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Instructor</h3>
            <p className="text-foreground">{course.instructor}</p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1"
              variant={course.completed ? "outline" : "default"}
              onClick={() => onToggleComplete(course.id)}
            >
              {course.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Incomplete
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
            <Button className="flex-1">
              <PlayCircle className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
