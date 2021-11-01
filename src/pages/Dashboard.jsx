import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavBarClient, NavBarAdmin } from './components/nav'
import { Footer } from './components/footer'
import { Flights } from './Flights'

function AdminDashboard() {
  const history = useHistory();

  function handleCheckBalance() {
    history.push("/admin/balance");
  }

  function handleChargesList() {
    history.push("/admin/charges/list");
  }

  function handleCheckCharge() {
    history.push("/admin/charges/check-charge");
  }

  function handleRefund() {
    history.push("/admin/payments/refund");
  }

  function handleSolicitations() {
    history.push("/admin/solicitations");
  }

  function handleFlights(){
    history.push("/admin/flights");
  }

  function handleNewFlight(){
    history.push("/admin/flights/new");
  }

  return (
    <>
    <NavBarAdmin/>
      <h1>Dashboard - Admin</h1>
      <h3>O que deseja fazer?</h3>
      <ul className="list-group-flush">
        <b>Geral</b>
        <li className="list-group-item dashboard">
          Consultar saldo
          <Button type="submit" onClick={handleCheckBalance}>
            Ir
          </Button>
        </li>
        <b>Cobranças</b>
        <li className="list-group-item dashboard">
          Consultar cobrança
          <Button type="submit" onClick={handleCheckCharge}>
            Ir
          </Button>
        </li>
        <li className="list-group-item dashboard">
          Listar todas as cobranças
          <Button type="submit" onClick={handleChargesList}>
            Ir
          </Button>
        </li>
        <b>Reembolso</b>
        <li className="list-group-item dashboard">
          Verificar solicitações
          <Button type="submit" onClick={handleSolicitations}>
            Ir
          </Button>
        </li>
        <li className="list-group-item dashboard">
          Gerar Reembolso
          <Button type="submit" onClick={handleRefund}>
            Ir
          </Button>
        </li>
        <b>Vôos</b>
        <li className="list-group-item dashboard">
          Listar intinerários
          <Button type="submit" onClick={handleFlights}>
            Ir
          </Button>
        </li>
        <li className="list-group-item dashboard">
          Adicionar novo intinerário
          <Button type="submit" onClick={handleNewFlight}>
            Ir
          </Button>
        </li>
      </ul>
    <Footer/>
    </>
  );
};

function ClientDashboard() {
  const history = useHistory();

  function handleRefund() {
    history.push("/payments/refund");
  }

  function handleCheckCharge() {
    history.push("/charges/check-charge");
  }

  return (
    <>
    <NavBarClient/>
      <h1>Welcome Aboard</h1>
      <Flights />
      <Footer/>
    </>
  );
};

export { AdminDashboard, ClientDashboard };