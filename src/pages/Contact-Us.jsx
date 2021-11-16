import { useHistory } from "react-router-dom";
import { Footer } from "./components/footer";

function ContactUs(){
    const history = useHistory();

    function singUp() {
      history.push("/register");
    }
  
    function singIn() {
      history.push("/login");
    }
  
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button id='icon'>
                H
                </button>
                <div className="container-fluid navbar-home col-md-3 text-end">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <button className="btn btn-light signUp" onClick={singUp}>Sign Up</button>
                    </li>
                    <li className="nav-item">
                    <button className="btn btn-primary" onClick={singIn}>Login</button>
                    </li>
                </ul>
                </div>
            </nav>
            <h2>Contact US</h2>
            <h3>Shopping Holidays Ticket</h3>
                <strong>For personal:</strong><span> 1-800-HOLIDAYS</span><br/>
                <strong>For business:</strong><span> 1-800-585858</span>
            <h3>General Customer Care & Technical Support</h3>
                <strong>Call:</strong><span> 1-800-555555</span><br/>
                <strong>E-mail:</strong><span> support@holidaysairline.com</span><br/>
        <Footer/>
        </>
    )
};

export { ContactUs }