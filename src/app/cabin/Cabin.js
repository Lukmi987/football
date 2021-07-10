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

const useStyles = makeStyles(styles);

const Cabin = () => {
  const classes = useStyles();

  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer className={classes.textCenter} justify="center">
              <img src={ball} className='mt-12 rounded-circle' width='400' height='300'/>
            </GridContainer>

            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Statistiky">
                <EventStats />
              </Tab>
              <Tab eventKey="profile" title="Manage Events">
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