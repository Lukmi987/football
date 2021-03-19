import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_EVENT } from "../../constants/actionTypes";
import { loadEvents } from "../../helpers/eventHelpers";
import _ from "lodash";

export function* fetchOccurrences() {
  try {
    const userToken = localStorage.token;
    const response = yield axios.get(`/occurrences.json?auth=${userToken}`);

    const entr = Object.entries(response.data);
    console.log("pred flat entries", entr);

    const mojeCopy = _.cloneDeep(entr);

    const copyEnter = _.cloneDeep(entr);

    const acumm = [];
    const some = (array) => {
      for (let i = 0; i < array.length; i++) {
        let firstLevel = {};
        let objectWithNodeId;
        for (let j = 0; j < array[i].length; j++) {
          const t = j === 0 ? "id" : "neco";
          let f = array[i][j];
          if (j === 0) {
            firstLevel.id = array[i][j];
            console.log("firstLevel.id j==0", firstLevel.id);
          } else if (j === 1) {
            console.log("j se rovna 1 takze merim index 1", Object.values(f));
            let occurrence = Object.values(f);
            for (let k = 0; k < occurrence.length; k++) {
              objectWithNodeId = { ...firstLevel, ...occurrence[k] };
              acumm.push(objectWithNodeId);
            }
          }
        }
      }
    };
    some(copyEnter);
    console.log(acumm, ".....test.....");

    const flat = copyEnter.flatMap((el) => {
      let len = el[1].length;
      const obj = { ...el[1] };
      for (let i = 0; i < len; i++) {
        obj[i].id = el[0];
      }
      return obj;
    }); //({...obj[1], id: obj[0]})

    const flatten = Object.keys(flat).reduce((res, item) => {
      return res.concat(flat[item]);
    }, []);

    console.log("muj keys flat", flat);

    debugger;
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
