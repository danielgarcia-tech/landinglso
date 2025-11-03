import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

interface LSOQuestion {
  id: string;
  question: string;
  description?: string;
  type: 'select' | 'radio' | 'text';
  options?: { label: string; value: string }[];
  required: boolean;
}

const LSO_QUESTIONS: LSOQuestion[] = [
  {
    id: 'debtType',
    question: '1. ¿Cuál es tu tipo de deuda principal?',
    description: 'Selecciona la categoría que mejor describe tu situación',
    type: 'select',
    options: [
      { label: 'Tarjetas de crédito/revolving', value: 'tarjetas' },
      { label: 'Préstamos bancarios', value: 'prestamos' },
      { label: 'Hipoteca', value: 'hipoteca' },
      { label: 'Deudas de negocio (autónomo)', value: 'autonomo' },
      { label: 'Deudas públicas (Hacienda, SS)', value: 'publicas' },
      { label: 'Mixto (varias tipos)', value: 'mixto' }
    ],
    required: true
  },
  {
    id: 'debtAmount',
    question: '2. ¿Cuál es tu deuda total aproximada?',
    description: 'Incluye todas tus deudas sin importar el tipo',
    type: 'select',
    options: [
      { label: 'Menos de 10.000 €', value: 'menos-10k' },
      { label: '10.000 € - 30.000 €', value: '10k-30k' },
      { label: '30.000 € - 50.000 €', value: '30k-50k' },
      { label: '50.000 € - 100.000 €', value: '50k-100k' },
      { label: 'Más de 100.000 €', value: 'mas-100k' }
    ],
    required: true
  },
  {
    id: 'multipleCreditors',
    question: '3. ¿Tienes deudas con dos o más acreedores?',
    description: 'Requisito esencial: mínimo 2 acreedores diferentes',
    type: 'radio',
    options: [
      { label: 'Sí, tengo 2 o más acreedores', value: 'yes' },
      { label: 'No, solo con un acreedor', value: 'no' }
    ],
    required: true
  },
  {
    id: 'previousLSO5Years',
    question: '4. ¿Te has acogido a la Segunda Oportunidad en los últimos 5 años con exoneración?',
    description: 'Si obtuviste exoneración de deudas, no puedes volver a solicitarlo en 5 años (o 3 si fue mediante plan de pagos)',
    type: 'radio',
    options: [
      { label: 'Sí, me acogí hace menos de 5 años con exoneración', value: 'yes-5' },
      { label: 'Sí, me acogí hace menos de 3 años con plan de pagos', value: 'yes-3' },
      { label: 'No, es mi primera vez', value: 'no' }
    ],
    required: true
  },
  {
    id: 'criminalRecord',
    question: '5.1 ¿Has sido condenado en los últimos 10 años por delitos patrimoniales o contra el orden socioeconómico?',
    description: 'Incluye: falsedad documental, fraude a Hacienda, incumplimiento de obligaciones laborales, etc.',
    type: 'radio',
    options: [
      { label: 'No, no tengo antecedentes penales', value: 'no' },
      { label: 'Sí, he sido condenado', value: 'yes' }
    ],
    required: true
  },
  {
    id: 'taxSanctions',
    question: '5.2 ¿Has sido sancionado en los últimos 10 años por infracciones tributarias muy graves, de seguridad social u orden social?',
    description: 'Sanciones por Hacienda, Seguridad Social u organismos laborales',
    type: 'radio',
    options: [
      { label: 'No, no tengo sanciones graves', value: 'no' },
      { label: 'Sí, he sido sancionado', value: 'yes' }
    ],
    required: true
  },
  {
    id: 'bankruptcyHistory',
    question: '5.3 ¿Has sido declarado persona afectada por calificación culpable en otro concurso en los últimos 10 años?',
    description: 'Hace referencia a insolvencias anteriores declaradas con culpa',
    type: 'radio',
    options: [
      { label: 'No, no tengo antecedentes de insolvencia', value: 'no' },
      { label: 'Sí, he tenido concurso culpable', value: 'yes' }
    ],
    required: true
  },
  {
    id: 'reckless',
    question: '5.4 ¿Tuviste comportamiento temerario o negligente al contraer tus deudas?',
    description: 'Por ejemplo: endeudamiento irresponsable, gastos excesivos sin ingresos para pagarlos, etc.',
    type: 'radio',
    options: [
      { label: 'No, fui responsable al contraer mis deudas', value: 'no' },
      { label: 'Sí, cometí excesos en el endeudamiento', value: 'yes' }
    ],
    required: true
  },
  {
    id: 'honesty',
    question: '5.5 & 5.6 ¿Has actuado con honestidad y transparencia?',
    description: 'Confirma que no has proporcionado información falsa ni ocultado bienes',
    type: 'radio',
    options: [
      { label: 'Sí, actuaré con total transparencia', value: 'yes' },
      { label: 'No, he ocultado información', value: 'no' }
    ],
    required: true
  }
];

