import { useHistory } from "react-router-dom";

function NavBarClient(){
    const history = useHistory();

    function Dashboard() {
        history.push("/dashboard");
    }
    function Refund() {
        history.push("/payments/refund");
    }

    function CheckStatus() {
        history.push("/charges/check-charge");
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
                        <button className="nav-link btn btn-link" onClick={Refund}>Solicitar Reembolso</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={CheckStatus}>Status</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

function NavBarAdmin(){
    const history = useHistory();

    function Dashboard() {
        history.push("/admin");
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
                        <button className="nav-link btn btn-link" onClick={Balance}>Saldo</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={CheckStatus}>Status</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={List}>Lista</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={Refund}>Reembolso</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link" onClick={ClientsReq}>Solicitações</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export { NavBarClient, NavBarAdmin }