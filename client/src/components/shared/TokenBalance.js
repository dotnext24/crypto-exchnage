import React from 'react'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import './style.css'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ethereum-api.xyz',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})





export default  function TokenBalance(props) {
  const { account, library, chainId } = useWeb3React()

  const [balance, setBalance] = React.useState()
  const [assets, setAssets] = React.useState()
  React.useEffect( () => {
   
    if (!!account && !!library) {
      let stale = false
     // const { result } = response.data;    
      
      // library
      //   .getBalance(props.account)
      //   .then((balance) => {           
      //     if (!stale) {
      //       setBalance(balance)
      //     }
      //   })
      //   .catch(() => {
      //     if (!stale) {
      //       setBalance(null)
      //     }
      //   })

      return () => {
        stale = true
        setBalance(props.tokenBalance)
      }
    }
  }, []) // ensures refresh if referential identity of library doesn't change across chainIds
 
//onBalanceClick
if(props.onBalanceClick)
return (
  <a style={{cursor:'pointer'}} title="Enter Max" onClick={()=>props.onBalanceClick(parseFloat(formatEther(props.tokenBalance)).toPrecision(4))}>
  {!!props.tokenBalance && account
          ? `Balance: ${parseFloat(formatEther(props.tokenBalance)).toPrecision(4)}`
          : props.tokenBalance === null
          ? 'Error'
          : !account || account === null
          ? '-'
          : !!account && !!library
          ? '-'
          : ''}   
</a>

)
else
  return (
    <React.Fragment>
        {!!props.tokenBalance && account
          ? parseFloat(formatEther(props.tokenBalance)).toPrecision(4)
          : props.tokenBalance === null
          ? 'Error'
          : !account || account === null
          ? '-'
          : !!account && !!library
          ? '-'
          : ''}    
    </React.Fragment>
  )
}


// export default function TokenBalance(props) {
//     const { account, library, chainId } = useWeb3React()
  
//     const [balance, setBalance] = React.useState()
//     React.useEffect(() => {
//       if (!!account && !!library) {
//         let stale = false
  
//         library
//           .getBalance(props.account)
//           .then((balance) => {           
//             if (!stale) {
//               setBalance(balance)
//             }
//           })
//           .catch(() => {
//             if (!stale) {
//               setBalance(null)
//             }
//           })
  
//         return () => {
//           stale = true
//           setBalance(undefined)
//         }
//       }
//     }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
  
//     return (
//       <React.Fragment>
//           {!!balance
//             ? parseFloat(formatEther(balance)).toPrecision(4)
//             : balance === null
//             ? 'Error'
//             : account === null
//             ? '-'
//             : !!account && !!library
//             ? '-'
//             : ''}    
//       </React.Fragment>
//     )
//   }
