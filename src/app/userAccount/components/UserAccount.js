/*eslint-disable*/
import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
// core components
import styles from 'assets/jss/material-kit-react/views/componentsSections/downloadStyle.js';
import ProgressBar from '../../../ProgressBar';
import CardBody from '../../../components/Card/CardBody';
import CustomInput from '../../../components/CustomInput/CustomInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import { storeProfileImgSaga, storeUser } from '../actions';
import CardFooter from '../../../components/Card/CardFooter';
import SnackbarContent from '../../../components/Snackbar/SnackbarContent';
import Check from '@material-ui/icons/Check';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';

const useStyles = makeStyles(styles);

export default function UserAccount({ storeProfileImgSaga, storeUser, user }) {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [galleryFile, setGalleryFile] = useState();
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState();
  const [profileImgUrl, setProfileImgUrl] = useState();
  const [galleryImgUrl, setGalleryImgUrl] = useState();
  const [bday, setBday] = useState('');
  const [nickname, setNickname] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const types = ['image/png', 'image/jpeg'];

  const filterBySize = (file) => {
    //filter out images larger than 5MB
    return file.size <= 3332880;
  };

  useEffect(() => {
    // storeProfileImg('urls');
    if (profileImgUrl) {
      storeProfileImgSaga(profileImgUrl);
    }
    console.log('profile Img url', profileImgUrl);
  }, [profileImgUrl]);

  const handleAccountInput = (e) => {
    const inputId = e.target.id;
    switch (inputId) {
      case 'nickname':
        setNickname(e.target.value);
        break;
      case 'bDay':
        setBday(e.target.value);
        break;
      case 'aboutMe':
        setAboutMe(e.target.value);
        break;
    }
  };

  const composeUserObj = () => ({
    nickname,
    bday,
    aboutMe,
  });

  const handleSubmit = () => {
    storeUser(composeUserObj());
  };

  const fileSelectedHandler = (ev) => {
    let selected = ev.target.files[0];
    setFileSize('');

    if (!filterBySize(selected)) {
      setFileSize('Obrazek musi byt mensi jak 3 MB!!!');
      return;
    } else {
      setFileSize('');
    }
    if (selected && types.includes(selected.type)) {
      setSelectedFile(selected);
      setError('');
    } else {
      setSelectedFile(null);
      setError('Please vyber obrazek ve formatu (png nebo jpeg)');
    }
  };

  const fileGalleryHandler = (ev) => {
    let selected = ev.target.files[0];
    setFileSize('');

    if (!filterBySize(selected)) {
      setFileSize('Obrazek musi byt mensi jak 3 MB!!!');
      return;
    } else {
      setFileSize('');
    }
    if (selected && types.includes(selected.type)) {
      setGalleryFile(selected);
      setError('');
    } else {
      setGalleryFile(null);
      setError('Please vyber obrazek ve formatu (png nebo jpeg)');
    }
  };

  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer className={classes.textCenter} justify="center">
            {user && (
              <GridItem xs={12} sm={12} md={4}>
                <SnackbarContent
                  message={
                    <span>
                      <b>Uspech:</b> Data usepesne ulozena !!
                    </span>
                  }
                  close
                  color="success"
                  icon={Check}
                />
              </GridItem>
            )}
            <GridItem xs={12} sm={12} md={8}>
              <h2>Vypln zakladni udaje o sobe</h2>
            </GridItem>
            <GridItem xs={12} sm={8} md={6}>
              <h4>Nahraj profilovou fotku</h4>
              <input type="file" onChange={fileSelectedHandler} />
              {profileImgUrl && (
                <div className="profileUrl">
                  <img width="230" height="280" id="profile-img" src={profileImgUrl} />
                </div>
              )}
              <div>
                {fileSize && <div>{fileSize}</div>}
                {error && <div className="error">{error}</div>}
                {selectedFile && <div>{selectedFile.name}</div>}
                {selectedFile && (
                  <ProgressBar
                    file={selectedFile}
                    collection="profile-images"
                    setUrl={setProfileImgUrl}
                    setFile={setSelectedFile}
                  />
                )}
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <CardBody>
                <CustomInput
                  labelText="Přezdívka..."
                  id="nickname"
                  handleInputChange={handleAccountInput}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'nickname',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Rok narození..."
                  id="bDay"
                  handleInputChange={handleAccountInput}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'bDay',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="About me..."
                  id="aboutMe"
                  handleInputChange={handleAccountInput}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'AboutMe',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <br />
                <Button simple color="primary" size="lg" onClick={handleSubmit}>
                  Submit
                </Button>
              </CardBody>
            </GridItem>
            <br />
            <br />
            <GridItem xs={12} sm={12} md={8}>
              <h3>Upload picture to photo gallery</h3>
              {galleryImgUrl && (
                <div className="profileUrl">
                  <img width="230" height="280" src={galleryImgUrl} />
                </div>
              )}
              <input type="file" onChange={fileGalleryHandler} />
              <div>
                {fileSize && <div>{fileSize}</div>}
                {error && <div className="error">{error}</div>}
                {galleryFile && <div>{galleryFile.name}</div>}
                {galleryFile && (
                  <ProgressBar
                    file={galleryFile}
                    collection="gallery-images"
                    setUrl={setGalleryImgUrl}
                    setFile={setGalleryFile}
                  />
                )}
              </div>
            </GridItem>
          </GridContainer>
          <br />
          <br />
          {/*<GridContainer className={classes.textCenter} justify="center">*/}
          {/*    <GridItem xs={12} sm={12} md={8}>*/}
          {/*        <h2>Want more?</h2>*/}
          {/*        <h4>*/}
          {/*            We{"'"}ve launched{" "}*/}
          {/*            <a*/}
          {/*                href="https://www.creative-tim.com/product/material-kit-pro-react?ref=mkr-download-section"*/}
          {/*                target="_blank"*/}
          {/*            >*/}
          {/*                Material Kit PRO React{" "}*/}
          {/*            </a>*/}
          {/*            .It has a huge number of components, sections and example pages.*/}
          {/*            Start Your Development With A Badass Material-UI nspired by*/}
          {/*            Material Design.*/}
          {/*        </h4>*/}
          {/*    </GridItem>*/}
          {/*    <GridItem xs={12} sm={8} md={6}>*/}
          {/*        <Button*/}
          {/*            color="rose"*/}
          {/*            size="lg"*/}
          {/*            href="https://www.creative-tim.com/product/material-kit-pro-react?ref=mkr-download-section"*/}
          {/*            target="_blank"*/}
          {/*        >*/}
          {/*            Material Kit PRO*/}
          {/*        </Button>*/}
          {/*        <Button*/}
          {/*            color="rose"*/}
          {/*            size="lg"*/}
          {/*            href="https://www.creative-tim.com/product/material-dashboard-pro-react?ref=mkr-download-section"*/}
          {/*            target="_blank"*/}
          {/*        >*/}
          {/*            Material Dashboard PRO*/}
          {/*        </Button>*/}
          {/*    </GridItem>*/}
          {/*</GridContainer>*/}
          {/*<div className={classes.textCenter + " " + classes.sharingArea}>*/}
          {/*    <GridContainer justify="center">*/}
          {/*        <h3>Thank you for supporting us!</h3>*/}
          {/*    </GridContainer>*/}
          {/*    <Button color="twitter">*/}
          {/*        <i className={classes.socials + " fab fa-twitter"} /> Tweet*/}
          {/*    </Button>*/}
          {/*    <Button color="facebook">*/}
          {/*        <i className={classes.socials + " fab fa-facebook-square"} /> Share*/}
          {/*    </Button>*/}
          {/*    <Button color="google">*/}
          {/*        <i className={classes.socials + " fab fa-google-plus-g"} />*/}
          {/*        Share*/}
          {/*    </Button>*/}
          {/*    <Button color="github">*/}
          {/*        <i className={classes.socials + " fab fa-github"} /> Star*/}
          {/*    </Button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}
