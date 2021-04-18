import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-kit-react/views/components.js";

import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import GridItem from "../../components/Grid/GridItem";
import classNames from "classnames";
import Footer from "../../components/Footer/Footer";
import {Carousel} from "react-bootstrap";
import ImageGrid from "../ImageGrid";
import Modal from "../Modal";
import {Link} from "react-router-dom";
import Event from "../event/containers/Event";

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
                              <Event />
                  </div>
              </div>
          </div>
          <Footer />
      </div>
  );
}

