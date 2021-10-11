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

  return (
    <>
    <NavBarAdmin/>
      <h1>Dashboard - Admin</h1>
      <h3>O que deseja fazer?</h3>
      <ul className="list-group">
        <b>Geral</b>
        <li className="list-group-item">
          Consultar saldo
          <Button type="submit" onClick={handleCheckBalance}>
            Ir
          </Button>
        </li>
        <b>Cobranças</b>
        <li className="list-group-item">
          Consultar cobrança
          <Button type="submit" onClick={handleCheckCharge}>
            Ir
          </Button>
        </li>
        <li className="list-group-item">
          Listar todas as cobranças
          <Button type="submit" onClick={handleChargesList}>
            Ir
          </Button>
        </li>
        <b>Pagamento</b>
        <li className="list-group-item">
          Gerar Reembolso
          <Button type="submit" onClick={handleRefund}>
            Ir
          </Button>
        </li>
        <b>Clientes</b>
        <li className="list-group-item">
          Verificar solicitações
          <Button type="submit" onClick={handleSolicitations}>
            Ir
          </Button>
        </li>
      </ul>
    <Footer/>
    </>
  );
}

function ClientDashboard() {
  const history = useHistory();
  function handleCapturePayment() {
    history.push("/payments/capture");
  }

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
      <h3>O que deseja fazer?</h3>
      <ul className="list-group">
          <li className="list-group-item">
            Antecipar Parcela
            <Button type="submit" onClick={handleCapturePayment}>
              Ir
            </Button>
          </li>
          <li className="list-group-item">
            Solicitar Reembolso
            <Button type="submit" onClick={handleRefund}>
              Ir
            </Button>
          </li>
          <li className="list-group-item">
            Consultar Status
            <Button type="submit" onClick={handleCheckCharge}>
              Ir
            </Button>
          </li>
      </ul>
      <Footer/>
    </>
  );
}

export { AdminDashboard, ClientDashboard };