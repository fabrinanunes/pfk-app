import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie"

import { clientLogin, adminLogin } from '../services/login-register'
import { Footer } from './components/footer';

function LoginClient(){
    const history = useHistory();
    const [cookies, setCookies] = useCookies([]);
    const { register, handleSubmit } = useForm();

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
            <h1>Faça seu Login</h1>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input {...register('email')} type="email" className="form-control" id="email" placeholder='Digite seu e-mail' required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input {...register('password')} type="password" className="form-control" id="password" placeholder='Digite sua senha' required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>Deseja voltar para Página Inicial? Clique <Link to="/">aqui </Link></p>
            <Footer/>
        </main>
    )
};

function LoginAdmin(){
    const history = useHistory();
    const [cookies, setCookies] = useCookies([]);
    const { register, handleSubmit } = useForm();
    
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
            <h1>Faça seu Login</h1>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input {...register('email')} type="email" className="form-control" id="email" placeholder='Digite seu e-mail' required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <input {...register('password')} type="password" className="form-control" id="password" placeholder='Digite sua senha' required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>Deseja voltar para Página Inicial? Clique <Link to="/">aqui </Link></p>
            <Footer/>
        </main>
    )
}

export { LoginClient, LoginAdmin }