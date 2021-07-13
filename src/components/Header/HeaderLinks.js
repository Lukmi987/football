/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';
import { useSelector } from 'react-redux';
import {
  ADD_PLAYER,
  CREATE_EVENT,
  MANAGE_ACCOUNT,
  MANAGE_ACCOUNTS,
  MANAGEACCOUNT,
} from '../../app/constants/headerLinks';

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
  const classes = useStyles();
  const [token, setToken] = useState(null);
  const tokenStatus = useSelector((state) => state.manageToken.deleted);

  const userId = localStorage.userId;

  useEffect(() => {
    setToken(localStorage.token || null);
  }, [tokenStatus]);
  return (
    <List className={classes.listItem}>
      <ListItem className={classes.listItem}>
        {userId && <Link to="/manage-accounts">
          <Button color="transparent" className={classes.navLink}>
            {MANAGE_ACCOUNTS}
          </Button>
        </Link>
        }
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={'/about-us'}>
          <Button color="transparent" className={classes.navLink}>
            O nás
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link to={'/photo-gallery'}>
          <Button color="transparent" className={classes.navLink}>
            Foto Galerie
          </Button>
        </Link>
      </ListItem>
      {userId && <ListItem className={classes.listItem}>
        <Link to={'/cabin'}>
          <Button color="transparent" className={classes.navLink}>
            Kabina
          </Button>
        </Link>
      </ListItem>
      }
      <ListItem className={classes.listItem}>
        {!token ? (
          <Link to='/login-page'>
            <Button color="transparent" className={classes.navLink}>
              Přihlášní/Registrace
            </Button>
          </Link>
        ) : (
          <Link to={'/logout-page'} className={classes.listItem}>
            <Button color="transparent" className={classes.navLink}>
              Odhlasit se
            </Button>
          </Link>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-twitter'} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-facebook'} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? 'top' : 'left'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-instagram'} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
