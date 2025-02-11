
import Navigation from "@/components/Navigation";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import TikTokIcon from "@/components/icons/TikTokIcon";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      <main className="flex-1">
        <section className="relative h-screen">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/cinema-edit-homepage.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center font-playfair">
              The Art of Cinema
            </h1>
            <p className="text-lg md:text-2xl text-center max-w-3xl font-playfair italic">
              Discover the heartbeat behind every masterpiece, where cinematic dreams take flight
            </p>
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
        </section>

        {/* Newsletter Section */}
        <section className="bg-black py-16 px-4">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 font-playfair text-white">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6 text-white">
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
