"use client"
import { JSX, useState } from "react";
import {Stack} from '@mui/material';
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import FiltrarPsicologos from "@/components/ShowPsicologos";

export const HomeTemplate = (): JSX.Element => {
    const [showLogin,setShowLogin] = useState(false)


    return(
        <Stack>
           <Header onPsicologoClick={()=>setShowLogin(!showLogin)}/>
            <LoginModal open={showLogin} onClose={() => setShowLogin(false)}/>
                <FiltrarPsicologos/>
            
        </Stack>
    )
}