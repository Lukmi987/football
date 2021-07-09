import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/downloadStyle.js';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import { ADD_PLAYER } from '../../constants/headerLinks';
import { v4 as uuid_v4 } from 'uuid';
import {Switch} from "@material-ui/core";
import Spinner from '../../Spinner';
const useStyles = makeStyles(styles);

export default function PlayersAdministration({ fetchPlayers, players, saveEditedPlayer, loadingStatus }) {
  const classes = useStyles();
  const [selectedUser, setSelectedUser ] = useState();
  const [] = useState();

useEffect(()=> {
  fetchPlayers();
},[])

  const handleChange = (ev,player) => {
    setSelectedUser(ev.target.name);
    saveEditedPlayer({userID: player?.userID || '', isAdmin: !player?.isAdmin})
  }

  return  (
      <div>
        <Header brand={ADD_PLAYER} rightLinks={<HeaderLinks/>} fixed color="white"/>
        <div className={classes.section}>
          <div className={classes.container}>
          <GridContainer className={classes.textCenter} justify="center">
            <GridItem xs={12} sm={12} md={8} >
              <ul className=' flex flex-column  align-items-center shadow-lg  pt-5'>
              {players.length && players.map(player =>
              <li key={uuid_v4()} className='flex'>
                <div className='w-40 h-10'><h1>{player?.firstName}{" "}{player?.lastName}</h1></div>
                <div className="ml-10">
                  {loadingStatus.isLoading && selectedUser === player.email ? <Spinner /> :
                  <Switch  checked={player?.isAdmin} name={player.email}  onChange={(ev) => handleChange(ev, player) } />
                  }
                </div>
              </li>
              )}
              </ul>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      </div>
  )
}

