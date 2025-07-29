export enum TematicaPsicologia {
    ANSIEDAD = "ansiedad",
    DEPRESION = "depresion",
    TERAPIA_FAMILIAR = "terapia_familiar",
    TERAPIA_PAREJA = "terapia_pareja",
    TRASTORNOS_ALIMENTARIOS = "trastornos_alimentarios",
    ADICCIONES = "adicciones",
    DUELO = "duelo",
    AUTOESTIMA = "autoestima",
    ESTRES = "estres",
    TERAPIA_COGNITIVA = "terapia_cognitiva",
  }
  
  export const tematicasLabels: Record<TematicaPsicologia, string> = {
    [TematicaPsicologia.ANSIEDAD]: "Ansiedad",
    [TematicaPsicologia.DEPRESION]: "Depresión",
    [TematicaPsicologia.TERAPIA_FAMILIAR]: "Terapia Familiar",
    [TematicaPsicologia.TERAPIA_PAREJA]: "Terapia de Pareja",
    [TematicaPsicologia.TRASTORNOS_ALIMENTARIOS]: "Trastornos Alimentarios",
    [TematicaPsicologia.ADICCIONES]: "Adicciones",
    [TematicaPsicologia.DUELO]: "Duelo",
    [TematicaPsicologia.AUTOESTIMA]: "Autoestima",
    [TematicaPsicologia.ESTRES]: "Estrés",
    [TematicaPsicologia.TERAPIA_COGNITIVA]: "Terapia Cognitiva",
  }
  
export interface Psicologo {
  id: string
  nombre: string
  apellido: string
  username: string
  password?: string
  createdAt?: Date
    updatedAt?: Date
  tematicas: TematicaPsicologia[]
  disponibilidades:{
    dia: number
    horaInicio: string
    horaFin: string
    isVirtual: boolean
  }[]
}

  export interface Disponibilidad {
    id: number
    psicologoId: string
    diaDeLaSemana: number // 0-6
    horaInicio: string
    horaFin: string
    isActive: boolean
    isVirtual: boolean
    createdAt?: Date
  }
  
  export interface Turno {
    id: number
    psicologo: string
    clienteEmail: string
    fecha: string
    horaInicio: string
    horaFin: string
    tematica: TematicaPsicologia
    estado: "programado" | "completado" | "cancelado"
    createdAt: Date
  }
  
  export interface TurnoOcupado {
  dia: number
  hora: string
}
export interface HorarioSlot {
  hora: string
  disponible: boolean
  ocupado: boolean
}