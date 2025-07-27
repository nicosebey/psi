"use client"

import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Stack,
  Chip,
  Avatar,
  Divider,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { Close, Schedule, Person, CheckCircle, Cancel, AccessTime } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { type TematicaPsicologia, tematicasLabels } from "@/types/types"

interface Psicologo {
  id: string
  nombre: string
  apellido: string
  username: string
  tematicas: TematicaPsicologia[]
}

interface Disponibilidad {
  dia: number // 0-6 (Domingo-Sábado)
  horaInicio: string
  horaFin: string
}

interface TurnoOcupado {
  dia: number
  hora: string
}

interface HorarioSlot {
  hora: string
  disponible: boolean
  ocupado: boolean
}

interface AgendarCitaModalProps {
  open: boolean
  onClose: () => void
  psicologo: Psicologo | null
  onConfirmarCita?: (
    psicologo: Psicologo,
    especialidad: TematicaPsicologia,
    dia: number,
    hora: string,
    email: string,
  ) => void
}

const diasSemana = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
]

const horariosDisponibles = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
]

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "90%", md: "70%", lg: "60%" },
  maxWidth: 700,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 0,
  outline: "none",
  overflow: "hidden",
}

export default function AgendarCitaModal({ open, onClose, psicologo, onConfirmarCita }: AgendarCitaModalProps) {
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidad[]>([])
  const [turnosOcupados, setTurnosOcupados] = useState<TurnoOcupado[]>([])
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<TematicaPsicologia | "">("")
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | "">("")
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (psicologo && open) {
      // Mock data de disponibilidades del psicólogo
      const mockDisponibilidades: Disponibilidad[] = [
        { dia: 1, horaInicio: "09:00", horaFin: "12:00" }, // Lunes mañana
        { dia: 1, horaInicio: "14:00", horaFin: "18:00" }, // Lunes tarde
        { dia: 2, horaInicio: "09:00", horaFin: "12:00" }, // Martes mañana
        { dia: 2, horaInicio: "15:00", horaFin: "20:00" }, // Martes tarde
        { dia: 3, horaInicio: "10:00", horaFin: "17:00" }, // Miércoles
        { dia: 4, horaInicio: "09:00", horaFin: "12:00" }, // Jueves mañana
        { dia: 4, horaInicio: "14:00", horaFin: "19:00" }, // Jueves tarde
        { dia: 5, horaInicio: "09:00", horaFin: "16:00" }, // Viernes
      ]

      // Mock data de turnos ya ocupados
      const mockTurnosOcupados: TurnoOcupado[] = [
        { dia: 1, hora: "09:00" },
        { dia: 1, hora: "15:00" },
        { dia: 2, hora: "10:00" },
        { dia: 3, hora: "11:00" },
        { dia: 4, hora: "16:00" },
        { dia: 5, hora: "14:00" },
      ]

      setDisponibilidades(mockDisponibilidades)
      setTurnosOcupados(mockTurnosOcupados)
    }
  }, [psicologo, open])

  const getHorariosDelDia = (dia: number): HorarioSlot[] => {
    return horariosDisponibles.map((hora) => {
      const disponible = disponibilidades.some((disp) => {
        const horaNum = Number.parseInt(hora.split(":")[0])
        const inicioNum = Number.parseInt(disp.horaInicio.split(":")[0])
        const finNum = Number.parseInt(disp.horaFin.split(":")[0])
        return disp.dia === dia && horaNum >= inicioNum && horaNum < finNum
      })

      const ocupado = turnosOcupados.some((turno) => turno.dia === dia && turno.hora === hora)

      return {
        hora,
        disponible,
        ocupado,
      }
    })
  }

  const handleEspecialidadChange = (especialidad: TematicaPsicologia) => {
    setEspecialidadSeleccionada(especialidad)
    setDiaSeleccionado("")
    setHorarioSeleccionado("")
    setError("")
  }

  const handleDiaChange = (dia: number) => {
    setDiaSeleccionado(dia)
    setHorarioSeleccionado("")
    setError("")
  }

  const handleHorarioClick = (hora: string, disponible: boolean, ocupado: boolean) => {
    if (!disponible || ocupado) return

    setHorarioSeleccionado(hora)
    setError("")
  }

  const handleConfirmar = () => {
    if (especialidadSeleccionada === "") {
      setError("Por favor selecciona una especialidad")
      return
    }

    if (diaSeleccionado === "") {
      setError("Por favor selecciona un día")
      return
    }

    if (!horarioSeleccionado) {
      setError("Por favor selecciona un horario")
      return
    }

    if (!email.trim()) {
      setError("Por favor ingresa tu email")
      return
    }

    if (psicologo && onConfirmarCita) {
      onConfirmarCita(psicologo, especialidadSeleccionada, diaSeleccionado as number, horarioSeleccionado, email)
    }

    handleClose()
  }

  const handleClose = () => {
    setEspecialidadSeleccionada("")
    setDiaSeleccionado("")
    setHorarioSeleccionado("")
    setEmail("")
    setError("")
    onClose()
  }

  const getChipColor = (slot: HorarioSlot, isSelected: boolean) => {
    if (isSelected) return "primary"
    if (slot.ocupado) return "error"
    if (slot.disponible) return "success"
    return "default"
  }

  const getChipVariant = (slot: HorarioSlot, isSelected: boolean) => {
    if (isSelected) return "filled"
    if (slot.ocupado || slot.disponible) return "outlined"
    return "filled"
  }

  const horariosDelDia = diaSeleccionado !== "" ? getHorariosDelDia(diaSeleccionado as number) : []
  const diaSeleccionadoLabel = diasSemana.find((d) => d.value === diaSeleccionado)?.label
  const especialidadLabel = especialidadSeleccionada ? tematicasLabels[especialidadSeleccionada] : ""

  if (!psicologo) return null

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="agendar-cita-modal">
      <Paper sx={modalStyle} elevation={8}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: 3,
            pb: 2,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h5" component="h2" fontWeight={600}>
                Agendar Cita
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {psicologo.nombre} {psicologo.apellido}
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Stack>

        <Box sx={{ p: 3, maxHeight: "calc(90vh - 200px)", overflow: "auto" }}>
          <Stack spacing={3}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight={600} color="primary">
                Paso 1: Selecciona la especialidad
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Motivo de consulta</InputLabel>
                <Select
                  value={especialidadSeleccionada}
                  onChange={(e) => handleEspecialidadChange(e.target.value as TematicaPsicologia)}
                  label="Motivo de consulta"
                >
                  {psicologo.tematicas.map((tematica) => (
                    <MenuItem key={tematica} value={tematica}>
                      {tematicasLabels[tematica]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            {especialidadSeleccionada && (
              <>
                <Divider />
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    Paso 2: Selecciona el día
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>Día de la semana</InputLabel>
                    <Select
                      value={diaSeleccionado}
                      onChange={(e) => handleDiaChange(e.target.value as number)}
                      label="Día de la semana"
                    >
                      {diasSemana.map((dia) => (
                        <MenuItem key={dia.value} value={dia.value}>
                          {dia.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </>
            )}

            {diaSeleccionado !== "" && especialidadSeleccionada && (
              <>
                <Divider />
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    Paso 3: Selecciona el horario
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Horarios disponibles para {diaSeleccionadoLabel}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip
                      icon={<AccessTime sx={{ fontSize: 16 }} />}
                      label="Disponible"
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Cancel sx={{ fontSize: 16 }} />}
                      label="Ocupado"
                      size="small"
                      color="error"
                      variant="outlined"
                    />
                    <Chip
                      icon={<CheckCircle sx={{ fontSize: 16 }} />}
                      label="Seleccionado"
                      size="small"
                      color="primary"
                      variant="filled"
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{
                      "& > *": {
                        minWidth: { xs: "calc(50% - 8px)", sm: "calc(33.333% - 11px)", md: "calc(25% - 12px)" },
                      },
                    }}
                  >
                    {horariosDelDia.map((slot) => {
                      const isSelected = horarioSeleccionado === slot.hora
                      const isClickable = slot.disponible && !slot.ocupado

                      return (
                        <Chip
                          key={slot.hora}
                          label={slot.hora}
                          color={getChipColor(slot, isSelected)}
                          variant={getChipVariant(slot, isSelected)}
                          onClick={() => handleHorarioClick(slot.hora, slot.disponible, slot.ocupado)}
                          sx={{
                            height: 48,
                            fontSize: "1rem",
                            fontWeight: isSelected ? 600 : 400,
                            cursor: isClickable ? "pointer" : "not-allowed",
                            opacity: slot.disponible ? 1 : 0.5,
                            "&:hover": isClickable
                              ? {
                                  transform: "scale(1.05)",
                                  boxShadow: 2,
                                }
                              : {},
                            transition: "all 0.2s ease-in-out",
                          }}
                          disabled={!slot.disponible || slot.ocupado}
                        />
                      )
                    })}
                  </Stack>

                  {horariosDelDia.filter((slot) => slot.disponible && !slot.ocupado).length === 0 && (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No hay horarios disponibles para {diaSeleccionadoLabel}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </>
            )}

            {horarioSeleccionado && diaSeleccionado !== "" && especialidadSeleccionada && (
              <>
                <Divider />
                <Stack
                  spacing={2}
                  sx={{ p: 3, bgcolor: "primary.50", borderRadius: 2, border: 1, borderColor: "primary.200" }}
                >
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    Paso 4: Confirmar datos
                  </Typography>

                  <Stack spacing={1} sx={{ p: 2, bgcolor: "white", borderRadius: 1 }}>
                    <Typography variant="body1">
                      <strong>Especialidad:</strong> {especialidadLabel}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Día:</strong> {diaSeleccionadoLabel}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Hora:</strong> {horarioSeleccionado}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Psicólogo:</strong> {psicologo.nombre} {psicologo.apellido}
                    </Typography>
                  </Stack>

                  <TextField
                    fullWidth
                    label="Tu Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="small"
                  />

                  {error && <Alert severity="error">{error}</Alert>}

                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleConfirmar} startIcon={<Schedule />} size="large">
                      Confirmar Cita
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setHorarioSeleccionado("")
                        setEmail("")
                      }}
                    >
                      Modificar Selección
                    </Button>
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </Box>
      </Paper>
    </Modal>
  )
}
