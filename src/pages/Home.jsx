import { Link, useHistory } from "react-router-dom";
import { Footer } from './components/footer';
import { ListFlights } from './Flights';
import SweetAlert from "sweetalert2";

function Home(){
  const history = useHistory();

  function singUp() {
    history.push("/register");
  }

  function singIn() {
    history.push("/login");
  }

  function mainPage(){
    history.push('/')
  }


  SweetAlert.fire({
    icon: 'info',
    title: 'We value your privacy',
    text: 'We use cookies to help our website function properly. By accepting, you agree to the use of all of these cookies. You can update your preferences by clicking the cookie preferences button',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    toast: true,
    width: "100vw",
    position: "bottom",
    showCancelButton: true,
    cancelButtonText: "No",
    cancelButtonColor: "#cc2323",
    confirmButtonColor: '#0B5ED7'
  })
    
  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button id='icon' onClick={mainPage}>
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
      <div>
        <h1>Holidays Airlines</h1>
        <p id='subtitle'>#1 World's Airline Company 2021 by New York Times</p>
      </div>
      <h3 className="title">Are you ready for our trip?</h3>
      <p id='p-home'><Link to='/register'>Sign up</Link> or <Link to="/login">login</Link> to book a flight</p>
      <h3>Let's Fly</h3>
      <ListFlights/>
      <Footer/>
    </>
  )
};

export { Home }