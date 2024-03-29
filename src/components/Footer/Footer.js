/*eslint-disable*/
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// material-ui core components
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

import styles from 'assets/jss/material-kit-react/components/footerStyle.js';
import { Link } from 'react-router-dom';
import Button from '../CustomButtons/Button';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className='flex sm:flex-col items-center'>
            <ListItem className='inline-block'>
              <Link to={'/about-us'}>
                <Button color="transparent" className={classes.navLink}>
                  Copyright (c) 2020 Creative Tim
                </Button>
                {/*<Button color="transparent" className={classes.navLink}>*/}
                {/*  O nás*/}
                {/*</Button>*/}
              </Link>
            </ListItem>
            <div className='w-full'>
              {1900 + new Date().getYear()} , made by Komprs Lukas
            </div>
          </List>
        </div>

      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
