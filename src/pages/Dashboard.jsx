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
      <h1>Dashboard</h1>
      <ul className="list-group-flush">
        <strong>Geral</strong>
        <li className="list-group-item dashboard">
          <span>Check balance</span>
          <Button type="submit" onClick={handleCheckBalance}>
            GO
          </Button>
        </li>
        <strong>Charges</strong>
        <li className="list-group-item dashboard">
          <span>Check Charge</span>
          <Button type="submit" onClick={handleCheckCharge}>
          GO
          </Button>
        </li>
        <li className="list-group-item dashboard">
          <span>List Charges</span>
          <Button type="submit" onClick={handleChargesList}>
            GO
          </Button>
        </li>
        <strong>Refund</strong>
        <li className="list-group-item dashboard">
          <span>Check Solicitations</span>
          <Button type="submit" onClick={handleSolicitations}>
            GO
          </Button>
        </li>
        <li className="list-group-item dashboard">
          <span>Refund</span>
          <Button type="submit" onClick={handleRefund}>
            GO
          </Button>
        </li>
        <strong>Flight Schedule</strong>
        <li className="list-group-item dashboard">
          <span>List Itineraries</span>
          <Button type="submit" onClick={handleFlights}>
            GO
          </Button>
        </li>
        <li className="list-group-item dashboard">
          <span>Add New Itinerary</span>
          <Button type="submit" onClick={handleNewFlight}>
            GO
          </Button>
        </li>
      </ul>
    <Footer/>
    </>
  );
};

function ClientDashboard() {
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