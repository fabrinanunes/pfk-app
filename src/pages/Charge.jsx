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
        removeCookies('flight');
        removeCookies('amount');
        history.push('/payments/new-payment')
      }
    })
  }

  return(
    <>
    <NavBarClient/>
      <h2>Your Flight - {flightNumber}</h2>
      <p className='form'>01 of 02: Passenger Information</p>
      <form onSubmit={ newCharge }>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type='text' placeholder='Full Name' id='name' className="form-control" required/>
        </div>
        <div className="form-group">
          <label htmlFor="document">Identity Documents</label>
          <input type='text' placeholder='ID' id='document' className="form-control" required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type='mail' placeholder='Email Address' id='email' className="form-control" required/>
        </div>
        <div className="form-group">
          <label htmlFor="postCode">Zip Code</label>
          <input type='text' placeholder='88000000' id='postCode' className="form-control" onBlur={getCEP} required/>
        </div>
        <div className="form-group">
          <label htmlFor="street">Address</label>
          <input type='text' placeholder='Street' id='street' className="form-control" required/>
        </div>
        <div className="form-group">
          <label htmlFor="number">Number</label>
          <input type='text' placeholder='Number' id='number' className="form-control" required/>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type='text' placeholder='City' id='city' className="form-control" required/>
        </div>
          <div className="form-group">
          <label htmlFor="state">State</label>
          <input type='text' placeholder='SC' id='state' maxLength="2" className="form-control" required/>
        </div>
        <button className="btn btn-primary form-btn" type='submit'>Checkout</button>
      </form>
      <p className='previous-page'>Return to the main page? Click <Link to="/dashboard">here</Link></p>
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
        <h2>Charge List</h2>
          {charges.map(charge =>
            <li className="list-group-item" key={charge.id}>
              <b>Code:</b> {charge.code}<br/>
              <b>Price:</b> R${charge.amount}<br/>
              <b>Status:</b> {charge.status} <br/>
              <b>Payment Date:</b> {charge.dueDate}
            </li>)}
        <p className='previous-page'>Return to the main page? Click <Link to="/admin/dashboard">here</Link></p>
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
        <h2>Purchase Status</h2>
        {list.map(req => 
        <li className="list-group-item" key={req._id}>
          <b>Code:</b> {req._id} <br/>
          <b>Flight Number:</b> {req.flight} <br/>
          <b>Amount:</b> R$ {req.amount} <br/>
          <b>Status:</b> {charge.status} <br/>
          <button type="submit" className="btn btn-primary" onClick={getCharge} data-id={req.chargeId}>Check Status</button>
        </li>)}
        <p className='previous-page'>Return to the main page? Click <Link to="/dashboard">here</Link></p>
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
      <h2>Check Charge</h2>
      <div className="form-group">
        <label htmlFor="id">Type Charge ID:</label>
        <input type='text' className="form-control" placeholder='chr_1234567890123456789' id='id' required/>
        <button className="btn btn-primary" onClick={ getCharge }>Verify</button>
      </div>
      <ul className="list-group check-charge">
        <li className="list-group-item"><b>ID:</b> {charge.id}</li>
        <li className="list-group-item"><b>Status:</b> {charge.status}</li>
        <li className="list-group-item"><b>Price:</b> R$ {charge.amount}</li>
      </ul>
      <p className='previous-page'>Return to the main page? Click <Link to="/admin/dashboard">here</Link></p>
      <Footer/>
      </>
  )
}

export {  NewCharge, ChargesList, CheckStatusClient, CheckStatusAdmin }