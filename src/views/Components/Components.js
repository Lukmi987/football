import React, {useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
import SectionLogin from "../../app/login/containers/SectionLogin.js";
import Event from "../../app/event/containers/Event.js";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDownload from "./Sections/SectionDownload.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Check from "@material-ui/icons/Check";

import styles from "assets/jss/material-kit-react/views/components.js";
import ImageGrid from "../../app/ImageGrid";
import Modal from "../../app/Modal";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const { history } = props;
  const isUserLoggedIn = history.location.state;
const [selectedImg, setSelectedImg] = useState(null);

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
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/footballPitch.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>FC Brno Sokol</h1>
                <h3 className={classes.subtitle}>
                 
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridItem md={12} className={classes.textCenter}>
        {isUserLoggedIn && 
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
            }
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem>
          {/*gallery images from firestore !!!!!!!!*/}
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
              <ImageGrid  setSelectedImg={setSelectedImg}/>
          </GridItem>

          </GridContainer>
          {selectedImg &&
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>
          }
          <Event />
        <SectionExamples />
        <SectionDownload />
      </div>
      <Footer />
    </div>
  );
}
