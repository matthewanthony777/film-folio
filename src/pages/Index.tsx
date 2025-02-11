
import Navigation from "@/components/Navigation";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import { useState, useEffect, useRef } from "react";

const Index = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setVideoLoaded(true);
      };

      const handleError = (e: any) => {
        console.error('Video loading error:', e);
        setVideoLoaded(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="relative flex-1">
        {/* Video Section */}
        <div className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            {!videoLoaded && (
              <div className="absolute inset-0 bg-black z-5 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
              </div>
            )}
            <video 
              ref={videoRef}
              className={`w-full h-full object-cover md:object-cover object-center sm:object-[50%_50%] ${!videoLoaded ? 'opacity-0' : 'opacity-100'}`}
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
              poster="/placeholder.svg"
            >
              <source src="/cinema-edit-homepage.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center font-playfair">The Art of Cinema</h1>
              <p className="text-lg md:text-2xl text-center px-4 font-playfair italic mb-12">
                Discover the heartbeat behind every masterpiece, where cinematic dreams take flight
              </p>
            </div>
          </div>
          <div className="absolute bottom-8 left-0 right-0 z-30">
            <div className="flex justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-500 bg-black/20 hover:bg-black/30"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel">
                  <Youtube className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-pink-500 bg-black/20 hover:bg-black/30"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                  <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-white bg-black/20 hover:bg-black/30"
                asChild
              >
                <a 
                  href="https://www.tiktok.com/@thescreenscholar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow us on TikTok"
                >
                  <TikTokIcon className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter Section - Now below the video */}
        <div className="bg-black text-white py-16">
          <NewsletterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
