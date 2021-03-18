import { put, select } from "redux-saga/effects";
import axios from "../../axios-football";
import { SET_EVENT } from "../../constants/actionTypes";
import { loadEvents } from "../../helpers/eventHelpers";
import _ from 'lodash'

export function* fetchOccurrences() {
  try {
    const userToken = localStorage.token;
    const response = yield axios.get(`/occurrences.json?auth=${userToken}`);

    const entr = Object.entries(response.data);
    console.log("pred flat entries", entr);
    const copyEnter = _.cloneDeep(entr)
    const acumm = []
    const some = (array) => {


      for (let i = 0; i < array.length; i++) {
        let test = {}
        let nevim;
        for (let j = 0; j < array[i].length; j++) {
          const t = (j === 0) ? "id" : 'neco'
          let f = array[i][j]
          if(j === 0) {
            test.id = array[i][j]
          } else if (j === 1){
            for (let k = 0; k < f.length; k++) {
              nevim = {...test, ...f[k]}
              acumm.push(nevim)
            }
          }
        }

      }

    }
    some(copyEnter)
    console.log(acumm, '.....test.....');

    const flat = copyEnter.flatMap((el) => {
     let len = el[1].length
      const obj = {...el[1]}
     for (let i = 0; i < len; i++) {
       obj[i].id = el[0]
     }
      return obj
    } ); //({...obj[1], id: obj[0]})


    const flatten = Object.keys(flat).reduce((res, item) =>{
      return res.concat(flat[item]);
    }, []);

    console.log('muj keys flat',flat);



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
