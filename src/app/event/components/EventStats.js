import React, { useEffect, useState } from 'react';
import './Event.scss';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import 'react-multi-carousel/lib/styles.css';
import { Avatar, LinearProgress, Paper, Switch } from '@material-ui/core';
import { v4 as uuid_v4 } from 'uuid';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const EventStats = ({ fetchUsersProfiles, occurrencesList, usersProfiles }) => {
  const userId = localStorage.userId;
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [eventType, setEventType] = useState(1);
  const [usersAttendance, setUsersAttendance] = useState();
  const [totalSelectedEvents, setTotalSelectedEvents] = useState();

  useEffect(() => {
    fetchUsersProfiles();
  }, []);

  useEffect(() => {
    if (occurrencesList && usersProfiles) {
      const eventsAccordingDate = filterEventsAccordingData(startDate, endDate);
      const eventsAccordingTypeAndDate = filterEventsAccordingType(eventType, eventsAccordingDate);
      console.log('eventsAccordingTypeAndDate', eventsAccordingTypeAndDate);

      const usersAttendanceQuantity = countUsersAttendance(eventsAccordingTypeAndDate);
      setUsersAttendance(usersAttendanceQuantity);
      setTotalSelectedEvents(eventsAccordingTypeAndDate.length);
    }
  }, [occurrencesList, startDate, endDate, eventType, usersProfiles]);

  const filterEventsAccordingType = (eventType, events) => {
    return events.filter((ev) => ev.eventType === eventType);
  };

  const filterEventsAccordingData = (startDate, endDate) => {
    return occurrencesList.filter(
      (ev) => ev.creationTime >= startDate && ev.creationTime <= endDate,
    );
  };

  const countUsersAttendance = (eventsAccordingTypeAndDate) => {
    const userProfilesCopy = JSON.parse(JSON.stringify(usersProfiles));
    userProfilesCopy.map((user) => (user.attendance = 0));

    usersProfiles.forEach((user) => {
      eventsAccordingTypeAndDate.forEach((ev) => {
        ev.attendance.forEach((attendance) => {
          if (attendance?.userID === user.userID && attendance?.status === 1) {
            const userProfileIndex = userProfilesCopy.findIndex(
              (userCop) => userCop.userID === user.userID,
            );
            userProfilesCopy[userProfileIndex].attendance += 1;
          }
        });
      });
    });
    return userProfilesCopy;
  };

  const handleDateChange = (id, ev) => {
    if (ev === 'Invalid Date Format') {
      console.log('v handle invalid ', ev, id);
    }
    console.log('v handle Data Change');
    if (id === 'startDate') {
      console.log('jdem setovat start date');
    }
    if (id === 'startDate') setStartDate(ev.getTime());
    if (id === 'endDate') setEndDate(ev.getTime());
  };

  const dateListener = (id) => (ev) => handleDateChange(id, ev);

  const handleEventType = (ev) => setEventType(ev.target.value);

  return (
    <div>
      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={8}>
          <div className="cabin-stats-form">
            <FormControl className="cabin-stats-form-select-event">
              <InputLabel id="event-type-select">Typ Udalosti</InputLabel>
              <Select
                labelId="event-type-select"
                id="event-type"
                value={eventType}
                required
                onChange={handleEventType}
                name="type"
              >
                <MenuItem selected value={1}>
                  Trening
                </MenuItem>
                <MenuItem value={2}>Zápas</MenuItem>
                <MenuItem value={3}>Ukončená</MenuItem>
                <MenuItem value={4}>Chlastačka</MenuItem>
              </Select>
            </FormControl>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  className="cabin-stats-form-date-from"
                  id="date-picker-dialog"
                  label="from"
                  required
                  format="dd/MM/yyyy"
                  value={startDate}
                  onChange={dateListener('startDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="to"
                  required
                  format="dd/MM/yyyy"
                  minDate={startDate}
                  value={endDate}
                  onChange={dateListener('endDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </GridItem>
      </GridContainer>
      <br />
      <br />

      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={8}>
          <div className="cabin-stats">
            <h2 className="cabin-stats-title">
              Celkový počet události za zvolené období {totalSelectedEvents}
            </h2>
            <ul>
              {usersAttendance &&
                usersAttendance.map((user) => (
                  <li className="cabin-stats-list">
                    <div>
                      <Avatar key={uuid_v4()} alt="Remy Sharp" src={user?.profileUrl} />
                    </div>
                    <div>
                      <h4>
                        {user?.firstName} {" "} {user?.lastName}
                      </h4>
                      <LinearProgress
                        variant="determinate"
                        value={(user.attendance / totalSelectedEvents) * 100}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default EventStats;
