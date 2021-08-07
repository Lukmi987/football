import React from 'react'
import Button from '../../../components/CustomButtons/Button';
import CancelIcon from '@material-ui/icons/Cancel';

const EventAttendanceButtons = ({
  occurrence,
  handleAttendance,
                                 handleDeleteEvent,
  disabledButton = false,
  userAttendanceStatus,
  cr,
}) => {
  console.log('userAttendanceStatus',userAttendanceStatus);
  return (
    <div className="attendance-table-attendance-cell">
      <Button
        id={occurrence.id}
        disabled={disabledButton}
        name="yes"
        value="1"
        label="1"
        size="facebook"
        round
        onClick={(e) => handleAttendance(e, cr)}
        className={
          userAttendanceStatus === 'yes'
            ? 'attendance-active-button'
            : '' || disabledButton
            ? 'attendance-disabled-button'
            : ''
        }
      >
        Jdu
      </Button>
      <Button
        id={occurrence.id}
        disabled={disabledButton}
        name="dunno"
        size="facebook"
        round
        onClick={(e) => handleAttendance(e, cr)}
        className={
          userAttendanceStatus === 'dunno'
            ? 'attendance-active-button'
            : '' || disabledButton
            ? 'attendance-disabled-button'
            : ''
        }
      >
        Nevím
      </Button>
      <Button
        id={occurrence.id}
        disabled={disabledButton}
        name="no"
        size="facebook"
        round
        onClick={(e) => handleAttendance(e, cr)}
        className={
          userAttendanceStatus === 'no'
            ? 'attendance-active-button'
            : '' || disabledButton
            ? 'attendance-disabled-button'
            : ''
        }
      >
        Nejdu
      </Button>
    </div>
  );
};

export default EventAttendanceButtons;
