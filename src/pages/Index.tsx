
import Navigation from "@/components/Navigation";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setVideoLoaded(true);
        video.play().catch(error => {
          console.error('Video playback failed:', error);
        });
      };

      const handleError = (e: any) => {
        console.error('Video loading error:', e);
        setVideoLoaded(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      // Force reload the video if it hasn't loaded within 5 seconds
      const timeoutId = setTimeout(() => {
        if (!videoLoaded && video) {
          video.load();
        }
      }, 5000);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        clearTimeout(timeoutId);
      };
    }
  }, [videoLoaded]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('subscribe', {
        body: { email }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="relative flex-1">
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
            >
              <source src="/cinema-edit-homepage.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center font-playfair">The Art of Cinema</h1>
              <p className="text-lg md:text-2xl text-center px-4 font-playfair italic mb-12">
                Discover the heartbeat behind every masterpiece, where cinematic dreams take flight
              </p>
              
              {/* Newsletter Section */}
              <div className="max-w-md mx-auto text-center mt-8">
                <h2 className="text-2xl font-bold mb-4 font-playfair">Subscribe to Our Newsletter</h2>
                <p className="text-white/80 mb-6">
                  Stay updated with the latest in cinema and filmmaking.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-white text-black hover:bg-white/90"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              </div>
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
