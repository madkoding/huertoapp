/**
 * Sistema de Validación de Entrada de Datos
 * Implementa controles de calidad según ISO 25010 (Calidad del Producto de Software)
 * - Corrección funcional
 * - Prevención de errores
 * - Validación de tipos de datos
 */

export interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
  type: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validador de email según RFC 5322
 */
export const emailValidator: ValidationRule = {
  validate: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  message: "El email debe tener un formato válido (ejemplo@dominio.com)",
  type: 'error'
};

/**
 * Validador de teléfono chileno
 */
export const phoneValidator: ValidationRule = {
  validate: (phone: string) => {
    // Formato: +56 9 1234 5678 o 912345678
    const phoneRegex = /^(\+?56)?[\s-]?9[\s-]?\d{4}[\s-]?\d{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
  message: "El teléfono debe ser un número móvil chileno válido (+56 9 XXXX XXXX)",
  type: 'error'
};

/**
 * Validador de nombre (mínimo 2 palabras)
 */
export const fullNameValidator: ValidationRule = {
  validate: (name: string) => {
    const words = name.trim().split(/\s+/);
    return words.length >= 2 && words.every(w => w.length >= 2);
  },
  message: "Debe ingresar nombre y apellido (mínimo 2 palabras)",
  type: 'error'
};

/**
 * Validador de longitud mínima
 */
export const minLengthValidator = (min: number): ValidationRule => ({
  validate: (value: string) => value.trim().length >= min,
  message: `Debe tener al menos ${min} caracteres`,
  type: 'error'
});

/**
 * Validador de longitud máxima
 */
export const maxLengthValidator = (max: number): ValidationRule => ({
  validate: (value: string) => value.trim().length <= max,
  message: `No debe exceder ${max} caracteres`,
  type: 'warning'
});

/**
 * Validador de campo requerido
 */
export const requiredValidator: ValidationRule = {
  validate: (value: any) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'boolean') return value === true;
    return value !== null && value !== undefined;
  },
  message: "Este campo es obligatorio",
  type: 'error'
};

/**
 * Validador de selección (debe estar en lista de opciones)
 */
export const optionValidator = (validOptions: string[]): ValidationRule => ({
  validate: (value: string) => validOptions.includes(value),
  message: `Debe seleccionar una opción válida: ${validOptions.join(', ')}`,
  type: 'error'
});

/**
 * Clase principal para validación de formularios
 * Método de Entrada: Validación progresiva en tiempo real
 */
export class FormValidator {
  private rules: Map<string, ValidationRule[]> = new Map();
  private values: Map<string, any> = new Map();

  /**
   * Registra reglas de validación para un campo
   */
  addField(fieldName: string, rules: ValidationRule[]) {
    this.rules.set(fieldName, rules);
  }

  /**
   * Valida un campo específico
   * Control GUI: Feedback inmediato al usuario
   */
  validateField(fieldName: string, value: any): ValidationResult {
    const fieldRules = this.rules.get(fieldName) || [];
    const errors: string[] = [];
    const warnings: string[] = [];

    this.values.set(fieldName, value);

    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        if (rule.type === 'error') {
          errors.push(rule.message);
        } else {
          warnings.push(rule.message);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Valida todo el formulario
   * Control Interno: Verificación completa antes del procesamiento
   */
  validateAll(): Map<string, ValidationResult> {
    const results = new Map<string, ValidationResult>();

    for (const [fieldName] of this.rules) {
      const value = this.values.get(fieldName);
      results.set(fieldName, this.validateField(fieldName, value));
    }

    return results;
  }

  /**
   * Verifica si todo el formulario es válido
   */
  isFormValid(): boolean {
    const results = this.validateAll();
    for (const [, result] of results) {
      if (!result.isValid) return false;
    }
    return true;
  }

  /**
   * Obtiene todos los errores del formulario
   */
  getAllErrors(): string[] {
    const results = this.validateAll();
    const allErrors: string[] = [];
    
    for (const [fieldName, result] of results) {
      result.errors.forEach(err => {
        allErrors.push(`${fieldName}: ${err}`);
      });
    }
    
    return allErrors;
  }
}

/**
 * Sanitizador de entrada de datos
 * Control de Seguridad: Prevención de inyección de código
 */
export class InputSanitizer {
  /**
   * Elimina caracteres peligrosos de entrada de texto
   */
  static sanitizeText(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Prevenir HTML injection
      .replace(/javascript:/gi, '') // Prevenir JavaScript injection
      .substring(0, 500); // Límite de longitud
  }

  /**
   * Normaliza números de teléfono
   */
  static sanitizePhone(phone: string): string {
    return phone.replace(/[^\d+]/g, '');
  }

  /**
   * Normaliza emails
   */
  static sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * Sanitiza entrada general
   */
  static sanitize(input: string, type: 'text' | 'email' | 'phone' = 'text'): string {
    switch (type) {
      case 'email':
        return this.sanitizeEmail(input);
      case 'phone':
        return this.sanitizePhone(input);
      default:
        return this.sanitizeText(input);
    }
  }
}

/**
 * Logger del sistema para auditoría
 * Control Interno: Trazabilidad de operaciones
 */
export class SystemLogger {
  private static logs: Array<{
    timestamp: Date;
    level: 'info' | 'warning' | 'error';
    action: string;
    details: any;
  }> = [];

  static log(level: 'info' | 'warning' | 'error', action: string, details?: any) {
    const logEntry = {
      timestamp: new Date(),
      level,
      action,
      details: details || {}
    };

    this.logs.push(logEntry);
    
    // En producción, esto se enviaría a un servicio de logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}] ${action}`, details);
    }
  }

  static getLogs() {
    return this.logs;
  }

  static clearLogs() {
    this.logs = [];
  }
}
