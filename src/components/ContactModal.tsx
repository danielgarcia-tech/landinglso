import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Send, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to webhook
      const formDataWebhook = new URLSearchParams();
      formDataWebhook.append('name', formData.nombre);
      formDataWebhook.append('apellidos', formData.apellidos);
      formDataWebhook.append('telefono', formData.telefono);
      formDataWebhook.append('correo', formData.email);
      formDataWebhook.append('timestamp', new Date().toISOString());

      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "no-cors",
        body: formDataWebhook.toString(),
      });

      // Save to Supabase
      const { error } = await supabase
        .from('consultas')
        .insert([{
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          mensaje: formData.mensaje || null,
        }]);

      if (error) throw error;

      toast.success("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.");
      setFormData({ nombre: "", apellidos: "", email: "", telefono: "", mensaje: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl">¿Hablamos?</DialogTitle>
          <DialogDescription>
            Cuéntanos tu situación y te contactaremos para ayudarte
          </DialogDescription>
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
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;