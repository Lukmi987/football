import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/loginStyle.js';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import { ADD_PLAYER } from '../../constants/headerLinks';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Create,
  First_Name,
  First_Name_Limit, Invalid_Email,
  Last_Name,
  Last_Name_Limit,
} from '../../constants/addPlayer';

import * as PropTypes from 'prop-types';
import Card from "../../../components/Card/Card";
import {fetchPlayers} from "../sagas/fetchPlayers";
const useStyles = makeStyles(styles);

export default function PlayersAdministration({ fetchPlayers, players, saveEditedPlayer }) {
  const classes = useStyles();
useEffect(()=> {
  fetchPlayers();
},[])

  console.log('players ',players);

  // list all players nad state if admin checkbox
  // on click switch admin
  return (
    <div>
      <Header brand={ADD_PLAYER} rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>


            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
