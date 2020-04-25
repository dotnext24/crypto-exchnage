import {apiGetAccountNonce,apiGetGasPrices} from './../../utils/api'
import {convertStringToHex,convertAmountToRawNumber} from './../../utils/bignumber'
import {sanitizeHex,toWei, toHex} from './../../utils/helpers'

export async function formatTransaction(amount,fromAddress,toAddress, chainId) {
    // from
    const from = fromAddress;  
    // to
    const to = toAddress;
    
    // nonce
    const _nonce = await apiGetAccountNonce(fromAddress, chainId);
    const nonce =  sanitizeHex(convertStringToHex(_nonce));
  
    // gasPrice
    const gasPrices = await apiGetGasPrices();
    const _gasPrice = gasPrices.slow.price;
    const gasPrice = sanitizeHex(
      convertStringToHex(convertAmountToRawNumber(_gasPrice, 9))
    );
  
    // gasLimit
    const _gasLimit = 21000;
    const gasLimit = sanitizeHex(convertStringToHex(_gasLimit));
  
    // value
    const _value = amount;
    const value = sanitizeHex(convertStringToHex(_value));
  
    // data
    const data = "0x";
  
    // test transaction
    const tx = {
      from,
      to,
      nonce,
      gasPrice,
      gasLimit,
      value,
      data
    };
  
    return tx;
  }
  
  