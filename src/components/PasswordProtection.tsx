import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { toast } from "sonner";

interface PasswordProtectionProps {
  onAccessGranted: () => void;
}

const PasswordProtection = ({ onAccessGranted }: PasswordProtectionProps) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const correctPassword = import.meta.env.VITE_ACCESS_PASSWORD;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular verificación
    setTimeout(() => {
      if (!correctPassword) {
        toast.error("Configuración de contraseña no encontrada");
        setPassword("");
      } else if (password === correctPassword) {
        toast.success("Acceso concedido");
        onAccessGranted();
      } else {
        toast.error("Contraseña incorrecta");
        setPassword("");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Acceso Restringido</CardTitle>
          <CardDescription>
            Esta página requiere contraseña para acceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !password}
            >
              {isLoading ? "Verificando..." : "Acceder"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordProtection;