import { Mail, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Collaborate = () => {
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
            <div className="p-6 border rounded-lg bg-card">
              <h2 className="text-2xl font-semibold mb-4">Ways to Contribute</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <span className="font-medium">• Write Reviews:</span>
                  <span className="text-muted-foreground">Share your perspective on films</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">• Technical Analysis:</span>
                  <span className="text-muted-foreground">Deep dive into cinematography and production</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">• Industry News:</span>
                  <span className="text-muted-foreground">Cover latest developments in cinema</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Collaborate;