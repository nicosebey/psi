"use client"

import type React from "react"
import { Modal, Box, Typography, TextField, Button, IconButton, Alert, Paper } from "@mui/material"
import { Close, Login } from "@mui/icons-material"
import { useState } from "react"

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onLogin?: (username: string, password: string) => void
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 0,
  outline: "none",
}

export default function LoginModal({ open, onClose, onLogin }: LoginModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Por favor completa todos los campos")
      return
    }

    setLoading(true)
    setError("")

    try {
      if (onLogin) {
        onLogin(formData.username, formData.password)
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFormData({ username: "", password: "" })
      onClose()
    } catch (error) {
      setError("Credenciales incorrectas")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ username: "", password: "" })
    setError("")
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Paper sx={modalStyle} elevation={8}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            pb: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography id="login-modal-title" variant="h5" component="h2" fontWeight={600}>
            Iniciar Sesión
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ p: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              margin="normal"
              required
              autoFocus
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              margin="normal"
              required
              disabled={loading}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Login />}
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              {loading ? "Iniciando sesión..." : "Login"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  )
}
