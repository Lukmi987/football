import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import styles from 'assets/jss/material-kit-react/views/componentsSections/loginStyle.js';
import Header from '../../../components/Header/Header';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import { ADD_PLAYER } from '../../constants/headerLinks';
import { useFormik } from 'formik';
import {
  Create,
  First_Name,
  First_Name_Limit, Invalid_Email,
  Last_Name,
  Last_Name_Limit,
  Name_Limit,
} from '../../constants/addPlayer';
const useStyles = makeStyles(styles);

const validate = values => {
  const errors = {};
  if(!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 16) {
    errors.firstName = First_Name_Limit;
  }

  if(!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = Last_Name_Limit;
  }

  if(!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = Invalid_Email
  }

  return errors;
}


export default function AddPlayer({ idToken, processLoginForm, history, errorMsg }) {
  const classes = useStyles();
const formik = useFormik({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
  },
  validate,
  onSubmit: values => {
    alert(JSON.stringify(values, null, 2));
  },
})



  return (
    <div>
      <Header brand={ADD_PLAYER} rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">{First_Name}</label>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                { formik.touched.firstName && formik.errors.firstName && <div>{formik.errors.firstName}</div>}
                <label htmlFor="lastName">{Last_Name}</label>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName && <div>{formik.errors.lastName}</div>}
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                <button type='submit'>{Create}</button>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
