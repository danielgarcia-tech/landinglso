import React, { useState, useEffect } from 'react';
import { X, Calculator, Info, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useModal } from '@/contexts/ModalContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CalculatorModal = () => {
  const { showCalculatorModal, setShowCalculatorModal, setShowContactModal } = useModal();
  const [step, setStep] = useState<'intro' | 'form' | 'result'>('intro');
  
  // Form state
  const [financedAmount, setFinancedAmount] = useState<string>('');
  const [monthlyQuota, setMonthlyQuota] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [knowsInterests, setKnowsInterests] = useState<string>('no');
  const [interestsPaid, setInterestsPaid] = useState<string>('');
  
  // Result state
  const [recoverableAmount, setRecoverableAmount] = useState<number>(0);
  const [remainingDebt, setRemainingDebt] = useState<number>(0);
  const [monthsToFinish, setMonthsToFinish] = useState<number>(0);
  const [finishDate, setFinishDate] = useState<string>('');

  useEffect(() => {
    if (showCalculatorModal) {
      setStep('intro');
      setFinancedAmount('');
      setMonthlyQuota('');
      setStartDate('');
      setKnowsInterests('no');
      setInterestsPaid('');
      setRecoverableAmount(0);
      setRemainingDebt(0);
      setMonthsToFinish(0);
      setFinishDate('');
    }
  }, [showCalculatorModal]);

  if (!showCalculatorModal) return null;

  const calculateRecovery = () => {
    if (!startDate || !monthlyQuota || !financedAmount) return;

    const start = new Date(startDate);
    const now = new Date();
    
    // Calculate months difference
    let months = (now.getFullYear() - start.getFullYear()) * 12;
    months -= start.getMonth();
    months += now.getMonth();
    
    // Adjust if day of month hasn't happened yet
    if (now.getDate() < start.getDate()) {
      months--;
    }
    
    // Ensure months is not negative
    months = Math.max(0, months);

    const totalPaid = parseFloat(monthlyQuota) * months;
    const principal = parseFloat(financedAmount);
    
    // Formula: Result = Financed - Total Paid
    // If Result < 0: Recoverable = abs(Result)
    // If Result > 0: Remaining Debt = Result
    
    const result = principal - totalPaid;

    if (result < 0) {
      setRecoverableAmount(Math.abs(result));
      setRemainingDebt(0);
    } else {
      setRecoverableAmount(0);
      setRemainingDebt(result);
      
      // Calculate when it will be finished
      const quota = parseFloat(monthlyQuota);
      if (quota > 0) {
        const monthsLeft = Math.ceil(result / quota);
        setMonthsToFinish(monthsLeft);
        
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + monthsLeft);
        setFinishDate(endDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }));
      }
    }

    setStep('result');
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-lg relative bg-white shadow-2xl border-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 z-10"
          onClick={() => setShowCalculatorModal(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        {step === 'intro' && (
          <>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Calculadora de Recuperación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800 text-center">
                <p className="font-medium">
                  ¿Quieres saber cuánto podrías recuperar?
                </p>
              </div>
              
              <div className="space-y-4 text-gray-600 text-center">
                <p>
                  Para obtener un cálculo preciso, te recomendamos tener a mano:
                </p>
                <ul className="space-y-2 text-left bg-gray-50 p-4 rounded-lg mx-auto max-w-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Tu último extracto de tarjeta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Un cuadro de movimientos (si dispones de él)</span>
                  </li>
                </ul>
              </div>

              <Button 
                className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700"
                onClick={() => setStep('form')}
              >
                Comenzar Cálculo
              </Button>
            </CardContent>
          </>
        )}

        {step === 'form' && (
          <>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                Introduce tus datos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="financed">¿Cuánto has financiado hasta la fecha? (€)</Label>
                  <Input
                    id="financed"
                    type="number"
                    placeholder="Ej: 3000"
                    value={financedAmount}
                    onChange={(e) => setFinancedAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quota">¿Cuál es tu cuota mensual? (€)</Label>
                  <Input
                    id="quota"
                    type="number"
                    placeholder="Ej: 150"
                    value={monthlyQuota}
                    onChange={(e) => setMonthlyQuota(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">¿Desde qué fecha estás pagando?</Label>
                  <Input
                    id="date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="space-y-3 pt-2 border-t">
                  <Label>¿Sabes cuántos intereses has pagado ya?</Label>
                  <RadioGroup 
                    value={knowsInterests} 
                    onValueChange={setKnowsInterests}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {knowsInterests === 'yes' && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="interests">Total intereses pagados (€)</Label>
                    <Input
                      id="interests"
                      type="number"
                      placeholder="Ej: 5000"
                      value={interestsPaid}
                      onChange={(e) => setInterestsPaid(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={calculateRecovery}
                disabled={!financedAmount || !monthlyQuota || !startDate || (knowsInterests === 'yes' && !interestsPaid)}
              >
                Calcular Recuperación
              </Button>
            </CardContent>
          </>
        )}

        {step === 'result' && (
          <>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Resultado del Cálculo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-4 text-center">
              <div className="space-y-2">
                {recoverableAmount > 0 ? (
                  <>
                    <p className="text-gray-600 text-lg">
                      Con Rúa Abogados podrías llegar a recuperar:
                    </p>
                    <div className="text-4xl font-bold text-green-600 py-4">
                      {recoverableAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </div>
                    {knowsInterests === 'yes' && interestsPaid && (
                      <p className="text-sm text-gray-600">
                        Además de los {parseFloat(interestsPaid).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} de intereses que ya has pagado.
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 text-lg">
                      Todavía te falta por pagar:
                    </p>
                    <div className="text-4xl font-bold text-orange-600 py-4">
                      {remainingDebt.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 text-left text-sm space-y-2">
                      <p className="text-gray-800">
                        <span className="font-semibold">Situación actual:</span> El banco te seguirá cobrando intereses.
                      </p>
                      <p className="text-gray-800">
                        <span className="font-semibold">Con tu cuota actual:</span> Terminarías de pagar en <span className="font-bold text-orange-700">{finishDate}</span>.
                      </p>
                      <p className="text-gray-800">
                        <span className="font-semibold">Con Rúa Abogados:</span> Puedes terminar ya de pagar si abonas los {remainingDebt.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} restantes y te ahorras todos los intereses futuros.
                      </p>
                    </div>
                  </>
                )}
                
                <p className="text-xs text-gray-400 max-w-xs mx-auto mt-4">
                  *Este cálculo es una estimación basada en la nulidad del contrato por usura (Ley de Represión de la Usura). El resultado final dependerá del análisis judicial.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setShowCalculatorModal(false);
                    setShowContactModal(true);
                  }}
                >
                  {recoverableAmount > 0 ? 'Reclamar mi dinero' : 'Quiero dejar de pagar intereses'}
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep('form')}
                >
                  Recalcular
                </Button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default CalculatorModal;
