import React from 'react'
import './style.css'

export default function OrderDetails(props) {
    const { pendingRequest,orderDetails,transDetails,requestError}=props
    console.log('order details= pendingRequest,orderDetails,transDetails,requestError',pendingRequest,orderDetails,transDetails,requestError)
    return (
        <React.Fragment>
           {orderDetails && <div className="styled__PageWrapper-sc-1dgkj28-0 kGkjno ">
                   
                    <section className="styled__Block-sc-1dgkj28-2 ioLDbv sc-uJMKN hfOMXj exchnage-container" >

                        <div className="styled__CalculatorWrapper-sc-1dgkj28-3 KHQcz">
                            <span className="wallet-balance"><button onClick={props.OnClickBack} className="btn btn-light btn-sm btn-back"><img src="https://img.icons8.com/ios/16/000000/left.png"/> Back</button></span>
                            <div className="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT">

                                <div className="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa send-box trans-detail" style={{}}>
                                  <p>Order Details</p> 
    <p style={{fontSize:'14px'}}><span className="trans_id">Transaction Id: </span>{orderDetails.OrderId}</p> 
                                </div>

                             
                                <div className="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa receive-box">
                                    <div class="rate-detail">
                                    <span className="bottom-label">You send: 
    <p>{orderDetails.FROM_AMOUNT} {orderDetails.FROM_SYMBOL}</p>
                                    </span>                                    
                                    <span className="bottom-label">You Recieve:
    <p>{orderDetails.TO_AMOUNT} {orderDetails.TO_SYMBOL}</p> 
                                     </span>
                                    </div>                                   
                                </div>
                            </div>

                          {pendingRequest==true && orderDetails && <div className="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT waiting_payment">
                              <p className="waiting-text"><img height="18" width="18" src="/assets/icons8-wait-50.png"></img> Waiting for payment..</p> 
                              <p className="amount">{orderDetails.FROM_AMOUNT} {orderDetails.FROM_SYMBOL}</p>
                              <p className="waiting-time">Time left to send: 4:98</p>
                              <button className="btn btn-light btn-sm"><img src="https://img.icons8.com/ios/14/212529/restart.png"/> Try Again</button>
                             
                            </div>
                            }

                            {pendingRequest==false && orderDetails && transDetails && <div className="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT waiting_payment">
                              <p className="waiting-text"><img height="18" width="18" src="https://img.icons8.com/ios/18/000000/ok.png"/> Payment Recieved</p> 
                              <p className="amount">Processing exchange...You will recieve your tokens shortly.</p>                             
                            </div>}


                        </div>


                    </section>


                </div>
           }
        </React.Fragment>
    )
}
