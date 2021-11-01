import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function NavBarClient(){
    const history = useHistory();
    const cookies = useMemo(() => new Cookies(), []);
    const [token, setToken] = useState(null);
  
    useEffect(() => {
      setToken(cookies.get("token"));
    }, [cookies]);
    
    function Dashboard() {
        history.push("/dashboard");
    }

    function Refund() {
        history.push("/payments/refund");
    }

    function CheckStatus() {
        history.push("/charges/check-charge");
    }

    function Profile() {
        history.push("/profile");
    }

    function Signout(){
        cookies.remove("token");
        history.push("/");
        history.go(0);
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <p className="navbar-brand"><img src="https://cdn-icons-png.flaticon.com/512/149/149446.png" alt="icon-airplane" id="icon-navbar" /></p>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={Dashboard}>Dashboard</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={Refund}>Refund</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={CheckStatus}>Purchase Status</button>
                    </li>
                </ul>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={Profile}><AccountCircleIcon id='profile-icon'/>Profile</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={Signout}>Sign Out</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

function NavBarAdmin(){
    const history = useHistory();

    function Dashboard() {
        history.push("/admin/dashboard");
    }

    function Balance() {
        history.push("/admin/balance");
    }

    function CheckStatus() {
        history.push("/admin/charges/check-charge");
    }
    
    function List() {
        history.push("/admin/charges/list");
    }

    function Refund() {
        history.push("/admin/payments/refund");
    }

    function ClientsReq() {
        history.push("/admin/solicitations");
    }

    function ListFlights() {
        history.push("/admin/flights");
    }
    
    function NewFlight() {
        history.push("/admin/flights/new");
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <p className="navbar-brand"><img src="https://cdn-icons-png.flaticon.com/512/149/149446.png" alt="icon-airplane" id="icon-navbar" /></p>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={Dashboard}>Dashboard</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={Balance}>Balance</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={CheckStatus}>Charge Status</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={List}>Charges List</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={Refund}>Refund</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={ClientsReq}>Customer Requests</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={ListFlights}>Itineraries</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={NewFlight}>Add Itinerary</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export { NavBarClient, NavBarAdmin }