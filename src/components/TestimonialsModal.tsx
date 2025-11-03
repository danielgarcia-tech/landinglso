import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface TestimonialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TestimonialsModal = ({ open, onOpenChange }: TestimonialsModalProps) => {
  const testimonials = [
    {
      name: "Antonio",
      age: "53 años",
      location: "Vigo",
      quote: "Debía más de 90.000€ y pensaba que no tenía salida. Gracias a Rúa Abogados, el juez me exoneró de todo. Ahora puedo dormir tranquilo.",
      rating: 5
    },
    {
      name: "Laura",
      age: "41 años",
      location: "Madrid",
      quote: "Tenía tres tarjetas revolving y un préstamo impagable. En menos de un año, estaba libre de deudas. ¡No puedo estar más agradecida!",
      rating: 5
    },
    {
      name: "Carlos",
      age: "48 años",
      location: "Barcelona",
      quote: "Los abogados de Rúa me explicaron todo el proceso paso a paso. Fueron muy profesionales y resolutivos. Lo recomiendo a todos mis amigos.",
      rating: 5
    },
    {
      name: "María",
      age: "36 años",
      location: "Valencia",
      quote: "Pensaba que nunca podría librarme de mis deudas. El equipo de Rúa me dio una segunda oportunidad real. ¡Muchas gracias!",
      rating: 5
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Historias de Éxito</DialogTitle>
          <DialogDescription>
            Clientes que han recuperado su estabilidad financiera con nosotros
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-[var(--shadow-soft)] transition-all">
              <CardContent className="pt-6">
                <div className="flex gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">({testimonial.age})</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">📍 {testimonial.location}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground italic text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <p className="text-sm text-foreground text-center">
            💡 <strong>Estos son casos reales de clientes que confieron en nosotros.</strong> Tu historia podría ser la próxima.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsModal;