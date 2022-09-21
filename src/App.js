import logo from "./logo.svg";
import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      {/* path, exact, component = props */}
      <HomeTemplate path="/" exact Component={Home} />
      <HomeTemplate path="/contact" exact Component={Contact} />
      <HomeTemplate path="/news" exact Component={News} />
      <HomeTemplate path="/home" exact Component={Home} />

      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Router>
  );
}

export default App;
