import {utils} from 'ethers'

export function toWei(ether){
    let wei = utils.parseEther('0.1');
console.log(wei.toString(10));
console.log(sanitizeHex(wei.toString(10)));
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