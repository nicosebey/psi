"use client"

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
  Chip,
  Paper,
  Button,
  CardActions,
  Avatar,
  Stack,
} from "@mui/material"
import { useState, useEffect } from "react"
import { Psychology, Schedule } from "@mui/icons-material"
import { TematicaPsicologia, tematicasLabels } from "@/types/types"
import PsicologoCard from "./PsicologoCard"
import AgendarCitaModal from "./AgendarCitaModal"

interface Psicologo {
  id: string
  nombre: string
  apellido: string
  username: string
  tematicas: TematicaPsicologia[]
}

export default function FiltrarPsicologos() {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([])
  const [psicologosFiltrados, setPsicologosFiltrados] = useState<Psicologo[]>([])
  const [tematicaFiltro, setTematicaFiltro] = useState<TematicaPsicologia | "">("")
  const [showSacarTurno, setShowSacarTurno] = useState<{ visible: boolean; psicologo: Psicologo | null }>({
    visible: false,
    psicologo: null,
  })
  useEffect(() => {
    // Aquí cargarías los psicólogos desde tu API
    const mockPsicologos: Psicologo[] = [
      {
        id: "1",
        nombre: "Juan",
        apellido: "Pérez",
        username: "jperez",
        tematicas: [TematicaPsicologia.ANSIEDAD, TematicaPsicologia.DEPRESION, TematicaPsicologia.ADICCIONES],
      },
      {
        id: "2",
        nombre: "María",
        apellido: "González",
        username: "mgonzalez",
        tematicas: [TematicaPsicologia.TERAPIA_COGNITIVA],
      },
      {
        id: "3",
        nombre: "Carlos",
        apellido: "López",
        username: "clopez",
        tematicas: [TematicaPsicologia.AUTOESTIMA],
      },
    ]
    setPsicologos(mockPsicologos)
    setPsicologosFiltrados(mockPsicologos)
  }, [])

  const handleFiltroChange = (tematica: TematicaPsicologia | "") => {
    setTematicaFiltro(tematica)
    if (tematica === "") {
      setPsicologosFiltrados(psicologos)
    } else {
      const filtrados = psicologos.filter((psicologo) => psicologo.tematicas.includes(tematica))
      setPsicologosFiltrados(filtrados)
    }
  }

  const limpiarFiltro = () => {
    setTematicaFiltro("")
    setPsicologosFiltrados(psicologos)
  }



  return (
    <Box>
        { 
        <AgendarCitaModal open={showSacarTurno.visible} onClose={()=>setShowSacarTurno({visible:false, psicologo:null}) } psicologo={showSacarTurno.psicologo}/>
        }
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}> 
            <FormControl fullWidth>
              <InputLabel id="filtro-especialidad-label">Filtrar por Especialidad</InputLabel>
              <Select
                labelId="filtro-especialidad-label"
                value={tematicaFiltro}
                onChange={(e) => handleFiltroChange(e.target.value as TematicaPsicologia | "")}
                label="Filtrar por Especialidad"
              >
                <MenuItem value="">Todas las especialidades</MenuItem>
                {Object.entries(tematicasLabels).map(([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={limpiarFiltro} fullWidth sx={{ height: "56px" }}>
              Mostrar Todos
            </Button>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        {psicologosFiltrados.length} profesional{psicologosFiltrados.length !== 1 ? "es" : ""} disponible
        {psicologosFiltrados.length !== 1 ? "s" : ""}
        {tematicaFiltro && ` en "${tematicasLabels[tematicaFiltro]}"`}
      </Typography>

       <Stack direction='row' gap="2rem" >

        {psicologosFiltrados.map((psicologo) => (
            <PsicologoCard psicologo={psicologo} setShowSacarTurno={()=>setShowSacarTurno({visible:true,psicologo:psicologo})}/>  
        ))}
        </Stack>

      {psicologosFiltrados.length === 0 && (
        <Paper elevation={1} sx={{ p: 6, textAlign: "center", mt: 3 }}>
          <Psychology sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron psicólogos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No hay profesionales disponibles para la especialidad seleccionada
          </Typography>
        </Paper>
      )}
    </Box>
  )
}
