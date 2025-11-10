import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { AlertCircle, FileText, Euro, Home, User, Calendar, Building2, CreditCard } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface LSOFormData {
  // Datos personales
  nombre: string;
  apellidos: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  direccion: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  
  // Situación familiar
  estadoCivil: 'soltero' | 'casado' | 'separado' | 'divorciado' | 'viudo' | '';
  regimenMatrimonial: 'gananciales' | 'separacion_bienes' | 'participacion_ganancial' | 'otros' | '';
  regimenMatrimonialDetalle: string;
  fechaMatrimonio: string;
  fechaSeparacion: string;
  convenioSeparacion: boolean;
  numeroDependientes: number;
  
  // Situación laboral
  situacionLaboral: 'empleado' | 'autonomo' | 'desempleado' | 'jubilado' | 'incapacidad' | '';
  ingresosMensuales: number;
  empresaTrabajo: string;
  tiempoEmpleo: string;
  
  // Patrimonio e ingresos
  viviendaHabitual: boolean;
  valorVivienda: number;
  referenciaCatastral: string;
  tieneHipoteca: boolean;
  hipotecaPendiente: number;
  otrosBienes: string;
  valorOtrosBienes: number;
  tieneVehiculo: boolean;
  matricula: string;
  fechaMatriculacion: string;
  valorVehiculo: number;
  cuentasBancarias: number;
  pensiones: number;
  otrosIngresos: string;
  valorOtrosIngresos: number;
  
  // Gastos mensuales
  gastoVivienda: number;
  gastoAlimentacion: number;
  gastoTransporte: number;
  gastoSalud: number;
  gastoEducacion: number;
  otrosGastos: number;
  
  // Deudas
  deudaHipotecaria: number;
  deudaBancaria: number;
  deudaTarjetasCredito: number;
  deudaProveedores: number;
  deudaHacienda: number;
  deudaSeguridadSocial: number;
  otrasDeudas: string;
  importeOtrasDeudas: number;
  
  // Situación actual
  procedimientoEjecucion: boolean;
  embargos: boolean;
  concursoPrevio: boolean;
  acuerdoExtrajudicial: boolean;
  
  // Documentación
  documentosDisponibles: string[];
  
  // Observaciones
  situacionEspecial: string;
  observaciones: string;
}

interface LSOFormProps {
  onClose: () => void;
}

