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
import ball from '../../assets/img/ball.jpeg'
import { ADD_PLAYER, CREATE_EVENT, MANAGE_ACCOUNT, MANAGE_ADMINS } from '../constants/headerLinks';
import PlayersAdministration from '../playersAdministration/containers/PlayersAdministration';
import AddPlayer from '../addPlayer/containers/AddPlayer';
import UserAccount from '../userAccount/containers/UserAccount';
import EventForm from '../event/containers/EventForm';
const useStyles = makeStyles(styles);

export default function ManageAccounts() {
  const classes = useStyles();
  console.log('jsem v kabine voel');
// const isAdmin = localStorage.isAdmin !== 'undefined';
  const isAdmin = true;
  console.log('jsem v kabine voel', isAdmin);
  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <div className={classes.container}>
            <Tabs className="mt-25" defaultActiveKey="profile" id="uncontrolled-tab-example">
              {isAdmin && <Tab eventKey="home" title={CREATE_EVENT}>
                <EventForm />
              </Tab>
              }
              <Tab eventKey="profile" title={MANAGE_ACCOUNT}>
                <UserAccount />
              </Tab>
              {isAdmin &&
              <Tab eventKey="AddPlayer" title={ADD_PLAYER}>
                <AddPlayer />
              </Tab>
              }
              {isAdmin && <Tab eventKey="Manage_Admins" title={MANAGE_ADMINS}>
                <PlayersAdministration />
              </Tab>
              }
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
