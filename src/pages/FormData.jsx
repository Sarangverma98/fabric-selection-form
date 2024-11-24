import {
    Box,
    Button,
    Typography,
  } from "@mui/material";

  import { useLocation } from "react-router-dom";

const FormData = () => {

    const location = useLocation()
    const formData = location.state
  return (
    <Box>
        {JSON.stringify(formData, null, 2)}
    </Box>
  )
}

export default FormData