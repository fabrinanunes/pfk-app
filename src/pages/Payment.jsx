import * as React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import 'bootstrap/dist/css/bootstrap.min.css'
import SweetAlert from "sweetalert2";

import { create, saveCard, refund, reqRefund, listUserReq, listReq } from '../services/payments';
import { postCode } from "../services/cep";
import { NavBarClient, NavBarAdmin } from './components/nav';
import { Footer } from './components/footer';

function NewPayment(){
    const history = useHistory();
    const [cookies, setCookies, removeCookies] = useCookies([])
    const { register, handleSubmit } = useForm();
    const chargeId = useCookies('chargeId')[0].chargeId;

    function getCEP(event){
      event.preventDefault();
      const cepData = document.getElementById('postCode').value;
      const cep = { cep: cepData };
  
      postCode(cep).then((res) => {
        document.getElementById('street').value = res.data.end;
        document.getElementById('city').value = res.data.cidade;
        document.getElementById('state').value = res.data.uf;
      })
    }

    async function handleCreatePayment(data){
      const publicToken = process.env.REACT_APP_PUBLIC_TOKEN
      let checkout = new window.DirectCheckout(publicToken, false);

      const cardData = {
        cardNumber: data.cardNumber.split(' ').join(''),
        holderName: data.holderName,
        securityCode: data.securityCode,
        expirationMonth: data.expirationMonth,
        expirationYear: data.expirationYear
      }

      const last4numbers = cardData.cardNumber.slice(cardData.cardNumber.length - 4)
      setCookies('cardNumber', last4numbers, { path: '/' })
      setCookies('holderCard', cardData.holderName, { path: '/' })
      setCookies('expirationMonth', cardData.expirationMonth, { path: '/' })
      setCookies('expirationYear', cardData.expirationYear, { path: '/' })

      async function newCardHash(){
        const hash = await new Promise((resolve, reject) => {
          checkout.getCardHash(cardData, function(cardHash) {
            resolve(cardHash)
          }, function(error) {
            reject(error)
            SweetAlert.fire({
              icon: 'error',
              title: 'Purchase failed',
              text: 'Try again!',
            })
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
        "creditCardDetails": {
          "creditCardHash": await newCardHash()
        }
      };
      
      if(document.getElementById('cardHash').checked === true){
        const tokenization = {
          "creditCardHash": paymentData.creditCardDetails.creditCardHash
        }

        saveCard(tokenization).then((res) => {
          if(res.status !== 200){
            SweetAlert.fire({
              icon: 'error',
              title: `Can not save your card information`,
              text: 'Try again!',
            })
          }
        })
      }

      create(paymentData).then((res) => {
        if(res.status === 200){
          removeCookies('chargeId')
          removeCookies('amount')
          SweetAlert.fire({
            icon: 'success',
            title: 'Purchase Succeed',
            text: 'Fasten your seatbeal!',
          })
          setTimeout(() => {
            history.push('/dashboard')
          }, 2000);
          
        }
        if(res.status !== 200){
          SweetAlert.fire({
            icon: 'error',
            title: 'Purchase failed',
            text: 'Try again!',
          })
        }
      }) 
    };

    return(
      <>
      <NavBarClient/>
        <h1>Checkout</h1>
        <p className='form'>02 of 02: Billing Information</p>
        <form onSubmit={handleSubmit(handleCreatePayment)}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input {...register('email')} type='email' className="form-control" placeholder='Email Address' id='email' required/>
          </div>
          <div className="form-group">
            <label htmlFor="postCode">Zip Code</label>
            <input {...register('postCode')} type='text' className="form-control" placeholder='88000000' id='postCode' onBlur={getCEP} required/>
          </div>
          <div className="form-group">
            <label htmlFor="street">Address</label>
            <input {...register('street')} type='text' className="form-control" placeholder='Street' id='street' required/>
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input {...register('number')} type='text' className="form-control" placeholder='Number' id='number' required/>
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input {...register('city')} type='text' className="form-control" placeholder='City' id='city' required/>
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input {...register('state')} type='text' className="form-control" placeholder='SC' maxLength="2" id='state' required/>
          </div>
        
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input {...register('cardNumber')} type='text' className="form-control" placeholder='Card Number' id='cardNumber'/>
          </div>
          <div className="form-group">
            <label htmlFor="holderName">Cardholder Name</label>
            <input {...register('holderName')} type='text' className="form-control" placeholder='Full Name' id='holderName'/>
          </div>
          <div className="form-group">
            <label htmlFor="securityCode">CVC Code</label>
            <input {...register('securityCode')} type='text' className="form-control" placeholder='xxx' id='securityCode'/>
          </div>
          <div className="form-group">
            <label htmlFor="expirationMonth">Expiration Month</label>
            <input {...register('expirationMonth')} type='text' className="form-control" placeholder='MM' id='expirationMonth'/>
          </div>
          <div className="form-group">
            <label htmlFor="expirationYear">Expiration Year</label>
            <input {...register('expirationYear')} type='text' className="form-control" placeholder='YYYY' id='expirationYear'/>
          </div>
          <div className="form-check">
            <label className="form-check-label" htmlFor="cardhHash">Save card for future travels</label>
            <input type="checkbox" className="form-check-input" id="cardHash"/>
          </div>
            <div className='checkout-btn'>
              <Link to="/charges">Return</Link>
              <button type='submit' className="btn btn-primary">Payment</button>
            </div>
        </form>
          <p className='previous-page'>Return to the main page? Click <Link to="/dashboard">here</Link></p>
        <Footer/>
      </>
    )
};

function RefundPayment(){
  const history = useHistory();
  const { register, handleSubmit } = useForm()

  async function paymentRefund(data){
    const id = document.getElementById('id').value;
    const amount = {
      "amount": data.amount
    }
    
    try{
      const res = await refund(id, amount)
      SweetAlert.fire({
        icon: 'success',
        title: 'Refund succees',
        text: 'Customer will receive an e-mail soon',
      })
      setTimeout(() => {
        history.push('/admin/dashboard')
      }, 3000)
    }catch(error){
      SweetAlert.fire({
        icon: 'error',
        title: 'Refund failed',
        text: 'Try again later!'
      })
    }
  }

  return(
    <>
    <NavBarAdmin/>
      <h2>Refund</h2>
      <form onSubmit={handleSubmit(paymentRefund)}>
        <div className="form-group">
          <label htmlFor="id">Payment ID:</label>
          <input {...register('paymentId')} type='text' placeholder='pay_1235875434' id='id' className="form-control" required/>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input {...register('amount')} type='number' placeholder='R$ 0,00' id='amount' className="form-control"/>
        </div>
        <button className="btn btn-primary" type='submit'>Refund</button>
      </form>
      <p className='previous-page'>Return to the main page? Click <Link to="/admin/dashboard">here</Link></p>
      <Footer/>
    </>
  )
};

function ReqRefund(){
  const [list, setList] = useState([]);
  const history = useHistory();

  async function getList(){
    const { data } = await listUserReq();
    setList(data)

  }

  useEffect(() => {
    getList()
  }, [])
  
  async function paymentRefund(event){
    const reqData = {
      "paymentId": event.target.getAttribute("data-id"),
      "amount": event.target.getAttribute("data-price")
    }
    
    try{
      const res = await reqRefund(reqData)
      SweetAlert.fire({
        icon: 'success',
        title: 'Request Succeed',
        text: 'Our Finance Department will send you a confirmation e-mail withtin 05 working days!',
      })
       setTimeout(() => history.push('/dashboard'), 3000) 
    }catch(error){
      SweetAlert.fire({
        icon: 'error',
        title: 'Request Failed',
        text: error.response.data.Message,
      })
    }
  }
  
  return(
      <>
      <NavBarClient/>
      <h2>Purchases Historic</h2>
      {list.map(req => 
        <li className="list-group-item" key={req._id}>
          <b>Code:</b> {req._id} <br/>
          <b>Flight Number:</b> {req.flight} <br/>
          <b>Price:</b> R$ {req.amount} <br/>
          <button type="submit" id='botao' className="btn btn-primary" onClick={paymentRefund} data-id={req.paymentId} data-price={req.amount}>Request Refund</button>
        </li>)}
          <p className='previous-page'>Return to the main page? Click <Link to="/dashboard">here</Link></p>
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
      <h2>Customers Solicitations</h2>
      {list.map(req => 
      <li className="list-group-item" key={req._id}>
        <b>Customer Code:</b> {req.user} <br/>
        <b>Payment ID:</b> {req._id}<br/>
        <b>Amount:</b> R${req.amount}
      </li>)}
      <p className='previous-page'>Return to the main page? Click <Link to="/admin/dashboard">here</Link></p>
      <Footer/>
    </>
  )
};

export { NewPayment, RefundPayment, ReqRefund, Solicitation}