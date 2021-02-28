import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import 'date-fns';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles();
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

 const Event = () => {   
  const classes = useStyles();
  const selectClasses = selectStyles();
  const [eventCount, setEventCount] = useState('');
  const [eventType, setEventType] = useState('');
  const [openEventType, setOpenEventType] = useState(false);
  const [openEventCount, setOpenEventCount] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date('2014-08-18T21:11:54'));
  const [selectedEndDate, setSelectedEndDate] = useState(new Date('2015-08-18T21:11:54'));
  const [selectedStartTime, setSelectedStartTime] = useState(new Date('2015-08-18T21:11:54'));
  const [selectedEndTime, setSelectedEndTime] = useState(new Date('2015-08-18T21:11:54'));
  
  const [count, setCount] = useState("");
  const [openCount, setOpenCount] = useState(false);
  
  const [openType, setOpenType] = useState(false);
  const [type, setType] = useState("");

const dateListener = (id) => (ev) => handleDateChange(id,ev); 

  const handleDateChange = (id,ev) => {
    switch (id) {
      case 'startDate':
        setSelectedStartDate(ev);
            break;
      case 'endDate':
        setSelectedEndDate(ev);
            break;
      case 'startTime':
          setSelectedEndTime(ev);
            break;
      case 'endTime':
            setSelectedEndTime(ev);
            break;
    }
  };

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   console.log('v change',e.target);
  //   e.target.id === 'event-repeat-select' ? setEventCount(value) : setEventType(value);
  //   console.log('v change my value',e.target.value);
  //   // setEvent(e.target.value);
  //   // console.log('value',e.target.value);
  // };

  // const handleClose = (ee) => {
  //   console.log(ee.target);
  //   // ee.target.id === 'event-repeat-select' ? setOpenEventCount(false) : setOpenEventType(false);
  //   setOpenEventCount(false);
  //   // setOpenEventType(false);

  //   // setOpen(false);
  // };

  // const handleOpen = (e) => {
  //   // console.log('jojojoj',e.target);
  //    e.target.id === 'event-repeat-select' ? setOpenEventCount(true) : setOpenEventType(true);
  //   // if(e.target.id === 'event-repeat-select'){
  //   //   setOpenEventCount(true);
  //   // }else {
  //   //   setOpenEventType;
  //   // } 
    
  // };


  const handleChange = (ev) => {
    // console.log(ev.target);
    ev.target.name === 'countme' ? setCount(ev.target.value) : setType(ev.target.value);
 
    
  };

  const handleClose = (ev) => {
    
  ev.preventDefault();
  ev.stopPropagation();
    console.log('.........v close target',ev.target);

    // ev.target.id === 'countme' ? setOpenCount(false) : setOpenType(false);
    setOpenCount(false);
    setOpenType(false);
  }

  const handleOpen = (ev) => {
    
    ev.target.id === 'countme' ? setOpenCount(true) : setOpenType(true);
    // console.log(openCount,openType,ev.target.name,ev.target.id);
  };

return (
<div>
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
              <div className={classes.title}>
                <h3>Checkboxes</h3>
              </div>
              <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => console.log('click')}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                  label="Unchecked"
                />
              </div>
              </GridItem>
              
              <GridItem>
              {/* <FormControl className={selectClasses.formControl}>
                <InputLabel id="event-type">Typ Udalosti</InputLabel>
                <Select
                  labelId="event-type"
                  id="event-type-select"
                  open={openEventType}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={eventType}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Trening</MenuItem>
                  <MenuItem value={2}>Zapas</MenuItem>
                  <MenuItem value={3}>Ukoncena</MenuItem>
                  <MenuItem value={4}>Chlastacka</MenuItem>
                </Select>
              </FormControl> */}
            
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      <h3>Vyber datum zacatku</h3>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedStartDate}
          onChange={dateListener('startDate')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <h3>Vyber cas konani</h3>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedStartTime}
          onChange={dateListener('startTime')}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
              <h3>Vyber Datum Konce</h3>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedEndDate}
          onChange={dateListener('endDate')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <h3>Cas ukonceni</h3>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedEndTime}
          onChange={dateListener('endTime')}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>

    {/* <FormControl className={selectClasses.formControl}>
                <InputLabel id="event-repeat">Opakovat</InputLabel>
                <Select
                  labelId="event-repeat"
                  id="event-repeat-select"
                  open={openEventCount}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={eventCount}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Nikdy</em>
                  </MenuItem>
                  <MenuItem value='everyDay'>Kazdy den</MenuItem>
                  <MenuItem value='everyWeek'>Kazdy tyden</MenuItem>
                  <MenuItem value='every2weeks'>Kazde 2 tydny</MenuItem>
                </Select>
              </FormControl> */}
              <FormControl className={selectClasses.formControl}>
                     <InputLabel id="count-select">Count</InputLabel>
        <Select
          labelId="count-select"
          id="countme"
          open={openCount}
          onClose={handleClose}
          onOpen={handleOpen}
          value={count}
          onChange={handleChange}
          name="countme"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='ten'>Ten</MenuItem>
          <MenuItem value='twen'>Twenty</MenuItem>
          <MenuItem value='thirty'>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={selectClasses.formControl}>
                     <InputLabel id="demo-controlled-open-select-label">type</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="type"
          open={openType}
          onClose={handleClose}
          onOpen={handleOpen}
          value={type}
          onChange={handleChange}
          name="type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='kkt'>kkt</MenuItem>
          <MenuItem value='pic'>pic</MenuItem>
          <MenuItem value='flus'>flujs</MenuItem>
        </Select>
      </FormControl>
          </GridItem>
        </GridContainer>
      </div>
    </div>
</div>
  );
}

export default Event;