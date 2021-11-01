import { useState, useEffect } from "react";

import { Footer } from './components/footer';
import { NavBarClient } from './components/nav';

import { listUserReq } from '../services/payments';
import { profile, listCards } from '../services/profile';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

function Profile(){
    const [list, setList] = useState([]);
    const [card, setCards] = useState([]);
    const [profileData, setProfile] = useState([]);
  
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
      const { data } = await profile();
      setProfile(data);
    }

    useEffect(() => {
      profileInfo();
    }, []);

    return(
        <>
          <NavBarClient />
          <h2>Profile</h2>
            <h3><AssignmentIndIcon />Personal Info</h3>
              {profileData.map(req => 
              <li className="list-group-item" key={req._id}>
                <b>Name:</b> {req.name} <br/>
                <b>Email:</b> {req.email}<br/>
              </li>)}<br/>
              <h3><CreditCardIcon />Saved Cards:</h3>
                {card.map(req => 
                <li className="list-group-item" key={req._id}>
                  <b>Card Number:</b> {req.last4CardNumber} <br/>
                  <b>Expiration Date:</b> {req.expirationMonth}/{req.expirationYear} <br/>
                </li>)}
              <br/>
            <h3> <FlightTakeoffIcon/>Your Flights</h3>
            <span>TOTAL: <strong>{list.length}</strong></span>
            {list.map(req => 
            <li className="list-group-item" key={req._id}>
              <b>Payment Code:</b> {req._id} <br/>
              <b>Flight Number:</b> {req.flight} <br/>
              <b>Amount:</b> R$ {req.amount} <br/>
            </li>)}
          <Footer />
        </> 
    )
}

export { Profile }