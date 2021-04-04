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
import CollapsibleTable from "./eventsTable"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Table from "react-bootstrap/Table";
import axios from "axios";
import ProgressBar from "../../../ProgressBar";
import ImageGrid from "../../../imageGrid";

// const functions = require("firebase-functions");
// const gcs = require('@google-cloud/storage')();
// const os = require("os");
// const path = require("path");
// const spawn = require("child-process-promise").spawn;

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
  fetchOccurrences,
  eventsList,
  userId,
  occurrencesList,
}) => {
  const classes = useStyles();
  const selectClasses = selectStyles();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [eventCount, setEventCount] = useState(1);
  const [openEventCount, setOpenEventCount] = useState(false);
  const [openEventType, setOpenEventType] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventAttendance, setEventAttendance] = useState(false);
  const [repeatEvent, setRepeatEvent] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState();
  const [fileInput, setFileInput] = useState();
  const [nearestEvents, setNearestEvents] = useState();
  const types = ['image/png', 'image/jpeg'];
  useEffect(() => {
    fetchOccurrences();
    if(occurrencesList) {
        // console.log('hmnm sultana i love', filterNearestEvents(occurrencesList));
        // setNearestEvents(filterNearestEvents());
    }
  }, [localStorage.token]);

  useEffect(() => {
      if(occurrencesList) {
          console.log('hmnm sultana i love', filterNearestEvents(occurrencesList));
          setNearestEvents(filterNearestEvents(occurrencesList));
      }
  },[occurrencesList])

  console.log("nahore 1", eventAttendance);
  const dateListener = (id) => (ev) => handleDateChange(id, ev);

  const filterBySize = (file) => {
    //filter out images larger than 5MB
    return file.size <= 3332880 ;
  };

  const fileSelectedHandler = (ev) => {
  let selected = ev.target.files[0];
    setFileSize('');

  if(!filterBySize(selected)){
    setFileSize('Obrazek musi byt mensi jak 3 MB!!!');
    return
  } else {
    setFileSize('');
  }
  if(selected && types.includes(selected.type)){
    setSelectedFile(selected);
    setError('');
    } else {
    setSelectedFile(null);
    setError('Please vyber obrazek ve formatu (png nebo jpeg)');
   }
  }

  function filterNearestEvents(occurrencesList){
      console.log('do not make me sad', occurrencesList);
      return occurrencesList.filter((event) => event.creationTime < Date.now());
  }

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    axios
      .post(
        "https://us-central1-football-25167.cloudfunctions.net/uploadFile",
        fd,
        {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Prgress: " +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
          },
        }
      )
      .then((res) => {
        console.log("our respond", res);
      });
  };

  const handleDateChange = (id, ev) => {
    switch (id) {
      case "startDate":
        setStartDate(ev);
        break;
      case "endDate":
        console.log(
          "end date format",
          ev.getFullYear(),
          ev.getMonth(),
          ev.getDate()
        );
        setEndDate(ev);
        break;
      case "startTime":
        // const time = `${ev.getHours()}:${ev.getMinutes()}`;
        setStartTime(ev);
        break;
      case "endTime":
        setEndTime(ev);
        break;
    }
  };
  console.log("end time is ", endTime);
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
  });

  const handleSubmitEvent = () => {
    processEvent(composeEventData(), eventCount);
  };

  const handleAttendance = (participate, ev, creationTime) => {
    console.log('click',creationTime);
    const occurrenceId = ev.target.id;
    participate ? setEventAttendance(true) : setEventAttendance(false);
    processEventAttendance(participate, occurrenceId, creationTime);
  };

  const handleRepeatCheckbox = (ev) => {
    setRepeatEvent(ev.target.checked);
  };

  //once it is deployed we get exact url
  // exports.uploadFile = functions.https.onRequest((req, res) => {
  //   res.status(200).json({
  //     message: "It worked!",
  //   });
  // });

  return (
    <div>
        {nearestEvents && (
        <ul className="card-player">
            { nearestEvents[0]?.attendance.map((event) =>(
            <li key={event?.creationTime}>
                <div>co to kurva</div>
            <div className="card__side card__side--front">
                <div className="card__picture card__picture--1"><img src={event?.profileUrl}/></div>
                <h4 className="card__heading">The sea explorer</h4>
                <div className="card__details">Details</div>
            </div>
            <div className="card__side card__side--back card__side--back-1">
                Back
            </div>
            </li>
            ))}
        </ul>
        )
        }

      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <input
                type="file"
                onChange={fileSelectedHandler}
                ref={(fileInput) => setFileInput(fileInput)}
              />

              <div>
                {fileSize && <div>{fileSize}</div>}
                {error && <div className="error">{error}</div>}
                {selectedFile && <div>{selectedFile.name}</div>}
                {selectedFile && <ProgressBar file={selectedFile} setFile={setSelectedFile}/>}
              </div>

              {/*<button onClick={fileUploadHandler}>Upload</button>*/}

              <div>
                <h3>Dalsi trening ucast</h3>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
            <ImageGrid />
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

              <FormControlLabel
                control={
                  <Checkbox
                    checked={repeatEvent}
                    onChange={handleRepeatCheckbox}
                    color="primary"
                  />
                }
                label="Chceš opakovat událost týdně ?"
              />
              {repeatEvent && (
                <FormControl className={selectClasses.formControl}>
                  <InputLabel id="event-repeat">Počet opakování</InputLabel>
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
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={17}>17</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={19}>19</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={21}>21</MenuItem>
                    <MenuItem value={22}>22</MenuItem>
                    <MenuItem value={23}>23</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                  </Select>
                </FormControl>
              )}
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

              {/*<Table striped bordered hover>*/}
              {/*  <thead>*/}
              {/*    <tr>*/}
              {/*      <th>StartTime</th>*/}
              {/*      <th>event start date</th>*/}
              {/*      <th>Ucast</th>*/}
              {/*      <th>Moje ucast</th>*/}
              {/*      <th>Pujdu na trening ?</th>*/}
              {/*    </tr>*/}
              {/*  </thead>*/}
              {/*  <tbody>*/}
              {/*    {eventsList.map((event) => (*/}
              {/*      <tr key={event.id}>*/}
              {/*        <td>{event.eventData.startTime}</td>*/}
              {/*        <td>{event.eventData.endTime}</td>*/}
              {/*        <td>*/}
              {/*          {event.eventData.users &&*/}
              {/*            Object.values(*/}
              {/*              event.eventData?.users*/}
              {/*            ).map((user, index) => <li key={index}>{user}</li>)}*/}
              {/*        </td>*/}
              {/*        {eventAttendance ? <td>Zucastnim se</td> : <td>Nejdu</td>}*/}
              {/*        <td>*/}
              {/*          <Button*/}
              {/*            id={event.id}*/}
              {/*            onClick={(ev) => handleAttendance(true, ev)}*/}
              {/*          >*/}
              {/*            Ano*/}
              {/*          </Button>*/}
              {/*          <Button*/}
              {/*            id={event.id}*/}
              {/*            onClick={(ev) => handleAttendance(false, ev)}*/}
              {/*          >*/}
              {/*            Ne*/}
              {/*          </Button>*/}
              {/*        </td>*/}
              {/*      </tr>*/}
              {/*    ))}*/}
              {/*  </tbody>*/}
              {/*</Table>*/}
              {occurrencesList && <CollapsibleTable radek={occurrencesList} handleAttendance={handleAttendance}/>}

          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default Event;
