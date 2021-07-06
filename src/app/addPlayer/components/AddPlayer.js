import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/loginStyle.js';
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
const useStyles = makeStyles(styles);

export default function AddPlayer({ createPlayer }) {
  const classes = useStyles();

  return (
    <div>
      <Header brand={ADD_PLAYER} rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
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
              .max(15, First_Name_Limit),
              lastName: Yup.string()
              .max(20, Last_Name_Limit)
              .required('Required'),
              email: Yup.string().email().required('Required'),
                password: Yup
                  .string()
                  .required('Please Enter your password')
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                  ),
            })}
                onSubmit={(values, { setSubmitting }) => {
                  createPlayer(values)
                }}
              >
                <Form className="flex w-full items-start flex-column bg-neutral-graylight p-6 shadow-lg rounded">
                  <div className='mb-2 w-full flex flex-column'>
                  <div>
                   <label htmlFor="firstName">{First_Name}</label>
                  <Field name="firstName" type="text" />
                  </div>
                  <ErrorMessage name="firstName" />
                  </div>

                  <div className='mb-2 w-full flex flex-column'>
                    <div className='flex'>
                      <label htmlFor="lastName">{Last_Name}</label>
                      <Field name="lastName" type="text" />
                    </div>
                  <ErrorMessage name="lastName" />
                  </div>

                  <div className='mb-2 w-full flex flex-column'>
                  <div>
                    <label htmlFor="email">Email</label>
                  <Field name="email" type="email" />
                    </div>
                  <ErrorMessage name="email" />
                  </div>

                  <div className='mb-2 w-full flex flex-column'>
                    <div>
                      <label htmlFor="password">Pwd</label>
                      <Field name="password" type="password" />
                    </div>
                    <ErrorMessage name="password" />
                  </div>
                  <div className='mb-2 w-full flex flex-column'>
                    <div>
                      <label htmlFor="isAdmin">Admin</label>
                      <Field name="isAdmin" type="checkbox" />
                    </div>
                  </div>
                  <button type="submit">{Create}</button>
                </Form>
              </Formik>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
