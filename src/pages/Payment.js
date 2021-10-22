import * as React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import 'bootstrap/dist/css/bootstrap.min.css'

import { create, saveCard, refund, reqRefund, listUserReq, listReq } from '../services/payments';
import { NavBarClient, NavBarAdmin } from './components/nav';
import { Footer } from './components/footer';

function NewPayment(){
    const history = useHistory();
    const [cookies, removeCookies] = useCookies([])
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);

    const chargeId = useCookies('chargeId')[0].chargeId;
    
    async function handleCreatePayment(data){
      const publicToken = process.env.REACT_APP_PUBLIC_TOKEN
      let checkout = new window.DirectCheckout(publicToken, false);

      const cardData = {
        cardNumber: data.cardNumber,
        holderName: data.holderName,
        securityCode: data.securityCode,
        expirationMonth: data.expirationMonth,
        expirationYear: data.expirationYear
      }

      async function newCardHash(){
        const hash = await new Promise((resolve, reject) => {
          checkout.getCardHash(cardData, function(cardHash) {
            resolve(cardHash)
          }, function(error) {
            reject(error)
          });
        })
        return hash;
      }
    
      const paymentData = {
        "chargeId": chargeId,
        "billing": {
          "email": data.email,
          "address": {
            "street": data.street,
            "number": data.number,
            "city": data.city,
            "state": data.state,
            "postCode": data.postCode
          },
          "delayed": false
        },
        "creditCardDetails":{
          "creditCardHash": await newCardHash()
        }
      };
      
      if(document.getElementById('cardHash').checked === true){
        const tokenization = {
          "creditCardHash": paymentData.creditCardDetails.creditCardHash
        }
        saveCard(tokenization)
      }

      create(paymentData).then((res) => {
        if(res.status === 200){
          removeCookies('chargeId')
          removeCookies('amount')
          setOpen(true)
          setTimeout(() => history.push('/dashboard'), 4000)
        }
      }) 
    };

    return(
      <>
      <NavBarClient/>
        <h1>Checkout</h1>
        <h4>Passo 02 de 02 - Dados do Comprador</h4>
        <form onSubmit={handleSubmit(handleCreatePayment)}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input {...register('email')} type='email' className="form-control" placeholder='seuemail@mail.com' id='email' required/>
          </div>
          <div className="form-group">
            <label htmlFor="street">Endereço</label>
            <input {...register('street')} type='text' className="form-control" placeholder='Rua' id='street' required/>
          </div>
          <div className="form-group">
            <label htmlFor="number">Número</label>
            <input {...register('number')} type='text' className="form-control" placeholder='Casa ou Apartamento' id='number' required/>
          </div>
          <div className="form-group">
            <label htmlFor="city">Cidade</label>
            <input {...register('city')} type='text' className="form-control" placeholder='Cidade' id='city' required/>
          </div>
          <div className="form-group">
            <label htmlFor="state">Estado</label>
            <input {...register('state')} type='text' className="form-control" placeholder='Sigla UF' maxLength="2" id='state' required/>
          </div>
          <div className="form-group">
            <label htmlFor="postCode">CEP</label>
            <input {...register('postCode')} type='text' className="form-control" placeholder='88000-000' id='postCode' required/>
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Dados do Cartão</label>
            <input {...register('cardNumber')} type='text' className="form-control" placeholder='Número do Cartão' id='cardNumber'/>
          </div>
          <div className="form-group">
            <label htmlFor="holderName">Nome Completo</label>
            <input {...register('holderName')} type='text' className="form-control" placeholder='Nome que consta no cartão' id='holderName'/>
          </div>
          <div className="form-group">
            <label htmlFor="securityCode">Código de Segurança</label>
            <input {...register('securityCode')} type='text' className="form-control" placeholder='xxx' id='securityCode'/>
          </div>
          <div className="form-group">
            <label htmlFor="expirationMonth">Mês de Expiração</label>
            <input {...register('expirationMonth')} type='text' className="form-control" placeholder='MM' id='expirationMonth'/>
          </div>
          <div className="form-group">
            <label htmlFor="expirationYear">Ano de Expiração</label>
            <input {...register('expirationYear')} type='text' className="form-control" placeholder='YYYY' id='expirationYear'/>
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="cardhHash">Salvar o cartão para futuras viagens</label>
            <input type="checkbox" className="form-check-input" id="cardHash"/>
          </div>
            <div>
              <Link to="/charges">Voltar</Link>
              <button type='submit' className="btn btn-primary">Pagar</button>
            </div>
        </form>
          <Collapse in={open}>
          <Alert 
            severity="success"
          >
            <AlertTitle>Sucesso</AlertTitle>
            Pagamento efetuado. Em instantes, você receberá <strong>um e-mail de confirmação.</strong>
          </Alert>
          </Collapse>
        <p>Deseja voltar para Página Inicial? Clique <Link to="/dashboard">aqui </Link></p>
        <Footer/>
      </>
    )
};

