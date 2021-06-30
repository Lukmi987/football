import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer.js';
import styles from 'assets/jss/material-kit-react/views/components.js';

import Header from '../../components/Header/Header';
import HeaderLinks from '../../components/Header/HeaderLinks';
import GridItem from '../../components/Grid/GridItem';
import classNames from 'classnames';
import Footer from '../../components/Footer/Footer';
import { Carousel } from 'react-bootstrap';
import ImageGrid from '../ImageGrid';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import Event from '../event/containers/Event';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EventAttendanceList from '../event/components/EventAttendanceList';
import { v4 as uuid_v4 } from 'uuid';
import EventStats from '../event/containers/EventStats';
import EventNews from '../event/containers/EventNews';

const useStyles = makeStyles(styles);

export default function Cabin() {
  const classes = useStyles();
  console.log('jsem v kabine');

  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer className={classes.textCenter} justify="center">
              {/*<GridItem className='cabin' xs={12} sm={12} md={12}>*/}
              <h1 style={{ marginTop: '180px' }}>Vítej v kabině spoluhrači!</h1>
              {/*</GridItem>*/}
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
