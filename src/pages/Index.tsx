import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Film Folio</h1>
          <p className="text-xl text-muted-foreground">
            Explore our collection of thoughtful movie reviews and analyses
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;