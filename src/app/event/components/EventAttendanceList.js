import Button from '../../../components/CustomButtons/Button';
import React, { useEffect } from 'react';
import { groupBy } from '../../helpers/eventHelpers';
import { Avatar } from '@material-ui/core';

const EventAttendanceList = ({user, classes}) => (
  user?.profileUrl ? (
    <div>
      <Avatar
        alt="Remy Sharp"
        src={user?.profileUrl}
        className={classes.large}
      />
    </div>
  ) : user?.nickname && (
    <div>
      {user.nickname}
    </div>
  )
)
export default EventAttendanceList;
