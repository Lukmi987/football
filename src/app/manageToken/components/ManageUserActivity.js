import React, { useEffect, useRef, useState } from 'react';
import IdleTimer  from 'react-idle-timer';
import { getTimeDiffSinceTokenCreation } from '../../helpers/manageTokenHelpers';
import Modal from  'react-bootstrap/Modal';
import Button from '../../../components/CustomButtons/Button';

const ManageUserActivity = ({ setTokenStatus, getNewToken, tokenStatus })  => {
 const idleTimeRef =  useRef(null);
 const sessionTimeoutRef = useRef(null)
  const [modalIsOpen, setModalIsOpen] = useState(false);
 const [registeredIdleTimeout, setRegisteredIdleTimeout] = useState(false);

  const oneDay = 86400000;
  const thirtyMin = 1800000;
  const tokenCreatedTime = parseInt(localStorage.tokenCreatedTime);
  const timeDiffSinceTokenCreation =
    getTimeDiffSinceTokenCreation(tokenCreatedTime);


  useEffect(()=>{
    console.log('registeredIdleTimeout', registeredIdleTimeout);
    if(timeDiffSinceTokenCreation > oneDay) {
      localStorage.clear();
    } else if (tokenCreatedTime) {
      setTokenStatus({deleted: false})
    }
  },[])



  const handleInactivity = () => {
    setModalIsOpen(true);
    sessionTimeoutRef.current = setTimeout(logOut,10000);
  }

  const handleAction = () => {
  if(timeDiffSinceTokenCreation > thirtyMin ){
    getNewToken();
  }
}

  const stayActive = () => {
    clearTimeout(sessionTimeoutRef.current);
    setModalIsOpen(false);
    getNewToken();
  }

  const logOut = () => {
    console.log('jsem  v logout ,',registeredIdleTimeout);
    setRegisteredIdleTimeout(false);
    localStorage.clear();
    setModalIsOpen(false);
    clearTimeout(sessionTimeoutRef.current)
    setTokenStatus({ deleted: true });
  }
  // console.log('jsem konec manage registeredIdleTimeout !!!!!!!!',registeredIdleTimeout);
  console.log('token status', tokenStatus);
  return (
    <div>
      <Modal show={modalIsOpen}
             backdrop="static"
             keyboard={false}
             centered={true}
      >
        <Modal.Header>
          <Modal.Title>Nebyl jsi aktivní poslední den</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Budeš brzo odhlášený</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button color='facebook' onClick={logOut}>Log me out</Button>
          <Button color='facebook' onClick={stayActive}> Keep me signed in</Button>
        </Modal.Footer>
      </Modal>
      {  !tokenStatus && <IdleTimer
        ref={idleTimeRef} timeout={oneDay} onAction={handleAction} onIdle={handleInactivity}> </IdleTimer>}
    </div>
  )
}

export default ManageUserActivity;