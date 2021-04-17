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

const useStyles = makeStyles(styles);

export default function PhotoGallery() {
  const classes = useStyles();
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section} style={{marginTop: "160px"}}>

            {/*gallery images from firestore !!!!!!!!*/}
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <ImageGrid setSelectedImg={setSelectedImg} />
              </GridItem>
            </GridContainer>
            {selectedImg && (
              <Modal
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            )}
        </div>
      </div>
        <Footer />
    </div>
  );
}

