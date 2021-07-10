import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = (props) => {
  const token = localStorage.token;
// console.log('token',token);
//   console.log('component', Component);
  console.log('crest', props);
  return (

    <Route
      {...rest}
      render={(props) => {
      if(token) {
        console.log('v token podmince');
        return <Component />
      } else {
       return  (<Redirect to={{pathname: "/", state: { from: props.location }}} />)
      }
    }}/>
  )

}

export default ProtectedRoute;