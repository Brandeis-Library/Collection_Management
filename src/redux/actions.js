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

export function barcode() {
return {
   type: BARCODE
}}