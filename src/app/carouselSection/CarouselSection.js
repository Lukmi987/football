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

const useStyles = makeStyles(styles);

export default function CarouselSection() {
  const classes = useStyles();


  return (
      <div className={classes.section} style={{marginTop: '30px'}}>
          <div className={classes.container}>
              <GridContainer justify="center">
                  <Link to={"/photo-gallery"} className={classes.link} style={{paddingBottom: '40px'}}>
                      <h2>
                          Přejdi Do Fotogalerie
                      </h2>
                  </Link>
                  <Carousel interval={5000} >
                      <Carousel.Item className="carousel-styles" >
                          <img
                              className="d-block w-100"
                              src="https://images.unsplash.com/photo-1526282817947-54d7a0d9928f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
                              alt="First slide"
                          />
                          <Carousel.Caption>
                              <h3>First slide label</h3>
                              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item >
                          <img
                              className="d-block w-100"
                              src="https://images.unsplash.com/photo-1590808100071-3654286139a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                              alt="Second slide"
                          />

                          <Carousel.Caption>
                              <h3>Second slide label</h3>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                          <img
                              className="d-block w-100"
                              src="https://images.unsplash.com/photo-1526282817947-54d7a0d9928f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80"
                              alt="Third slide"
                          />

                          <Carousel.Caption>
                              <h3>Third slide label</h3>
                              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                          </Carousel.Caption>
                      </Carousel.Item>
                  </Carousel>

              </GridContainer>
          </div>
      </div>
  );
}

