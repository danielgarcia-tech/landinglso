import { CheckCircle2, FileText, Gavel, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SecondChance = () => {
  const requirements = [
    "Ser persona física ",
    "No haber sido condenado por delitos económicos",
    "Estar en una situación real de insolvencia que afecte a más de un acreedor",
    "No haberse acogido a la segunda oportunidad durante los 5 años anteriores si obtuvo la exoneración de las deudas con liquidación o 3 años anteriores si obtuvo la exoneración mediante plan de pagos",
    "No haber sido condenado en los últimos 10 años por delitos contra el patrimonio y contra el orden socioeconómico, de falsedad documental, contra la Hacienda Pública y la Seguridad Social o contra los derechos de los trabajadores.",
    "No haber sido sancionado en los últimos 10 años por infracciones tributarias muy graves, de seguridad social o del orden social."
  ];
  
  const benefits = [
    "🕰️ 50 años de experiencia en litigación bancaria y defensa del consumidor",
    "👩‍⚖️ Más de 100.000 clientes en toda España",
    "💶 Millones de euros recuperados frente a bancos y financieras",
    "⚖️ Especialistas en Derecho Bancario y Concursal",
    "🤝 Trato cercano, transparente y profesional"
  ];

  const process = [
    {
      icon: CheckCircle2,
      title: "1. Contacto inicial",
      description: "Completa el formulario de contacto y uno de nuestros agentes te llamará para informarte sin compromiso"
    },
    {
      icon: FileText,
      title: "2. Completas nuestro formulario avanzado",
      description: "Te preguntaremos por tu situación financiera, tus activos, tu pasivo y otros detalles relevantes para evaluar tu caso en detalle"
    },
    {
      icon: Gavel,
      title: "3. Te pedimos la documentación necesaria",
      description: "Procederemos a analizar la documentación que nos envies para elaborar tu solicitud judicial"
    },
    {
      icon: CheckCircle2,
      title: "4. Presentación ante el Juzgado",
      description: "Nos encargamos de todo el proceso, sin que tengas que negociar con nadie"
    },
    {
      icon: Sparkles,
      title: "5. Auto judicial",
      description: "El juez dará inicio al procedimiento concursal y transcurrido el plazo legal, se dictará el auto por el que se te concederá la exoneración total de tus deudas"
    },
    {
      icon: CheckCircle2,
      title: "6. Nueva vida financiera",
      description: "Disfruta de tu nueva vida libre de deudas y di adiós a las llamadas de tus acreedores y a la lista de morosos"
    }


  ];

  return (
    <section id="segunda-oportunidad" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            ⚖️ ¿Qué es la Ley de Segunda Oportunidad?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Es un procedimiento legal y judicial, regulado en el Texto Refundido de la Ley Concursal, que permite a las personas físicas liberarse total o parcialmente de sus deudas cuando no pueden pagarlas.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tras las reformas de 2022, ya no es necesario negociar con los acreedores ni pasar por un mediador. El proceso se tramita directamente ante el juzgado mercantil, con el objetivo de conceder el Beneficio de Exoneración del Pasivo Insatisfecho (BEPI) —es decir, el perdón total de tus deudas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              🔍 Requisitos principales para acogerse
            </h3>
            <div className="space-y-3">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{requirement}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-6 text-sm">
              Si los cumples, podrás eliminar tus deudas bancarias, financieras, personales y hasta algunas con Hacienda o Seguridad Social.
            </p>
          </div>

          <div className="animate-slide-in-right">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              💼 Por qué confiar en Rúa Abogados
            </h3>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-muted-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground mt-6 text-sm italic">
                  Sabemos cómo actúan los bancos, porque los llevamos 50 años enfrentando en los tribunales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">
            🚀 Así funciona tu Segunda Oportunidad
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <Card 
                key={index}
                className="bg-card border-border hover:shadow-[var(--shadow-soft)] transition-all hover:translate-y-[-4px] animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6 text-center">
                  <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2 text-base">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondChance;
