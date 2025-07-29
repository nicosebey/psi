"use client"

import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Person } from "@mui/icons-material";

interface HeaderProps {
  onPsicologoClick?: () => void
}

export default function Header({ onPsicologoClick }: HeaderProps) {
  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ py: 1, px: 0 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "white",
              letterSpacing: 1,
              flexGrow: 1,
            }}
          >
            Psi
          </Typography>
          <Button
            variant="contained"
            startIcon={<Person />}
            onClick={onPsicologoClick}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                bgcolor: "grey.100",
                transform: "translateY(-1px)",
                boxShadow: 3,
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            Ingresar como Psicólogo
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
