import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading_DatVe from "./components/Loading/Loading_DatVe";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Films from "./pages/Admin/Films/Films";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import ShowTime from "./pages/Admin/Showtime/ShowTime";
import Users from "./pages/Admin/Users/Users";
import AddNewUser from "./pages/Admin/Users/AddNewUser.js/AddNewUser";
import EditUser from "./pages/Admin/Users/EditUser/EditUser";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      {/* path, exact, component = props */}
      <Loading_DatVe />
      <HomeTemplate path="/" exact Component={Home} />
      <HomeTemplate path="/contact" exact Component={Contact} />
      <HomeTemplate path="/news" exact Component={News} />
      <HomeTemplate path="/home" exact Component={Home} />
      <HomeTemplate path="/detail/:id" exact Component={Detail} />
      <HomeTemplate path="/profile" exact Component={Profile} />

      <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

      <UserTemplate path="/login" exact Component={Login} />
      <UserTemplate path="/register" exact component={Register} />
      {/* Admin Films */}
      <AdminTemplate path="/admin" exact Component={Films} />
      <AdminTemplate path="/admin/films" exact Component={Films} />
      <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
      <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
      <AdminTemplate
        path="/admin/films/showtimes/:id/:tenphim"
        exact
        Component={ShowTime}
      />
      {/* Admin User */}
      <AdminTemplate path="/admin/users" exact Component={Users} />
      <AdminTemplate path="/admin/users/edit/:id" exact Component={EditUser} />
      <AdminTemplate
        path="/admin/users/addnewuser"
        exact
        Component={AddNewUser}
      />
    </Router>
  );
}

export default App;
