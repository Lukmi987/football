import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Avatar, Checkbox, Switch } from '@material-ui/core';
import GridContainer from '../../../components/Grid/GridContainer';
import Button from '../../../components/CustomButtons/Button';
import Spinner from '../../Spinner';
import { v4 as uuid_v4 } from 'uuid';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EventAttendanceButtons from './EventAttendanceButtons';
import EventAttendanceList from './EventAttendanceList';
import { groupBy } from '../../helpers/eventHelpers';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
      align: 'center',
    },
    width: '55%',
    padding: '0 1000px',
    align: 'center',
    body: {
      background: 'blue',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

export function timeStampToData(timeStamp) {
  const date = new Date(timeStamp);
  return `v ${date.getHours()}.${date.getMinutes()}h ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
}

const getEventType = (eventTypeId) => {
  switch (eventTypeId) {
    case 1:
      return 'Trening';
    case 2:
      return 'Zápas';
    case 3:
      return 'Ukončená';
    case 4:
      return 'Chlastačka';
  }
};

function Row(props) {
  const { occurrence, handleAttendance, userId, handleAttendanceButton, rowId } = props;
  const cr = occurrence.creationTime;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const userAttendanceIndex = occurrence.attendance.findIndex((el) => el?.userID === userId);
  let userAttendanceStatus;
  if (userAttendanceIndex !== -1) {
    userAttendanceStatus = occurrence.attendance[userAttendanceIndex].status;
  }

  const groupByUsers = groupBy(occurrence.attendance, (a) => a?.status);
  const disabledButton = handleAttendanceButton && occurrence.creationTime !== rowId;

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          className="cabin-table-collapsible-table-cell cabin-table-collapsible-table-cell-event-type"
          align="center"
        >
          {getEventType(occurrence.eventType)}
        </TableCell>
        <TableCell className="cabin-table-collapsible-table-cell" align="center">
          {timeStampToData(occurrence.creationTime)}
        </TableCell>
        <TableCell align="center">
          {handleAttendanceButton && occurrence.creationTime === rowId && <Spinner />}
          {!handleAttendanceButton && (
            <EventAttendanceButtons
              occurrence={occurrence}
              handleAttendance={handleAttendance}
              userAttendanceStatus={userAttendanceStatus}
              cr={cr}
            />
          )}
          {disabledButton && (
            <EventAttendanceButtons
              occurrence={occurrence}
              disabledButton={disabledButton}
              handleAttendance={handleAttendance}
              userAttendanceStatus={userAttendanceStatus}
              cr={cr}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Players
              </Typography>
              <Table size="small" aria-label="purchases">
                <tbody>
                  <tr>
                    <th>
                      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Jdou">
                          {groupByUsers.get(1) ? (
                            groupByUsers
                              .get(1)
                              .map((user) => (
                                <EventAttendanceList
                                  key={uuid_v4()}
                                  user={user}
                                  classes={classes}
                                />
                              ))
                          ) : (
                            <div>0</div>
                          )}
                        </Tab>
                        <Tab eventKey="profile" title="Neví">
                          {groupByUsers.get(2) ? (
                            groupByUsers
                              .get(2)
                              .map((user) => (
                                <EventAttendanceList
                                  key={uuid_v4()}
                                  user={user}
                                  classes={classes}
                                />
                              ))
                          ) : (
                            <div>0</div>
                          )}
                        </Tab>
                        <Tab eventKey="contact" title="Nejdou">
                          {groupByUsers.get(0) ? (
                            groupByUsers
                              .get(0)
                              .map((user) => (
                                <EventAttendanceList
                                  key={uuid_v4()}
                                  user={user}
                                  classes={classes}
                                />
                              ))
                          ) : (
                            <div>0</div>
                          )}
                        </Tab>
                      </Tabs>
                    </th>
                  </tr>
                </tbody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//     row: PropTypes.shape({
//         calories: PropTypes.number.isRequired,
//         carbs: PropTypes.number.isRequired,
//         fat: PropTypes.number.isRequired,
//         history: PropTypes.arrayOf(
//             PropTypes.shape({
//                 amount: PropTypes.number.isRequired,
//                 customerId: PropTypes.string.isRequired,
//                 date: PropTypes.string.isRequired,
//             }),
//         ).isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         protein: PropTypes.number.isRequired,
//     }).isRequired,
// };

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

const CollapsibleTable = ({
  occurrencesList,
  handleAttendance,
  handleAttendanceButton,
  userId,
  editedEventRow,
  rowId,
  creationTime,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table cabin-table-collapsible">
        <TableHead>
          <TableRow className="cabin-table-collapsible-table-head">
            <TableCell align="left">Účast</TableCell>
            <TableCell align="right">Typ události</TableCell>
            <TableCell align="right">Začátek</TableCell>
            <TableCell align="right">Zůčastním se?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {occurrencesList.map((occurrence) => {
            return (
              <Row
                key={occurrence.creationTime}
                occurrence={occurrence}
                editedEventRow={editedEventRow}
                userId={userId}
                handleAttendance={handleAttendance}
                handleAttendanceButton={handleAttendanceButton}
                rowId={rowId}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
