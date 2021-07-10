import React, { useEffect, useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../components/CustomButtons/Button';

function getTimeDiffSinceTokenCreation() {
  const currentTimeInMill = new Date().getTime();
  return currentTimeInMill - parseInt(localStorage.tokenCreatedTime) || 0;
}

const ManageUserActivity = ({ setTokenStatus, getNewToken, tokenStatus }) => {
 // Component is first called when user enters page, coz our dependency tokenStatus is set in loginUser saga  this component is calle again
  const idleTimeRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [registeredIdleTimeout, setRegisteredIdleTimeout] = useState(false);

  const oneDay = 86400000;
  const thirtyMin = 1800000;
  const tokenCreatedTime = parseInt(localStorage.tokenCreatedTime);

  useEffect(() => {
    if (getTimeDiffSinceTokenCreation() > oneDay) {
      localStorage.clear();
          } else if (tokenCreatedTime) {
      setTokenStatus({ deleted: false });
    }
  }, []);

  const handleInactivity = () => {
    setModalIsOpen(true);
    sessionTimeoutRef.current = setTimeout(logOut, 10000);
  };

  const handleAction = () => {
    if (getTimeDiffSinceTokenCreation() > thirtyMin) {
      getNewToken();
    }
  };

  const stayActive = () => {
    clearTimeout(sessionTimeoutRef.current);
    setModalIsOpen(false);
    getNewToken();
  };

  const logOut = () => {
    setRegisteredIdleTimeout(false);
    localStorage.clear();
    setModalIsOpen(false);
    clearTimeout(sessionTimeoutRef.current);
    setTokenStatus({ deleted: true });
  };
  return (
    <div>
      <Modal show={modalIsOpen} backdrop="static" keyboard={false} centered={true}>
        <Modal.Header>
          <Modal.Title>Nebyl jsi aktivní poslední den</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Budeš brzo odhlášený</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button color="facebook" onClick={logOut}>
            Log me out
          </Button>
          <Button color="facebook" onClick={stayActive}>
            {' '}
            Keep me signed in
          </Button>
        </Modal.Footer>
      </Modal>
      {!tokenStatus && (
        <IdleTimer
          ref={idleTimeRef}
          timeout={oneDay}
          onAction={handleAction}
          onIdle={handleInactivity}
        >
          {' '}
        </IdleTimer>
      )}
    </div>
  );
};

export default ManageUserActivity;
