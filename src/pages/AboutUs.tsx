import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h1 className="text-4xl font-bold mb-6 font-playfair mt-16">Screen Scholar</h1>
          <p className="text-lg mb-6 leading-relaxed">
            Screen Scholar is dedicated to exploring the depths of cinematic artistry, offering thoughtful analysis and insightful perspectives on films that shape our cultural landscape. Through our carefully curated content, we invite you to journey with us into the heart of storytelling through motion pictures.
          </p>
          <p className="text-lg leading-relaxed">
            Our platform serves as a sanctuary for film enthusiasts, critics, and casual viewers alike, fostering meaningful discussions about the art of cinema and its profound impact on our collective imagination.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;