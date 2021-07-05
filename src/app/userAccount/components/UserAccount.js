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
import {Form} from "react-bootstrap";
// import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

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
  const [imageUrl, setImageUrl] = useState();
  const [imageAlt, setImageAlt] = useState();

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

  const openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dnngiu2jb',
        uploadPreset: 'vyc7ir6t',
      },
      (error, result) => {
        setImageUrl(result.info.secure_url);
        setImageAlt(`An image of ${result.info.original_filename}`);
        console.log('result.info.secure_url',result.info.secure_url);
        if(result?.info?.secure_url) {
          console.log('jsem define pico',result.info.secure_url);
          storeProfileImgSaga(result.info.secure_url);
          }
      }
    ).open();
  }

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

  const handleImageUpload = (ev) => {
    let selected = ev.target.files[0];
    console.log('selecte file',selected);
    const formData = new FormData();
    formData.append('file', selected )
    formData.append('upload_preset', 'vyc7ir6t');
    const options = {
      method: 'POST',
      body: formData,
    };
    fetch('https://api.cloudinary.com/v1_1/dnngiu2jb/image/upload/', options)
      .then(res => res.json())
      .then(res => {
        setImageUrl(res.secure_url);

        console.log('vysledek',res);
      })
      .catch(err => console.log(err))
  }


  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer className={classes.textCenter} justify="center">
            {/*<div className=''>*/}
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
            <div className='p-4 shadow border flex flex-col rounded  items-center'>
              <GridItem xs={12} sm={8} md={6}>

                {/*<Image cloudName='dnngiu2jb' />*/}
                <button onClick={openWidget}>Cloudinary widget</button>
                <div>
                  <h3>test cloudinary</h3>

                  <Form.File className='w-full bg-transparent p-4 text-gray' type="file" onChange={handleImageUpload} />
                </div>

                <h3>Future favourite</h3>


                <div>
                  <h4>Resulting Image</h4>
                  {imageUrl && <img src={imageUrl} alt={imageAlt} />}
                </div>

                <h2>Vypln zakladni udaje o sobe</h2>
                <h4>Nahraj profilovou fotku</h4>
                <Form.File className='w-full bg-transparent p-4 text-gray' type="file" onChange={fileSelectedHandler} />
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
                    className=''
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
                  <Button className='user-account-submit-button'  simple color="primary" size="lg" onClick={handleSubmit}>
                    Submit
                  </Button>
                </CardBody>

              </GridItem>
            </div>
            <br />
            <br />



          </GridContainer>
          <br />

        </div>
      </div>
    </div>
  );
}