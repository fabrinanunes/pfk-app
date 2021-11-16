import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import { list } from '../services/balance'
import { NavBarAdmin } from './components/nav'
import { Footer } from './components/footer'

export function CheckBalance(){
  const [balance, setBalance] = useState([]);

  async function getBalance(){
    const { data } = await list();
    setBalance(data);
  }

  useEffect(() => {
    getBalance();
  }, []);

  return(
    <>
    <NavBarAdmin/>
      <h2>Holidays Airline Balance</h2>
      <ul className="list-group">Current balance:
        <li className="list-group-item">R$ {balance}</li>
      </ul>
      <p className='previous-page'>Return to the main page? Click <Link to="/admin/dashboard">here</Link></p>
      <Footer/>
    </>
  ) 
}