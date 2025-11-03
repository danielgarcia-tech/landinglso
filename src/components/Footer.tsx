import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-rua.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src={logo} 
              alt="Rua Abogados" 
              className="h-14 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-primary-foreground/80 text-sm mb-4">
              👉 Rúa Abogados. 50 años cambiando vidas.
            </p>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>📍 Presencia en toda España</li>
              <li>📅 Asesoramiento online y presencial</li>
              <li>🔒 Confidencialidad garantizada</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm">Servicios</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>Ley de Segunda Oportunidad</li>
              <li>Litigios bancarios</li>
              <li>Tarjetas revolving</li>
              <li>Cancelación de deudas</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm">Enlaces</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>
                <a href="#quienes-somos" className="hover:text-primary-foreground transition-colors">
                  Quiénes somos
                </a>
              </li>
              <li>
                <a href="#segunda-oportunidad" className="hover:text-primary-foreground transition-colors">
                  Segunda Oportunidad
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-primary-foreground transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm">Contacto</h3>
            <ul className="space-y-3 text-primary-foreground/80 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>+34 900 000 000</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>info@ruaabogados.es</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Madrid, España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} Rua Abogados. Todos los derechos reservados.</p>
          <p className="mt-2">
            Política de privacidad | Aviso legal | Política de cookies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
