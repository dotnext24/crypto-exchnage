import React from 'react'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import './style.css'

export default function TokenBalance(props) {
    const { account, library, chainId } = useWeb3React()
  
    const [balance, setBalance] = React.useState()
    React.useEffect(() => {
      if (!!account && !!library) {
        let stale = false
  
        library
          .getBalance(props.account)
          .then((balance) => {           
            if (!stale) {
              setBalance(balance)
            }
          })
          .catch(() => {
            if (!stale) {
              setBalance(null)
            }
          })
  
        return () => {
          stale = true
          setBalance(undefined)
        }
      }
    }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
  
    return (
      <React.Fragment>
          {!!balance
            ? parseFloat(formatEther(balance)).toPrecision(4)
            : balance === null
            ? 'Error'
            : account === null
            ? '-'
            : !!account && !!library
            ? '-'
            : ''}    
      </React.Fragment>
    )
  }
