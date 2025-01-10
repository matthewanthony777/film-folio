import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h1 className="text-4xl font-bold mb-6">About Film Folio</h1>
          <p className="text-lg mb-6">
            Film Folio is dedicated to providing thoughtful analysis and reviews of cinema across all genres and eras. Our passion for film drives us to explore the artistry, technical excellence, and cultural impact of movies.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-medium">Matthew Anthony Barr</h3>
                <p className="text-muted-foreground mb-2">Lead Film Critic</p>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://matthewanthonybarr.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-lg">
            We strive to provide insightful perspectives on films, helping our readers discover new favorites and understand beloved classics in deeper ways. Through detailed analysis and thoughtful critique, we aim to contribute meaningfully to the discourse around cinema.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;