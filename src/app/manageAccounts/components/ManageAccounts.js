import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-kit-react/views/components.js';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import classNames from 'classnames';
import Footer from '../../../components/Footer/Footer';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ADD_PLAYER, CREATE_EVENT, MANAGE_ACCOUNT, MANAGE_ADMINS } from '../../constants/headerLinks';
import PlayersAdministration from '../../playersAdministration/containers/PlayersAdministration';
import AddPlayer from '../../addPlayer/containers/AddPlayer';
import UserAccount from '../../userAccount/containers/UserAccount';
import EventForm from '../../event/containers/EventForm';
const useStyles = makeStyles(styles);

export default function ManageAccounts({admin, getAdmin }) {
  const classes = useStyles();
  useEffect(()=>{
    getAdmin();
  },[admin.isAdmin])

  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <div className={classes.container}>
            <Tabs className="mt-25" defaultActiveKey="profile" id="uncontrolled-tab-example">
              {admin.isAdmin && <Tab eventKey="home" title={CREATE_EVENT}>
                <EventForm />
              </Tab>
              }
              <Tab eventKey="profile" title={MANAGE_ACCOUNT}>
                <UserAccount />
              </Tab>
              {admin.isAdmin &&
              <Tab eventKey="AddPlayer" title={ADD_PLAYER}>
                <AddPlayer />
              </Tab>
              }
              {admin.isAdmin && <Tab eventKey="Manage_Admins" title={MANAGE_ADMINS}>
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
