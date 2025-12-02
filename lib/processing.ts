/**
 * Sistema de Procesamiento de Datos
 * Implementa lógica de negocio según ISO 25010
 * - Procesamiento transaccional
 * - Gestión de estados
 * - Cálculos y transformaciones
 */

import { SystemLogger } from './validation';

/**
 * Estados del procesamiento
 */
export enum ProcessingStatus {
  IDLE = 'idle',
  VALIDATING = 'validating',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  ERROR = 'error'
}

/**
 * Resultado del procesamiento
 */
export interface ProcessingResult<T = any> {
  status: ProcessingStatus;
  data?: T;
  message: string;
  timestamp: Date;
  processingTime?: number;
}

/**
 * Procesador de Solicitudes de Parcela
 * Entrada de Datos → Validación → Procesamiento → Salida
 */
export class ParcelaRequestProcessor {
  /**
   * Procesa una solicitud de parcela
   * Simula el flujo completo de procesamiento de datos
   */
  static async processRequest(formData: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    experiencia: string;
    tipoPlanta: string;
    horasDisponibles: string;
    motivacion: string;
  }): Promise<ProcessingResult> {
    const startTime = Date.now();

    try {
      // 1. Log de inicio
      SystemLogger.log('info', 'Inicio procesamiento solicitud parcela', { email: formData.email });

      // 2. Validación de datos (simulado)
      await this.simulateDelay(500);

      // 3. Cálculo de puntuación de prioridad
      const priorityScore = this.calculatePriorityScore(formData);

      // 4. Generación de número de solicitud
      const requestNumber = this.generateRequestNumber();

      // 5. Asignación de parcela sugerida (lógica de negocio)
      const suggestedPlot = this.assignPlot(formData.experiencia, formData.tipoPlanta);

      // 6. Simulación de guardado en base de datos
      await this.simulateDelay(300);

      const processingTime = Date.now() - startTime;

      // 7. Log de éxito
      SystemLogger.log('info', 'Solicitud procesada exitosamente', {
        requestNumber,
        priorityScore,
        processingTime
      });

      return {
        status: ProcessingStatus.SUCCESS,
        data: {
          requestNumber,
          priorityScore,
          suggestedPlot,
          estimatedWaitDays: this.calculateWaitTime(priorityScore)
        },
        message: 'Solicitud procesada exitosamente',
        timestamp: new Date(),
        processingTime
      };
    } catch (error) {
      SystemLogger.log('error', 'Error procesando solicitud', { error });
      
      return {
        status: ProcessingStatus.ERROR,
        message: 'Error al procesar la solicitud',
        timestamp: new Date(),
        processingTime: Date.now() - startTime
      };
    }
  }

  /**
   * Calcula puntuación de prioridad basada en criterios
   * Procesamiento de Datos: Lógica de negocio
   */
  private static calculatePriorityScore(formData: any): number {
    let score = 0;

    // Experiencia (0-30 puntos)
    const experiencePoints: Record<string, number> = {
      'ninguna': 10,
      'basica': 20,
      'intermedia': 25,
      'avanzada': 30
    };
    score += experiencePoints[formData.experiencia] || 0;

    // Horas disponibles (0-30 puntos)
    const hoursPoints: Record<string, number> = {
      '1-3': 10,
      '4-6': 20,
      '7-10': 25,
      '10+': 30
    };
    score += hoursPoints[formData.horasDisponibles] || 0;

    // Motivación (0-40 puntos basado en longitud y palabras clave)
    const motivationLength = formData.motivacion.length;
    const hasKeywords = /comunidad|sostenibilidad|aprender|compartir/i.test(formData.motivacion);
    
    if (motivationLength > 200) score += 25;
    else if (motivationLength > 100) score += 15;
    else score += 5;
    
    if (hasKeywords) score += 15;

    return Math.min(score, 100); // Máximo 100 puntos
  }

  /**
   * Genera número único de solicitud
   */
  private static generateRequestNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PAR-${timestamp}-${random}`;
  }

  /**
   * Asigna parcela sugerida según experiencia y tipo de planta
   */
  private static assignPlot(experiencia: string, tipoPlanta: string): string {
    if (experiencia === 'avanzada') return 'Parcela Premium A1';
    if (tipoPlanta === 'hortalizas') return 'Parcela Hortalizas B2';
    if (tipoPlanta === 'hierbas') return 'Parcela Aromáticas C1';
    return 'Parcela Estándar D1';
  }

  /**
   * Calcula tiempo estimado de espera
   */
  private static calculateWaitTime(priorityScore: number): number {
    if (priorityScore >= 80) return 7; // 1 semana
    if (priorityScore >= 60) return 14; // 2 semanas
    if (priorityScore >= 40) return 21; // 3 semanas
    return 30; // 1 mes
  }

  /**
   * Simula delay de procesamiento
   */
  private static simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Procesador de Compras
 * Procesamiento de transacciones del carrito
 */
export class PurchaseProcessor {
  /**
   * Procesa una compra
   */
  static async processPurchase(cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>, userData: {
    email: string;
    nombre: string;
  }): Promise<ProcessingResult> {
    const startTime = Date.now();

    try {
      SystemLogger.log('info', 'Inicio procesamiento compra', { 
        email: userData.email,
        itemCount: cartItems.length 
      });

      // 1. Validar stock (simulado)
      await this.simulateDelay(300);

      // 2. Calcular totales
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const donationSuggestion = Math.round(subtotal * 0.1); // 10% sugerido
      const total = subtotal;

      // 3. Generar orden
      const orderNumber = this.generateOrderNumber();

      // 4. Registrar transacción
      await this.simulateDelay(400);

      const processingTime = Date.now() - startTime;

      SystemLogger.log('info', 'Compra procesada', {
        orderNumber,
        total,
        processingTime
      });

      return {
        status: ProcessingStatus.SUCCESS,
        data: {
          orderNumber,
          subtotal,
          donationSuggestion,
          total,
          items: cartItems,
          estimatedDelivery: this.calculateDeliveryDate()
        },
        message: 'Compra procesada exitosamente',
        timestamp: new Date(),
        processingTime
      };
    } catch (error) {
      SystemLogger.log('error', 'Error procesando compra', { error });
      
      return {
        status: ProcessingStatus.ERROR,
        message: 'Error al procesar la compra',
        timestamp: new Date(),
        processingTime: Date.now() - startTime
      };
    }
  }

  private static generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${timestamp}-${random}`;
  }

  private static calculateDeliveryDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 3); // 3 días
    return date.toLocaleDateString('es-CL');
  }

  private static simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Procesador de Actividades del Dashboard
 * Análisis y cálculos estadísticos
 */
