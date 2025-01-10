import Navigation from "@/components/Navigation";
import { Youtube, Instagram, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <video 
              className="w-full h-auto"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/chris-nolan-edit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-4xl font-bold mb-4">Welcome to Film Folio</h1>
              <p className="text-xl">
                Explore our collection of thoughtful movie reviews and analyses
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-red-500"
              asChild
            >
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-6 w-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-pink-500"
              asChild
            >
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-black dark:hover:text-white"
              asChild
            >
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <Video className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;