/*eslint-disable*/
import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// core components
import styles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";
import ProgressBar from "../../../ProgressBar";
import CardBody from "../../../components/Card/CardBody";
import CustomInput from "../../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import {storeProfileImgSaga, storeUser} from "../actions";
import CardFooter from "../../../components/Card/CardFooter";
import SnackbarContent from "../../../components/Snackbar/SnackbarContent";
import Check from "@material-ui/icons/Check";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import HeaderLinks from "../../../components/Header/HeaderLinks";
import Header from "../../../components/Header/Header";

const useStyles = makeStyles(styles);

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

export default function EventForm({processEvent}) {
    const classes = useStyles();
    const selectClasses = selectStyles();
    const [openEventCount, setOpenEventCount] = useState(false);
    const [openEventType, setOpenEventType] = useState(false);
    const [repeatEvent, setRepeatEvent] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [eventCount, setEventCount] = useState(1);
    const [eventType, setEventType] = useState("");


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

    const dateListener = (id) => (ev) => handleDateChange(id, ev);

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

    const handleRepeatCheckbox = (ev) => {
        setRepeatEvent(ev.target.checked);
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

    return (
        <div>
            <Header
                brand="Domu"
                rightLinks={<HeaderLinks />}
                fixed
                color="white"
            />
        <div className={classes.section}>
            <div>  <img src="./bg.jpg" alt="Girl in a jacket" width="500" height="600" /></div>
            <div className={classes.container}>
                <GridContainer className={classes.textCenter} justify="center">
                <GridItem xs={12} sm={12} md={4}>
                    <div className={classes.title}>
                        <h1>Vytvoř událost</h1>
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
                        <Grid container justify="space-between">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Datum začátku"
                                format="MM/dd/yyyy"
                                value={startDate}
                                onChange={dateListener("startDate")}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Začátek"
                                value={startTime}
                                onChange={dateListener("startTime")}
                                KeyboardButtonProps={{
                                    "aria-label": "change time",
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Datum konce"
                                format="MM/dd/yyyy"
                                value={endDate}
                                onChange={dateListener("endDate")}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Konec"
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
                </GridContainer>
            </div>
        </div>
        </div>
    );
}
