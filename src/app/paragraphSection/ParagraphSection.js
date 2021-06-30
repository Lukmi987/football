/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
// core components
import styles from 'assets/jss/material-kit-react/views/componentsSections/downloadStyle.js';

const useStyles = makeStyles(styles);

export default function ParagraphSection({ content, headline }) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer className={classes.textCenter} justify="center">
          <GridItem xs={12} sm={12} md={9}>
            <h2>{headline}</h2>
            <h5>{content}</h5>
          </GridItem>
        </GridContainer>
        <br />
        <br />
      </div>
    </div>
  );
}
