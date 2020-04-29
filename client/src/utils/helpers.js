import {utils} from 'ethers'

export function toWei(ether){
    let wei = utils.parseEther('0.1');

   return wei.toString(10);
}

export function toHex(stringValue){
    return sanitizeHex(stringValue)
}

export function sanitizeHex(hex) {
    hex = hex.substring(0, 2) === "0x" ? hex.substring(2) : hex;
    if (hex === "") {
      return "";
    }
    hex = hex.length % 2 !== 0 ? "0" + hex : hex;
    return "0x" + hex;
  }
  export function isObject(obj) {
    return typeof obj === "object" && !!Object.keys(obj).length;
  }

 export function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    //hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' ;
    return date.getMonth()+1 + "-" + date.getDate() + "-" + date.getFullYear() + " " + strTime;
  }