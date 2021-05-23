import React, {useEffect} from "react";
import { Redirect } from 'react-router-dom';

export default function LogOut({ logOut}) {

useEffect(() => {
    if(localStorage.token) {
      window.onclick = undefined;
        localStorage.clear();
        logOut();
    }
}, [])

        // history.push('/','successLogin');
return (
     <Redirect to="/"/>
 )
}
