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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import { Close, Schedule, Person, CheckCircle, Cancel, AccessTime } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { Disponibilidad, HorarioSlot, Psicologo, type TematicaPsicologia, tematicasLabels, TurnoOcupado } from "@/types/types"
import { diasSemana, horariosDisponibles, mockDisponibilidades, mockTurnosOcupados } from "@/mocks/mocks"
import { isValidEmail } from "@/utils/utils"
import CitaAgendadaModal from "./CitaAgendadaModal"
interface AgendarCitaModalProps {
  open: boolean
  onClose: () => void
  psicologo: Psicologo | null
  onConfirmarCita?: (
    psicologo: Psicologo,
    especialidad: TematicaPsicologia,
    dia: number,
    hora: string,
    isVirtual: boolean,
    email: string,
  ) => void
}



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
  const [isVirtual, setIsVirtual] = useState<boolean|null>(null)
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
   const [emailError, setEmailError] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (psicologo && open) {
      setDisponibilidades(mockDisponibilidades)
      setTurnosOcupados(mockTurnosOcupados)
    }
  }, [psicologo, open])

const getHorariosDelDia = (dia: number, modalidad: boolean|null): HorarioSlot[] => {
  if (modalidad === null) return []
  return horariosDisponibles
    .filter((h) => h.isVirtual === modalidad)
    .map((h) => {
      const disponible = disponibilidades.some((disp) => {
        const horaNum = Number.parseInt(h.hora.split(":")[0])
        const inicioNum = Number.parseInt(disp.horaInicio.split(":")[0])
        const finNum = Number.parseInt(disp.horaFin.split(":")[0])
        return disp.diaDeLaSemana === dia && disp.isVirtual === modalidad && horaNum >= inicioNum && horaNum < finNum
      })
      const ocupado = turnosOcupados.some((turno) => turno.dia === dia && turno.hora === h.hora)
      return {
        hora: h.hora,
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
    setShowSuccess(false)
  }

  const handleDiaChange = (dia: number) => {
      setDiaSeleccionado(dia)
    setHorarioSeleccionado("")
    setError("")
    setShowSuccess(false)
  }

  const handleHorarioClick = (hora: string, disponible: boolean, ocupado: boolean) => {
    if (!disponible || ocupado) return

    setHorarioSeleccionado(hora)
    setError("")
    setShowSuccess(false)
  }

  const handleConfirmar = async() => {
    setError("")
    setEmailError("")
    setShowSuccess(false)
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
    if(!isVirtual) {
      setError("Por favor selecciona una modalidad")
      return
    }
    if (!isValidEmail(email.trim())) {
      setEmailError("Por favor ingresa un email válido")
      return
    }
    setIsConfirming(true)
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Agregar el turno a los turnos ocupados
      const nuevoTurno: TurnoOcupado = {
        dia: diaSeleccionado as number,
        hora: horarioSeleccionado,
      }
      setTurnosOcupados((prev) => [...prev, nuevoTurno])
     if (psicologo && onConfirmarCita) {
        onConfirmarCita(
          psicologo,
          especialidadSeleccionada,
          diaSeleccionado as number,
          horarioSeleccionado,
          isVirtual,
          email.trim(),
        )
      }
      setShowSuccess(true)

       setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (error) {
      setError("Error al agendar la cita. Por favor intenta nuevamente. " + error)
    } finally {
      setIsConfirming(false)
    }
  }
  
  const handleClose = () => {
    if (isConfirming) return
    setEspecialidadSeleccionada("")
    setDiaSeleccionado("")
    setHorarioSeleccionado("")
    setEmail("")
    setError("")
    setShowSuccess(false)
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

const horariosDelDia = diaSeleccionado !== "" && isVirtual !== null
  ? getHorariosDelDia(diaSeleccionado as number, isVirtual)
  : []
  const diaSeleccionadoLabel = diasSemana.find((d) => d.value === diaSeleccionado)?.label
  const especialidadLabel = especialidadSeleccionada ? tematicasLabels[especialidadSeleccionada] : ""

  if (!psicologo) return null

  return (
 <Modal open={open} onClose={handleClose} aria-labelledby="agendar-cita-modal">
      <Paper sx={modalStyle} elevation={8}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            p: 3,
            pb: 2,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: showSuccess ? "success.main" : "primary.main",
            color: "white",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: "white", color: showSuccess ? "success.main" : "primary.main" }}>
              {showSuccess ? <CheckCircle /> : <Person />}
            </Avatar>
            <Box>
              <Typography variant="h5" component="h2" fontWeight={600}>
                {showSuccess ? "¡Cita Agendada!" : "Agendar Cita"}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {showSuccess ? "Tu cita ha sido confirmada" : `${psicologo.nombre} ${psicologo.apellido}`}
              </Typography>
            </Box>
          </Stack>
          {!isConfirming && (
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          )}
        </Stack>
        <Box sx={{ p: 3, maxHeight: "calc(90vh - 200px)", overflow: "auto" }}>
          {showSuccess ? (
            <CitaAgendadaModal
              especialidadLabel={especialidadLabel}
              isVirtual={isVirtual}
              diaSeleccionadoLabel={diaSeleccionadoLabel || ""}
              horarioSeleccionado={horarioSeleccionado}
              psicologo={{ nombre: psicologo.nombre, apellido: psicologo.apellido }}
              email={email}
            />
          ) : (
            <Stack spacing={3}>
              <Stack gap={2} spacing={2}>
                <Typography variant="h6" fontWeight={600} color="primary">
                  Paso 1: Selecciona la especialidad y la modalidad
                </Typography>
                <FormControl fullWidth disabled={isConfirming}>
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
                  <InputLabel>Modalidad de  la consulta</InputLabel>
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={isVirtual}
                    onChange={(_, value) => {
                      if (value !== null) setIsVirtual(value)
                    }}
                    sx={{ mt: 1 }}
                    disabled={isConfirming}
                  >
                    <ToggleButton value={true}>Virtual</ToggleButton>
                    <ToggleButton value={false}>Presencial</ToggleButton>
                  </ToggleButtonGroup>    
              </Stack>
              {especialidadSeleccionada && isVirtual!==null && (
                <>
                  <Divider />
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={600} color="primary">
                      Paso 2: Selecciona el día
                    </Typography>
                    <FormControl fullWidth disabled={isConfirming}>
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
                        const isClickable = slot.disponible && !slot.ocupado && !isConfirming
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
                              opacity: slot.disponible && !isConfirming ? 1 : 0.5,
                              "&:hover": isClickable
                                ? {
                                    transform: "scale(1.05)",
                                    boxShadow: 2,
                                  }
                                : {},
                              transition: "all 0.2s ease-in-out",
                            }}
                            disabled={!slot.disponible || slot.ocupado || isConfirming}
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
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (emailError) setEmailError("")
                        if (error) setError("")
                      }}
                      onBlur={() => {
                        if (email.trim() && !isValidEmail(email.trim())) {
                          setEmailError("Formato de email inválido")
                        }
                      }}
                      required
                      size="small"
                      error={!!emailError}
                      helperText={emailError}
                      disabled={isConfirming}
                    />
                    {(error || emailError) && (
                      <Alert severity="error">
                        {error && <div>{error}</div>}
                        {emailError && <div>{emailError}</div>}
                      </Alert>
                    )}
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        onClick={handleConfirmar}
                        startIcon={<Schedule />}
                        size="large"
                        disabled={isConfirming}
                        sx={{ minWidth: 160 }}
                      >
                        {isConfirming ? "Agendando..." : "Confirmar Cita"}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setHorarioSeleccionado("")
                          setEmail("")
                        }}
                        disabled={isConfirming}
                      >
                        Modificar Selección
                      </Button>
                    </Stack>
                  </Stack>
                </>
              )}
            </Stack>
          )}
        </Box>
      </Paper>
    </Modal>
  )
}
