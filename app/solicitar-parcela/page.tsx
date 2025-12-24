"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Modal } from "@/components/ui/modal";
import { CheckCircle, Download, ChevronRight, ChevronLeft, Loader2, AlertCircle } from "lucide-react";
import { 
  FormValidator, 
  emailValidator, 
  phoneValidator, 
  fullNameValidator, 
  requiredValidator,
  optionValidator,
  minLengthValidator,
  InputSanitizer
} from "@/lib/validation";
import { ParcelaRequestProcessor, ProcessingStatus } from "@/lib/processing";

type FormData = {
  // Paso 1: Datos Personales
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  // Paso 2: Experiencia
  experiencia: string;
  tipoPlanta: string;
  horasDisponibles: string;
  // Paso 3: Motivación
  motivacion: string;
  compromisos: boolean;
  newsletter: boolean;
};

export default function SolicitarParcelaPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [processingResult, setProcessingResult] = useState<any>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    experiencia: "",
    tipoPlanta: "",
    horasDisponibles: "",
    motivacion: "",
    compromisos: false,
    newsletter: false,
  });

  // Inicializar validador
  const [validator] = useState(() => {
    const v = new FormValidator();
    // Paso 1
    v.addField('nombre', [requiredValidator, fullNameValidator]);
    v.addField('email', [requiredValidator, emailValidator]);
    v.addField('telefono', [requiredValidator, phoneValidator]);
    v.addField('direccion', [requiredValidator, minLengthValidator(10)]);
    // Paso 2
    v.addField('experiencia', [requiredValidator, optionValidator(['ninguna', 'basica', 'intermedia', 'avanzada'])]);
    v.addField('tipoPlanta', [requiredValidator, optionValidator(['hortalizas', 'hierbas', 'flores', 'mixto'])]);
    v.addField('horasDisponibles', [requiredValidator, optionValidator(['1-3', '4-6', '7-10', '10+'])]);
    // Paso 3
    v.addField('motivacion', [requiredValidator, minLengthValidator(50)]);
    v.addField('compromisos', [requiredValidator]);
    return v;
  });

  const totalSteps = 3;

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    // Sanitizar entrada según tipo
    let sanitizedValue = value;
    if (typeof value === 'string') {
      if (field === 'email') sanitizedValue = InputSanitizer.sanitize(value, 'email');
      else if (field === 'telefono') sanitizedValue = InputSanitizer.sanitize(value, 'phone');
      else sanitizedValue = InputSanitizer.sanitize(value, 'text');
    }

    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));

    // Validar campo en tiempo real
    const result = validator.validateField(field, sanitizedValue);
    if (result.errors.length > 0) {
      setFieldErrors(prev => ({ ...prev, [field]: result.errors }));
    } else {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.nombre && formData.email && formData.telefono && formData.direccion);
      case 2:
        return !!(formData.experiencia && formData.tipoPlanta && formData.horasDisponibles);
      case 3:
        return !!(formData.motivacion && formData.compromisos);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      alert("Por favor completa todos los campos requeridos");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    // Iniciar procesamiento
    setProcessingStatus(ProcessingStatus.VALIDATING);
    
    try {
      // Validación final completa
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!validator.isFormValid()) {
        const errors = validator.getAllErrors();
        alert("Errores de validación:\n" + errors.join("\n"));
        setProcessingStatus(ProcessingStatus.ERROR);
        return;
      }

      // Procesamiento
      setProcessingStatus(ProcessingStatus.PROCESSING);
      const result = await ParcelaRequestProcessor.processRequest({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        experiencia: formData.experiencia,
        tipoPlanta: formData.tipoPlanta,
        horasDisponibles: formData.horasDisponibles,
        motivacion: formData.motivacion,
      });

      setProcessingResult(result.data);
      setProcessingStatus(result.status);
      
      if (result.status === ProcessingStatus.SUCCESS) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      setProcessingStatus(ProcessingStatus.ERROR);
      alert("Error al procesar la solicitud. Intente nuevamente.");
    }
  };

  const handleDownloadPDF = () => {
    alert("Descargando formulario PDF... (simulación)");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-serif text-4xl font-bold text-[rgb(var(--color-primary))]">
          Solicitud de Parcela
        </h1>
        <p className="text-lg text-[rgb(var(--foreground))]/80">
          Completa el formulario para unirte al huerto comunitario
        </p>
        <p className="mt-2 text-sm text-[rgb(var(--foreground))]/60">
          Solo tomará unos 3 minutos. Los campos marcados con (*) son obligatorios.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8" aria-label={`Paso ${currentStep} de 3`}>
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-bold transition-colors text-lg ${
                    step <= currentStep
                      ? "bg-[rgb(var(--color-primary))] text-white"
                      : "bg-[rgb(var(--color-neutral))] text-[rgb(var(--foreground))]/50"
                  }`}
                  aria-current={step === currentStep ? "step" : undefined}
                >
                  {step}
                </div>
                <span className="mt-2 text-sm font-medium">
                  {step === 1 && "Datos"}
                  {step === 2 && "Experiencia"}
                  {step === 3 && "Motivación"}
                </span>
              </div>
              {step < 3 && (
                <div
                  className={`mx-2 h-1 flex-1 rounded ${
                    step < currentStep
                      ? "bg-[rgb(var(--color-primary))]"
                      : "bg-[rgb(var(--color-neutral))]"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Datos Personales"}
            {currentStep === 2 && "Experiencia Previa"}
            {currentStep === 3 && "Motivación y Compromisos"}
          </CardTitle>
          <p className="text-sm text-[rgb(var(--foreground))]/70 mt-2">
            {currentStep === 1 && "Necesitamos tus datos para contactarte sobre tu solicitud"}
            {currentStep === 2 && "Cuéntanos sobre tu experiencia para asignarte la parcela ideal"}
            {currentStep === 3 && "Comparte tu motivación para formar parte de la comunidad"}
          </p>
        </CardHeader>
        <CardContent>
          {/* Step 1: Datos Personales */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="nombre" className="mb-2 block text-base font-medium">
                  Nombre Completo *
                </label>
                <p className="text-sm text-[rgb(var(--foreground))]/60 mb-2">
                  Ingresa tu nombre tal como aparece en tu documento de identidad
                </p>
                <input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => updateFormData("nombre", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    fieldErrors.nombre 
                      ? 'border-[rgb(var(--color-error))] focus:ring-[rgb(var(--color-error))]' 
                      : 'border-[rgb(var(--color-neutral))] focus:ring-[rgb(var(--color-primary))]'
                  }`}
                  placeholder="Juan Pérez González"
                  aria-invalid={!!fieldErrors.nombre}
                  aria-describedby={fieldErrors.nombre ? "nombre-error" : undefined}
                />
                {fieldErrors.nombre && (
                  <p id="nombre-error" className="mt-1 text-sm text-[rgb(var(--color-error))]" role="alert">
                    <AlertCircle className="inline h-4 w-4 mr-1" />
                    {fieldErrors.nombre[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
                    fieldErrors.email 
                      ? 'border-[rgb(var(--color-error))] focus:border-[rgb(var(--color-error))]' 
                      : 'border-[rgb(var(--color-neutral))] focus:border-[rgb(var(--color-primary))]'
                  }`}
                  placeholder="juan@email.com"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-[rgb(var(--color-error))]" role="alert">
                    <AlertCircle className="inline h-4 w-4 mr-1" />
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm font-medium">
                  Teléfono *
                </label>
                <input
                  id="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => updateFormData("telefono", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
                    fieldErrors.telefono 
                      ? 'border-[rgb(var(--color-error))] focus:border-[rgb(var(--color-error))]' 
                      : 'border-[rgb(var(--color-neutral))] focus:border-[rgb(var(--color-primary))]'
                  }`}
                  placeholder="+56 9 1234 5678"
                  aria-invalid={!!fieldErrors.telefono}
                  aria-describedby={fieldErrors.telefono ? "telefono-error" : undefined}
                />
                {fieldErrors.telefono && (
                  <p id="telefono-error" className="mt-1 text-sm text-[rgb(var(--color-error))]" role="alert">
                    <AlertCircle className="inline h-4 w-4 mr-1" />
                    {fieldErrors.telefono[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="direccion" className="mb-2 block text-sm font-medium">
                  Dirección *
                </label>
                <input
                  id="direccion"
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => updateFormData("direccion", e.target.value)}
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
                    fieldErrors.direccion 
                      ? 'border-[rgb(var(--color-error))] focus:border-[rgb(var(--color-error))]' 
                      : 'border-[rgb(var(--color-neutral))] focus:border-[rgb(var(--color-primary))]'
                  }`}
                  placeholder="Calle Principal 123, Santiago"
                  aria-invalid={!!fieldErrors.direccion}
                  aria-describedby={fieldErrors.direccion ? "direccion-error" : undefined}
                />
                {fieldErrors.direccion && (
                  <p id="direccion-error" className="mt-1 text-sm text-[rgb(var(--color-error))]" role="alert">
                    <AlertCircle className="inline h-4 w-4 mr-1" />
                    {fieldErrors.direccion[0]}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Experiencia */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Experiencia en Agricultura/Jardinería *
                </label>
                <select
                  value={formData.experiencia}
                  onChange={(e) => updateFormData("experiencia", e.target.value)}
                  className="w-full rounded-lg border border-[rgb(var(--color-neutral))] px-4 py-2 focus:border-[rgb(var(--color-primary))] focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="ninguna">Sin experiencia</option>
                  <option value="basica">Básica (huerto casero)</option>
                  <option value="intermedia">Intermedia</option>
                  <option value="avanzada">Avanzada/Profesional</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  ¿Qué te gustaría cultivar? *
                </label>
                <select
                  value={formData.tipoPlanta}
                  onChange={(e) => updateFormData("tipoPlanta", e.target.value)}
                  className="w-full rounded-lg border border-[rgb(var(--color-neutral))] px-4 py-2 focus:border-[rgb(var(--color-primary))] focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="hortalizas">Hortalizas (tomate, lechuga, etc.)</option>
                  <option value="hierbas">Hierbas aromáticas</option>
                  <option value="flores">Flores ornamentales</option>
                  <option value="mixto">Mixto</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Horas semanales disponibles *
                </label>
                <select
                  value={formData.horasDisponibles}
                  onChange={(e) => updateFormData("horasDisponibles", e.target.value)}
                  className="w-full rounded-lg border border-[rgb(var(--color-neutral))] px-4 py-2 focus:border-[rgb(var(--color-primary))] focus:outline-none"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="1-3">1-3 horas</option>
                  <option value="4-6">4-6 horas</option>
                  <option value="7-10">7-10 horas</option>
                  <option value="10+">Más de 10 horas</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Motivación */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  ¿Por qué quieres participar en el huerto comunitario? *
                </label>
                <textarea
                  value={formData.motivacion}
                  onChange={(e) => updateFormData("motivacion", e.target.value)}
                  rows={5}
                  className="w-full rounded-lg border border-[rgb(var(--color-neutral))] px-4 py-2 focus:border-[rgb(var(--color-primary))] focus:outline-none"
                  placeholder="Cuéntanos tu motivación..."
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.compromisos}
                    onChange={(e) => updateFormData("compromisos", e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[rgb(var(--color-primary))]"
                  />
                  <span className="text-sm">
                    Acepto los compromisos del huerto comunitario (asistencia regular, cuidado de mi parcela, participación en actividades comunitarias) *
                  </span>
                </label>
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) => updateFormData("newsletter", e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[rgb(var(--color-primary))]"
                  />
                  <span className="text-sm">
                    Deseo recibir noticias y actualizaciones del huerto
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Siguiente
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={processingStatus === ProcessingStatus.VALIDATING || processingStatus === ProcessingStatus.PROCESSING}
              >
                {processingStatus === ProcessingStatus.VALIDATING && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validando...
                  </>
                )}
                {processingStatus === ProcessingStatus.PROCESSING && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                )}
                {processingStatus !== ProcessingStatus.VALIDATING && processingStatus !== ProcessingStatus.PROCESSING && (
                  <>Enviar Solicitud</>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Download PDF Option */}
      <Alert variant="info" className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">¿Prefieres llenar el formulario en papel?</p>
            <p className="mt-1 text-sm">
              Descarga el PDF y entrégalo presencialmente en el huerto
            </p>
          </div>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </Button>
        </div>
      </Alert>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Solicitud Procesada!"
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--color-success))]/10">
              <CheckCircle className="h-10 w-10 text-[rgb(var(--color-success))]" />
            </div>
          </div>
          
          {processingResult && (
            <div className="space-y-3">
              <div className="rounded-lg bg-[rgb(var(--color-neutral-light))] p-4">
                <h4 className="font-medium mb-2">Detalles del Procesamiento:</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Número de Solicitud:</strong> {processingResult.requestNumber}</p>
                  <p><strong>Puntuación de Prioridad:</strong> {processingResult.priorityScore}/100</p>
                  <p><strong>Parcela Sugerida:</strong> {processingResult.suggestedPlot}</p>
                  <p><strong>Tiempo Estimado de Espera:</strong> {processingResult.estimatedWaitDays} días</p>
                </div>
              </div>
              
              <Alert variant="info">
                Tu solicitud ha sido registrada y procesada. Te contactaremos en los próximos días para coordinar la asignación de tu parcela.
              </Alert>
            </div>
          )}
          
          <Button 
            className="w-full" 
            onClick={() => {
              setShowSuccessModal(false);
              window.location.href = "/";
            }}
          >
            Volver al Inicio
          </Button>
        </div>
      </Modal>
    </div>
  );
}
