import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import "./Event.scss";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import "date-fns";

import CollapsibleTable, {timeStampToData} from "./eventsTable";

import "react-multi-carousel/lib/styles.css";
import {Avatar, Switch} from "@material-ui/core";
import Spinner from "../../Spinner";
import { v4 as uuid_v4 } from 'uuid';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { dateListener } from './EventForm';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';




const EventStats = ({
  processEvent,
  processEventAttendance,
  fetchEvents,
  fetchOccurrences,
  eventsList,
                      fetchUsersProfiles,
  occurrencesList,
                      usersProfiles,
}) => {
const userId =   localStorage.userId;
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());
  const [eventType, setEventType] = useState(1);

  useEffect(() => {
    fetchUsersProfiles();
  }, []);

  useEffect(() => {
    if (occurrencesList && usersProfiles) {
      console.log('occurrencesList dnes',occurrencesList);
      filterEventsAccordingData(startDate, endDate);

    }
  }, [occurrencesList, startDate, endDate, eventType, usersProfiles]);

  const filterEventsAccordingType = (eventType, events) => {
    return  events.filter((ev) => ev.eventType === eventType);
  }

  const filterEventsAccordingData = (startDate, endDate) => {
    const res = occurrencesList.filter((ev) => ev.creationTime >= startDate && ev.creationTime <= endDate)
    console.log('jealus res', res);
    const filteredEvents = filterEventsAccordingType(eventType, res);
    console.log('jealus filteredEvents', filteredEvents);
    //to do array vsech useru/ ke kazdemu userovi projet vsechny eventy a hledat jeho id a plus 1 kdyz najde
   const usersAtendace = [];

   const userProfilesCopy = JSON.parse(JSON.stringify(usersProfiles));
    userProfilesCopy.map((user) => user.attendance = 0);

   usersProfiles.forEach((user) => {
      filteredEvents.forEach((ev) => {
        ev.attendance.forEach((attendance) => {
              if(attendance?.userID === user.userID && attendance?.status === 1) {
               const userProfileIndex =  userProfilesCopy.findIndex((userCop) => userCop.userID === user.userID);
               console.log('co mne vraci find',userProfileIndex);
                userProfilesCopy[userProfileIndex].attendance += 1;
                console.log('co mne vraci find po pridani',userProfilesCopy);

              }
        })
      });
    })
    console.log('userProfilesCopy',userProfilesCopy);
  }



  const handleDateChange = (id, ev) => {
    if (ev === 'Invalid Date Format') {
      console.log('v handle invalid ', ev, id);
    }
    console.log('v handle Data Change', );
    if (id === 'startDate') {
      console.log('jdem setovat start date');
    }
     if (id === 'startDate') setStartDate(ev.getTime());
     if (id === 'endDate') setEndDate(ev.getTime());
  }

  const dateListener = (id) => (ev) => handleDateChange(id, ev);

  const handleEventType = (ev) => {
    setEventType(ev.target.value);
  }
  console.log('event type',eventType);
  return (
    <div>
      <GridContainer justify="center">

          <div>
            <FormControl>
              <InputLabel id="event-type-select">Typ Udalosti</InputLabel>
              <Select
                labelId="event-type-select"
                id="event-type"
                // open={openEventType}
                // onClose={handleClose}
                // onOpen={handleOpen}
                value={eventType}
                required
                onChange={handleEventType}
                name="type"
              >
                <MenuItem selected value={1}>Trening</MenuItem>
                <MenuItem value={2}>Zápas</MenuItem>
                <MenuItem value={3}>Ukončená</MenuItem>
                <MenuItem value={4}>Chlastačka</MenuItem>
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="from"
              required
              format="dd/MM/yyyy"
              value={startDate}
               onChange={dateListener("startDate")}
              KeyboardButtonProps={{
                "aria-label": "change date",
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
              onChange={dateListener("endDate")}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            </MuiPickersUtilsProvider>
          </div>
      </GridContainer>
      <br />
      <br />

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <div>
            <h3>Přehled všech událostí</h3>
          </div>
        </GridItem>

      </GridContainer>
      <GridContainer justify="center">

      </GridContainer>
    </div>
  );
};

export default EventStats;
