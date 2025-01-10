import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold">Welcome to Film Folio</h1>
          <p className="text-xl text-muted-foreground">
            Explore our collection of thoughtful movie reviews and analyses
          </p>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;