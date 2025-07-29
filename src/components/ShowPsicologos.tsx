"use client";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Psychology } from "@mui/icons-material";
import { Psicologo, TematicaPsicologia, tematicasLabels } from "@/types/types";
import PsicologoCard from "./PsicologoCard";
import AgendarCitaModal from "./AgendarCitaModal";
import { mockPsicologos } from "@/mocks/mocks";

export default function FiltrarPsicologos() {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);
  const [psicologosFiltrados, setPsicologosFiltrados] = useState<Psicologo[]>(
    []
  );
  const [tematicaFiltro, setTematicaFiltro] = useState<TematicaPsicologia | "">(
    ""
  );
  const [modalidadFiltro, setModalidadFiltro] = useState<null | boolean>(null);
  const [showSacarTurno, setShowSacarTurno] = useState<{
    visible: boolean;
    psicologo: Psicologo | null;
  }>({
    visible: false,
    psicologo: null,
  });
  useEffect(() => {
    setPsicologos(mockPsicologos);
  }, []);

  useEffect(() => {
    let filtrados = psicologos;

    if (tematicaFiltro !== "") {
      filtrados = filtrados.filter((psicologo) =>
        psicologo.tematicas.includes(tematicaFiltro)
      );
    }

    if (modalidadFiltro !== null) {
      filtrados = filtrados.filter((psicologo) =>
        psicologo.disponibilidades?.some(
          (disp) => disp.isVirtual === modalidadFiltro
        )
      );
    }

    setPsicologosFiltrados(filtrados);
  }, [psicologos, tematicaFiltro, modalidadFiltro]);

  const handleFiltroChange = (tematica: TematicaPsicologia | "") => {
    setTematicaFiltro(tematica);
    if (tematica === "") {
      setPsicologosFiltrados(psicologos);
    } else {
      const filtrados = psicologos.filter((psicologo) =>
        psicologo.tematicas.includes(tematica)
      );
      setPsicologosFiltrados(filtrados);
    }
  };

  const limpiarFiltro = () => {
    setTematicaFiltro("");
    setModalidadFiltro(null);
    setPsicologosFiltrados(psicologos);
  };

  return (
    <Box>
      {
        <AgendarCitaModal
          open={showSacarTurno.visible}
          onClose={() => setShowSacarTurno({ visible: false, psicologo: null })}
          psicologo={showSacarTurno.psicologo}
        />
      }
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="filtro-especialidad-label">
              Filtrar por Especialidad
            </InputLabel>
            <Select
              labelId="filtro-especialidad-label"
              value={tematicaFiltro}
              onChange={(e) =>
                handleFiltroChange(e.target.value as TematicaPsicologia | "")
              }
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
          <FormControl fullWidth>
            <InputLabel id="filtro-modalidad-label">
              Filtrar por Modalidad
            </InputLabel>
            <Select
              labelId="filtro-modalidad-label"
              value={
                modalidadFiltro === null
                  ? ""
                  : modalidadFiltro
                  ? "virtual"
                  : "presencial"
              }
              onChange={(e) => {
                const value = e.target.value as string;
                if (value === "") setModalidadFiltro(null);
                else setModalidadFiltro(value === "virtual" ? true : false);
              }}
              label="Filtrar por Modalidad"
            >
              <MenuItem value="">Todas las modalidades</MenuItem>
              <MenuItem value="virtual">Virtual</MenuItem>
              <MenuItem value="presencial">Presencial</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button
          variant="outlined"
          onClick={limpiarFiltro}
          fullWidth
          sx={{ height: "56px", mt: 2 }}
        >
          Mostrar Todos
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        {psicologosFiltrados.length} profesional
        {psicologosFiltrados.length !== 1 ? "es" : ""} disponible
        {psicologosFiltrados.length !== 1 ? "s" : ""}
        {tematicaFiltro && ` en "${tematicasLabels[tematicaFiltro]}"`}
      </Typography>

      <Stack direction="row" gap="2rem">
        {psicologosFiltrados.map((psicologo) => (
          <PsicologoCard
            key={psicologo.id}
            psicologo={psicologo}
            setShowSacarTurno={() =>
              setShowSacarTurno({ visible: true, psicologo: psicologo })
            }
          />
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
  );
}
