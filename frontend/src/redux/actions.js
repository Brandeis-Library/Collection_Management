import {INCREMENT, DECREMENT, BARCODE, SENDBARCODE} from './actionTypes'
import axios from 'axios'

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

export function sendBarcodeToBackend(barcode) {
   return async function fetchItemDetailThunk(dispatch, getState) {
      console.log("barcode in actions.js ---------", barcode)
      const response = await axios.post('http://localhost:4000/api/v1/inventory/', {barcode})
      console.log(response)
         dispatch(sendBarCode(response.data))  
   }
}

export function sendBarCode(barcode) {
   return {
      type: SENDBARCODE,
      payload: {barcode2: barcode}
   }
}   