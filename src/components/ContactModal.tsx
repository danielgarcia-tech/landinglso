import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Send, CheckCircle, Mail } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WEBHOOK_URL = "https://justiflow.com/webhook/lsoinicial";

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedData, setConfirmedData] = useState<{ nombre: string; email: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enviar a webhook
      const payload = {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        mensaje: formData.mensaje,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
      }

      console.log("Datos enviados exitosamente al webhook:", payload);

      // Mostrar confirmación
      setConfirmedData({
        nombre: formData.nombre,
        email: formData.email
      });
      setShowConfirmation(true);
      toast.success("¡Formulario enviado exitosamente!");
      setFormData({ nombre: "", apellidos: "", email: "", telefono: "", mensaje: "" });
    } catch (error) {
      console.error("Error al enviar webhook:", error);
      toast.error("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setConfirmedData(null);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border">
        {showConfirmation && confirmedData ? (
          // Pantalla de confirmación
          <div className="space-y-6 py-4">
            {/* Logo y Check */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            {/* Mensaje de confirmación */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-foreground">
                ¡Hola {confirmedData.nombre}!
              </h2>
              <p className="text-muted-foreground">
                Tu solicitud ha sido recibida correctamente.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      En breves minutos recibirás un email en:
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-200 font-mono break-all">
                      {confirmedData.email}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                📨 <strong>Revisa tu bandeja de spam</strong> por si acaso. A veces los correos se filtran automáticamente.
              </p>
            </div>

            {/* Detalles */}
            <div className="space-y-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
              <p>
                ✓ Nuestro equipo analizará tu caso en detalle
              </p>
              <p>
                ✓ Te contactaremos por teléfono para confirmar información
              </p>
              <p>
                ✓ Evaluaremos tu elegibilidad para la Ley de Segunda Oportunidad
              </p>
            </div>

            {/* Botón de cierre */}
            <Button
              onClick={handleClose}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Entendido
            </Button>
          </div>
        ) : (
          // Formulario de contacto
          <div className="space-y-4">
            <DialogHeader>
              <div className="flex items-center justify-between w-full">
                <div>
                  <DialogTitle className="text-2xl">¿Hablamos?</DialogTitle>
                  <DialogDescription>
                    Cuéntanos tu situación y te contactaremos para ayudarte
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos *</Label>
                  <Input
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    placeholder="Tus apellidos"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+34 600 000 000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje (Opcional)</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos más sobre tu situación..."
                  className="min-h-24"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Al continuar aceptas nuestra política de privacidad. 
                Tus datos estarán protegidos y solo los usaremos para contactarte.
              </p>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;