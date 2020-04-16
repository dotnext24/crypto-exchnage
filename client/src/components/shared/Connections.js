import React, { Component } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'

import { useEagerConnect, useInactiveListener } from '../../hooks'
import {
    injected,
    network,
    walletconnect,
    walletlink,
    ledger,
    trezor,
    frame,
    authereum,
    fortmatic,
    portis,
    squarelink,
    torus
  } from './../../connectors'


export default function Connections() {

    const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  
  
  
  const connectorsByName = {
    Injected: injected,
    Network: network,
    WalletConnect: walletconnect,
    WalletLink: walletlink,
    Ledger: ledger,
    Trezor: trezor,
    Frame: frame,
    Authereum: authereum,
    Fortmatic: fortmatic,
    Portis: portis,
    Squarelink: squarelink,
    Torus: torus
  }
  
   
        return (
            <React.Fragment>
                 {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name]
          const activating = currentConnector === activatingConnector
          const connected = currentConnector === connector
          const disabled = !triedEager || !!activatingConnector || connected || !!error

          return (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                cursor: disabled ? 'unset' : 'pointer',
                position: 'relative'
              }}
              disabled={disabled}
              key={name}
              onClick={() => {
                setActivatingConnector(currentConnector)
                activate(connectorsByName[name])
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'black',
                  margin: '0 0 0 1rem'
                }}
              >
                {activating && <p style={{ height: '25%', marginLeft: '-1rem' }} ></p>}
                {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )}
              </div>
              {name}
            </button>
          )
        })}
            </React.Fragment>
        )
    
}
