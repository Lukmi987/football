import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/downloadStyle.js';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import { ADD_PLAYER } from '../../constants/headerLinks';
import { v4 as uuid_v4 } from 'uuid';
import {Switch} from "@material-ui/core";
import Spinner from '../../Spinner';
const useStyles = makeStyles(styles);

export default function PlayersAdministration({ fetchPlayers, players, saveEditedPlayer, loadingStatus, user }) {
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
console.log('players',players);
  return  (
      <div>
        <Header brand={ADD_PLAYER} rightLinks={<HeaderLinks/>} fixed color="white"/>
        <div className={classes.section}>
          <div className={classes.container}>
          <GridContainer className={classes.textCenter} justify="center">

              <ul className=' flex flex-column  align-items-center shadow-lg  sm:p-2  lg:p-4 rounded'>
              {players.length && players.map(player =>
              <>
                {player &&
                <li key={uuid_v4()} className='flex'>
                  <div className='sm:w-17 w-60 sm:h-8 h-10'>
                    <h1>{player?.nickname || `${player?.firstName} ${player?.lastName}`}</h1></div>
                  <div className="sm:ml-3 ml-10">
                    {loadingStatus.isLoading && selectedUser === player.userID ? <Spinner /> :
                      <Switch checked={player?.isAdmin} name={player.userID}
                              onChange={(ev) => handleChange(ev, player)} />
                    }
                  </div>
                </li>
                }
                </>
              )}
              </ul>

          </GridContainer>
        </div>
      </div>
      </div>
  )
}

