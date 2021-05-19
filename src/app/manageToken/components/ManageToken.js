import { useEffect } from 'react';
import { GET_NEW_TOKEN_SAGA } from '../../constants/actionTypes';
import { getNewToken } from '../actions';

const ManageToken = ({ setTokenStatus, getNewToken }) => {

  const getTimeDiffSinceTokenCreation = ( tokenCreatedTime ) => {
    const currentTimeInMill = new Date().getTime();
    const timeDiff = currentTimeInMill - tokenCreatedTime;
    return timeDiff;
  }

  const token = localStorage.token;
console.log();
  useEffect(()=>{
    const expTime = 6000000;
    const tokenCreatedTime = parseInt(localStorage.tokenCreatedTime);
    console.log('tokenCreatedTime', tokenCreatedTime);
    const diff = getTimeDiffSinceTokenCreation(tokenCreatedTime);
    if(diff > expTime && token) {
      console.log('v diff je vetsi');
      localStorage.clear();
      setTokenStatus({deleted: true});
    } else if(token) {
      console.log('v diff je mensi');
      getNewToken();
      const tokenRemainingValidTime = expTime - diff;
      setTimeout(()=> {
        localStorage.clear();
        setTokenStatus({deleted: true});
      },tokenRemainingValidTime)
    }
  },[])
return null;

}
export default ManageToken;
