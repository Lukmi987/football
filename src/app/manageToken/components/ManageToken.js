import {
  getTimeDiffSinceTokenCreation,
  manageTokenValidity,
} from '../../helpers/manageTokenHelpers';
import { useEffect } from 'react';
import IdleTimer from 'react-idle-timer';

const ManageToken = ({ setTokenStatus, getNewToken }) => {
  const oneDay = 86400000;
  console.log('v manfage token');
  useEffect(() => {
    const tokenCreatedTime = parseInt(localStorage.tokenCreatedTime);
    const timeDiffSinceTokenCreation = getTimeDiffSinceTokenCreation(tokenCreatedTime);

    if (tokenCreatedTime) {
      if (timeDiffSinceTokenCreation > oneDay) {
        localStorage.clear();
        setTokenStatus({ deleted: true });
      } else {
        console.log('jjjjj validuj');
        manageTokenValidity(setTokenStatus, getNewToken);
      }
    }
  }, []);
  return null;
};
export default ManageToken;
