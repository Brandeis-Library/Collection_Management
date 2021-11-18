import {INCREMENT, DECREMENT, BARCODE} from './actionTypes'

export function increment() {
    return {
       type: INCREMENT
    }
 }
 export function decrement() {
    return {
       type: DECREMENT
    }}

export function barcode(text) {
return {
   type: BARCODE,
   payload: {text: text}
}}

// export sendBarcodeToBackend(barcode) {
//    return async function fetchItemDetailThunk(dispatch, getState) {
//       const response = await 
//    }
// }