import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/downloadStyle.js';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import { ADD_PLAYER } from '../../constants/headerLinks';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Create,
  First_Name,
  First_Name_Limit, Invalid_Email,
  Last_Name,
  Last_Name_Limit,
} from '../../constants/addPlayer';

import * as PropTypes from 'prop-types';
import Card from "../../../components/Card/Card";
import { Snackbar } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import { setLoadingStatus } from '../../loadingStatus/actions';
import Spinner from '../../Spinner';
import Button from '../../../components/CustomButtons/Button';
import CardBody from '../../../components/Card/CardBody';
const useStyles = makeStyles(styles);

export default function AddPlayer({ createPlayer, loadingStatus, setLoadingStatus, }) {
  const classes = useStyles();
const fiedStyles = 'py-1 sm:w-25 rounded shadow';
  const labelStyles = 'text-black-50 text-lg font-semibold'
  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer className={classes.textCenter} justify="center">
            <GridItem xs={12} sm={12} >
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                message={

                    loadingStatus.error ? 'Chyba Email jiz existuje' :
                      <span>
                      <b>Úspěch:</b> Uživatelský profil byl úspěšně založen !!
                    </span>

                }
                open={loadingStatus.success || loadingStatus.error}
                autoHideDuration={2000}
                onClose={setLoadingStatus}
                color="success"
                icon={Check}
                className="mt-10"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <Formik
                initialValues ={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                  isAdmin: false
              }}
              validationSchema = {Yup.object({
              firstName: Yup.string()
              .max(15, First_Name_Limit)
                .required('Required'),
              lastName: Yup.string()
              .max(20, Last_Name_Limit)
              .required('Required'),
              email: Yup.string().email().required('Required'),
                password: Yup.string()
                  .min(6, "Heslo musí mít minimalně 6 znaků")
                  .required('Required'),
            })}
                onSubmit={(values, { setSubmitting }) => {
                  createPlayer(values)
                }}
              >
                <Form className="flex w-full justify-content-center flex-column bg-neutral-graylight p-6 shadow-lg rounded">
                  <div className=' mb-5 flex flex-column items-center'>
                   <label className={labelStyles} htmlFor="firstName">{First_Name}</label>
                  <Field name="firstName" type="text" className={fiedStyles} />
                  <ErrorMessage name="firstName" />
                  </div>

                  <div className='mb-5 flex flex-column items-center'>
                      <label className={labelStyles} htmlFor="lastName">{Last_Name}</label>
                      <Field className={fiedStyles} name="lastName" type="text" />
                  <ErrorMessage name="lastName" />
                  </div>

                  <div className='mb-5 flex flex-column items-center'>
                    <label className={labelStyles} htmlFor="email">Email</label>
                  <Field className={fiedStyles} name="email" type="email" />
                  <ErrorMessage name="email" />
                  </div>

                  <div className='mb-5 flex flex-column items-center'>
                      <label className={labelStyles} htmlFor="password">Pwd</label>
                      <Field className={fiedStyles} name="password" type="password" />
                    <ErrorMessage name="password" />
                  </div>
                  <div className='mb-5 flex flex-column items-center'>
                      <label className={labelStyles} htmlFor="isAdmin">Admin práva</label>
                      <Field name="isAdmin" type="checkbox" />
                      <div>Admin práva dovolují hráčovi: Přidat hráče, Nastavit admin práva, Vytvořit událost, V kabině sekci novinky vytvořit článek a smazat událost</div>
                  </div>
                  <div className='mt-1'>
                    {loadingStatus.isLoading ? (
                      <Spinner />
                    ) : (
                      <Button type="submit"  color="primary" size="lg"  >
                        {Create}
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
