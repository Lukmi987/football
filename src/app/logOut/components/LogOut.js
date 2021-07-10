import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function LogOut({ logOut, setTokenStatus }) {
  useEffect(() => {
    if (localStorage.token) {
      localStorage.clear();
      setTokenStatus({ deleted: true });
      logOut();
    }
  }, []);

  // history.push('/','successLogin');
  return <Redirect to="/" />;
}
