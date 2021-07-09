import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/loginStyle.js';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import { ADD_PLAYER } from '../../constants/headerLinks';
import { v4 as uuid_v4 } from 'uuid';
import {Switch} from "@material-ui/core";
const useStyles = makeStyles(styles);

export default function PlayersAdministration({ fetchPlayers, players, saveEditedPlayer }) {
  const classes = useStyles();
  const [] = useState();

useEffect(()=> {
  fetchPlayers();
},[])

  return players.length && (
      <div>
        <Header brand={ADD_PLAYER} rightLinks={<HeaderLinks/>} fixed color="white"/>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <ul className=' flex flex-column  align-items-center shadow-lg mt-56 pt-5'>
              {players.map(player =>
              <li key={uuid_v4()} className='flex'>
                <div className='w-40 h-10'><h1>{player?.firstName}{" "}{player?.lastName}</h1></div>
                <div className="ml-10">
                  <Switch checked={player?.isAdmin}  onChange={() => saveEditedPlayer({userID: player?.userID || '', isAdmin: !player?.isAdmin})} />
                </div>
              </li>
              )}
              </ul>
            </GridItem>
          </GridContainer>
        </div>
      </div>
  )
}
