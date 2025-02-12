
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const AboutUs = () => {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('subscribe', {
        body: { email, frequency }
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
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
            >
              <source src="/cinema-about-edit.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
              <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1 className="text-4xl font-bold mb-6 font-playfair text-white">Screen Scholar</h1>
                <p className="text-lg mb-6 leading-relaxed text-white">
                  Screen Scholar is dedicated to exploring the depths of cinematic artistry, offering thoughtful analysis and insightful perspectives on films that shape our cultural landscape. Through our carefully curated content, we invite you to journey with us into the heart of storytelling through motion pictures.
                </p>
                <p className="text-lg leading-relaxed text-white">
                  Our platform serves as a sanctuary for film enthusiasts, critics, and casual viewers alike, fostering meaningful discussions about the art of cinema and its profound impact on our collective imagination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="py-16 px-4 bg-black">
          <div className="max-w-2xl mx-auto">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center font-playfair">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-8 text-center">
                Choose how you'd like to stay updated with the latest in cinema and filmmaking
              </p>

              <form onSubmit={handleSubscribe} className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base">Select your preferred frequency:</Label>
                  <RadioGroup value={frequency} onValueChange={setFrequency} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly" className="font-normal">
                        Weekly Digest
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="biweekly" id="biweekly" />
                      <Label htmlFor="biweekly" className="font-normal">
                        Bi-weekly Updates
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="font-normal">
                        Monthly Roundup
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
