import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GrupoComponente from "./sections/grupoComponente";

export default function ComponentePage() {
    const navigate = useNavigate();

    return (
        <main>
            <Button 
                variant="contained" 
                onClick={() => navigate("../")}
                sx={{ mb: 2 }}
            >
                Ir a inicio
            </Button>
            <GrupoComponente/>
        </main>
    );
}
