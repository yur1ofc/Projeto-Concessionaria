import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import Differentials from "@/components/Differentials";
import Financing from "@/components/Financing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedCars />
      <Differentials />
      <Financing />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
