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
import bg from "./bg.jpg";
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
import CollapsibleTable, {timeStampToData} from "./eventsTable";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Table from "react-bootstrap/Table";
import axios from "axios";
import ProgressBar from "../../../ProgressBar";
import ImageGrid from "../../ImageGrid";
// import ParagraphSection from "react-material-ui-carouselSection";
// import {Paper} from "@material-ui/core";
// const functions = require("firebase-functions");
// const gcs = require('@google-cloud/storage')();
// const os = require("os");
// const path = require("path");
// const spawn = require("child-process-promise").spawn;
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Avatar, Switch} from "@material-ui/core";
import Spinner from "../../Spinner";
import TableCell from "@material-ui/core/TableCell";
import { v4 as uuid_v4 } from 'uuid';
import EventAttendanceButtons from './EventAttendanceButtons';

const useStyles = makeStyles();

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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

  const [editedEventRow, setEditedEventRow] = useState();

  const [selectedFile, setSelectedFile] = useState();
  const [rowId, setRowId] = useState();
  const [error, setError] = useState(null);
  const [fileSize, setFileSize] = useState();
  const [fileInput, setFileInput] = useState();
  const [nearestEvents, setNearestEvents] = useState([]);
  const [attendanceButton, setAttendanceButton] = useState(false);
  const types = ["image/png", "image/jpeg"];
  useEffect(() => {
    fetchOccurrences();
    if (occurrencesList) {
      // console.log('hmnm sultana i love', filterNearestEvents(occurrencesList));
      // setNearestEvents(filterNearestEvents());
    }
  }, [localStorage.token]);

  useEffect(() => {
    console.log("................tohle mi vraci1");
    if (occurrencesList) {
      console.log("tohle mi vraci...............2");
      setNearestEvents(filterNearestEvents(occurrencesList));
      setAttendanceButton(false);
    }
  }, [occurrencesList]);




  function filterNearestEvents(occurrencesList) {
    console.log("do not make me sad", occurrencesList);
    return occurrencesList.filter((event) => event.creationTime < Date.now());
  }

  function handleAttendance (ev, creationTime) {
    // window.stopPropagation();
     setAttendanceButton(true);
    setRowId(creationTime);

    console.log('handle attendance, target, name, a id',ev.currentTarget, ev.currentTarget.name, ev.currentTarget.id);
    let status = null;
      if(ev.currentTarget.name === "yes") status = 1;
      if(ev.currentTarget.name === "no") status = 0;
      if(ev.currentTarget.name === "dunno") status = 2;
    const occurrenceId = ev.currentTarget.id;
// console.log('status, ocurrId, creatioTime',status);
    setEditedEventRow(occurrenceId);
    processEventAttendance(status, occurrenceId, creationTime);
  };
  const userAttendanceStatus = (row) => {
    const userAttendanceIndex = row?.attendance.findIndex( el => el?.userID === userId);
    let userAttendanceStatus;
    if (userAttendanceIndex !== -1 ) {
      userAttendanceStatus = row.attendance[userAttendanceIndex].status;
      return userAttendanceStatus;
    }
  }

  const disabledButton = attendanceButton && nearestEvents[0].creationTime !== rowId;

  return (
    <div>
      <GridContainer justify="center">
        {nearestEvents.length && (
            <>
        <GridItem xs={12} sm={12} md={8} className='cabin'>
        <h3 className="cabin-headline">Další trenál tě čeká {timeStampToData(nearestEvents[0]?.creationTime)}</h3>

          <div className="cabin-nearest-attendance">
            <h4>Mužu s tebou počítat?</h4>
            {attendanceButton && nearestEvents[0].creationTime === rowId && (
                <Spinner/>
            )}
            { !attendanceButton && (
            <EventAttendanceButtons occurrence={nearestEvents[0]}
                                    handleAttendance={handleAttendance}
                                    userAttendanceStatus={userAttendanceStatus(nearestEvents[0])}
                                    cr={nearestEvents[0].creationTime}
            /> )
            }
            { disabledButton && (
              <EventAttendanceButtons occurrence={nearestEvents[0]}
                                      disabledButton={disabledButton}
                                      handleAttendance={handleAttendance}
                                      userAttendanceStatus={userAttendanceStatus(nearestEvents[0])}
                                      cr={nearestEvents[0].creationTime}
              /> )}
          </div>
          <span className="cabin-nearest-span">Potkáš se tam s:</span>
        </GridItem>
        <GridItem xs={12} sm={12} md={8} className="cabin-nearest-avatars">
               <div className="nearest-event">
                  {nearestEvents[0]?.attendance && nearestEvents[0]?.attendance.map((item) => (
                      item && <Avatar key={uuid_v4()} alt="Remy Sharp" src={item?.profileUrl} className="nearest-event-player" />
              ))}
               </div>
        </GridItem>
            </>
          )}
      </GridContainer>
      <br />
      <br />

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8} className="cabin-table-header">
          <div>
            <h3>Přehled všech událostí</h3>
          </div>
        </GridItem>
        {occurrencesList && (

            <CollapsibleTable
              occurrencesList={occurrencesList}
            handleAttendance={handleAttendance}
            handleAttendanceButton = {attendanceButton}
            userId={userId}
            editedEventRow={editedEventRow}
            rowId={rowId}
          />
        )}
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8} className="cabin-table">
        <img src="https://images.unsplash.com/photo-1594536717222-b26df7f2f23b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1534&q=80"  width="500"/>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Event;
