import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";

//login & register
import { NewAdmin } from './pages/Register';
import { LoginAdmin } from "./pages/Login";
import { NewClient } from './pages/Register';
import { LoginClient } from './pages/Login'

//admin
import { AdminDashboard } from './pages/Dashboard';
import { ChargesList } from './pages/Charge';
import { CheckStatus } from './pages/Charge';
import { RefundPayment } from './pages/Payment';
import { CheckBalance } from "./pages/Balance";
import { Solicitation } from './pages/Payment'

//cliente
import { ClientDashboard } from './pages/Dashboard'
import { Flights } from './pages/Flights';
import { NewCharge } from './pages/Charge';
import { NewPayment } from './pages/Payment';
import { ReqRefund } from './pages/Payment';

function Routes() {
    return(
    <BrowserRouter>
      <Switch>
        {/* client */}
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LoginClient} />
        <Route path="/register" component={NewClient} />
        <Route path="/dashboard" component={ClientDashboard} />
        <Route path="/flight-schedules" component={Flights} />
        <Route path="/charges" exact component={NewCharge} />
        <Route path="/charges/check-charge" component={CheckStatus} />
        <Route path="/payments/new-payment" component={NewPayment}/>
        <Route path="/payments/refund" component={ReqRefund} />

        {/* admin */}
        <Route path="/admin/register" component={NewAdmin} />
        <Route path="/admin/login" component={LoginAdmin} />
        <Route path="/admin/" exact component={AdminDashboard} />
        <Route path="/admin/balance" component={CheckBalance} />
        <Route path="/admin/charges/list" component={ChargesList} />
        <Route path="/admin/charges/check-charge" component={CheckStatus} />
        <Route path="/admin/payments/refund" component={RefundPayment}/>
        <Route path='/admin/solicitations' component={Solicitation}/>
      </Switch>
    </BrowserRouter>
    );
}

export default Routes;