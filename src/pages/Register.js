import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom"
import { useCookies } from "react-cookie"

import { newClient, newAdmin } from '../services/login-register'
import { Footer } from './components/footer';

function NewClient(){
    const history = useHistory();
    const { register, handleSubmit } = useForm();
    const [cookies, setCookies] = useCookies([]);

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
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit(handleCreateUser)}>
                <div className="mb-3">
                    <label for="name" classNameName="form-label">Nome Completo</label>
                    <input {...register('name')} type="text" className="form-control" id="name" placeholder='Digite seu nome e sobrenome' required/>
                </div>
                <div className="mb-3">
                    <label for="email" classNameName="form-label">Email address</label>
                    <input {...register('email')} type="email" className="form-control" id="email" placeholder='Digite seu e-mail' required/>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Senha</label>
                    <input {...register('password')} type="password" className="form-control" id="password" placeholder='Digite sua senha' required/>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar-se</button>
            </form>
            <p>Deseja voltar para Página Inicial? Clique <Link to="/">aqui </Link></p>
            <p>Já possui conta? Faça seu <Link to="/login">login</Link></p>
            <Footer/>
        </main>
    )
};

function NewAdmin(){
    const history = useHistory();
    const [cookies, setCookies] = useCookies([]);
    const { register, handleSubmit } = useForm();

    async function handleCreateUser(data){
        const registerData = {
            "name": data.name,
	        "email": data.email,
	        "password": data.password
        }

        const res = await newAdmin(registerData)
        setCookies('token', res.data.token, { path: '/', maxAge: 86400})
        history.push('/dashboard')
    };
    
    return(
        <main>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit(handleCreateUser)}>
                <div className="mb-3">
                    <label for="name" classNameName="form-label">Nome Completo</label>
                    <input {...register('name')} type="text" className="form-control" id="name" placeholder='Digite seu nome e sobrenome' required/>
                </div>
                <div className="mb-3">
                    <label for="email" classNameName="form-label">Email address</label>
                    <input {...register('email')} type="email" className="form-control" id="email" placeholder='Digite seu e-mail' required/>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Senha</label>
                    <input {...register('password')} type="password" className="form-control" id="password" placeholder='Digite sua senha' required/>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar-se</button>
            </form>
            <p>Deseja voltar para Página Inicial? Clique <Link to="/">aqui </Link></p>
            <p>Já possui conta? Faça seu <Link to="/admin/login">login</Link></p>
            <Footer/>
        </main>
    )
}

export { NewAdmin, NewClient}