import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Antonio",
      age: "53 años",
      location: "Vigo",
      quote: "Debía más de 90.000€ y pensaba que no tenía salida. Gracias a Rúa Abogados, el juez me exoneró de todo."
    },
    {
      name: "Laura",
      age: "41 años",
      location: "Madrid",
      quote: "Tenía tres tarjetas revolving y un préstamo impagable. En menos de un año, estaba libre de deudas."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            💬 Historias reales, segundas oportunidades reales
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-background border-border shadow-[var(--shadow-soft)] animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary mb-4" />
                <p className="text-muted-foreground mb-6 italic text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">
                    — {testimonial.name}, {testimonial.age}, {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
