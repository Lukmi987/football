import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer.js';
import styles from 'assets/jss/material-kit-react/views/components.js';

import Header from '../../components/Header/Header';
import HeaderLinks from '../../components/Header/HeaderLinks';
import classNames from 'classnames';
import Footer from '../../components/Footer/Footer';
import Event from '../event/containers/Event';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EventStats from '../event/containers/EventStats';
import EventNews from '../event/containers/EventNews';
import ball from '../../assets/img/ball.jpeg'
import Fade from 'react-bootstrap/Fade'
import UseMobileWidth from '../../hooks/useMobileWidth';

const useStyles = makeStyles(styles);

const Cabin = () => {
  const classes = useStyles();
  const isMobile = UseMobileWidth();
  const [key, setKey] = useState('events');

  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classNames(classes.main, !isMobile && classes.mainRaised)}>
        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer className={classes.textCenter} justify="center">
              <img src={ball} className='mt-12 rounded-circle ' width='400' height='300'/>
            </GridContainer>

            <Tabs className='sm:mt-6'  defaultActiveKey="profile"  activeKey={key} onSelect={(k) => {setKey(k); console.log('key',k)}} id="uncontrolled-tab-example">
              <Tab  eventKey="home"  title="Statistiky" >
                <EventStats />
              </Tab>
              <Tab eventKey="events" title="Správa událostí">
                <Event />
              </Tab>
              <Tab eventKey="contact" title="Novinky">
                <EventNews />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default (Cabin)