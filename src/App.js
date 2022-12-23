import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Appbar from './appbar';
import ChangePassword from './changepassword';
import ConfrimPassword from './confrimpassword';
import CustomeractiveOrder from './customeractiveorder';
import CustomerDeliverOrderlist from './customerdeliverorder';
import Firstpage from './firstpage';
import Foodlist from './foodlist';
import Login from './login';
// import LoginPrivateroute from './loginprivateroute';
import ManagerActiveOrder from './manageractiveored';
import ManagerDeliveryOrder from './managerdeliverorder';
import ManagerFood from './managerFood';
import ManagerFoodList from './managerfoodlist';
import ManagerLogin from './managerlogin';
import ManagerRegister from './managerregister';
import Newrestaurant from './newrestaurant';
import Privateroute from './privateroute';
import Register from './register';
import ResetPassword from './resetpassword';
import Restaurants from './restaurants';

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path='/' element={<Firstpage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/managerlogin' element={<ManagerLogin />} />
          <Route path='/customer_register' element={<Register />} />
          <Route path='/manager_register' element={<ManagerRegister />} />
          <Route path='/restaurants' element={<Privateroute><Restaurants /></Privateroute>} />
          <Route path='/restaurants_reg' element={<Privateroute><Newrestaurant /></Privateroute>} />
          <Route path='/foodlist' element={<Privateroute><Foodlist /></Privateroute>} />
          <Route path='/uploadfood' element={<Privateroute><ManagerFood /></Privateroute>} />
          <Route path="/managerfoodlist" element={<Privateroute><ManagerFoodList /></Privateroute>} />
          <Route path='/manageractiveorder' element={<Privateroute><ManagerActiveOrder /></Privateroute>} />
          <Route path='/customeractiveorder' element={<Privateroute><CustomeractiveOrder /></Privateroute>} />
          <Route path='/customerdeliveryorder' element={<Privateroute><CustomerDeliverOrderlist /></Privateroute>} />
          <Route path='/managerdelivery' element={<Privateroute><ManagerDeliveryOrder /></Privateroute>} />
          <Route path='/changepassword' element={<Privateroute><ChangePassword /></Privateroute>} />
          <Route path='/resetpassword' element={<Privateroute><ResetPassword /></Privateroute>} />
          <Route path='/confirmpassword' element={<Privateroute><ConfrimPassword /></Privateroute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
