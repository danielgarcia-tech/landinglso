import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import SecondChance from "@/components/SecondChance";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import LiquidEther from "@/components/LiquidEther";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <LiquidEther />
      <Header />
      <Hero />
      <Stats />
      <About />
      <SecondChance />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
