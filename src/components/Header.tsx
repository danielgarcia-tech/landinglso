import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-rua.png";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setShowContactModal, setShowTestimonialsModal } = useModal();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Rua Abogados" 
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("quienes-somos")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Quiénes somos
            </button>
            <button
              onClick={() => scrollToSection("segunda-oportunidad")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Segunda Oportunidad
            </button>
            <Button onClick={() => setShowContactModal(true)} size="lg">
              Contacto
            </Button>
            <Button onClick={() => setShowTestimonialsModal(true)} variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              Testimonios
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t border-border">
            <button
              onClick={() => scrollToSection("quienes-somos")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Quiénes somos
            </button>
            <button
              onClick={() => scrollToSection("segunda-oportunidad")}
              className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              Segunda Oportunidad
            </button>
            <Button 
              onClick={() => setShowContactModal(true)}
              className="w-full"
            >
              Contacto
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
