import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie"
import Cookies from "universal-cookie";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SweetAlert from "sweetalert2";

//import { login } from "../services/api";
import { clientLogin, adminLogin } from '../services/login-register';
import { newClient, newAdmin } from '../services/login-register';
import { Footer } from './components/footer';

function LoginClient(){
    const history = useHistory();
    const [cookies, setCookies] = useCookies([]);
    const { register, handleSubmit } = useForm();

    async function handleSignIn(data){
        const loginData = {
            "email": data.email,
            "password": data.password
        };

        try{
            const res = await clientLogin(loginData);
            setCookies('token', res.data.token, { path: '/', maxAge: 86400})
            history.push('/dashboard');
        }catch(error){
            SweetAlert.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Email and/or Password Incorrect. Try again!',
            })
        }
    };

    return (
        <main>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className='box-singup'>
                    <Avatar sx={{ m: 1, bgcolor: '#0B5ED7' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h2" variant="h5"> Login </Typography>
                    <Box component="form" onSubmit={handleSubmit(handleSignIn)} noValidate sx={{ mt: 1 }}>
                    <TextField {...register('email')} margin="normal" required fullWidth 
                    id="email" 
                    label="Email Address" 
                    name="email" 
                    autoComplete="email" autoFocus />
                    <TextField {...register('password')} margin="normal" required fullWidth 
                    id="password" 
                    label="Password" 
                    name="password" 
                    type="password" 
                    autoComplete="current-password" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Login </Button>
                    </Box>
                </Box>
            <p >Return to the main page? Click <Link to="/">here</Link></p>
            </Container>
            <Footer/>
        </main>
    )
};

function LoginAdmin(){
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    
    async function handleSignIn(data){
        const loginData = {
            "email": data.email,
            "password": data.password
        };
        
        try{
            const res = await adminLogin(loginData);
            history.push('/admin/dashboard');
        }catch(error){
            SweetAlert.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Email and/or Password Incorrect. Try again!',
            })
        }
    }

    return (
        <main>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className="box-singup">
                    <Avatar sx={{ m: 1, bgcolor: '#0B5ED7' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(handleSignIn)} noValidate sx={{ mt: 1 }}>
                    <TextField {...register('email')} margin="normal" required fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email" autoFocus
                    />
                    <TextField {...register('password')} margin="normal" required fullWidth
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
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Login </Button>
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
            <Footer/>
        </main>
    )
};

function NewClient(){
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    async function handleCreateUser(data){
        const registerData = {
            "name": data.name,
	        "email": data.email,
	        "password": data.password
        };
        
        try{
            const res = await newClient(registerData);
            history.push('/dashboard')
        }catch(error){
            SweetAlert.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response.data.error,
            })
        }
    };
    
    return(
    <main>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className='box-singup'>
                    <Avatar sx={{ m: 1, bgcolor: '#0B5ED7' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h2" variant="h5"> Sign up </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(handleCreateUser)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField {...register('name')} autoComplete="name" name="name" required fullWidth id="name" label="Full name" autoFocus />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...register('email')} required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField {...register('password')} required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password"/>
                            </Grid>
                        </Grid>
                        <div className="form-check">
                            <label className="form-check-label newsletter" htmlFor="newsletter">Sign up to receive <strong>Holidays Co.</strong> newslettlers and special offer emails.</label>
                            <input type="checkbox" className="form-check-input" id="newsletter"/>
                        </div>
                        <p className='newsletter'>By creating an account you are agreeing to the <strong>Holidays Airline</strong> <Link to='/privacy-policy'>programme rules and our privacy policy.</Link></p>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Join now </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <p>Have an account? <Link to="/login">Login</Link></p>
                            </Grid>
                            <p>Return to the main page? Click <Link to="/">here</Link></p>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        <Footer/>
    </main>
    )
};

function NewAdmin(){
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    async function handleCreateUser(data){
        const registerData = {
            "name": data.name,
	        "email": data.email,
	        "password": data.password
        };
        try{
            const res = await newAdmin(registerData);
           // const cookies = new Cookies(login);
            history.push('/admin');
        }catch(error){
            SweetAlert.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response.data.error,
            })
        }
    };
    
    return(
        <main>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className='box-singup'>
                    <Avatar sx={{ m: 1, bgcolor: '#0B5ED7' }}>
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
        <Footer/>
        </main>
    )
};

export { LoginClient, LoginAdmin, NewAdmin, NewClient }