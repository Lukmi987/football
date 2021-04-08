import React from "react";
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
import '@fortawesome/fontawesome-free/css/all.min.css'; import
    'bootstrap-css-only/css/bootstrap.min.css'; import
    'mdbreact/dist/css/mdb.css';

const token = localStorage.token;
const hist = createBrowserHistory();
const isSuccessLogin = hist.location.state;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/*  {token &&  <Redirect */}
        {/*    to={{ */}
        {/*    pathname: "/"*/}
        {/*  }}*/}
        {/*  />*/}
        {/*}*/}
        {/* <Route path="/landing-page" component={LandingPage} /> */}
        {/* <Route path="/profile-page" component={ProfilePage} /> */}
        <Route path="/login-page" component={Login} />
          <Route path="/event-form-page" component={EventForm} />
        <Route path="/userAccount-page" component={UserAccount} />
        <Route path="/" component={Components} />
        {/* <Route path="*" component={Login} /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
