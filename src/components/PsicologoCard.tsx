import { Psicologo, TematicaPsicologia, tematicasLabels } from "@/types/types"
import { Psychology, Schedule } from "@mui/icons-material"
import { Avatar, Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useState } from "react"



interface PsicologoCardProps {
    psicologo: Psicologo
    setShowSacarTurno:()=>void
  }
export default function PsicologoCard({psicologo,setShowSacarTurno}:PsicologoCardProps) {

  const [tematicaFiltro, setTematicaFiltro] = useState<TematicaPsicologia | "">("")
    const getInitials = (nombre: string, apellido: string) => {
        return `${nombre.charAt(0)}${apellido.charAt(0)}`
      }
    return (
        <Card
              elevation={3}
              sx={{
                height: "100%",
                maxWidth:'20rem',
                width:'20rem',
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      mr: 2,
                      width: 56,
                      height: 56,
                      fontSize: "1.2rem",
                    }}
                  >
                    {getInitials(psicologo.nombre, psicologo.apellido)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h2">
                      {psicologo.nombre} {psicologo.apellido}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      @{psicologo.username}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, mb: 1 }}>
                  Especialidades:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {psicologo.tematicas.map((tematica) => (
                    <Chip
                      key={tematica}
                      label={tematicasLabels[tematica]}
                      size="small"
                      color={tematica === tematicaFiltro ? "primary" : "default"}
                      variant={tematica === tematicaFiltro ? "filled" : "outlined"}
                      icon={<Psychology sx={{ fontSize: 16 }} />}
                    />
                  ))}
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Schedule />}
                  onClick={setShowSacarTurno}
                >
                  Agendar Cita
                </Button>
              </CardActions>
            </Card>
    )
}