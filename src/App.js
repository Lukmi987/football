import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './configureStore';
import ManageUserActivity from './app/manageToken/containers/ManageUserActivity';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './app/login/containers/SectionLogin';
import LogOut from './app/logOut/containers/LogOut';
import AboutUs from './app/aboutUs/AboutUs';
import EventForm from './app/event/containers/EventForm';
import PhotoGallery from './app/photoGallery/PhotoGallery';
import Cabin from './app/cabin/Cabin';
import UserAccount from './app/userAccount/containers/UserAccount';
import Components from './views/Components/Components';
import { createBrowserHistory } from 'history';

const App = () => {
  const hist = createBrowserHistory();

  return (<Provider store={store}>
    <ManageUserActivity />
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
  </Provider>
  )
}

export default App;