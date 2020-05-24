import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../../hooks'

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

  useInactiveListener()

  if (active && account && account.length > 0)
    return (<a className="btn" onClick={() => { deactivate(); if (connector.close) connector.close() }}>

      <OverlayTrigger
        placement="left"
        overlay={
          <Tooltip id={`tooltip-account`}>
            <span>{account}</span>
          </Tooltip>
        }
      >
        <span>{account.substr(0, 10)}</span>
      </OverlayTrigger>{' '}
    </a>
    )
  else return <a className="btn" onClick={() => { props.action() }}>Connect Wallet</a>;

}
