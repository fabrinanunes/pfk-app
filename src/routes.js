import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";

//login & register
import { NewAdmin } from './pages/Register';
import { LoginAdmin } from "./pages/Login";
import { NewClient } from './pages/Register';
import { LoginClient } from './pages/Login';

//admin
import { AdminDashboard } from './pages/Dashboard';
import { ChargesList, CheckStatusAdmin} from './pages/Charge';
import { RefundPayment } from './pages/Payment';
import { CheckBalance } from "./pages/Balance";
import { Solicitation } from './pages/Payment';
import { NewFlight } from './pages/Flights';

//cliente
import { ClientDashboard } from './pages/Dashboard'
import { Flights } from './pages/Flights';
import { NewCharge, CheckStatusClient } from './pages/Charge';
import { NewPayment } from './pages/Payment';
import { ReqRefund } from './pages/Payment';
import { PrivacyPolicy } from './pages/PrivacyPolicy'

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
        <Route path="/charges/check-charge" component={CheckStatusClient} />
        <Route path="/payments/new-payment" component={NewPayment}/>
        <Route path="/payments/refund" component={ReqRefund} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />

        {/* admin */}
        <Route path="/admin/register" component={NewAdmin} />
        <Route path="/admin/login" component={LoginAdmin} />
        <Route path="/admin/" exact component={AdminDashboard} />
        <Route path="/admin/balance" component={CheckBalance} />
        <Route path="/admin/charges/list" component={ChargesList} />
        <Route path="/admin/charges/check-charge" component={CheckStatusAdmin} />
        <Route path="/admin/payments/refund" component={RefundPayment}/>
        <Route path='/admin/solicitations' component={Solicitation}/>
        <Route path='/admin/flights/' component={Flights}/>
        <Route path='/admin/fligths/new' component={NewFlight}/>
      </Switch>
    </BrowserRouter>
    );
}

export default Routes;