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




const EventStats = ({
  processEvent,
  processEventAttendance,
  fetchEvents,
  fetchOccurrences,
  eventsList,

  occurrencesList,
}) => {
const userId =   localStorage.userId;
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());
  // useEffect(() => {
  //   fetchOccurrences();
  // }, [localStorage.token]);

  useEffect(() => {
    if (occurrencesList) {
      console.log('occurrencesList dnes',occurrencesList);
      filterEventsAccordingData(startDate, endDate);
    }
  }, );
  const filterEventsAccordingData = (startDate, endDate) => {
   const res =  occurrencesList.filter((ev) => ev.creationTime >= startDate && ev.creationTime <= endDate)
    console.log('res',res);
  }

  const handleDateChange = (id, ev) => {
    if (ev === 'Invalid Date Format') {
      console.log('v handle invalid ', ev, id);
    }
     if (id === 'startDate') setStartDate(ev.getTime());
     if (id === 'endDate') setEndDate(ev.getTime());
  }
  console.log('occurrencesList dnes mimo',occurrencesList);

  const dateListener = (id) => (ev) => handleDateChange(id, ev);

  return (
    <div>
      <GridContainer justify="center">

          <div>
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
