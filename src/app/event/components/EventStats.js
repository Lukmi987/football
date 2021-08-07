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
  const [startDate, setStartDate] = useState(new Date().getTime() - 7889400000);
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
console.log('eventsAccordingTypeAndDate',eventsAccordingTypeAndDate);
      const usersAttendanceQuantity = countUsersAttendance(eventsAccordingTypeAndDate);
      setUsersAttendance(usersAttendanceQuantity);
      setTotalSelectedEvents(eventsAccordingTypeAndDate.length);
    }
  }, [occurrencesList, startDate, endDate, eventType, usersProfiles]);

  const filterEventsAccordingType = (eventType, events) => {
    return events.filter((ev) => ev.eventType === eventType);
  };
console.log('stats',occurrencesList);
console.log('user namap !!!!!!!',usersAttendance);
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
          if (attendance?.userID === user.userID && attendance?.status === 'yes') {
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

  const overAll = 'byl celkem na';
  return (
    <div>
      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={8}>
          <div className="cabin-stats-form">
            <span className="font-weight-bold text-lg my-4">Třiď události dle typu a data</span>
            <FormControl className='max-w-md shadow-sm'>
              <InputLabel id="event-type-select" className="font-weight-bold">Typ Udalosti</InputLabel>
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
                <div className=' shadow flex max-w-md  justify-center rounded mt-4 pl-1'>
                <KeyboardDatePicker
                  margin="normal"
                  className="cabin-stats-form-date-from font-weight-bold"
                  id="date-picker-dialog"
                  label="Od"
                  required
                  format="dd/MM/yyyy"
                  value={startDate}
                  onChange={dateListener('startDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
               </div>
                <div className=' shadow flex max-w-md  justify-center rounded mt-2 pl-1'>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Do"
                  required
                  format="dd/MM/yyyy"
                  minDate={startDate}
                  value={endDate}
                  onChange={dateListener('endDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                </div>
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </GridItem>
      </GridContainer>
      <br />
      <br />

      {/*<GridContainer justify="left">*/}

          <div className=" my-3 pb-10">
            <div className="font-bold  pb-3">
              Celkový počet události za zvolené období {totalSelectedEvents}
            </div>
            <ul>
              {usersAttendance &&
                usersAttendance.map((user) => (
                  <li className='mb-3'>
                  <div>
                      <Avatar key={uuid_v4()} alt="Remy Sharp" src={user?.profileUrl} />
                    </div>
                    <div>
                      <h4>
                        {/*{user?.firstName} {" "} {user?.lastName} byl celkem na {user.attendance}*/}
                        {user?.nickname ? ` ${user?.nickname} ${overAll} ${user.attendance}` :  `${user?.firstName} ${user?.lastName} ${overAll} ${user.attendance}` }
                      </h4>
                      <LinearProgress
                        variant="determinate"
                        value={ (user?.attendance / totalSelectedEvents  * 100) || 0}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>

      {/*</GridContainer>*/}
    </div>
  );
};

export default EventStats;
