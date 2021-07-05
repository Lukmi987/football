import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/downloadStyle.js';
import CardBody from '../../../components/Card/CardBody';
import CustomInput from '../../../components/CustomInput/CustomInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person';
import Check from '@material-ui/icons/Check';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import { Avatar, Snackbar } from '@material-ui/core';
import Spinner from '../../Spinner';


const useStyles = makeStyles(styles);

export default function UserAccount({ storeUser, user, eventStatus, loadingStatus }) {
  const classes = useStyles();
  const [bday, setBday] = useState('');
  const [nickname, setNickname] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const types = ['image/png', 'image/jpeg'];
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState();


  const openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dnngiu2jb',
        uploadPreset: 'vyc7ir6t',
      },
      (error, result) => {
        if(result?.info?.secure_url) {
          setImageUrl(result.info.secure_url);
          setImageAlt(`An image of ${result.info.original_filename}`);
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
    imageUrl
  });

  const handleSubmit = () => {
    storeUser(composeUserObj());
  };

  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer className={classes.textCenter} justify="center">
            {user && (
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  message={
                    <span>
                      <b>Uspech:</b> Data usepesne ulozena !!
                    </span>
                  }
                  open={loadingStatus.success}
                  autoHideDuration={2000}
                  onClose={eventStatus}
                  color="success"
                  icon={Check}
                />
              </GridItem>
            )}
            <div className='p-4 shadow border flex flex-col rounded  items-center'>
              <GridItem xs={12} sm={8} md={6}>
                <div className='flex flex-column'>
                <h1 className='mb-6'>Vyplň základní údaje o sobě</h1>
                {/*<Image cloudName='dnngiu2jb' />*/}
                <Button color='facebook' onClick={openWidget}>Nahraj profilovou fotku</Button>
                {imageUrl && (
                  <Avatar className='align-self-center nearest-event-player my-2'  alt={imageAlt} src={imageUrl}  />
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
                          <Person className={classes.inputIconsColor} />
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
                          <Person className={classes.inputIconsColor} />
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
                          <Person className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div className='mt-15'>
                    {loadingStatus.isLoading ? (
                      <Spinner />
                    ) : (
                      <Button simple color="primary" size="lg" onClick={handleSubmit} >
                        Potvrď
                      </Button>
                    )}
                  </div>
                </CardBody>
              </GridItem>
            </div>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}