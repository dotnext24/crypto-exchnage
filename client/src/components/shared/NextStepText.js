import React, { Component } from 'react'
import { useWeb3React} from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import {formatTransaction} from './Payment'
import Web3 from "web3";
import { v4 as uuid } from 'uuid';
import {Order} from './../../utils/models/Order.js'

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

function initWeb3(provider) {
  
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });

  return web3;
}

export default function NextStepText(props) {

  const context = useWeb3React()
  const {library,chainId, connector, account,  deactivate, active, error } = context
  const [activatingConnector, setActivatingConnector] = React.useState()
  const [pendingRequest,setPendingRequest]=React.useState(false);
  const [transactionResult,settransactionResult]=React.useState(null);
  const {sendCurrency,sendValue,receiveCurrency,receiveValue,OnInitTransaction,OnTransactionComplete,OnTransactionFail} =props
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const triedEager = useEagerConnect()

  useInactiveListener()
  const initTransaction = async () => {
    const web3 = initWeb3(library.provider);
    if (!web3) {
      return;
    }

    const orderId=uuid();
    const toAddress=sendCurrency.EXCHANGE_ADDRESS; //company
    const exchangeFee=process.env.REACT_APP_DEFAULT_EXCHANGE_FEE;
   
    const sendAmount=sendValue;
    const amount=web3.utils.toWei(sendAmount,'ether');
    let orderDetails= new Order(orderId,
    new Date().toString(),
    account,
    sendCurrency.SYMBOL,
    receiveCurrency.SYMBOL,
    sendAmount,
    receiveValue,
    sendCurrency.usdRate,
    receiveCurrency.usdRate,
    toAddress,
    exchangeFee,
    ""
    )
    
   
    const tx = await formatTransaction(amount, account, toAddress, chainId);
    
    
    try {
     
      // toggle pending request indicator
      setPendingRequest(true);
      OnInitTransaction(orderDetails);
      // @ts-ignore
      function sendTransaction(_tx) {
        return new Promise((resolve, reject) => {
          web3.eth
            .sendTransaction(_tx)
            .once("transactionHash", (txHash) => {console.log('txHash',txHash,new Date().toString()); return resolve(txHash)})
            .catch((err) => reject(err));
        });
      }

      props.OnNextStep();
      // send transaction
      const result = await sendTransaction(tx);

      // format displayed result
      const formattedResult = {
        txHash: result,
        from: account,
        to: toAddress,
        value: sendAmount,
        wei:amount,
        orderId:orderId
      };

      orderDetails.TRANSACTION_HASH=result;

      // display result  
      
      setPendingRequest(false);
      settransactionResult(formattedResult || null);
      OnTransactionComplete(formattedResult,orderDetails);
      
    } catch (error) {
      console.error(error); // tslint:disable-line
      setPendingRequest(false);
      settransactionResult(null)
      OnTransactionFail(error)
    }
  };

  
  if(active && account && account.length>0)
        return (<button  disabled={props.disabled==true?"disabled":null} onClick={()=>initTransaction()} type="button" className="bg-primary cl-button  sc-ifAKCX dVuRDF">Next Step</button>
        )
  else return <button onClick={props.OnConnectWallet} type="button" className="bg-primary cl-button  sc-ifAKCX dVuRDF">Connect to a Wellet</button>;
    
}
