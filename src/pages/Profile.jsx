import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SweetAlert from "sweetalert2";

import { Footer } from './components/footer';
import { NavBarClient } from './components/nav';
import { listUserReq } from '../services/payments';
import { profile, listCards, deleted } from '../services/profile';

function Profile(){
  const history = useHistory();
  const [cookies, removeCookies] = useCookies([])
  const [list, setList] = useState([]);
  const [card, setCards] = useState([]);
  const [profileData, setProfile] = useState([]);
  const userId = useCookies('id')[0].id

  async function getList(){
    const { data } = await listUserReq();
    setList(data);
  }

  useEffect(() => {
    getList();
  }, []);

  async function getCards(){
    const { data } = await listCards();
    setCards(data);
  }

  useEffect(() => {
    getCards();
  }, []);

  async function profileInfo(){
    const profileData = await profile(userId);
    setProfile(profileData.data);
  }

  useEffect(() => {
    profileInfo();
  }, []);

  async function deleteAccount(){
    try{
      await deleted()
      SweetAlert.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your account is being deleted!',
      })
      removeCookies("token");
      removeCookies("amount");
      removeCookies("flight");
      setTimeout(() => history.push('/'), 3000)
    }catch(error){
      SweetAlert.fire({
        icon: 'warning',
        title: 'You already requested it',
        text: 'Your account will be deleted any time soon',
      })     
      removeCookies("token");
      removeCookies("amount");
      removeCookies("flight");
      setTimeout(() => history.push('/'), 2000) 
    }
  }

  return(
    <>
        <NavBarClient />
        <h2>Profile</h2>
          <h3><AssignmentIndIcon />Personal Info</h3>
              <b>Name:</b> {profileData.name}<br/>
              <b>Email:</b> {profileData.email}<br/>
            <h3><CreditCardIcon />Saved Cards:</h3>
            {card.map(req => 
              <li className="list-group-item" key={req._id}>
                <b>Card Number:</b> {req.last4CardNumber} <br/>
                <b>Expiration Date:</b> {req.expirationMonth}/{req.expirationYear} <br/>
              </li>)}
            <br/>
          <h3> <FlightTakeoffIcon/>Your Flights</h3>
          {list.map(req => 
          <li className="list-group-item" key={req._id}>
            <b>Payment Code:</b> {req._id} <br/>
            <b>Flight Number:</b> {req.flight} <br/>
            <b>Amount:</b> R$ {req.amount} <br/>
          </li>)}
          <button className="btn btn-primary check-charge" onClick={deleteAccount}>Delete my account</button>
        <Footer />
    </> 
  )
}

export { Profile }