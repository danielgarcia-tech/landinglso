import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import ConfirmationModal from "./ConfirmationModal";

const WEBHOOK_URL = "https://justiflow.com/webhook/lsoinicial";

const ContactForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    situacion: "",
    deudaTotal: "",
    tipoDeuda: "",
    ingresos: "",
    mensaje: "",
    esAutonomo: undefined as boolean | undefined,
    masDosAcreedores: undefined as boolean | undefined,
    acogidoLso5Anos: undefined as boolean | undefined,
    condenado10Anos: undefined as boolean | undefined,
    sancionado10Anos: undefined as boolean | undefined,
    viviendaPropiedad: undefined as boolean | undefined,
    vehiculoPropiedad: undefined as boolean | undefined,
    vehiculoPagadoCompleto: undefined as boolean | undefined,
    vehiculoModelo: "",
    vehiculoMarca: "",
    vehiculoAnoMatriculacion: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate step 1 data
    const step1Schema = z.object({
      nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
      apellidos: z.string().trim().min(1, "Los apellidos son obligatorios").max(100),
      email: z.string().trim().email("Email inválido").max(255),
      telefono: z.string().trim().min(9, "Teléfono inválido").max(20)
    });

    try {
      step1Schema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

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

      toast.success("Datos enviados correctamente. Nos pondremos en contacto contigo pronto.");
      setShowConfirmation(true);
      
      // Reset form
      setFormData({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        situacion: "",
        deudaTotal: "",
        tipoDeuda: "",
        ingresos: "",
        mensaje: "",
        esAutonomo: undefined,
        masDosAcreedores: undefined,
        acogidoLso5Anos: undefined,
        condenado10Anos: undefined,
        sancionado10Anos: undefined,
        viviendaPropiedad: undefined,
        vehiculoPropiedad: undefined,
        vehiculoPagadoCompleto: undefined,
        vehiculoModelo: "",
        vehiculoMarca: "",
        vehiculoAnoMatriculacion: ""
      });
    } catch (error) {
      console.error("Error sending webhook:", error);
      toast.error("Hubo un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      // Save all data to Supabase
      const { error } = await supabase
        .from('consultas')
        .insert([{
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          situacion: formData.situacion || null,
          deuda_total: formData.deudaTotal || null,
          tipo_deuda: formData.tipoDeuda || null,
          ingresos: formData.ingresos || null,
          mensaje: formData.mensaje || null,
          es_autonomo: formData.esAutonomo ?? null,
          mas_dos_acreedores: formData.masDosAcreedores ?? null,
          acogido_lso_5_anos: formData.acogidoLso5Anos ?? null,
          condenado_10_anos: formData.condenado10Anos ?? null,
          sancionado_10_anos: formData.sancionado10Anos ?? null,
          vivienda_propiedad: formData.viviendaPropiedad ?? null,
          vehiculo_propiedad: formData.vehiculoPropiedad ?? null,
          vehiculo_pagado_completo: formData.vehiculoPagadoCompleto ?? null,
          vehiculo_modelo: formData.vehiculoModelo || null,
          vehiculo_marca: formData.vehiculoMarca || null,
          vehiculo_ano_matriculacion: formData.vehiculoAnoMatriculacion || null
        }]);

      if (error) throw error;

      // Show confirmation modal
      setShowConfirmation(true);
      
      // Reset form
      setFormData({
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        situacion: "",
        deudaTotal: "",
        tipoDeuda: "",
        ingresos: "",
        mensaje: "",
        esAutonomo: undefined,
        masDosAcreedores: undefined,
        acogidoLso5Anos: undefined,
        condenado10Anos: undefined,
        sancionado10Anos: undefined,
        viviendaPropiedad: undefined,
        vehiculoPropiedad: undefined,
        vehiculoPagadoCompleto: undefined,
        vehiculoModelo: "",
        vehiculoMarca: "",
        vehiculoAnoMatriculacion: ""
      });
      setCurrentStep(1);
    } catch (error) {
      toast.error("Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-muted relative">
      <ConfirmationModal 
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        nombre={`${formData.nombre} ${formData.apellidos}`.trim() || "Cliente"}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            📞 Empieza hoy tu nueva vida financiera
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            ¿Listo para olvidarte de tus deudas? Completa este formulario y nos pondremos en contacto contigo para conocer más sobre tu caso.
          </p>
          <p className="text-lg text-muted-foreground">
            La primera consulta es gratuita y sin compromiso.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all bg-primary text-primary-foreground`}>
              1
            </div>
            <span className={`font-medium text-foreground`}>
              Datos de contacto
            </span>
          </div>
        </div>

        <Card className="animate-scale-in border-border shadow-[var(--shadow-soft)] bg-background">
          <CardHeader>
            <CardTitle>
              Datos de contacto
            </CardTitle>
            <CardDescription>
              Comparte tu información básica para que podamos contactarte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStep1Submit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input 
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apellidos">Apellidos *</Label>
                    <Input 
                      id="apellidos"
                      value={formData.apellidos}
                      onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                      placeholder="Tus apellidos"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input 
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      placeholder="+34 600 000 000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Al continuar aceptas nuestra política de privacidad. 
                  Tus datos estarán protegidos y solo los usaremos para contactarte.
                </p>
              </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
