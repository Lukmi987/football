import { put,select } from 'redux-saga/effects';
import axios from "../../axios-football";

export function* fetchUserList() {
    try {
        const x = 'sjfk';
    } catch (e) {
        console.log(e)
    }
}

// export function* fetchUserList() {
//     console.log('jo joj jo');
//     try {
//
//         const data = {
//             player1: 'lukas',
//             player2: 'madar',
//             player3: 'rum',
//         }
//         const response = yield axios.post('/players.json',data);
//         console.log('my response', response);
//     } catch (e) {
//         console.log(e)
//     }
// }