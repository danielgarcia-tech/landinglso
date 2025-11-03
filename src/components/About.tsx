import { Shield, Scale, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "🕰️ 50 años de experiencia",
      description: "Expertos en litigación bancaria y defensa del consumidor"
    },
    {
      icon: Scale,
      title: "⚖️ Especialistas en Derecho",
      description: "Bancario y Concursal con presencia en toda España"
    },
    {
      icon: Heart,
      title: "🤝 Trato cercano",
      description: "Transparente y profesional en cada caso"
    }
  ];

  return (
    <section id="quienes-somos" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              💡 ¿Ahogado por las deudas? La Ley te permite empezar de nuevo.
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              En Rúa Abogados llevamos medio siglo defendiendo a particulares y autónomos frente a los abusos bancarios.
              Hoy, con el mecanismo legal de Segunda Oportunidad, te ayudamos a cancelar tus deudas de forma definitiva y legal, sin necesidad de acuerdos con los acreedores.
            </p>
            <p className="text-lg text-muted-foreground">
              Si ya no puedes afrontar tus préstamos, tarjetas o avales, la ley está de tu lado. Y nosotros también.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-background p-6 rounded-lg shadow-[var(--shadow-soft)] animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
