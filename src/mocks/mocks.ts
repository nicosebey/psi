import { Disponibilidad, Psicologo, TematicaPsicologia, TurnoOcupado } from "@/types/types";

export const mockPsicologos: Psicologo[] = [
  {
    id: "1",
    nombre: "Juan",
    apellido: "Pérez",
    username: "jperez",
    tematicas: [
      TematicaPsicologia.ANSIEDAD,
      TematicaPsicologia.DEPRESION,
      TematicaPsicologia.ADICCIONES,
    ],
    disponibilidades: [
      { dia: 1, horaInicio: "09:00", horaFin: "12:00", isVirtual: false },
      { dia: 1, horaInicio: "14:00", horaFin: "18:00", isVirtual: true },
    ],
  },
  {
    id: "2",
    nombre: "María",
    apellido: "González",
    username: "mgonzalez",
    tematicas: [TematicaPsicologia.TERAPIA_COGNITIVA],
    disponibilidades: [
      { dia: 1, horaInicio: "09:00", horaFin: "12:00", isVirtual: false },
      { dia: 1, horaInicio: "14:00", horaFin: "18:00", isVirtual: true },
    ],
  },
  {
    id: "3",
    nombre: "Carlos",
    apellido: "López",
    username: "clopez",
    tematicas: [TematicaPsicologia.AUTOESTIMA],
    disponibilidades: [
      { dia: 1, horaInicio: "09:00", horaFin: "12:00", isVirtual: true },
      { dia: 1, horaInicio: "14:00", horaFin: "18:00", isVirtual: true },
    ],
  },
];

export const horariosDisponibles = [
  { hora: "09:00", isVirtual: true },
  { hora: "10:00", isVirtual: true },
  { hora: "11:00", isVirtual: true },
  { hora: "12:00", isVirtual: true },
  { hora: "14:00", isVirtual: false },
  { hora: "15:00", isVirtual: false },
  { hora: "16:00", isVirtual: false },
  { hora: "17:00", isVirtual: false },
  { hora: "18:00", isVirtual: false },
  { hora: "19:00", isVirtual: false },
  { hora: "20:00", isVirtual: false },
];

export const mockTurnosOcupados: TurnoOcupado[] = [
  { dia: 1, hora: "09:00" },
  { dia: 1, hora: "15:00" },
  { dia: 2, hora: "10:00" },
  { dia: 3, hora: "11:00" },
  { dia: 4, hora: "16:00" },
  { dia: 5, hora: "14:00" },
];

export const diasSemana = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
];

export const mockDisponibilidades: Disponibilidad[] = [
  {
      diaDeLaSemana: 1,
      horaInicio: "09:00",
      horaFin: "12:00",
      isVirtual: false,
      id: 0,
      psicologoId: "",
      isActive: false,
  }, // Lunes mañana
  {
      diaDeLaSemana: 1,
      horaInicio: "14:00",
      horaFin: "18:00",
      isVirtual: true,
      id: 0,
      psicologoId: "",
      isActive: false,
  }, // Lunes tarde
  {
      diaDeLaSemana: 2,
      horaInicio: "09:00",
      horaFin: "12:00",
      isVirtual: false,
      id: 0,
      psicologoId: "",
      isActive: false,
  }, // Martes mañana
  {
      diaDeLaSemana: 2,
      horaInicio: "15:00",
      horaFin: "20:00",
      isVirtual: true,
      id: 0,
      psicologoId: "",
      isActive: false,
  }, // Martes tarde
  {
      diaDeLaSemana: 3,
      horaInicio: "10:00",
      horaFin: "17:00",
      isVirtual: false,
      id: 0,
      psicologoId: "",
      isActive: false,
  }, // Miércoles
  {
      diaDeLaSemana: 4,
      horaInicio: "09:00",
      horaFin: "12:00",
      isVirtual: true,
      id: 0,
      psicologoId: "",
      isActive: false,
  }, // Jueves mañana
  {
      diaDeLaSemana: 4,
      horaInicio: "14:00",
      horaFin: "19:00",
      isVirtual: false,
      id: 0,
      psicologoId: "",
      isActive: false,
  }, // Jueves tarde
  {
      diaDeLaSemana: 5,
      horaInicio: "09:00",
      horaFin: "16:00",
      isVirtual: false,
      id: 0,
      psicologoId: "",
      isActive: false,
  }, // Viernes
];
