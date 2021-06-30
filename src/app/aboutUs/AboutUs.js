import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer.js';
import styles from 'assets/jss/material-kit-react/views/components.js';

import Header from '../../components/Header/Header';
import HeaderLinks from '../../components/Header/HeaderLinks';
import GridItem from '../../components/Grid/GridItem';
import classNames from 'classnames';
import Footer from '../../components/Footer/Footer';
import { Carousel } from 'react-bootstrap';

const useStyles = makeStyles(styles);

export default function UserAccount({ storeProfileImgSaga, storeUser, user }) {
  const classes = useStyles();

  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer className={classes.textCenter} justify="center">
              <GridItem className={classes.textCenter}></GridItem>
              <GridItem xs={12} sm={12} md={8} style={{ marginTop: '160px' }}>
                <div className="about-us-card">
                  <div className="card-player">
                    <div className="card__side card__side--front">
                      <div className="card__picture card__picture--1">
                        <img
                          className="card-player-img"
                          src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        />
                      </div>
                      <h4 className="card__heading">Slovo naseho kapitana</h4>
                      <div className="card__details">Details</div>
                    </div>
                    <div className="card__side card__side--back card__side--back-1">Back</div>
                  </div>
                </div>
                <br />
                <h5>
                  What's going through Joeginho's head during his trademark penalty run-up? And how
                  does he keep cool under the pressure of taking a spot-kick? The Blues midfielder
                  tells all exclusively in Like a Pro... What's going through Joeginho's head during
                  his trademark penalty run-up? And how does he keep cool under the pressure of
                  taking a spot-kick? The Blues midfielder tells all exclusively in Like a Pro...
                  <br />
                  <br />
                  What's going through Joeginho's head during his trademark penalty run-up? And how
                  does he keep cool under the pressure of taking a spot-kick? The Blues midfielder
                  tells all exclusively in Like a Pro...
                </h5>
              </GridItem>
            </GridContainer>
            <div className={classes.textCenter + ' ' + classes.sharingArea}>
              <GridContainer justify="center">
                {/*<h3>Thank you for supporting us!</h3>*/}

                <Carousel className="carousel-styles">
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'"
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
                      src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'"
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
