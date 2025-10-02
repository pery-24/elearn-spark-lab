import { useState } from "react";
import { CourseCard, Course } from "@/components/CourseCard";
import { CourseDetail } from "@/components/CourseDetail";
import { LoginModal } from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { coursesData } from "@/data/courses";
import { Search, GraduationCap, LogIn, User } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<string | null>(null);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDetailOpen(true);
  };

  const handleToggleComplete = (courseId: number) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, completed: !course.completed }
          : course
      )
    );
    
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      toast.success(
        course.completed
          ? "Course marked as incomplete"
          : "Congratulations! Course completed! 🎉"
      );
    }
  };

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
    toast.info("You've been logged out");
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = courses.filter((c) => c.completed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">LearnHub</h1>
                <p className="text-xs text-muted-foreground">Your Learning Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-foreground">{user}</p>
                    <p className="text-xs text-muted-foreground">
                      {completedCount} courses completed
                    </p>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsLoginOpen(true)}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Learn Anything, Anytime
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our curated collection of courses and start your learning journey today
            </p>
            
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses, topics, or instructors..."
                className="pl-12 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">{courses.length}</p>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-success">{completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">{courses.length - completedCount}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {searchQuery ? "Search Results" : "All Courses"}
          </h3>
          <p className="text-muted-foreground">
            {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} available
          </p>
        </div>
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => handleCourseClick(course)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No courses found matching "{searchQuery}"
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </div>
        )}
      </main>

      {/* Modals */}
      <CourseDetail
        course={selectedCourse}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onToggleComplete={handleToggleComplete}
      />
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
