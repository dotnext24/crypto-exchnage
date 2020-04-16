import React, { Component } from 'react'
import { useWeb3React} from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../../hooks'

export default function AccountNumber(props) {

  const context = useWeb3React()
  const { connector, account,  deactivate, active, error } = context
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const triedEager = useEagerConnect()

  useInactiveListener(!triedEager || !!activatingConnector)
 
  if(active && account && account.length>0)
        return (<a  onClick={() => {deactivate()}}>{account.substr(0,10)}</a>
        )
  else return <a onClick={props.action}>Connect Wallet</a>;
    
}
