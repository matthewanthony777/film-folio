import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Collaborate = () => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const vision = formData.get('vision') as string;

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: { name, email, vision }
      });

      if (error) throw error;

      toast({
        title: "Vision shared!",
        description: "Thank you for sharing your vision with us. We'll be in touch soon.",
      });
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send your vision. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Let's Collaborate</h1>
            <p className="text-lg text-muted-foreground">
              Interested in contributing to the blog or working together? We'd love to hear from you!
            </p>
          </div>

          <div className="grid gap-6">
            <div 
              className="p-8 border rounded-lg bg-card/50 backdrop-blur-sm animate-fade-in space-y-6"
              style={{ 
                animation: "fade-in 0.6s ease-out, slide-in-right 0.6s ease-out" 
              }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Let's Shape the Future of Film Together</h2>
              <p className="text-lg leading-relaxed">
                Are you ready to turn your passion for cinema into something more? Whether you're an aspiring critic, 
                industry insider, or creative visionary, we're opening our doors to new voices who stand out from the crowd.
              </p>
              
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-semibold mb-4">Why Join Us Now?</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-lg backdrop-blur-sm">
                    <h4 className="font-semibold mb-2">Be Part of Something Exclusive</h4>
                    <p>We're carefully curating a network of film enthusiasts and professionals. Early contributors get priority access to upcoming opportunities and industry connections.</p>
                  </div>
                  
                  <div className="p-4 bg-background/50 rounded-lg backdrop-blur-sm">
                    <h4 className="font-semibold mb-2">Establish Your Authority</h4>
                    <p>Build your reputation alongside established voices in film criticism. Your unique perspective could reach thousands of engaged readers.</p>
                  </div>
                  
                  <div className="p-4 bg-background/50 rounded-lg backdrop-blur-sm">
                    <h4 className="font-semibold mb-2">Access Hidden Opportunities</h4>
                    <p>Get early insights into industry developments and connect with our network of film professionals before opportunities become public.</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 border rounded-lg bg-card space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Share Your Vision</h2>
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="vision" className="text-sm font-medium">
                  Your Vision
                </label>
                <Textarea
                  id="vision"
                  name="vision"
                  required
                  placeholder="Share your ideas and vision with us..."
                  className="min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full">
                Share your Vision
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Collaborate;