import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import "./Event.scss";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Check from "@material-ui/icons/Check";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import image from "assets/img/pitchfromabove.jpg";
import Header from "../../../components/Header/Header";
import HeaderLinks from "../../../components/Header/HeaderLinks";
import Components from "../../../views/Components/Components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Table from "react-bootstrap/Table";

const useStyles = makeStyles();
const selectStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Event = ({
  processEvent,
  processEventAttendance,
  fetchEvents,
  eventsList,
  userId,
}) => {
  const classes = useStyles();
  const selectClasses = selectStyles();
  const [startDate, setStartDate] = useState(new Date("2014-08-18T21:11:54"));
  const [endDate, setEndDate] = useState(new Date("2015-08-18T21:11:54"));
  const [startTime, setStartTime] = useState(new Date("2015-08-18T21:11:54"));
  const [endTime, setEndTime] = useState(new Date("2015-08-18T21:11:54"));
  const [eventCount, setEventCount] = useState("");
  const [openEventCount, setOpenEventCount] = useState(false);
  const [openEventType, setOpenEventType] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventAttendance, setEventAttendance] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [localStorage.token]);
  console.log("nahore 1", eventAttendance);
  const dateListener = (id) => (ev) => handleDateChange(id, ev);

  const handleDateChange = (id, ev) => {
    switch (id) {
      case "startDate":
        setStartDate(ev);
        break;
      case "endDate":
        setEndDate(ev);
        break;
      case "startTime":
        setStartTime(ev);
        break;
      case "endTime":
        setEndTime(ev);
        break;
    }
  };

  const handleChange = (ev) => {
    ev.target.name === "event-repeat-select"
      ? setEventCount(ev.target.value)
      : setEventType(ev.target.value);
  };

  const handleClose = (ev) => {
    setOpenEventCount(false);
    setOpenEventType(false);
  };

  const handleOpen = (ev) => {
    ev.target.id === "event-repeat-select"
      ? setOpenEventCount(true)
      : setOpenEventType(true);
  };

  const composeEventData = () => ({
    eventType,
    startDate,
    endDate,
    startTime,
    endTime,
    eventCount,
  });

  const handleSubmitEvent = () => {
    processEvent(composeEventData());
  };

  const handleAttendance = (participate, ev) => {
    const eventId = ev.target.id;
    participate ? setEventAttendance(true) : setEventAttendance(false);
    processEventAttendance(participate, eventId);
  };

  return (
    <div>
      <div className="card-player">
        <div className="card__side card__side--front">
          <div className="card__picture card__picture--1">&nbsp;</div>
          <h4 className="card__heading">The sea explorer</h4>
          <div className="card__details">Details</div>
        </div>
        <div className="card__side card__side--back card__side--back-1">
          Back
        </div>
      </div>

      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <div>
                <h3>Dalsi trening ucast</h3>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <div>
                <h3>Dalsi trening ucast</h3>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <div className={classes.title}>
                <h3>Vytvor Udalost</h3>
              </div>
            </GridItem>

            <GridItem>
              <FormControl className={selectClasses.formControl}>
                <InputLabel id="event-type-select">Typ Udalosti</InputLabel>
                <Select
                  labelId="event-type-select"
                  id="event-type"
                  open={openEventType}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={eventType}
                  onChange={handleChange}
                  name="type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Trening</MenuItem>
                  <MenuItem value={2}>Zapas</MenuItem>
                  <MenuItem value={3}>Ukoncena</MenuItem>
                  <MenuItem value={4}>Chlastacka</MenuItem>
                </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <h3>Vyber datum zacatku</h3>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={startDate}
                    onChange={dateListener("startDate")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <h3>Vyber cas konani</h3>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={startTime}
                    onChange={dateListener("startTime")}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                  <h3>Vyber Datum Konce</h3>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={endDate}
                    onChange={dateListener("endDate")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <h3>Cas ukonceni</h3>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={endTime}
                    onChange={dateListener("endTime")}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <FormControl className={selectClasses.formControl}>
                <InputLabel id="event-repeat">Cetnost</InputLabel>
                <Select
                  labelId="event-repeat"
                  id="event-repeat-select"
                  open={openEventCount}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={eventCount}
                  onChange={handleChange}
                  name="event-repeat-select"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="everyDay">Kazdy den</MenuItem>
                  <MenuItem value="everyWeek">Kazdy tyden</MenuItem>
                  <MenuItem value="every2weeks">Kazde 2 tydny</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <Button
                simple
                color="primary"
                size="lg"
                onClick={handleSubmitEvent}
              >
                Submit
              </Button>
            </GridItem>
            <GridItem>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>StartTime</th>
                    <th>event start date</th>
                    <th>Ucast</th>
                    <th>Moje ucast</th>
                    <th>Pujdu na trening ?</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsList.map((event) => (
                    <tr key={event.id}>
                      <td>{event.eventData.startTime}</td>
                      <td>{event.eventData.endTime}</td>
                      <td>
                        {event.eventData.users &&
                          Object.values(
                            event.eventData?.users
                          ).map((user, index) => <li key={index}>{user}</li>)}
                      </td>
                      {eventAttendance ? <td>Zucastnim se</td> : <td>Nejdu</td>}
                      <td>
                        <Button
                          id={event.id}
                          onClick={(ev) => handleAttendance(true, ev)}
                        >
                          Ano
                        </Button>
                        <Button
                          id={event.id}
                          onClick={(ev) => handleAttendance(false, ev)}
                        >
                          Ne
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default Event;
