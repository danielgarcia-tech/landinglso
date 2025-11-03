import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import SecondChance from "@/components/SecondChance";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import LiquidEther from "@/components/LiquidEther";
import { useModal } from "@/contexts/ModalContext";
import ContactModal from "@/components/ContactModal";
import TestimonialsModal from "@/components/TestimonialsModal";

const Index = () => {
  const { showContactModal, showTestimonialsModal, setShowContactModal, setShowTestimonialsModal } = useModal();
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <LiquidEther />
      <Header />
      <Hero />
      <Stats />
      <About />
      <SecondChance />
      <Footer />
      <ContactModal open={showContactModal} onOpenChange={setShowContactModal} />
      <TestimonialsModal open={showTestimonialsModal} onOpenChange={setShowTestimonialsModal} />
    </div>
  );
};

export default Index;
