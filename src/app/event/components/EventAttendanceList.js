import Button from '../../../components/CustomButtons/Button';
import React, { useEffect } from 'react';
import { groupBy } from '../../helpers/eventHelpers';

const EventAttendanceList = ({occurrence, status}) => {


console.log('EventAttendanceList', occurrence);
  // const filterAttendanceStatus = (status, occurrence) => {
  //   occurrence.attendance.map(user => {
  //     console.log('co tam kurva je', user);
  //     let filteredUser;
  //     if (user !== undefined) {
  //      filteredUser= user?.filter(user.status = status)
  //     }
  //     return filteredUser;
  //   })
  // }
  useEffect(()=>{
    console.log('.............................EventAttendanceList groupBy',  groupBy(occurrence.attendance, (a) => a?.status));
  },[])

  // jdu nejdu nevim 3 stavy v prop
  // filstru podle stavu
  // helper funkce na filter pak uz jen pres vysledek
  return (
      // {occurrence?.attendance &&
      // occurrence?.attendance.map(
      //   (user) =>
      //     user && (
      //       <li key={uuid_v4()}>
      //         <Avatar
      //           alt="Remy Sharp"
      //           src={user?.profileUrl}
      //           className={classes.large}
      //         />
      //       </li>
      //     )
      // )}
    <div>jf</div>
  )
}

export default EventAttendanceList;
