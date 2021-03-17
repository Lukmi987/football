import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_EVENT } from "../../constants/actionTypes";
import { loadEvents } from "../../helpers/eventHelpers";

export function* fetchOccurrences() {
  try {
    const userToken = localStorage.token;
    const response = yield axios.get(`/occurrences.json?auth=${userToken}`);

    const entr = Object.entries(response.data);
    console.log("pred flat", entr);
    const flat = entr.flatMap((obj) => obj[1]);
    console.log("shit", flat);
    debugger;
    const occ = entr.reduce(loadOccurrences, []);
    console.log("entr", occ);
    const data = response.data;
    data.map((occur) => occur.creationTime);

    const entries = Object.entries(response.data);
    console.log("2 entries", entries);
    const events = entries.reduce(loadEvents, []);
    yield put({ type: SET_EVENT, data: events });
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