const ASSET_QUESTIONS: LSOQuestion[] = [
  {
    id: 'housing',
    question: '¿Tienes vivienda en propiedad?',
    description: 'Indica si posees una vivienda a tu nombre o en copropiedad',
    type: 'radio',
    options: [
      { label: 'Sí, tengo vivienda en propiedad', value: 'yes' },
      { label: 'No, no tengo vivienda propia', value: 'no' }
    ],
    required: true
  },
  {
    id: 'vehicles',
    question: '¿Tienes vehículos a tu nombre?',
    description: 'Incluye coches, motos, o cualquier vehículo motorizado',
    type: 'radio',
    options: [
      { label: 'Sí, tengo uno o más vehículos', value: 'yes' },
      { label: 'No, no tengo vehículos', value: 'no' }
    ],
    required: true
  },
  {
    id: 'vehiclePayment',
    question: '¿El vehículo está pagado o lo tienes financiado?',
    description: 'Si tienes vehículo, indica su situación financiera',
    type: 'radio',
    options: [
      { label: 'Completamente pagado', value: 'paid' },
      { label: 'Financiado (con cuota mensual)', value: 'financed' },
      { label: 'Leasing o renting', value: 'leasing' }
    ],
    required: true
  },
  {
    id: 'vehicleValue',
    question: '¿Cuál es el valor aproximado de tu vehículo?',
    description: 'Valor de mercado actual del vehículo',
    type: 'select',
    options: [
      { label: 'Menos de 3.000 €', value: 'menos-3k' },
      { label: '3.000 € - 15.000 €', value: '3k-15k' },
      { label: '15.000 € - 30.000 €', value: '15k-30k' },
      { label: 'Más de 30.000 €', value: 'mas-30k' }
    ],
    required: true
  }
];

