import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";

import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";

const useStyles = makeStyles(styles);

export default function UserAccount({ storeProfileImgSaga, storeUser, user }) {
  const classes = useStyles();
  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer className={classes.textCenter} justify="center">
            hmm O nas
          </GridContainer>
        </div>
    </div>
    </div>
  );
}

