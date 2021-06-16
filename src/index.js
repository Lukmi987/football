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
import ManageToken from './app/manageToken/containers/ManageToken';
import IdleTimerContainer from './app/manageToken/components/ManageUserActivity';
import ManageUserActivity from './app/manageToken/containers/ManageUserActivity';
import App from './App';



// const getTimeDiffSinceTokenCreation = ( tokenCreatedTime ) => {
//   const currentTimeInMill = new Date().getTime();
//   const timeDiff = currentTimeInMill - tokenCreatedTime;
//   return timeDiff;
// }

const token = localStorage.token;
// const expTime = parseInt(localStorage.expTime);
// const expTime = 60000;
// const tokenCreatedTime = parseInt(localStorage.tokenCreatedTime);

// const diff = getTimeDiffSinceTokenCreation(tokenCreatedTime);
//
// if(diff > expTime && token) {
//   console.log('v diff je vetsi');
//   localStorage.clear();
// } else if(token) {
//   console.log('v diff je mensi');
//   const tokenRemainingValidTime = expTime - diff;
// setTimeout(()=> localStorage.clear(),tokenRemainingValidTime)
// }



ReactDOM.render(
  <App />,
  document.getElementById("root")
);
registerServiceWorker();
