import React, { Component } from 'react'
import { useWeb3React} from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../../hooks'

export default function NextStepText(props) {

  const context = useWeb3React()
  const { connector, account,  deactivate, active, error } = context
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const triedEager = useEagerConnect()

  useInactiveListener()
 
  if(active && account && account.length>0)
        return (<button  disabled={props.disabled==true?"disabled":null} onClick={props.OnNextStep} type="button" className="bg-primary cl-button  sc-ifAKCX dVuRDF">Next Step</button>
        )
  else return <button onClick={props.OnConnectWallet} type="button" className="bg-primary cl-button  sc-ifAKCX dVuRDF">Connect to a Wellet</button>;
    
}
