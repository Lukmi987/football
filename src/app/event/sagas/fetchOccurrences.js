import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_EVENT } from "../../constants/actionTypes";
import { loadEvents } from "../../helpers/eventHelpers";
import _ from "lodash";

export function* fetchOccurrences() {
  try {
    const userToken = localStorage.token;
    const response = yield axios.get(`/occurrences.json?auth=${userToken}`);
    const responseUsers = yield axios.get(`/users/players/-MWEMVOl0OXP0c5Npsq4.json?auth=${userToken}`);

    console.log('user response',responseUsers);
    const entr = Object.entries(response.data);
    console.log("pred flat entries", entr);

    const mojeCopy = _.cloneDeep(entr);

    const copyEnter = _.cloneDeep(entr);
// mapNodeIdAndUsersToEachEvent() => {



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
              let result = { ...node, ...occurrencesValues[k] };
              acumm.push(result);
            }
          }
        }
      }
      return acumm;
    };
  mapNodeIdAndUsersToEachEvent(copyEnter);
     console.log(mapNodeIdAndUsersToEachEvent(copyEnter), ".....test.....");
  function mapUsers( occurrencesValues, index,responseUsers) {
   return occurrencesValues[index].attendance.map(id => {
      const user = responseUsers.data.filter( user => user.userID === id);
      return user[0];
    })}
    //v kazdem itemu obsahuje attendance array s id hracu kteri jdou na trening

    //namapovat ke kazdumu id  objekt s daty usera co potrebuji vypsat
    // v loope attendance.map(item.attendance => {
    // user.id  asi filter method method() vrati me cely objekt playera
    //retun userOjbekt,
    // })

    // a celou array potom ulozim do attendance kazdeho occurence


    // const flat = copyEnter.flatMap((el) => {
    //   let len = el[1].length;
    //   const obj = { ...el[1] };
    //   for (let i = 0; i < len; i++) {
    //     obj[i].id = el[0];
    //   }
    //   return obj;
    // }); //({...obj[1], id: obj[0]})
    //
    // const flatten = Object.keys(flat).reduce((res, item) => {
    //   return res.concat(flat[item]);
    // }, []);

    // console.log("muj keys flat", flat);

    // debugger;
    // const occ = entr.reduce(loadOccurrences, []);
    // console.log("entr", occ);
    // const data = response.data;
    // data.map((occur) => occur.creationTime);
    //
    // const entries = Object.entries(response.data);
    // console.log("2 entries", entries);
    // const events = entries.reduce(loadEvents, []);
    // yield put({ type: SET_EVENT, data: events });
  } catch (e) {
    console.log(e);
  }
}
const loadOccurrences = (result, occurrence) => {
  const resultCopy = { ...result };
  // resultCopy[]
};

// 5: {fasdfaf: "afdfafaf"}
// 10: {}
// 11: {ff: "ff"}
