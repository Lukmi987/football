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
import { BDAY_LIMIT, Create, First_Name, Last_Name, NICKNAME_LIMIT } from '../../constants/addPlayer';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const useStyles = makeStyles(styles);

const fiedStyles = 'py-1 sm:w-25 rounded shadow';
const labelStyles = 'text-black-50 text-lg font-semibold'

export default function UserAccount({ storeUser, user, loadingStatus, setLoadingStatus }) {
  const classes = useStyles();
  const [bday, setBday] = useState('');
  const [nickname, setNickname] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const types = ['image/png', 'image/jpeg'];
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState();


  const addTransformationToUrl = (url) => {
    const parsedUrl = url.split('/');
    const uploadIndex = parsedUrl.findIndex(item => item === 'upload');
     parsedUrl.splice(uploadIndex + 1,0,'w_200,h_250,c_thumb,g_faces');
    return parsedUrl.join('/');
  }

  const openWidget = () => {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dnngiu2jb',
        uploadPreset: 'vyc7ir6t',
      },
      (error, result) => {
        if(result?.info?.secure_url) {
          const transformedUrl = addTransformationToUrl(result.info.secure_url);
          setImageUrl(transformedUrl);
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
                  onClose={setLoadingStatus}
                  color="success"
                  icon={Check}
                />
              </GridItem>
            )}
            <GridItem xs={12} sm={12} md={12}>
                <div className='flex justify-center items-center flex-column'>
                  <h1 className='mb-6'>Vyplň základní údaje o sobě</h1>
                {/*<Image cloudName='dnngiu2jb' />*/}
                <Button className='w-25 ' color='facebook' onClick={openWidget}>Nahraj profilovou fotku</Button>
                {imageUrl && (
                  <Avatar className='nearest-event-player my-2'  alt={imageAlt} src={imageUrl}  />
                )}
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                  <Formik
                  initialValues={{
                    nickname: '',
                    bDay: '',
                    aboutMe: ''
                  }}
                  validationSchema={Yup.object({
                    nickname: Yup.string().max(15, NICKNAME_LIMIT).required('Required'),
                    bDay: Yup.string().max(20, BDAY_LIMIT).required('Required'),
                    aboutMe: Yup.string().max(60, BDAY_LIMIT)
                  })}
                  onSubmit={(values => { storeUser({...values, imageUrl})})}
                  >
                    <Form className="flex w-full justify-content-center flex-column bg-neutral-graylight p-6 shadow-lg rounded">
                    <div className=' mb-5 flex flex-column items-center'>
                      <label className={labelStyles} htmlFor="nickname">Přezdívka</label>
                      <Field name="nickname" type="text" className={fiedStyles} />
                      <ErrorMessage name="nickname" />
                    </div>

                    <div className='mb-5 flex flex-column items-center'>
                      <label className={labelStyles} htmlFor="bDay">Den narození</label>
                      <Field className={fiedStyles} name="bDay" type="text" />
                      <ErrorMessage name="bDay" />
                    </div>

                    <div className='mb-5 flex flex-column items-center'>
                      <label className={labelStyles} htmlFor="aboutMe">O mně</label>
                      <Field className={fiedStyles} name="aboutMe" type="text" />
                      <ErrorMessage name="aboutMe" />
                    </div>

                    <div className='mt-1'>
                    {loadingStatus.isLoading ? (
                      <Spinner />
                    ) : (
                      <Button type="submit"  color="primary" size="lg"  >
                        Ulož
                      </Button>
                    )}
                    </div>
                    </Form>
                  </Formik>
              </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}