import React, { useEffect, useState } from 'react';
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
  processEventAttendance,
  fetchOccurrences,
  occurrencesList,
  deleteEvent,
  getAdmin,
  admin
}) => {
  const userId = localStorage?.userId;
  const [editedEventRow, setEditedEventRow] = useState();
  const [rowId, setRowId] = useState();
  const [attendanceButton, setAttendanceButton] = useState(false);
  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    fetchOccurrences();
  }, [localStorage.token]);

  useEffect(() => {
    if (occurrencesList) {
      setAttendanceButton(false);
    }
  }, [occurrencesList]);

  useEffect(()=> {
    getAdmin();
  },[admin.isAdmin])

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
    if (ev.currentTarget.name === 'yes') status = 'yes';
    if (ev.currentTarget.name === 'no') status = 'no';
    if (ev.currentTarget.name === 'dunno') status = 'dunno';

    const occurrenceId = ev.currentTarget.id;
    setEditedEventRow(occurrenceId);
    processEventAttendance(status, occurrenceId, creationTime);
  }

   const handleDeleteEvent = (ev, creationTime) => deleteEvent(ev.currentTarget.id, creationTime);


  const userAttendanceStatus = (row) => {
    const userAttendanceIndex = row?.attendance?.findIndex((el) => el?.userID === userId);
    let userAttendanceStatus;
    if (userAttendanceIndex !== -1) {
      userAttendanceStatus = row?.attendance[userAttendanceIndex]?.status;
      return userAttendanceStatus;
    }
  };

  const disabledButton = attendanceButton && occurrencesList[0].creationTime !== rowId;

  return (
    <div>
      <GridContainer justify="center">
        {occurrencesList.length && (
          <>
            <GridItem className="cabin">
              <h3 className="cabin-headline">
                Další {getEventTypeName(occurrencesList[0].eventType)} tě čeká{' '}
                {timeStampToData(occurrencesList[0]?.creationTime)}
              </h3>
              <div className="cabin-nearest-attendance">
                {attendanceButton && occurrencesList[0].creationTime === rowId && <Spinner />}
                {!attendanceButton && (
                  <EventAttendanceButtons
                    occurrence={occurrencesList[0]}
                    handleAttendance={handleAttendance}
                    userAttendanceStatus={userAttendanceStatus(occurrencesList[0])}
                    cr={occurrencesList[0].creationTime}
                    handleDeleteEvent={handleDeleteEvent}
                  />
                )}
                {disabledButton && (
                  <EventAttendanceButtons
                    occurrence={occurrencesList[0]}
                    disabledButton={disabledButton}
                    handleAttendance={handleAttendance}
                    userAttendanceStatus={userAttendanceStatus(occurrencesList[0])}
                    cr={occurrencesList[0].creationTime}
                  />
                )}
              </div>
              <span className="cabin-nearest-span">Potkáš se tam s:</span>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className="cabin-nearest-avatars">
              <div className="flex flex-wrap">
                {occurrencesList[0]?.attendance &&
                occurrencesList[0].attendance.map(
                    (item) =>
                      (item.status === 'yes') && (
                        item?.profileUrl ? (
                        <div className='flex items-center my-2 flex-column'>
                          <Avatar
                            key={uuid_v4()}
                            alt="Remy Sharp"
                            src={item?.profileUrl}
                            className="nearest-event-player"
                          />
                          <span>{item?.nickname}</span>
                        </div>
                      ) : (
                        <div key={uuid_v4()}
                             className='bg-primary-yellow p-2 mx-2 text-sm rounded align-self-center'>
                          {item?.nickname || `${item?.firstName} ${item?.lastName}` }
                        </div>
                        )
                      )

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
            handleDeleteEvent={handleDeleteEvent}
            handleAttendanceButton={attendanceButton}
            userId={userId}
            editedEventRow={editedEventRow}
            isAdmin={admin.isAdmin}
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
