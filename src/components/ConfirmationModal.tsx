import { CheckCircle2, Clock, FileText, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nombre: string;
}

const ConfirmationModal = ({ isOpen, onClose, nombre }: ConfirmationModalProps) => {
  const nextSteps = [
    {
      icon: CheckCircle2,
      title: "Confirmación recibida",
      description: "Tu solicitud ha sido registrada correctamente en nuestro sistema"
    },
    {
      icon: FileText,
      title: "Análisis del caso",
      description: "Nuestro equipo revisará tu situación en las próximas horas"
    },
    {
      icon: Phone,
      title: "Contacto personal",
      description: "Un abogado especializado te llamará en menos de 24 horas"
    },
    {
      icon: Clock,
      title: "Plan de acción",
      description: "Te explicaremos los pasos específicos para tu caso"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            ¡Gracias, {nombre}!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Tu solicitud ha sido enviada correctamente
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-foreground text-lg mb-4">
            Próximos pasos:
          </h3>
          
          {nextSteps.map((step, index) => (
            <div 
              key={index}
              className="flex gap-4 p-4 rounded-lg bg-muted/50 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary/10 p-2 rounded-lg h-fit">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {step.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-center text-muted-foreground">
            <span className="font-semibold text-foreground">Recuerda:</span> Revisa tu email y mantén tu teléfono disponible. 
            Nos pondremos en contacto contigo muy pronto.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
