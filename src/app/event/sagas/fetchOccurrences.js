import axios from '../../axios-football';
import { SET_FUTURE_OCCURRENCES, SET_OCCURRENCES_WITH_USERS } from '../../constants/actionTypes';
import { loadEvents } from '../../helpers/eventHelpers';
import _ from 'lodash';
import { put, select } from 'redux-saga/effects';

export function* fetchOccurrences() {
  try {
    const userToken = localStorage.token;
    const response = yield axios.get(`/occurrences.json?auth=${userToken}`);
    const responseUsers = yield axios.get(
      `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`,
    );

    const entr = Object.entries(response.data);
    const occurrenceList = JSON.parse(JSON.stringify(entr));
    console.log('occurrenceList',occurrenceList);
    const mapNodeIdAndUsersToEachEvent = (array) => {
      const acumm = [];
      const occurrencesArray = 1;
      const nodeId = 0;
      for (let i = 0; i < array.length; i++) {
        let node = {};
        for (let j = 0; j < array[i].length; j++) {
          let occurrences = array[i][j];
          if (j === nodeId) {
            node.id = array[i][j];
          } else if (j === occurrencesArray) {
            let occurrencesValues = Object.values(occurrences);
            for (let k = 0; k < occurrencesValues.length; k++) {
              const attendance = mapUsers(occurrencesValues, k, responseUsers);
              console.log('attendance v map',occurrencesValues[k]);
              occurrencesValues[k].attendance = attendance;
              let result = { ...node, ...occurrencesValues[k] };
              acumm.push(result);
            }
          }
        }
      }
      return acumm;
    };
    const occurrencesWithUsers = mapNodeIdAndUsersToEachEvent(occurrenceList);
    console.log('occurrencesWithUsers',occurrencesWithUsers);

    const futureEvents = occurrencesWithUsers.filter((item) => item.creationTime > new Date().getTime())
    // Sort events according their creating date
    futureEvents.sort(function (a, b) {
      return a?.creationTime - b?.creationTime;
    });


    function mapUsers(occurrencesValues, index, responseUsers) {
      return (occurrencesValues[index]?.attendance || []).map((attendance) => {
        const user = responseUsers.data.filter((user) => user.userID === attendance.userId);
        const userCopy = JSON.parse(JSON.stringify(user));

        if ((attendance?.status) && userCopy.length) {
          userCopy[0].status = attendance?.status;
        }
        return userCopy[0] ? userCopy[0] : [];
      });
    }

    yield put({type: SET_FUTURE_OCCURRENCES, data: futureEvents})
    yield put({ type: SET_OCCURRENCES_WITH_USERS, data: occurrencesWithUsers });
  } catch (e) {
    console.log(e);
  }
}
