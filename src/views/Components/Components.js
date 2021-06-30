import React, { useState } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Parallax from 'components/Parallax/Parallax.js';
// sections for this page

import HeaderLinks from 'components/Header/HeaderLinks.js';
import SectionBasics from './Sections/SectionBasics.js';
import SectionNavbars from './Sections/SectionNavbars.js';
import SectionTabs from './Sections/SectionTabs.js';
import SectionPills from './Sections/SectionPills.js';
import SectionNotifications from './Sections/SectionNotifications.js';
import SectionTypography from './Sections/SectionTypography.js';
import SectionJavascript from './Sections/SectionJavascript.js';
import SectionCarousel from './Sections/SectionCarousel.js';
import SectionCompletedExamples from './Sections/SectionCompletedExamples.js';
import SectionLogin from '../../app/login/containers/SectionLogin.js';
import Event from '../../app/event/containers/Event.js';
import SectionExamples from './Sections/SectionExamples.js';
import SectionDownload from './Sections/SectionDownload.js';
import SnackbarContent from 'components/Snackbar/SnackbarContent.js';
import Check from '@material-ui/icons/Check';

import styles from 'assets/jss/material-kit-react/views/components.js';
import ImageGrid from '../../app/ImageGrid';
import Modal from '../../app/Modal';
import { Carousel } from 'react-bootstrap';
import CarouselSection from '../../app/carouselSection/CarouselSection';
import ParagraphSection from '../../app/paragraphSection/ParagraphSection';
import footballPitch from '../../assets/img/footballPitch.jpg';

const useStyles = makeStyles(styles);

export default function Components(props) {
  const { history } = props;
  const isUserLoggedIn = history.location.state;
  const aboutClub =
    ' Ve svých počátcích byl fotbalový oddíl SK Mikulov začleněn do slovácké fotbalové župy, kde hrával převážně s družstvy z Hodonínska okresní soutěž. Kromě SK Mikulov působily ve městě tři německé fotbalové kluby – ASK, Macabi a DSF, který byl nejsilnějším klubem na Mikulovsku a hrával v německém regionu divizi. Rozvoj české tělovýchovy v Mikulově byl přerušen rokem 1938. Po skončení 2. světové války byla obnovena činnost SK Mikulov a v roce 1949 byl klub přejmenován na Slavoj Mikulov. Jeho hlavním patronem se staly Vinařské závody Mikulov, které do něj investovaly nemalé finanční prostředky a jejichž podpora sehrála klíčovou úlohu při rozvoji organizovaného sportu v Mikulově. Fotbalový oddíl vinařů se díky svým výborným výsledkům dostal až do krajského přeboru. Počátkem 70. let došlo k přejmenování SK Mikulov na TJ Pálava Mikulov. Fotbalový oddíl společně s oddílem stolních tenistů, plavání a dalšími patřil se svou členskou základnou mezi největší společenské organizace Národní fronty. K osamostatnění fotbalového oddílu od ostatních sportovních oddílů TJ Pálava došlo až v roce 1991. Od té doby začal klub používat současný název FC Pálava Mikulov.';
  const aboutClubHeadLine = 'Chelsea Fc';
  const news =
    'B r n o - Záložník Peter Štepanovský se po dvouzápasové pauze vrátil na hřišti Českých Budějovic do základní sestavy. A návrat to byl vydařený - Peter přispěl k výhře nahrávkou na první gól a za svůj...';
  const newsHeadLine = 'Novinky';

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Chelsea FC"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 1,
          color: 'white',
        }}
        {...rest}
      />
      <Parallax image={footballPitch}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>FC Brno Sokol</h1>
                <h3 className={classes.subtitle}></h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridItem md={12} className={classes.textCenter}>
          {isUserLoggedIn && (
            <SnackbarContent
              message={
                <span>
                  <b>Autententizace probehla v poradku!!</b>
                </span>
              }
              close
              color="success"
              icon={Check}
            />
          )}
        </GridItem>
        <div className="flex mx-4 my-8">dfjsa jdasl;jf kl;</div>
        <ParagraphSection content={news} headline={newsHeadLine} />
        <CarouselSection />
        <ParagraphSection content={aboutClub} headline={aboutClubHeadLine} />
        {/*<SectionExamples />*/}
        <SectionDownload />
      </div>
      <Footer />
    </div>
  );
}
