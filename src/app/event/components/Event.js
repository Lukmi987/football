import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import './Event.scss';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import 'date-fns';

import CollapsibleTable, { timeStampToData } from './eventsTable';

import 'react-multi-carousel/lib/styles.css';
import { Avatar, Switch } from '@material-ui/core';
import Spinner from '../../Spinner';
import { v4 as uuid_v4 } from 'uuid';
import EventAttendanceButtons from './EventAttendanceButtons';

const Event = ({
  processEvent,
  processEventAttendance,
  fetchEvents,
  fetchOccurrences,
  eventsList,
  occurrencesList,
}) => {
  const userId = localStorage.userId;
  const [editedEventRow, setEditedEventRow] = useState();

  const [rowId, setRowId] = useState();
  const [nearestEvents, setNearestEvents] = useState([]);
  const [attendanceButton, setAttendanceButton] = useState(false);
  const types = ['image/png', 'image/jpeg'];
  useEffect(() => {
    fetchOccurrences();
  }, [localStorage.token]);

  useEffect(() => {
    if (occurrencesList) {
      setNearestEvents(filterNearestEvents(occurrencesList));
      setAttendanceButton(false);
    }
  }, [occurrencesList]);

  function filterNearestEvents(occurrencesList) {
    return occurrencesList.filter((event) => event.creationTime < Date.now());
  }

  const getEventTypeName = (eventType) => {
    if (eventType === 1) return 'Trening';
    if (eventType === 2) return 'Zápas';
    if (eventType === 3) return 'Ukončená';
    if (eventType === 4) return 'Chlastačka';
  };

  function handleAttendance(ev, creationTime) {
    setAttendanceButton(true);
    setRowId(creationTime);
    let status = null;
    if (ev.currentTarget.name === 'yes') status = 1;
    if (ev.currentTarget.name === 'no') status = 0;
    if (ev.currentTarget.name === 'dunno') status = 2;

    const occurrenceId = ev.currentTarget.id;
    setEditedEventRow(occurrenceId);
    processEventAttendance(status, occurrenceId, creationTime);
  }

  const userAttendanceStatus = (row) => {
    const userAttendanceIndex = row?.attendance.findIndex((el) => el?.userID === userId);
    let userAttendanceStatus;
    if (userAttendanceIndex !== -1) {
      userAttendanceStatus = row.attendance[userAttendanceIndex].status;
      return userAttendanceStatus;
    }
  };

  const disabledButton = attendanceButton && nearestEvents[0].creationTime !== rowId;

  return (
    <div>
      <GridContainer justify="center">
        {nearestEvents.length && (
          <>
            <GridItem className="cabin">
              <h3 className="cabin-headline">
                Další {getEventTypeName(nearestEvents[0].eventType)} tě čeká{' '}
                {timeStampToData(nearestEvents[0]?.creationTime)}
              </h3>
              <div className="cabin-nearest-attendance">
                {attendanceButton && nearestEvents[0].creationTime === rowId && <Spinner />}
                {!attendanceButton && (
                  <EventAttendanceButtons
                    occurrence={nearestEvents[0]}
                    handleAttendance={handleAttendance}
                    userAttendanceStatus={userAttendanceStatus(nearestEvents[0])}
                    cr={nearestEvents[0].creationTime}
                  />
                )}
                {disabledButton && (
                  <EventAttendanceButtons
                    occurrence={nearestEvents[0]}
                    disabledButton={disabledButton}
                    handleAttendance={handleAttendance}
                    userAttendanceStatus={userAttendanceStatus(nearestEvents[0])}
                    cr={nearestEvents[0].creationTime}
                  />
                )}
              </div>
              <span className="cabin-nearest-span">Potkáš se tam s:</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className="cabin-nearest-avatars">
              <div className="nearest-event">
                {nearestEvents[0]?.attendance &&
                  nearestEvents[0]?.attendance.map(
                    (item) =>
                      item && (
                        <Avatar
                          key={uuid_v4()}
                          alt="Remy Sharp"
                          src={item?.profileUrl}
                          className="nearest-event-player"
                        />
                      ),
                  )}
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
            className="cabin-collapsible-table"
            occurrencesList={occurrencesList}
            handleAttendance={handleAttendance}
            handleAttendanceButton={attendanceButton}
            userId={userId}
            editedEventRow={editedEventRow}
            rowId={rowId}
          />
        )}
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8} className="cabin-table">
          <div className='pb-5 round flex justify-center'>
          <img
            src="https://images.unsplash.com/photo-1594536717222-b26df7f2f23b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1534&q=80"
            width="500"
            className='rounded'
          />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Event;
