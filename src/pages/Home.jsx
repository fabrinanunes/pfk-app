import { Link } from "react-router-dom";
import { Footer } from './components/footer';
import { ListFlights } from './Flights';

function Home(){
    
  return(
    <>
      <h1>
          No name Airlines
      </h1>
      <div className="row" id='home'>
        <h2>Primeira vez por aqui?</h2>
          <p>Faça seu registro <Link to="/register">aqui</Link></p>
        <h2>Já possui cadastro?</h2>
          <p>Faça seu <Link to="/login">Login</Link></p>
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