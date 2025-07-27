// Base URL del backend
export const API_BASE_URL = "http://localhost:3000"

// Endpoints
export const API_ENDPOINTS = {
  // Psicólogos
  PSICOLOGOS: {
    GET_ALL: "/psicologos",
    CREATE: "/psicologos",
    GET_BY_ID: (id: string) => `/psicologos/${id}`,
    UPDATE: (id: string) => `/psicologos/${id}`,
    DELETE: (id: string) => `/psicologos/${id}`,
  },

  // Disponibilidades (para futuro uso)
  DISPONIBILIDADES: {
    GET_ALL: "/disponibilidades",
    CREATE: "/disponibilidades",
    GET_BY_PSICOLOGO: (psicologoId: string) => `/disponibilidades/psicologo/${psicologoId}`,
  },

  // Turnos (para futuro uso)
  TURNOS: {
    GET_ALL: "/turnos",
    CREATE: "/turnos",
    GET_BY_ID: (id: string) => `/turnos/${id}`,
  },
} as const

// Query Keys para TanStack Query
export const QUERY_KEYS = {
  PSICOLOGOS: {
    ALL: ["psicologos"] as const,
    BY_ID: (id: string) => ["psicologos", id] as const,
    BY_TEMATICA: (tematica: string) => ["psicologos", "tematica", tematica] as const,
  },
  DISPONIBILIDADES: {
    ALL: ["disponibilidades"] as const,
    BY_PSICOLOGO: (psicologoId: string) => ["disponibilidades", "psicologo", psicologoId] as const,
  },
  TURNOS: {
    ALL: ["turnos"] as const,
    BY_ID: (id: string) => ["turnos", id] as const,
  },
} as const
