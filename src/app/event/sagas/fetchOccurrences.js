import axios from "../../axios-football";
import { SET_OCCURRENCES_WITH_USERS } from "../../constants/actionTypes";
import { loadEvents } from "../../helpers/eventHelpers";
import _ from "lodash";
import { put, select } from "redux-saga/effects";

export function* fetchOccurrences() {
  try {
    console.log("ale jooo fetchEvents");
    const userToken = localStorage.token;
    const response = yield axios.get(`/occurrences.json?auth=${userToken}`);
    const responseUsers = yield axios.get(
      `/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`
    );

    const entr = Object.entries(response.data);

    const occurrenceList = JSON.parse(JSON.stringify(entr));

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
              occurrencesValues[k].attendance = attendance;
              console.log("bim", occurrencesValues);
              let result = { ...node, ...occurrencesValues[k] };
              acumm.push(result);
            }
          }
        }
      }
      return acumm;
    };
    const occurrencesWithUsers = mapNodeIdAndUsersToEachEvent(occurrenceList);

    occurrencesWithUsers.sort(function (a, b) {
      return a?.creationTime - b?.creationTime;
    });
    console.log("ahh", occurrencesWithUsers);
    function mapUsers(occurrencesValues, index, responseUsers) {
      return occurrencesValues[index].attendance.map((attendance) => {
        const user = responseUsers.data.filter(
          (user) => user.userID === attendance.userId
        );
        const userCopy = JSON.parse(JSON.stringify(user));

        if (
          attendance.status === 0 ||
          attendance.status === 1 ||
          attendance.status === 2
        ) {
          userCopy[0].status = attendance.status;
        }
        return userCopy[0];
      });
    }

    yield put({ type: SET_OCCURRENCES_WITH_USERS, data: occurrencesWithUsers });
  } catch (e) {
    console.log(e);
  }
}
