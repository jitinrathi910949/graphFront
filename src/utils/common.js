import {API_URL} from './constants'
export const createUrl = (url) => {
    console.log(API_URL + url)
    return API_URL + url;
  }

  export function isEmpty (obj) {
    let isempty = false
    const type = typeof obj
  
    isempty = isempty || !obj
    isempty = isempty || (type === 'undefined') // if it is undefined
    isempty = isempty || (obj === null) // if it is null
    isempty = isempty || (type === 'string' && (obj.trim() === '')) // if the string is empty
    isempty = isempty || (obj === false || obj === 0) // if boolean value returns false
    isempty = isempty || (Array.isArray(obj) && obj.length === 0) // if array is empty
    isempty = isempty || (type === 'object' && Object.keys(obj).length === 0) // if object is empty
  
    return isempty
  }