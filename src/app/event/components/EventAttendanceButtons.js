import Button from '../../../components/CustomButtons/Button';
import React from 'react';

const EventAttendanceButtons = ({occurrence, handleAttendance, disabledButton = false, userAttendanceStatus, cr }) => {
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
        className={userAttendanceStatus === 1 ? "attendance-active-button" : '' || disabledButton ? "attendance-disabled-button" : ''}
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
        className={userAttendanceStatus === 2 ? "attendance-active-button" : '' || disabledButton ? "attendance-disabled-button" : ''}
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
        className={userAttendanceStatus === 0 ? "attendance-active-button" : '' || disabledButton ? "attendance-disabled-button" : ''}
      >
        Nejdu
      </Button>
    </div>
  )
}

export default EventAttendanceButtons;
