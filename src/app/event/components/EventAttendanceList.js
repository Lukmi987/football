import Button from '../../../components/CustomButtons/Button';
import React, { useEffect } from 'react';
import { groupBy } from '../../helpers/eventHelpers';
import { Avatar } from '@material-ui/core';

const EventAttendanceList = ({ user, classes }) =>(
      <Avatar alt="Remy Sharp" src={user?.profileUrl} className={classes.large} />
)

export default EventAttendanceList;
