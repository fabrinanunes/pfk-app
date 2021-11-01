import { Link } from "react-router-dom";
import { Footer } from './components/footer';
import { ListFlights } from './Flights';

function Home(){
    
  return(
    <>
      <div id="title">
        <h1>Holidays Airlines</h1>
        <span>#1 World's Airline Company by New York Times</span>
      </div>
      <div className="row" id='home'>
        <div className="col home">
          <h3>Primeira vez por aqui?</h3>
          <p>Faça seu registro <Link to="/register">aqui</Link></p>
        </div>
        <div className="col home">
          <h3>Já possui cadastro?</h3>
          <p>Faça seu <Link to="/login">Login</Link></p>
        </div>
      </div>
      <hr/>
      <h3>Vôos disponíveis</h3>
      <p><Link to='/register'>Registre-se</Link> ou faça <Link to="/login">login</Link> para realizar a compra</p>
      <ListFlights/>
      <hr/>
      <Footer/>
    </>
  )
};

export { Home }