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
            <h1>Profile</h1>
                <h2><AssignmentIndIcon /> Seus dados</h2>
                  {profileData.map(req => 
                  <li className="list-group-item" key={req._id}>
                    <b>Nome:</b> {req.name} <br/>
                    <b>E-mail:</b> {req.email}<br/>
                  </li>)}<br/>
                  <h4><CreditCardIcon />Cartões:</h4>
                    {card.map(req => 
                    <li className="list-group-item" key={req._id}>
                      <b>Últimos 04 dígitos:</b> {req.last4CardNumber} <br/>
                      <b>Data de Expiração:</b> {req.expirationMonth}/{req.expirationYear} <br/>
                    </li>)}
                  <br/>
                <h2> <FlightTakeoffIcon/> Seus vôos</h2>
                <span>Total: <strong>{list.length}</strong></span>
                {list.map(req => 
                <li className="list-group-item" key={req._id}>
                  <b>Código do Pagamento:</b> {req._id} <br/>
                  <b>Vôo:</b> {req.flight} <br/>
                  <b>Valor:</b> R$ {req.amount} <br/>
                </li>)}
            <Footer />
        </> 
    )
}

export { Profile }