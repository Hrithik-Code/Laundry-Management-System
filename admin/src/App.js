import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Pages/Admin";
// import Cart from './Pages/Cart';
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UsersList from "./Pages/User";
import OrderDetails from "./Components/OrderDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Admin />} />
        {/* pending  */}
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/adminLogin" element={<Admin />} />
        <Route exact path="/viewOrderDetails/:id" element={<OrderDetails />} />
        {/* <Route exact path='/login' element={<Login/>}/> */}
        <Route exact path="/register" element={<Register />} />
        {/* <Route exact path="/user" element={<UsersList />} />
        <Route exact path="/user" element={<UsersList />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
