import { Link } from "react-router-dom";
import { Footer } from './components/footer';
import { Flights } from './Flights'

export function Home(){
    
    return(
      <>
        <h1>
            No name Airlines
        </h1>
        <div className="row" id='home'>
          <div className="col ">
            <h2>Se você é cliente:</h2>
            <h3>Primeira vez por aqui?</h3>
            <p>Faça seu registro <Link to="/register">aqui</Link></p>
            <h3>Já possui cadastro?</h3>
            <p>Faça seu <Link to="/login">Login</Link></p>
          </div>
          <div className="col">
            <h2>Se você é funcionário:</h2>
            <h3>Primeira vez por aqui?</h3>
            <p>Faça seu registro <Link to="/admin/register">aqui</Link></p>
            <h3>Já possui cadastro?</h3>
            <p>Faça seu <Link to="/admin/login">Login</Link></p>
          </div>
        </div>
        <hr/>
        <Flights/>
        <hr/>
        <Footer/>
      </>
    )
  }