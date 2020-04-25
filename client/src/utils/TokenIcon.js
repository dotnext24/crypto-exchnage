export const INITIAL_TOKENS_CONTEXT = JSON.parse(process.env.REACT_APP_TOKENS)
console.log('tttt',process.env.REACT_APP_TOKENS,process.env)
  export const getDefaultTokens=(pair)=>{
      let tokensPain= pair.split("/");
      let allTokens=INITIAL_TOKENS_CONTEXT[1];
      const sendTokens=Object.keys(allTokens).filter(x=>allTokens[x].SYMBOL==tokensPain[0]);
      const recieveTokens=Object.keys(allTokens).filter(x=>allTokens[x].SYMBOL==tokensPain[1]);
      if(sendTokens.length>0 && recieveTokens.length>0){
      const sendCurrency=allTokens[sendTokens[0]];
      const receiveCurrency=allTokens[recieveTokens[0]]
      console.log('sendCurrency receiveCurrency',sendCurrency,receiveCurrency)
      return [{...sendCurrency,key:sendTokens[0]},{...receiveCurrency,key:recieveTokens[0]}]
      }
      else
      return [];
    }

  const TOKEN_ICON_API = address =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;

  export const TokenLogo=(address)=> {   
    let path = TOKEN_ICON_API(address);
    return path;
  }


  