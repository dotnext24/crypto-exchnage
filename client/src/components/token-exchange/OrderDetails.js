import React from 'react'
import './style.css'

export default function OrderDetails(props) {
    return (
        <React.Fragment>
            <div className="styled__PageWrapper-sc-1dgkj28-0 kGkjno ">
                   
                    <section className="styled__Block-sc-1dgkj28-2 ioLDbv sc-uJMKN hfOMXj exchnage-container" >

                        <div className="styled__CalculatorWrapper-sc-1dgkj28-3 KHQcz">
                            <span className="wallet-balance"><button onClick={props.OnClickBack} className="btn btn-light btn-sm btn-back"><img src="https://img.icons8.com/ios/16/000000/left.png"/> Back</button></span>
                            <div className="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT">

                                <div className="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa send-box trans-detail" style={{}}>
                                  <p>Order Details</p> 
                                  <p style={{fontSize:'14px'}}><span className="trans_id">Transaction Id: </span>9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d</p> 
                                </div>

                             
                                <div className="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa receive-box">
                                    <div class="rate-detail">
                                    <span className="bottom-label">You send: 
                                    <p>0.10 ETH</p>
                                    </span>                                    
                                    <span className="bottom-label">You Recieve:
                                    <p>10 DIA</p> 
                                     </span>
                                    </div>                                   
                                </div>
                            </div>

                          {false && <div className="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT waiting_payment">
                              <p className="waiting-text"><img height="18" width="18" src="/assets/icons8-wait-50.png"></img> Waiting for payment..</p> 
                              <p className="amount">0.10 ETH </p>
                              <p className="waiting-time">Time left to send: 4:98</p>
                              <button className="btn btn-light btn-sm"><img src="https://img.icons8.com/ios/14/212529/restart.png"/> Try Again</button>
                             
                            </div>
                            }

                            {true && <div className="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT waiting_payment">
                              <p className="waiting-text"><img height="18" width="18" src="https://img.icons8.com/ios/18/000000/ok.png"/> Payment Recieved</p> 
                              <p className="amount">Processing exchange...You will recieve your tokens shortly.</p>                             
                            </div>}


                        </div>


                    </section>


                </div>
        </React.Fragment>
    )
}
