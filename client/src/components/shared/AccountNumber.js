import React, { Component } from 'react'
import { OverlayTrigger, Tooltip, Dropdown, Button } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import {
  injected,
  network,
  walletconnect,
  walletlink,
  ledger,
  trezor
 
} from './../../connectors'


function dis(){
 sessionStorage.setItem('connection','0x1')
}

export default function AccountNumber(props) {

  const context = useWeb3React()
  const { connector, account, deactivate, active, error } = context
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const triedEager = useEagerConnect()

  useInactiveListener(!triedEager || !!activatingConnector)

const connectorsByName = {
  Metamask: injected,    
  WalletConnect: walletconnect,
  Coinbase: walletlink,
  Ledger: ledger,
  Trezor: trezor,
}
let cName='';
Object.keys(connectorsByName).map(name => {
  const currentConnector = connectorsByName[name]
  currentConnector.name=name;
  if(currentConnector === connector)
  cName=name;
})


  if (active && account && account.length > 0)
    return (<a>

<Dropdown>
  <Dropdown.Toggle  variant="secondary">
  <span>
  {cName=='WalletConnect' && <img className="pull-left"  height="16" width="16" src={`./assets/${cName}.svg`}/>}
  {cName!='WalletConnect' && <img className="pull-left"  height="16" width="16" src={`./assets/${cName}.png`}/>}
  {`  ${account.substr(0, 6)}...${account.slice(account.length - 5)} `}
   </span>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item className="btn-disconnect" onClick={() => {deactivate(); dis();  if (connector.close) connector.close() }} >Disconnect</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>
    
    </a>
    )
  else return  <a  onClick={() => { props.action() }}> <Button variant="secondary">Connect Wallet</Button> </a>;

}
