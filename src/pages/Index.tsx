import Navigation from "@/components/Navigation";
import { Youtube, Instagram, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative h-[calc(100vh-64px)]">
        <div className="relative h-full">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/chris-nolan-edit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center">Welcome to Film Folio</h1>
              <p className="text-base md:text-xl text-center px-4">
                Explore our collection of thoughtful movie reviews and analyses
              </p>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 z-30">
            <div className="flex justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-red-500 bg-black/20 hover:bg-black/30"
                asChild
              >
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-pink-500 bg-black/20 hover:bg-black/30"
                asChild
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-white bg-black/20 hover:bg-black/30"
                asChild
              >
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <Video className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;