function RefundPayment(){
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit } = useForm()

  async function paymentRefund(data){
    const id = document.getElementById('id').value;
    const amount = {
      "amount": data.amount
    }
    
    await refund(id, amount).then((res) => {
      if(res.status === 200) {
        setOpen(true)
        setTimeout(() => history.push('/admin'), 3000)
      }
    })
  }

    return(
      <>
      <NavBarAdmin/>
        <h1>
            Gerar Reembolso
        </h1>
        <form onSubmit={handleSubmit(paymentRefund)}>
          <div className="form-group">
            <label htmlFor="id">ID do Pagamento: </label>
            <input {...register('paymentId')} type='text' placeholder='ID do Pagamento' id='id' className="form-control" required/>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Valor a ser reembolsado: </label>
            <input {...register('amount')} type='number' placeholder='R$ 00,00' id='amount' className="form-control"/>
          </div>
          <button className="btn btn-primary" type='submit'>Enviar</button>
        </form>
        <Collapse in={open}>
          <Alert 
            severity="success"
          >
            <AlertTitle>Sucesso</AlertTitle>
            Reembolso realizado. O cliente receberá <strong>um e-mail de confirmação.</strong>
          </Alert>
          </Collapse>
        <p>Deseja voltar para Página Inicial? Clique <Link to="/admin">aqui </Link></p>
        <Footer/>
      </>
    )
};

function ReqRefund(){
  const [list, setList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  async function getList(){
    const { data } = await listUserReq();
    setList(data);
  }

  useEffect(() => {
    getList();
  }, []);
  
  async function paymentRefund(event){
    const reqData = {
      "paymentId": event.target.getAttribute("data-id"),
      "amount": event.target.getAttribute("data-price")
    }
    
    await reqRefund(reqData).then((res) => {
      if(res.status === 200){
        setOpen(true)
        setTimeout(() => history.push('/dashboard'), 4000)
      }
    })
  }
  
  return(
      <>
      <NavBarClient/>
      <h1>Solicitar Reembolso</h1>
      {list.map(req => 
        <li className="list-group-item" key={req._id}>
          <b>Código do Pagamento:</b> {req.paymentId} <br/>
          <b>Valor:</b> R$ {req.amount} <br/>
          <button type="submit" className="btn btn-primary" onClick={paymentRefund} data-id={req.paymentId} data-price={req.amount}>Solicitar Reembolso</button>
        </li>)}
      <Collapse in={open}>
          <Alert 
            severity="warning"
          >
            <AlertTitle>Solicitação efetuada.</AlertTitle>
            Você receberá, <strong>em até 05 dias úteis</strong>, a resposta da solicitação.
          </Alert>
          </Collapse>
      <p>Deseja voltar para Página Inicial? Clique <Link to="/dashboard">aqui </Link></p>
      <Footer/>
      </>
  )
};

function Solicitation(){
  const [list, setList] = useState([]);

  async function getSolicitations(){
      const { data } = await listReq();
      setList(data)
  }

  useEffect(() => {
      getSolicitations()
  }, [])

  return(
      <>
      <NavBarAdmin/>
        <h1>Solicitações</h1>
        {list.map(req => 
        <li className="list-group-item" key={req._id}>
          <b>Código do Solicitante:</b> {req.user} <br/>
          <b>Código do Pagamento:</b> {req.paymentId}<br/>
          <b>Valor:</b> R${req.amount}
        </li>)}
        <p>Deseja voltar para Página Inicial? Clique <Link to="/admin">aqui </Link></p>
        <Footer/>
      </>
  )
};

export { NewPayment, RefundPayment, ReqRefund, Solicitation}