"use client"
import { Stack, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";  

interface CitaAgendadaModalProps {
  especialidadLabel: string;
  isVirtual: boolean|null;
  diaSeleccionadoLabel: string;
  horarioSeleccionado: string;
  psicologo: { nombre: string; apellido: string };
  email: string;
}
export default function CitaAgendadaModal({
  especialidadLabel,
  isVirtual,
  diaSeleccionadoLabel,
  horarioSeleccionado,
  psicologo,
  email,
}: CitaAgendadaModalProps) {
  return (
    <Stack spacing={3} alignItems="center" sx={{ py: 4 }}>
      <CheckCircle sx={{ fontSize: 80, color: "success.main" }} />
      <Typography variant="h5" align="center" color="success.main" fontWeight={600}>
        ¡Cita Agendada Exitosamente!
      </Typography>
      <Stack spacing={1} sx={{ p: 3, bgcolor: "success.50", borderRadius: 2, width: "100%" }}>
        <Typography variant="body1" align="center">
          <strong>Especialidad:</strong> {especialidadLabel}
        </Typography>
        <Typography variant="body1" align="center">
          <strong>Modalidad:</strong> {isVirtual ? "Virtual" : "Presencial"}
        </Typography>
        <Typography variant="body1" align="center">
          <strong>Día:</strong> {diaSeleccionadoLabel}
        </Typography>
        <Typography variant="body1" align="center">
          <strong>Hora:</strong> {horarioSeleccionado}
        </Typography>
        <Typography variant="body1" align="center">
          <strong>Psicólogo:</strong> {psicologo.nombre} {psicologo.apellido}
        </Typography>
        <Typography variant="body1" align="center">
          <strong>Email:</strong> {email}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" align="center">
        Te contactaremos pronto para confirmar los detalles de tu cita.
      </Typography>
    </Stack>
  );
}