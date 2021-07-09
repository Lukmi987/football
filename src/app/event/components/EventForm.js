/*eslint-disable*/
import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
// core components
import styles from 'assets/jss/material-kit-react/views/componentsSections/downloadStyle.js';
import SnackbarContent from '../../../components/Snackbar/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import Check from '@material-ui/icons/Check';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import HeaderLinks from '../../../components/Header/HeaderLinks';
import Header from '../../../components/Header/Header';
import { setLoadingStatus } from '../../loadingStatus/actions';

const useStyles = makeStyles(styles);

const selectStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function EventForm({ processEvent, createEvent, eventStatusMes, setLoadingStatus }) {
  const classes = useStyles();
  const selectClasses = selectStyles();
  const [openEventCount, setOpenEventCount] = useState(false);
  const [openEventType, setOpenEventType] = useState(false);
  const [repeatEvent, setRepeatEvent] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [eventCount, setEventCount] = useState(0);
  const [eventType, setEventType] = useState(1);
  const [validDate, setValidDate] = useState(true);

  const handleDateChange = (id, ev) => {
    if (ev === 'Invalid Date Format') {
      console.log('v handle invalid ', ev, id);
    }
    switch (id) {
      case 'startDate':
        setStartDate(ev);
        break;
      case 'startTime':
        setStartTime(ev);
        break;
    }
  };

  const dateListener = (id) => (ev) => handleDateChange(id, ev);

  const handleChange = (ev) => {
    console.log('event c ount', ev.target.value);
    ev.target.name === 'event-repeat-select'
      ? setEventCount(ev.target.value)
      : setEventType(ev.target.value);
  };

  const handleClose = (ev) => {
    setOpenEventCount(false);
    setOpenEventType(false);
  };

  const handleOpen = (ev) => {
    ev.target.id === 'event-repeat-select' ? setOpenEventCount(true) : setOpenEventType(true);
  };

  const handleRepeatCheckbox = (ev) => {
    setRepeatEvent(ev.target.checked);
    ev.target.checked ? setEventCount(1) : setEventCount(0);
  };

  const composeEventData = () => ({
    eventType,
    startDate,
    startTime,
  });

  const handleSubmitEvent = () => {
    if (startDate) {
      setValidDate(true);
      const isValidStartDate = Date.parse(startDate);
      const isValidStartTime = Date.parse(startTime);
      if (!isValidStartDate || !isValidStartTime) {
        setValidDate(false);
        return;
      }
      console.log('proslo');
    }

    const nev = new Date(
      `${startDate.getFullYear()} ${startDate.getMonth()} ${startDate.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}`,
    );
    console.log('nevim ...........', nev);
    console.log('nevim ...........1111111', startDate.getFullYear());
    console.log('nevim ...........2222222', startDate.getMonth() + 1);
    console.log('nevim ...........333333', startDate.getDate());
    // createEvent();
    processEvent(composeEventData(), eventCount);
  };


  return (
    <div>
      <Header brand="Domu" rightLinks={<HeaderLinks />} fixed color="white" />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer className={classes.textCenter} justify="center">
            <GridItem xs={12} sm={12} md={4}>
              {eventStatusMes.success && (
                <Snackbar
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'top',
                  }}
                  open={true}
                  autoHideDuration={2000}
                  onClose={setLoadingStatus}
                  message={eventStatusMes.error || 'Uspesne vytvoreno'}
                />
              )}
              {!validDate && (
                <SnackbarContent
                  message={
                    <span>
                      <b>Chyba:</b> <h3>Vyber platné datum !!</h3>
                    </span>
                  }
                  close
                  color="warning"
                />
              )}
            </GridItem>
            <GridItem>
              <FormControl className={selectClasses.formControl}>
                <div className='shadow-sm px-2 rounded'>
                <InputLabel id="event-type-select">Typ Udalosti</InputLabel>
                <Select
                  labelId="event-type-select"
                  id="event-type"
                  open={openEventType}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={eventType}
                  required
                  onChange={handleChange}
                  name="type"
                >
                  <MenuItem selected value={1}>
                    Trening
                  </MenuItem>
                  <MenuItem value={2}>Zápas</MenuItem>
                  <MenuItem value={3}>Ukončená</MenuItem>
                  <MenuItem value={4}>Chlastačka</MenuItem>
                </Select>
               </div>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-between">
                  <div className='shadow-sm px-2 rounded'>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Datum začátku"
                    required
                    format="dd/MM/yyyy"
                    value={startDate}
                    onChange={dateListener('startDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  </div>
                  <div className='shadow-sm px-2 rounded'>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Začátek"
                    required
                    value={startTime}
                    onChange={dateListener('startTime')}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                  </div>
                </Grid>
              </MuiPickersUtilsProvider>

              <FormControlLabel
                control={
                  <Checkbox checked={repeatEvent} onChange={handleRepeatCheckbox} color="primary" />
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
                disabled={eventStatusMes.isLoading}
                simple
                color="primary"
                size="lg"
                onClick={handleSubmitEvent}
              >
                VYTVOŘIT
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
