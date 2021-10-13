import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom"
import { useCookies } from "react-cookie"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { newClient, newAdmin } from '../services/login-register'
import { Footer } from './components/footer';

function NewClient(){
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [cookies, setCookies] = useCookies([]);
    const theme = createTheme()

    async function handleCreateUser(data){
        const registerData = {
            "name": data.name,
	        "email": data.email,
	        "password": data.password
        }

        const res = await newClient(registerData)
        setCookies('token', res.data.token, { path: '/', maxAge: 86400})
        history.push('/dashboard')
    };
    
    return(
        <main>
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className='box-singup'>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(handleCreateUser)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField {...register('name')} autoComplete="name" name="name" required fullWidth id="name" label="Nome Completo" autoFocus />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...register('email')} required fullWidth id="email" label="E-mail" name="email" autoComplete="email"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...register('password')} required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="new-password"/>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Cadastrar-se
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <p>Já possui conta? Faça seu <Link to="/login">login</Link></p>
                            </Grid>
                            <p>Deseja voltar para Página Inicial? Clique <Link to="/">aqui </Link></p>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        <Footer/>
    </main>
    )
};

function NewAdmin(){
    const history = useHistory();
    const [cookies, setCookies] = useCookies([]);
    const { register, handleSubmit } = useForm();
    const theme = createTheme()

    async function handleCreateUser(data){
        const registerData = {
            "name": data.name,
	        "email": data.email,
	        "password": data.password
        }

        const res = await newAdmin(registerData)
        setCookies('token', res.data.token, { path: '/', maxAge: 86400})
        history.push('/admin')
    };
    
    return(
        <main>
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className='box-singup'>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(handleCreateUser)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField {...register('name')} autoComplete="name" name="name" required fullWidth id="name" label="Nome Completo" autoFocus />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...register('email')} required fullWidth id="email" label="E-mail" name="email" autoComplete="email"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...register('password')} required fullWidth name="password" label="Senha" type="password" id="password" autoComplete="new-password"/>
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Cadastrar-se
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <p>Já possui conta? Faça seu <Link to="/login">login</Link></p>
                            </Grid>
                            <p>Deseja voltar para Página Inicial? Clique <Link to="/">aqui </Link></p>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        <Footer/>
        </main>
    )
}

export { NewAdmin, NewClient}