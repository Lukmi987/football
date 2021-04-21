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
  const [nearestEvents, setNearestEvents] = useState();
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
    if (occurrencesList) {
      console.log("hmnm sultana i love", filterNearestEvents(occurrencesList));
      setNearestEvents(filterNearestEvents(occurrencesList));
      setAttendanceButton(false);
    }
  }, [occurrencesList]);



  const filterBySize = (file) => {
    //filter out images larger than 5MB
    return file.size <= 3332880;
  };

  const fileSelectedHandler = (ev) => {
    let selected = ev.target.files[0];
    setFileSize("");

    if (!filterBySize(selected)) {
      setFileSize("Obrazek musi byt mensi jak 3 MB!!!");
      return;
    } else {
      setFileSize("");
    }
    if (selected && types.includes(selected.type)) {
      setSelectedFile(selected);
      setError("");
    } else {
      setSelectedFile(null);
      setError("Please vyber obrazek ve formatu (png nebo jpeg)");
    }
  };

  function filterNearestEvents(occurrencesList) {
    console.log("do not make me sad", occurrencesList);
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

  const handleAttendance = (participate, ev, creationTime) => {
    setAttendanceButton(true);
    setRowId(creationTime);
    console.log("click", creationTime);
    const occurrenceId = ev.target.id;
    setEditedEventRow(occurrenceId);
    processEventAttendance(participate, occurrenceId, creationTime);
  };
  const isUserInAttendance = (row) => row.attendance.find( el => el?.userID === userId)
  const isTher =  !!isUserInAttendance();

  return (
    <div>
      <GridContainer justify="center">
        {nearestEvents && (
            <>
        <GridItem xs={12} sm={12} md={8}>
        <h3 className="cabin-headline">Dalsi trening te ceka v {timeStampToData(nearestEvents[0]?.creationTime)}</h3>
          <Switch
              checked={!!isUserInAttendance(nearestEvents[0])}
              id={nearestEvents[0].id}
              onChange={(ev) => handleAttendance(!isTher, ev, nearestEvents[0].creationTime)}
              disabled
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
               <div className="nearest-event">
                  {nearestEvents[0]?.attendance.map((item) => (
                    <Avatar key={item?.userId} alt="Remy Sharp" src={item?.profileUrl}  className="nearest-event-player" />
              ))}
               </div>
        </GridItem>
            </>
          )}
      </GridContainer>
      <br />
      <br />

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <div>
            <h3>Dalsi trening ucast</h3>
          </div>
        </GridItem>
        {occurrencesList && (
          <CollapsibleTable
            radek={occurrencesList}
            handleAttendance={handleAttendance}
            handleAttendanceButton = {attendanceButton}
            userId={userId}
            editedEventRow={editedEventRow}
            rowId={rowId}
          />
        )}
      </GridContainer>
    </div>
  );
};

export default Event;
