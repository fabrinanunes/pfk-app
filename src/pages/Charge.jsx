import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import 'bootstrap/dist/css/bootstrap.min.css'

import { listAll, check, create } from '../services/charges';
import { listUserReq } from '../services/payments';

import { NavBarClient, NavBarAdmin } from './components/nav'
import { Footer } from './components/footer'
import { postCode } from "../services/cep";

function NewCharge(){
  const history = useHistory();
  const [cookies, setCookies, removeCookies] = useCookies([]);

  const flightNumber = useCookies('flight')[0].flight;
  const amount = useCookies('amount')[0].amount
 
  async function newCharge(event){
    event.preventDefault();

    const chargeData = {
      "charge": {
        "description": flightNumber,
        "amount": amount,
        "paymentTypes": ['CREDIT_CARD'],
      },
      "billing": {
        "name": event.target.name.value,
        "document": event.target.document.value,
        "email": event.target.email.value,
        "address": {
          "street": event.target.street.value,
          "number": event.target.number.value,
          "city": event.target.city.value,
          "state": event.target.state.value,
          "postCode": event.target.postCode.value
        }
      }
    }

    create(chargeData).then((res) => {
      if (res.status === 200){
        const chargeId = res.data[0].id
        setCookies('chargeId', chargeId, { path: '/' })
        removeCookies('flight')
        removeCookies('amount')
        history.push('/payments/new-payment')
      }
    })
  }

  return(
    <>
    <NavBarClient/>
      <h1>Viagem do vôo {flightNumber}</h1>
      <p>Passo 01 de 02 - Dados do Passageiro</p>
      <form onSubmit={ newCharge }>
        <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type='text' placeholder='Nome Completo' id='name' className="form-control" required/>
        </div>
        <div className="form-group">
            <label htmlFor="document">Documento</label>
            <input type='text' placeholder='CPF ou CPNJ' id='document' className="form-control" required/>
        </div>
        <div className="form-group">
        <p>Dados de Contato</p>
            <label htmlFor="email">E-mail</label>
            <input type='mail' placeholder='E-mail' id='email' className="form-control" required/>
        </div>
        <div className="form-group">
            <label htmlFor="postCode">CEP</label>
            <input type='text' placeholder='88000-000' id='postCode' className="form-control" required/>
        </div>
        <div className="form-group">
            <label htmlFor="street">Endereço</label>
            <input type='text' placeholder='Rua' id='street' className="form-control" required/>
        </div>
        <div className="form-group">
            <label htmlFor="number">Número</label>
            <input type='text' placeholder='Casa ou Apartamento' id='number' className="form-control" required/>
        </div>
        <div className="form-group">
            <label htmlFor="city">Cidade</label>
            <input type='text' placeholder='Cidade' id='city' className="form-control" required/>
        </div>
          <div className="form-group">
            <label htmlFor="state">Estado</label>
            <input type='text' placeholder='Sigla UF' id='state' maxLength="2" className="form-control" required/>
        </div>
          <button className="btn btn-primary" type='submit'>Ir para Checkout</button>
      </form>
      <p>Deseja voltar para Página Inicial? Clique <Link to="/dashboard">aqui </Link></p>
      <Footer/>
    </>
  )
}

function ChargesList(){
    const [charges, setCharges] = useState([]);

    async function getCharges(){
      const { data } = await listAll();
      setCharges(data)
    };
  
    useEffect(() => {
      getCharges()
    }, []);
  
    return(
      <>
      <NavBarAdmin/>
        <h1>
          Listagem das Cobranças
        </h1>
          {charges.map(charge =>
            <li className="list-group-item" key={charge.id}>
              <b>Código Cobrança:</b> {charge._id}<br/>
              <b>Valor:</b> R${charge.amount}
              <b> Stautus:</b> {charge.status}
              <b> Data de Pagamento:</b> {charge.dueDate}
            </li>)}
        <p>Voltar para o <Link to="/admin">Dashboard</Link></p>
        <Footer/>
      </>
    )
}

function CheckStatusClient(){
    const [charge, setCharge] = useState([]);
    const [list, setList] = useState([]);
    
    async function getList(){
      const { data } = await listUserReq();
      setList(data);
    }
    
    useEffect(() => {
      getList();
    }, []);

    async function getCharge(event){
      const id = event.target.getAttribute("data-id");
      const { data } = await check(id)
      setCharge(data)
    }
    
    return(
        <>
        <NavBarClient/>
        <h1>Verificar Cobrança:</h1>
        {list.map(req => 
        <li className="list-group-item" key={req._id}>
          <b>Código:</b> {req._id} <br/>
          <b>Vôo:</b> {req.flight} <br/>
          <b>Valor:</b> R$ {req.amount} <br/>
          <b>Status:</b> {charge.status} <br/>
          <button type="submit" className="btn btn-primary" onClick={getCharge} data-id={req.chargeId}>Verificar status</button>
        </li>)}
        <p>Deseja voltar para Página Inicial? Clique <Link to="/dashboard">aqui </Link></p>
        <Footer/>
        </>
    )
}

function CheckStatusAdmin(){
  const [charge, setCharge] = useState([])

  async function getCharge(){
    const id = document.getElementById('id').value;
    const { data } = await check(id)
    setCharge(data)
  }
  
  return(
      <>
      <NavBarAdmin />
      <h1>Verificar Cobrança:</h1>
      <div className="form-group">
        <label htmlFor="id">Digite aqui o nome do ID da cobrança:</label>
        <input type='text' className="form-control" placeholder='chr_1234567890123456789' id='id' required/>
        <button className="btn btn-primary" onClick={ getCharge }>Consultar status</button>
      </div>
      <ul className="list-group">
        <li className="list-group-item"><b>ID:</b> {charge.id}</li>
        <li className="list-group-item"><b>Status:</b> {charge.status}</li>
        <li className="list-group-item"><b>Valor:</b> R$ {charge.amount}</li>
      </ul>
      <p>Deseja voltar para Página Inicial? Clique <Link to="/admin">aqui </Link></p>
      <Footer/>
      </>
  )
}

export {  NewCharge, ChargesList, CheckStatusClient, CheckStatusAdmin }