/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function SignIn() {
    const navigate = useNavigate()
 
    const [isunameset, setIsUname] = useState(false)
    const [ispassset, setIsPass] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
        if (data.get("email").length > 0) {
            setIsUname(false)

        }
        if (data.get("email").length == 0) {
            setIsUname(true)
            return;
        }

        if (data.get("password").length > 0) {
            setIsPass(false)

        }
        if (data.get("password").length == 0) {
            setIsPass(true)
            return;
        }

        if(data.get("email")==='admin' && data.get("password")==='admin'){
            navigate("/dashboard")
            
        }else{
            alert("Invalid Username or Password")
        }
        
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >

                <Typography variant="h5">
                    <img src={logo} alt="Custom Logo" width={150} />
                </Typography>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={isunameset}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={ispassset}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}