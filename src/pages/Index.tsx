
import Navigation from "@/components/Navigation";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://lovable-movie-blog.supabase.co/functions/v1/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    } catch (error) {
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
            <video 
              className="w-full h-full object-cover md:object-cover object-center sm:object-[50%_50%]"
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
              <p className="text-lg md:text-2xl text-center px-4 font-playfair italic">
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

        {/* Newsletter Section */}
        <div className="bg-background py-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 font-playfair">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Stay updated with the latest in cinema and filmmaking.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