export class DashboardProcessor {
  /**
   * Calcula estadísticas de parcelas
   */
  static calculatePlotStatistics(parcelas: Array<{
    estado: string;
    salud: number;
    diasCrecimiento: number;
  }>) {
    const total = parcelas.length;
    const activas = parcelas.filter(p => p.estado === 'activo').length;
    const promedioSalud = parcelas.reduce((sum, p) => sum + p.salud, 0) / total;
    const promedioDias = parcelas.reduce((sum, p) => sum + p.diasCrecimiento, 0) / total;

    return {
      total,
      activas,
      tasa_exito: ((activas / total) * 100).toFixed(1),
      promedio_salud: promedioSalud.toFixed(1),
      promedio_dias: Math.round(promedioDias)
    };
  }

  /**
   * Genera recomendaciones basadas en datos
   */
  static generateRecommendations(parcelas: any[]) {
    const recommendations: string[] = [];

    const parcelasRiesgo = parcelas.filter(p => p.salud < 50);
    if (parcelasRiesgo.length > 0) {
      recommendations.push(`Atención: ${parcelasRiesgo.length} parcelas con salud crítica`);
    }

    const parcelasRiego = parcelas.filter(p => 
      p.ultimoRiego.includes('7') || p.ultimoRiego.includes('días')
    );
    if (parcelasRiego.length > 0) {
      recommendations.push(`${parcelasRiego.length} parcelas necesitan riego urgente`);
    }

    return recommendations;
  }
}
