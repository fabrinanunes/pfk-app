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
      <h1>Verificar Saldo</h1>
      <ul className="list-group">Seu saldo é de:
        <li className="list-group-item">R$ {balance}</li>
      </ul>
      <p>Voltar para o <Link to="/admin">Dashboard</Link></p>
      <Footer/>
    </>
  )
}