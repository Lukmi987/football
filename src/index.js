import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import registerServiceWorker from "./registerServiceWorker";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
//import LoginPage from "views/LoginPage/LoginPage.js";
import Login from "app/login/containers/SectionLogin";
import UserAccount from "app/userAccount/containers/UserAccount";
import EventForm from "app/event/containers/EventForm";
import AboutUs from "app/aboutUs/AboutUs"
import '@fortawesome/fontawesome-free/css/all.min.css'; import
    'bootstrap-css-only/css/bootstrap.min.css'; import
    'mdbreact/dist/css/mdb.css';
import LogOut from "./app/logOut/containers/LogOut";
import PhotoGallery from "./app/photoGallery/PhotoGallery";
import Cabin from "./app/cabin/Cabin";

const token = localStorage.token;

const hist = createBrowserHistory();
const isSuccessLogin = hist.location.state;

let routes;
// useEffect(()=>{
//
// }, [token])
if(token){
   routes = (
       <Switch>
    <Route path="/logout-page" component={LogOut} />
    <Route path="/userAccount-page" component={UserAccount} />
    <Route path="/about-us" component={AboutUs} />
    <Route path="/photo-gallery" component={PhotoGallery} />
    <Route path="/cabin" component={Cabin} />
    <Route path="/event-form-page" component={EventForm} />
    <Route path="/" component={Components} />
       </Switch>
    );
} else {
    routes = (
        <Switch>
    <Route path="/login-page" component={Login} />
            <Route path="/logout-page" component={LogOut} />
    <Route path="/about-us" component={AboutUs} />
    <Route path="/event-form-page" component={EventForm} />
    <Route path="/photo-gallery" component={PhotoGallery} />
            <Route path="/cabin" component={Cabin} />
    <Route path="/" component={Components} />
          <Route path="/userAccount-page" component={UserAccount} />
        </Switch>
    )
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/login-page" component={Login} />
        <Route path="/logout-page" component={LogOut} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/event-form-page" component={EventForm} />
        <Route path="/photo-gallery" component={PhotoGallery} />
        <Route path="/cabin" component={Cabin} />
        <Route path="/manage-account" component={UserAccount} />
        <Route path="/" component={Components} />

      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
