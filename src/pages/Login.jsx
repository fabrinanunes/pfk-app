import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { clientLogin, adminLogin } from '../services/login-register'
import { Footer } from './components/footer';

function LoginClient(){
    const history = useHistory();
    const [cookies, setCookies] = useCookies([]);
    const { register, handleSubmit } = useForm();
    const theme = createTheme();

    async function handleSignIn(data){
        const loginData = {
            "email": data.email,
            "password": data.password
        }
        
        const res = await clientLogin(loginData)
        
        setCookies('token', res.data.token, { path: '/', maxAge: 86400})
        history.push('/dashboard')
    };

    return (
        <main>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Faça seu Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(handleSignIn)} noValidate sx={{ mt: 1 }}>
                    <TextField {...register('email')} 
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextField {...register('password')}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    /> */}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Login
                    </Button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                    </Box>
                </Box>
            </Container>
            <p>Deseja voltar para Página Inicial? Clique <Link to="/">aqui </Link></p>
            <Footer/>
        </ThemeProvider>
        </main>
    )
};

function LoginAdmin(){
    const history = useHistory();
    const [cookies, setCookies] = useCookies([]);
    const { register, handleSubmit } = useForm();
    const theme = createTheme();
    
    async function handleSignIn(data){
        const loginData = {
            "email": data.email,
            "password": data.password
        }
        
        const res = await adminLogin(loginData)

        setCookies('token', res.data.token, { path: '/', maxAge: 86400})
        history.push('/admin')
    
    }

    return (
        <main>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Faça seu Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(handleSignIn)} noValidate sx={{ mt: 1 }}>
                    <TextField {...register('email')} 
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextField {...register('password')}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    /> */}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Login
                    </Button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                    </Box>
                </Box>
            </Container>
            <p>Deseja voltar para Página Inicial? Clique <Link to="/">aqui </Link></p>
            <Footer/>
        </ThemeProvider>
        </main>
    )
}

export { LoginClient, LoginAdmin }