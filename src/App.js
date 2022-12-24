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
          <Route path='/restaurants' element={<Privateroute component={<Restaurants />}/>} />
          <Route path='/restaurants_reg' element={<Privateroute component={<Newrestaurant />}/>} />
          <Route path='/foodlist' element={<Privateroute component={<Foodlist />}/>} />
          <Route path='/uploadfood' element={<Privateroute component={<ManagerFood />}/>} />
          <Route path="/managerfoodlist" element={<Privateroute component={<ManagerFoodList />}/>} />
          <Route path='/manageractiveorder' element={<Privateroute component={<ManagerActiveOrder />}/>} />
          <Route path='/customeractiveorder' element={<Privateroute component={<CustomeractiveOrder />}/>} />
          <Route path='/customerdeliveryorder' element={<Privateroute component={<CustomerDeliverOrderlist />}/>} />
          <Route path='/managerdelivery' element={<Privateroute component={<ManagerDeliveryOrder />}/>} />
          <Route path='/changepassword' element={<Privateroute component={<ChangePassword />}/>} />
          <Route path='/resetpassword' element={<Privateroute component={<ResetPassword />}/>} />
          <Route path='/confirmpassword' element={<Privateroute component={<ConfrimPassword />}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