const LSOQuestionnaire: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [assetStage, setAssetStage] = useState<"idle" | "collecting" | "done">("idle");
  const [assetAnswers, setAssetAnswers] = useState<Record<string, string>>({});
  const [currentAssetStep, setCurrentAssetStep] = useState(0);

  const currentQuestion = assetStage === 'collecting' ? ASSET_QUESTIONS[currentAssetStep] : LSO_QUESTIONS[currentStep];
  const progress = assetStage === 'collecting' 
    ? 100 // Asset questions are additional
    : ((currentStep) / LSO_QUESTIONS.length) * 100;

  const handleAnswer = (value: string) => {
    if (assetStage === 'collecting') {
      setAssetAnswers({
        ...assetAnswers,
        [currentQuestion.id]: value
      });
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: value
      });
    }
  };

  const getCurrentAnswer = () => {
    if (assetStage === 'collecting') {
      return assetAnswers[currentQuestion.id] || '';
    }
    return answers[currentQuestion.id] || '';
  };

  const getNextAssetStep = () => {
    if (currentAssetStep === 0) { // Just answered housing
      return 1; // Go to vehicles
    } else if (currentAssetStep === 1) { // Just answered vehicles
      if (assetAnswers['vehicles'] === 'yes') {
        return 2; // Go to vehicle payment
      } else {
        return ASSET_QUESTIONS.length; // Skip to end
      }
    } else if (currentAssetStep === 2) { // Just answered vehicle payment
      return 3; // Go to vehicle value
    }
    return ASSET_QUESTIONS.length; // End
  };

  const handleNext = () => {
    const currentAnswer = getCurrentAnswer();
    if (!currentAnswer && currentQuestion.required) {
      toast.error('Por favor, responde esta pregunta para continuar');
      return;
    }

    if (assetStage === 'collecting') {
      const nextStep = getNextAssetStep();
      if (nextStep < ASSET_QUESTIONS.length) {
        setCurrentAssetStep(nextStep);
      }
    } else {
      if (currentStep < LSO_QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (assetStage === 'collecting') {
      if (currentAssetStep > 0) {
        setCurrentAssetStep(currentAssetStep - 1);
      }
    } else {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const calculateEligibility = () => {
    let eligible = true;
    const issues: string[] = [];

    // Verificar requisitos críticos
    if (answers['multipleCreditors'] !== 'yes') {
      eligible = false;
      issues.push('Necesitas tener deudas con al menos 2 acreedores diferentes');
    }

    if (answers['previousLSO5Years'] === 'yes-5' || answers['previousLSO5Years'] === 'yes-3') {
      eligible = false;
      issues.push('No puedes acogerte a Segunda Oportunidad si ya lo hiciste recientemente con exoneración');
    }

    if (answers['criminalRecord'] === 'yes') {
      eligible = false;
      issues.push('Condenas penales en los últimos 10 años por delitos patrimoniales');
    }

    if (answers['taxSanctions'] === 'yes') {
      eligible = false;
      issues.push('Sanciones graves de Hacienda o Seguridad Social en los últimos 10 años');
    }

    if (answers['bankruptcyHistory'] === 'yes') {
      eligible = false;
      issues.push('Antecedentes de insolvencia con calificación culpable');
    }

    if (answers['reckless'] === 'yes') {
      eligible = false;
      issues.push('Comportamiento temerario en la contratación de deudas');
    }

    if (answers['honesty'] === 'no') {
      eligible = false;
      issues.push('Falta de honestidad y transparencia en los datos proporcionados');
    }

    return { eligible, issues };
  };

  const handleSubmit = async () => {
    if (!answers[currentQuestion.id] && currentQuestion.required) {
      toast.error('Por favor, responde la última pregunta');
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí puedes enviar los datos a tu backend
      console.log('Respuestas del cuestionario LSO:', answers);
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const eligibility = calculateEligibility();
      
      if (eligibility.eligible) {
        setAssetStage('collecting');
        toast.success('¡Excelente! Ahora necesitamos información sobre tus activos.');
      } else {
        setShowResults(true);
        toast.success('Cuestionario completado. Analizando tu elegibilidad...');
      }
    } catch (error) {
      toast.error('Error al procesar el cuestionario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssetSubmit = async () => {
    const currentAnswer = getCurrentAnswer();
    if (!currentAnswer && currentQuestion.required) {
      toast.error('Por favor, responde la última pregunta');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Respuestas de activos:', assetAnswers);
      
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAssetStage('done');
      setShowResults(true);
      toast.success('Información de activos completada. Procesando resultados finales...');
    } catch (error) {
      toast.error('Error al procesar la información de activos');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { eligible, issues } = calculateEligibility();

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {eligible ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  ¡Buenas Noticias!
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  Resultado del Análisis
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {eligible ? (
              <>
                <p className="text-green-600 font-semibold">
                  ✓ Potencialmente elegible para la Ley de Segunda Oportunidad
                </p>
                {assetStage === 'done' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                    <p className="text-blue-800 font-semibold">
                      📋 Consideramos que tu concurso sería SIN MASA
                    </p>
                    <p className="text-sm text-blue-700">
                      Basado en la información proporcionada sobre tus activos, tu procedimiento de insolvencia probablemente se tramitaría como concurso sin masa, lo que significa que no tendrías que liquidar bienes para pagar a tus acreedores.
                    </p>
                    <p className="text-sm text-blue-700 font-medium">
                      Documentación necesaria para continuar:
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1 ml-4">
                      <li>• DNI/NIE de todos los miembros de la unidad familiar</li>
                      <li>• Nóminas o justificante de ingresos de los últimos 6 meses</li>
                      <li>• Extractos bancarios de los últimos 6 meses</li>
                      <li>• Listado completo de deudas con acreedores</li>
                      <li>• Escrituras de propiedad (si tienes vivienda)</li>
                      <li>• Permiso de circulación (si tienes vehículos)</li>
                    </ul>
                    <p className="text-sm text-blue-700 mt-3">
                      Te enviaremos un email con toda la información detallada y los siguientes pasos.
                    </p>
                  </div>
                )}
                <p className="text-sm text-gray-600">
                  Basado en tus respuestas, pareces cumplir con los requisitos básicos. Un abogado especializado revisará tu caso en detalle.
                </p>
              </>
            ) : (
              <>
                <p className="text-red-600 font-semibold">
                  Requisitos no cumplidos:
                </p>
                <ul className="space-y-2">
                  {issues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-500 flex gap-2">
                      <span>•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Aunque estos puntos nos preocupan, te recomendamos que hables con nuestros abogados. Pueden haber excepciones o soluciones alternativas.
                </p>
              </>
            )}
            
            <Button 
              onClick={() => {
                setShowResults(false);
                setCurrentStep(0);
                setAnswers({});
                setAssetStage('idle');
                setAssetAnswers({});
                setCurrentAssetStep(0);
              }}
              className="w-full mt-6"
            >
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calcular el stepper
  const totalSteps = assetStage === 'collecting' ? ASSET_QUESTIONS.length : LSO_QUESTIONS.length;
  const activeStep = assetStage === 'collecting' ? currentAssetStep : currentStep;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl animate-scale-in">
        <CardHeader>
          <div className="space-y-4">
            {/* Stepper Moderno */}
            <div className="w-full overflow-x-auto pb-4">
              <div className="flex items-center justify-between min-w-max px-2">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 flex-shrink-0 ${
                          activeStep === idx
                            ? 'bg-primary text-white shadow-lg scale-110'
                            : idx < activeStep
                            ? 'bg-primary/70 text-white'
                            : 'bg-muted text-gray-400 border-2 border-gray-300'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <span className={`text-xs mt-2 text-center max-w-[60px] font-medium ${activeStep === idx ? 'text-primary' : 'text-muted-foreground'}`}>
                        Paso {idx + 1}
                      </span>
                    </div>
                    {idx < totalSteps - 1 && (
                      <div className={`flex-1 h-1 rounded-full mx-2 transition-all duration-300 ${idx < activeStep ? 'bg-primary' : 'bg-muted'}`} style={{ minWidth: '40px' }}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div>
              <CardTitle className="text-2xl">
                {assetStage === 'collecting' ? 'Información de Activos' : 'Cuestionario LSO - Evaluación de Elegibilidad'}
              </CardTitle>
              <CardDescription>
                {assetStage === 'collecting' 
                  ? `Pregunta ${currentAssetStep + 1} de ${ASSET_QUESTIONS.length}`
                  : `Pregunta ${currentStep + 1} de ${LSO_QUESTIONS.length}`
                }
              </CardDescription>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progreso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2 animate-fade-in">
            <Label className="text-lg font-semibold text-foreground">
              {currentQuestion.question}
            </Label>
            {currentQuestion.description && (
              <p className="text-sm text-muted-foreground">
                {currentQuestion.description}
              </p>
            )}
          </div>

          <div className="space-y-3 animate-slide-in-right">
            {currentQuestion.type === 'select' && (
              <Select 
                value={getCurrentAnswer()}
                onValueChange={handleAnswer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción..." />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestion.options?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {currentQuestion.type === 'radio' && (
              <RadioGroup 
                value={getCurrentAnswer()} 
                onValueChange={handleAnswer}
              >
                <div className="space-y-3">
                  {currentQuestion.options?.map(option => (
                    <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label 
                        htmlFor={option.value} 
                        className="font-normal cursor-pointer flex-1"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={(assetStage === 'collecting' ? currentAssetStep === 0 : currentStep === 0)}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            {assetStage === 'collecting' ? (
              getNextAssetStep() < ASSET_QUESTIONS.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!getCurrentAnswer() && currentQuestion.required}
                  className="flex-1"
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleAssetSubmit}
                  disabled={isSubmitting || (!getCurrentAnswer() && currentQuestion.required)}
                  className="flex-1"
                >
                  {isSubmitting ? 'Procesando...' : 'Finalizar Información'}
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              )
            ) : (
              currentStep < LSO_QUESTIONS.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={!getCurrentAnswer() && currentQuestion.required}
                  className="flex-1"
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || (!getCurrentAnswer() && currentQuestion.required)}
                  className="flex-1"
                >
                  {isSubmitting ? 'Procesando...' : 'Finalizar Evaluación'}
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LSOQuestionnaire;