const LSOForm: React.FC<LSOFormProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LSOFormData>({
    nombre: '',
    apellidos: '',
    dni: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    
    estadoCivil: '',
    regimenMatrimonial: '',
    regimenMatrimonialDetalle: '',
    fechaMatrimonio: '',
    fechaSeparacion: '',
    convenioSeparacion: false,
    numeroDependientes: 0,
    
    situacionLaboral: '',
    ingresosMensuales: 0,
    empresaTrabajo: '',
    tiempoEmpleo: '',
    
    viviendaHabitual: false,
    valorVivienda: 0,
    referenciaCatastral: '',
    tieneHipoteca: false,
    hipotecaPendiente: 0,
    otrosBienes: '',
    valorOtrosBienes: 0,
    tieneVehiculo: false,
    matricula: '',
    fechaMatriculacion: '',
    valorVehiculo: 0,
    cuentasBancarias: 0,
    pensiones: 0,
    otrosIngresos: '',
    valorOtrosIngresos: 0,
    
    gastoVivienda: 0,
    gastoAlimentacion: 0,
    gastoTransporte: 0,
    gastoSalud: 0,
    gastoEducacion: 0,
    otrosGastos: 0,
    
    deudaHipotecaria: 0,
    deudaBancaria: 0,
    deudaTarjetasCredito: 0,
    deudaProveedores: 0,
    deudaHacienda: 0,
    deudaSeguridadSocial: 0,
    otrasDeudas: '',
    importeOtrasDeudas: 0,
    
    procedimientoEjecucion: false,
    embargos: false,
    concursoPrevio: false,
    acuerdoExtrajudicial: false,
    
    documentosDisponibles: [],
    
    situacionEspecial: '',
    observaciones: ''
  });

  const updateFormData = useCallback((field: keyof LSOFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://justiflow.com/webhook/lsoinicial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo: 'formulario_lso_oficial',
          datos: formData,
          fecha: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert('Formulario enviado correctamente. Nos pondremos en contacto contigo en breve.');
        onClose();
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Datos Personales</h3>
              <p className="text-gray-600 mt-2">Información básica del solicitante</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => updateFormData('nombre', e.target.value)}
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div>
                <Label htmlFor="apellidos">Apellidos *</Label>
                <Input
                  id="apellidos"
                  value={formData.apellidos}
                  onChange={(e) => updateFormData('apellidos', e.target.value)}
                  placeholder="Apellidos completos"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dni">DNI/NIE *</Label>
                <Input
                  id="dni"
                  value={formData.dni}
                  onChange={(e) => updateFormData('dni', e.target.value)}
                  placeholder="12345678A"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento *</Label>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={(e) => updateFormData('fechaNacimiento', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => updateFormData('telefono', e.target.value)}
                  placeholder="600 123 456"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="ejemplo@email.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="direccion">Dirección Completa *</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => updateFormData('direccion', e.target.value)}
                  placeholder="Calle, número, piso, puerta"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="codigoPostal">Código Postal *</Label>
                  <Input
                    id="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={(e) => updateFormData('codigoPostal', e.target.value)}
                    placeholder="28001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ciudad">Ciudad *</Label>
                  <Input
                    id="ciudad"
                    value={formData.ciudad}
                    onChange={(e) => updateFormData('ciudad', e.target.value)}
                    placeholder="Madrid"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="provincia">Provincia *</Label>
                  <Input
                    id="provincia"
                    value={formData.provincia}
                    onChange={(e) => updateFormData('provincia', e.target.value)}
                    placeholder="Madrid"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Home className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Situación Familiar</h3>
              <p className="text-gray-600 mt-2">Estado civil y dependientes económicos</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Estado Civil *</Label>
                <RadioGroup
                  value={formData.estadoCivil}
                  onValueChange={(value) => updateFormData('estadoCivil', value)}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="soltero" id="soltero" />
                    <Label htmlFor="soltero">Soltero/a</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casado" id="casado" />
                    <Label htmlFor="casado">Casado/a</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="separado" id="separado" />
                    <Label htmlFor="separado">Separado/a</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="divorciado" id="divorciado" />
                    <Label htmlFor="divorciado">Divorciado/a</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="viudo" id="viudo" />
                    <Label htmlFor="viudo">Viudo/a</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {(formData.estadoCivil === 'casado' || formData.estadoCivil === 'separado') && (
                <>
                  <div>
                    <Label>Régimen Matrimonial *</Label>
                    <select
                      value={formData.regimenMatrimonial}
                      onChange={(e) => updateFormData('regimenMatrimonial', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Seleccione un régimen</option>
                      <option value="gananciales">Gananciales</option>
                      <option value="separacion_bienes">Separación de bienes</option>
                      <option value="participacion_ganancial">Participación en las ganancias</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>
                  
                  {formData.regimenMatrimonial && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">Información adicional del régimen matrimonial</h4>
                      
                      {formData.regimenMatrimonial === 'gananciales' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fechaMatrimonio">Fecha de matrimonio</Label>
                            <Input
                              id="fechaMatrimonio"
                              type="date"
                              value={formData.fechaMatrimonio}
                              onChange={(e) => updateFormData('fechaMatrimonio', e.target.value)}
                            />
                          </div>
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Régimen de gananciales:</strong> Los bienes adquiridos durante el matrimonio son propiedad común de ambos cónyuges. 
                              Necesitaremos información sobre los bienes gananciales y su valoración.
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                      
                      {formData.regimenMatrimonial === 'separacion_bienes' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fechaMatrimonio">Fecha de matrimonio</Label>
                            <Input
                              id="fechaMatrimonio"
                              type="date"
                              value={formData.fechaMatrimonio}
                              onChange={(e) => updateFormData('fechaMatrimonio', e.target.value)}
                            />
                          </div>
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Separación de bienes:</strong> Cada cónyuge mantiene la propiedad individual de sus bienes. 
                              Necesitaremos información detallada sobre sus bienes personales.
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                      
                      {formData.regimenMatrimonial === 'participacion_ganancial' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fechaMatrimonio">Fecha de matrimonio</Label>
                            <Input
                              id="fechaMatrimonio"
                              type="date"
                              value={formData.fechaMatrimonio}
                              onChange={(e) => updateFormData('fechaMatrimonio', e.target.value)}
                            />
                          </div>
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Participación en las ganancias:</strong> Régimen mixto donde cada cónyuge mantiene sus bienes pero participa en las ganancias del otro. 
                              Necesitaremos información sobre los bienes adquiridos durante el matrimonio.
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                      
                      {formData.regimenMatrimonial === 'otros' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fechaMatrimonio">Fecha de matrimonio</Label>
                            <Input
                              id="fechaMatrimonio"
                              type="date"
                              value={formData.fechaMatrimonio}
                              onChange={(e) => updateFormData('fechaMatrimonio', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="regimenMatrimonialDetalle">Especifique el régimen matrimonial</Label>
                            <Input
                              id="regimenMatrimonialDetalle"
                              value={formData.regimenMatrimonialDetalle}
                              onChange={(e) => updateFormData('regimenMatrimonialDetalle', e.target.value)}
                              placeholder="Describa el régimen matrimonial específico"
                            />
                          </div>
                        </div>
                      )}
                      {/* Detalle general (opcional) */}
                      {formData.regimenMatrimonial && (
                        <div className="mt-3">
                          <Label htmlFor="regimenMatrimonialDetalle">Detalle adicional del régimen (opcional)</Label>
                          <Textarea
                            id="regimenMatrimonialDetalle"
                            value={formData.regimenMatrimonialDetalle}
                            onChange={(e) => updateFormData('regimenMatrimonialDetalle', e.target.value)}
                            placeholder="Añada observaciones sobre el régimen matrimonial"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              
              {(formData.estadoCivil === 'separado' || formData.estadoCivil === 'divorciado') && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fechaSeparacion">Fecha de separación/divorcio</Label>
                    <Input
                      id="fechaSeparacion"
                      type="date"
                      value={formData.fechaSeparacion}
                      onChange={(e) => updateFormData('fechaSeparacion', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="convenioSeparacion"
                      checked={formData.convenioSeparacion}
                      onCheckedChange={(checked) => updateFormData('convenioSeparacion', checked)}
                    />
                    <Label htmlFor="convenioSeparacion" className="text-sm">
                      ¿Firmaron convenio regulador de separación/divorcio?
                    </Label>
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="numeroDependientes">Número de Dependientes Económicos</Label>
                <Input
                  id="numeroDependientes"
                  type="number"
                  min="0"
                  value={formData.numeroDependientes}
                  onChange={(e) => updateFormData('numeroDependientes', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">Hijos menores, personas mayores a cargo, etc.</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Building2 className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Situación Laboral</h3>
              <p className="text-gray-600 mt-2">Información sobre empleo e ingresos</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Situación Laboral Actual *</Label>
                <RadioGroup
                  value={formData.situacionLaboral}
                  onValueChange={(value) => updateFormData('situacionLaboral', value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="empleado" id="empleado" />
                    <Label htmlFor="empleado">Empleado por cuenta ajena</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="autonomo" id="autonomo" />
                    <Label htmlFor="autonomo">Autónomo/Empresario</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="desempleado" id="desempleado" />
                    <Label htmlFor="desempleado">Desempleado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="jubilado" id="jubilado" />
                    <Label htmlFor="jubilado">Jubilado/Pensionista</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="incapacidad" id="incapacidad" />
                    <Label htmlFor="incapacidad">Incapacidad</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="ingresosMensuales">Ingresos Mensuales Netos (€)</Label>
                <Input
                  id="ingresosMensuales"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.ingresosMensuales}
                  onChange={(e) => updateFormData('ingresosMensuales', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
              
              {(formData.situacionLaboral === 'empleado' || formData.situacionLaboral === 'autonomo') && (
                <>
                  <div>
                    <Label htmlFor="empresaTrabajo">Empresa/Actividad</Label>
                    <Input
                      id="empresaTrabajo"
                      value={formData.empresaTrabajo}
                      onChange={(e) => updateFormData('empresaTrabajo', e.target.value)}
                      placeholder="Nombre de la empresa o descripción de la actividad"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tiempoEmpleo">Tiempo en el empleo/actividad</Label>
                    <Input
                      id="tiempoEmpleo"
                      value={formData.tiempoEmpleo}
                      onChange={(e) => updateFormData('tiempoEmpleo', e.target.value)}
                      placeholder="2 años, 6 meses, etc."
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Home className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Patrimonio e Ingresos</h3>
              <p className="text-gray-600 mt-2">Bienes, propiedades y otras fuentes de ingresos</p>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Vivienda Habitual</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="viviendaHabitual"
                      checked={formData.viviendaHabitual}
                      onCheckedChange={(checked) => updateFormData('viviendaHabitual', checked)}
                    />
                    <Label htmlFor="viviendaHabitual">Posee vivienda habitual en propiedad</Label>
                  </div>
                  {formData.viviendaHabitual && (
                    <>
                      <div>
                        <Label htmlFor="valorVivienda">Valor aproximado de la vivienda (€)</Label>
                        <Input
                          id="valorVivienda"
                          type="number"
                          min="0"
                          value={formData.valorVivienda}
                          onChange={(e) => updateFormData('valorVivienda', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="referenciaCatastral">Referencia catastral (si dispone)</Label>
                        <Input
                          id="referenciaCatastral"
                          value={formData.referenciaCatastral}
                          onChange={(e) => updateFormData('referenciaCatastral', e.target.value)}
                          placeholder="XXXXXXXXX"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tieneHipoteca"
                          checked={formData.tieneHipoteca}
                          onCheckedChange={(checked) => updateFormData('tieneHipoteca', checked)}
                        />
                        <Label htmlFor="tieneHipoteca">¿Tiene hipoteca sobre la vivienda?</Label>
                      </div>
                      {formData.tieneHipoteca && (
                        <div>
                          <Label htmlFor="hipotecaPendiente">Cuantía restante de la hipoteca (€)</Label>
                          <Input
                            id="hipotecaPendiente"
                            type="number"
                            min="0"
                            value={formData.hipotecaPendiente}
                            onChange={(e) => updateFormData('hipotecaPendiente', parseFloat(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Vehículos</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tieneVehiculo"
                      checked={formData.tieneVehiculo}
                      onCheckedChange={(checked) => updateFormData('tieneVehiculo', checked)}
                    />
                    <Label htmlFor="tieneVehiculo">Posee vehículo</Label>
                  </div>
                  {formData.tieneVehiculo && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="matricula">Matrícula</Label>
                        <Input
                          id="matricula"
                          value={formData.matricula}
                          onChange={(e) => updateFormData('matricula', e.target.value)}
                          placeholder="1234ABC"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fechaMatriculacion">Fecha de matriculación</Label>
                        <Input
                          id="fechaMatriculacion"
                          type="date"
                          value={formData.fechaMatriculacion}
                          onChange={(e) => updateFormData('fechaMatriculacion', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="valorVehiculo">Valor aproximado (€)</Label>
                        <Input
                          id="valorVehiculo"
                          type="number"
                          min="0"
                          value={formData.valorVehiculo}
                          onChange={(e) => updateFormData('valorVehiculo', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Otros Bienes y Derechos</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="otrosBienes">Descripción de otros bienes</Label>
                    <Textarea
                      id="otrosBienes"
                      value={formData.otrosBienes}
                      onChange={(e) => updateFormData('otrosBienes', e.target.value)}
                      placeholder="Vehículos, inmuebles en alquiler, participaciones empresariales, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="valorOtrosBienes">Valor aproximado (€)</Label>
                    <Input
                      id="valorOtrosBienes"
                      type="number"
                      min="0"
                      value={formData.valorOtrosBienes}
                      onChange={(e) => updateFormData('valorOtrosBienes', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cuentasBancarias">Saldo total en cuentas bancarias (€)</Label>
                    <Input
                      id="cuentasBancarias"
                      type="number"
                      min="0"
                      value={formData.cuentasBancarias}
                      onChange={(e) => updateFormData('cuentasBancarias', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Otros Ingresos</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="pensiones">Pensiones/Prestaciones (€/mes)</Label>
                    <Input
                      id="pensiones"
                      type="number"
                      min="0"
                      value={formData.pensiones}
                      onChange={(e) => updateFormData('pensiones', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="otrosIngresos">Otros ingresos (descripción)</Label>
                    <Input
                      id="otrosIngresos"
                      value={formData.otrosIngresos}
                      onChange={(e) => updateFormData('otrosIngresos', e.target.value)}
                      placeholder="Alquileres, dividendos, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="valorOtrosIngresos">Importe mensual (€)</Label>
                    <Input
                      id="valorOtrosIngresos"
                      type="number"
                      min="0"
                      value={formData.valorOtrosIngresos}
                      onChange={(e) => updateFormData('valorOtrosIngresos', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Euro className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Gastos Mensuales</h3>
              <p className="text-gray-600 mt-2">Detalle de gastos ordinarios mensuales</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gastoVivienda">Gastos de vivienda (€/mes)</Label>
                  <Input
                    id="gastoVivienda"
                    type="number"
                    min="0"
                    value={formData.gastoVivienda}
                    onChange={(e) => updateFormData('gastoVivienda', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500">Alquiler, hipoteca, suministros, comunidad</p>
                </div>
                <div>
                  <Label htmlFor="gastoAlimentacion">Alimentación (€/mes)</Label>
                  <Input
                    id="gastoAlimentacion"
                    type="number"
                    min="0"
                    value={formData.gastoAlimentacion}
                    onChange={(e) => updateFormData('gastoAlimentacion', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="gastoTransporte">Transporte (€/mes)</Label>
                  <Input
                    id="gastoTransporte"
                    type="number"
                    min="0"
                    value={formData.gastoTransporte}
                    onChange={(e) => updateFormData('gastoTransporte', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500">Combustible, transporte público, mantenimiento</p>
                </div>
                <div>
                  <Label htmlFor="gastoSalud">Gastos de salud (€/mes)</Label>
                  <Input
                    id="gastoSalud"
                    type="number"
                    min="0"
                    value={formData.gastoSalud}
                    onChange={(e) => updateFormData('gastoSalud', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500">Seguros médicos, medicamentos, tratamientos</p>
                </div>
                <div>
                  <Label htmlFor="gastoEducacion">Educación (€/mes)</Label>
                  <Input
                    id="gastoEducacion"
                    type="number"
                    min="0"
                    value={formData.gastoEducacion}
                    onChange={(e) => updateFormData('gastoEducacion', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500">Colegios, universidad, formación</p>
                </div>
                <div>
                  <Label htmlFor="otrosGastos">Otros gastos (€/mes)</Label>
                  <Input
                    id="otrosGastos"
                    type="number"
                    min="0"
                    value={formData.otrosGastos}
                    onChange={(e) => updateFormData('otrosGastos', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500">Seguros, ocio, vestimenta, etc.</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Total Gastos Mensuales</h4>
                <p className="text-2xl font-bold text-blue-700">
                  {(formData.gastoVivienda + formData.gastoAlimentacion + formData.gastoTransporte + 
                    formData.gastoSalud + formData.gastoEducacion + formData.otrosGastos).toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                </p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CreditCard className="mx-auto h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Deudas Actuales</h3>
              <p className="text-gray-600 mt-2">Detalle completo de todas las deudas pendientes</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deudaHipotecaria">Deuda hipotecaria (€)</Label>
                  <Input
                    id="deudaHipotecaria"
                    type="number"
                    min="0"
                    value={formData.deudaHipotecaria}
                    onChange={(e) => updateFormData('deudaHipotecaria', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="deudaBancaria">Préstamos bancarios (€)</Label>
                  <Input
                    id="deudaBancaria"
                    type="number"
                    min="0"
                    value={formData.deudaBancaria}
                    onChange={(e) => updateFormData('deudaBancaria', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="deudaTarjetasCredito">Tarjetas de crédito (€)</Label>
                  <Input
                    id="deudaTarjetasCredito"
                    type="number"
                    min="0"
                    value={formData.deudaTarjetasCredito}
                    onChange={(e) => updateFormData('deudaTarjetasCredito', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="deudaProveedores">Proveedores/Comerciales (€)</Label>
                  <Input
                    id="deudaProveedores"
                    type="number"
                    min="0"
                    value={formData.deudaProveedores}
                    onChange={(e) => updateFormData('deudaProveedores', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="deudaHacienda">Hacienda Pública (€)</Label>
                  <Input
                    id="deudaHacienda"
                    type="number"
                    min="0"
                    value={formData.deudaHacienda}
                    onChange={(e) => updateFormData('deudaHacienda', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="deudaSeguridadSocial">Seguridad Social (€)</Label>
                  <Input
                    id="deudaSeguridadSocial"
                    type="number"
                    min="0"
                    value={formData.deudaSeguridadSocial}
                    onChange={(e) => updateFormData('deudaSeguridadSocial', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Otras Deudas</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="otrasDeudas">Descripción</Label>
                    <Textarea
                      id="otrasDeudas"
                      value={formData.otrasDeudas}
                      onChange={(e) => updateFormData('otrasDeudas', e.target.value)}
                      placeholder="Deudas con particulares, avales, fianzas, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="importeOtrasDeudas">Importe (€)</Label>
                    <Input
                      id="importeOtrasDeudas"
                      type="number"
                      min="0"
                      value={formData.importeOtrasDeudas}
                      onChange={(e) => updateFormData('importeOtrasDeudas', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900">Total Deudas</h4>
                <p className="text-2xl font-bold text-red-700">
                  {(formData.deudaHipotecaria + formData.deudaBancaria + formData.deudaTarjetasCredito + 
                    formData.deudaProveedores + formData.deudaHacienda + formData.deudaSeguridadSocial + 
                    formData.importeOtrasDeudas).toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'EUR'
                    })}
                </p>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Situación Actual</h3>
              <p className="text-gray-600 mt-2">Procedimientos en curso y antecedentes</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="procedimientoEjecucion"
                    checked={formData.procedimientoEjecucion}
                    onCheckedChange={(checked) => updateFormData('procedimientoEjecucion', checked)}
                  />
                  <Label htmlFor="procedimientoEjecucion" className="text-base">
                    Existe algún procedimiento de ejecución en curso
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="embargos"
                    checked={formData.embargos}
                    onCheckedChange={(checked) => updateFormData('embargos', checked)}
                  />
                  <Label htmlFor="embargos" className="text-base">
                    Tiene embargos activos (nómina, cuentas, bienes)
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="concursoPrevio"
                    checked={formData.concursoPrevio}
                    onCheckedChange={(checked) => updateFormData('concursoPrevio', checked)}
                  />
                  <Label htmlFor="concursoPrevio" className="text-base">
                    Ha estado en concurso de acreedores anteriormente
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acuerdoExtrajudicial"
                    checked={formData.acuerdoExtrajudicial}
                    onCheckedChange={(checked) => updateFormData('acuerdoExtrajudicial', checked)}
                  />
                  <Label htmlFor="acuerdoExtrajudicial" className="text-base">
                    Ha intentado un acuerdo extrajudicial de pagos
                  </Label>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Situación Especial</h4>
                <Textarea
                  id="situacionEspecial"
                  value={formData.situacionEspecial}
                  onChange={(e) => updateFormData('situacionEspecial', e.target.value)}
                  placeholder="Describa cualquier circunstancia especial: enfermedad, divorcio reciente, pérdida de empleo, etc."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">Documentación y Observaciones</h3>
              <p className="text-gray-600 mt-2">Documentos disponibles y comentarios adicionales</p>
            </div>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Documentación Disponible</h4>
                <p className="text-sm text-gray-600 mb-4">Marque los documentos de los que dispone actualmente:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'DNI/NIE',
                    'Última declaración de la renta',
                    'Nóminas últimos 6 meses',
                    'Certificado de vida laboral',
                    'Extractos bancarios últimos 6 meses',
                    'Contratos de préstamos/créditos',
                    'Escrituras de propiedad',
                    'Contratos de alquiler',
                    'Facturas de deudas pendientes',
                    'Notificaciones de embargos',
                    'Sentencias judiciales',
                    'Certificado de discapacidad (si aplica)'
                  ].map((doc) => (
                    <div key={doc} className="flex items-center space-x-2">
                      <Checkbox
                        id={doc}
                        checked={formData.documentosDisponibles.includes(doc)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData('documentosDisponibles', [...formData.documentosDisponibles, doc]);
                          } else {
                            updateFormData('documentosDisponibles', 
                              formData.documentosDisponibles.filter(d => d !== doc)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={doc} className="text-sm">{doc}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-4">Observaciones Adicionales</h4>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => updateFormData('observaciones', e.target.value)}
                  placeholder="Añada cualquier información adicional que considere relevante para su caso..."
                  rows={6}
                />
              </div>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Importante:</strong> Toda la información proporcionada será tratada de forma confidencial 
                  y utilizada únicamente para evaluar su situación y determinar la viabilidad del procedimiento de 
                  Segunda Oportunidad. Nos pondremos en contacto con usted en un plazo máximo de 48 horas.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-white border-b z-10">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Cuestionario Oficial - Ley de Segunda Oportunidad
              </CardTitle>
              <p className="text-gray-600">
                Paso {currentStep} de {totalSteps} - Complete todos los campos requeridos
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
          <Progress 
            value={(currentStep / totalSteps) * 100} 
            className="h-2 mt-4"
          />
        </CardHeader>
        
        <CardContent className="p-6">
          {renderStep()}
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Anterior
            </Button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LSOForm;