import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";

//login & register
import { NewAdmin } from './pages/Login-Register';
import { LoginAdmin } from "./pages/Login-Register";
import { NewClient } from './pages/Login-Register';
import { LoginClient } from './pages/Login-Register';

//admin
import { AdminDashboard } from './pages/Dashboard';
import { ChargesList, CheckStatusAdmin} from './pages/Charge';
import { RefundPayment } from './pages/Payment';
import { CheckBalance } from "./pages/Balance";
import { Solicitation } from './pages/Payment';
import { NewFlight } from './pages/Flights';
import { ListFlightsAdmin } from './pages/Flights';

//cliente
import { ClientDashboard } from './pages/Dashboard'
import { Flights } from './pages/Flights';
import { NewCharge, CheckStatusClient } from './pages/Charge';
import { NewPayment } from './pages/Payment';
import { ReqRefund } from './pages/Payment';
import { PrivacyPolicy, TermOfUse } from './pages/PrivacyPolicy';
import { Profile } from './pages/Profile';
import { ContactUs } from './pages/Contact-Us';

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
        <Route path="/term-of-use" component={TermOfUse} />
        <Route path="/profile" component={Profile} />
        <Route path="/contact-us" component={ContactUs} />

        {/* admin */}
        <Route path="/admin/register" component={NewAdmin} />
        <Route path="/admin" exact component={LoginAdmin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/balance" component={CheckBalance} />
        <Route path="/admin/charges/list" component={ChargesList} />
        <Route path="/admin/charges/check-charge" component={CheckStatusAdmin} />
        <Route path="/admin/payments/refund" component={RefundPayment}/>
        <Route path='/admin/solicitations' component={Solicitation}/>
        <Route path='/admin/flights/' exact component={ListFlightsAdmin}/>
        <Route path='/admin/flights/new' component={NewFlight}/>
      </Switch>
    </BrowserRouter>
    );
}

export default Routes;