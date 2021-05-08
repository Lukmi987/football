import Button from '../../../components/CustomButtons/Button';
import React from 'react';

const EventAttendanceButtons = ({occurrence, handleAttendance, disabledButton, userAttendanceStatus, cr }) => {
  console.log('.......1occurrence',occurrence);
  console.log('.......userAttendanceStatus',userAttendanceStatus);
  return (
    <div>
      <Button
        id={occurrence.id}
        disabled={disabledButton}
        name="yes"
        value="1"
        label="1"
        onClick={(e) => handleAttendance(e, cr)}
        className={userAttendanceStatus === 1 ? "attendance-active-button" : ''}
      >
        Jdu
      </Button>
      <Button
        id={occurrence.id}
        disabled={disabledButton}
        name="dunno"
        onClick={(e) => handleAttendance(e, cr)}
        className={userAttendanceStatus === 2 ? "attendance-active-button" : ''}
      >
        Nevím
      </Button>
      <Button
        id={occurrence.id}
        disabled={disabledButton}
        name="no"
        onClick={(e) => handleAttendance(e, cr)}
        className={userAttendanceStatus === 0 ? "attendance-active-button" : ''}
      >
        Nejdu
      </Button>
    </div>
  )
}

export default EventAttendanceButtons;
