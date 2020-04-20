import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
import './style.css'
import './media-style.css'
import CurrencyDropdown from './CurrencyDropdown';
import Account from '../shared/AccountNumber';
import Connections from '../shared/Connections';
import Balance from '../shared/Balance';

export default class Exchange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showConnectWalletPopup: false,
            sendCurrency:{},
            receiveCurrency:{},
            showSendCurrency:false,
            showReceiveCurrency:false,
        }
        this.handleSwitchCurrency=this.handleSwitchCurrency.bind(this);
        this.onSendCurrencySelect=this.onSendCurrencySelect.bind(this);
        this.onReceiveCurrencySelect=this.onReceiveCurrencySelect.bind(this);
        this.handleShowSendCurrency=this.handleShowSendCurrency.bind(this);
        this.handleShowReceiveCurrency=this.handleShowReceiveCurrency.bind(this);
        this.handleShowConnectWalletPopup = this.handleShowConnectWalletPopup.bind(this)
    }

    handleShowConnectWalletPopup = () => {
        this.setState({
            showConnectWalletPopup: !this.state.showConnectWalletPopup
        })
    }

    renderWalletModel(handleShowConnectWalletPopup) {
        return <Modal dialogClassName="modal-wallet"  centered={true} show={this.state.showConnectWalletPopup} onHide={handleShowConnectWalletPopup}>
            <Modal.Header closeButton>
                <Modal.Title>Connect to a wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Connections></Connections>
            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
        </Modal>
    }

    onSendCurrencySelect(currency){       
        this.setState({
            sendCurrency:currency
        })
        this.handleShowSendCurrency();
    }

    onReceiveCurrencySelect(currency){       
        this.setState({
            receiveCurrency:currency
        })
        this.handleShowReceiveCurrency();
    }

    handleShowSendCurrency=()=>{
       this.setState({
           showSendCurrency:!this.state.showSendCurrency
       })
    }

    handleShowReceiveCurrency=()=>{
        this.setState({
            showReceiveCurrency:!this.state.showReceiveCurrency
        })
    }

    handleSwitchCurrency=()=>{
        const sendCurrency=this.state.sendCurrency;
        const receiveCurrency=this.state.receiveCurrency;
        this.setState({
            sendCurrency:receiveCurrency,
            receiveCurrency:sendCurrency
        })
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="styled__PageWrapper-sc-1dgkj28-0 kGkjno">
                    <section className="connect-wallet" >
                        <Account action={this.handleShowConnectWalletPopup}></Account>
                       
                    </section>
                    <section className="styled__Block-sc-1dgkj28-2 ioLDbv sc-uJMKN hfOMXj exchnage-container" >

                        <div className="styled__CalculatorWrapper-sc-1dgkj28-3 KHQcz">
                        <span className="wallet-balance"><Balance></Balance></span>
                            <div className="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT">
                                
                                <div className="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa send-box" style={{}}>
                                    <span className="currency-block__label styled__CurrencyLabel-g3y0ua-1 biCxOe">You send</span>
                                    <input maxLength="16" className="currency-block__value styled__CurrencyValue-g3y0ua-2 dtUlLd" value="100" />
                                    <div className="currency-block__currency styled__CurrencyButtonWrapper-g3y0ua-3 jCKRds">
                                        <button onClick={this.handleShowSendCurrency.bind()} className="currency-block__switch switchable styled__CurrencySwitch-g3y0ua-4 ZmPKt" type="button" id="currency_button_from">
                                            <div className="full-name-label">{this.state.sendCurrency && this.state.sendCurrency.NAME?this.state.sendCurrency.NAME:"US Dollar"}</div>{this.state.sendCurrency && this.state.sendCurrency.SYMBOL?this.state.sendCurrency.SYMBOL:"usd"}
                                        </button>
                                    </div>
                                   {this.state.showSendCurrency && <CurrencyDropdown onSelect={this.onSendCurrencySelect} onClose={this.handleShowSendCurrency}></CurrencyDropdown>}
                                   {!this.state.showSendCurrency && <div className="styled__DropListWrapper-tlgv5r-0 bZzVdI"></div>}

                                    <span className="bottom-label">Estimated Value: <text>$270.10</text></span>
                                </div>

                                <div className="styled__AlertsBlock-th509d-4 cGhoPf">
                                    <div className="switch-block">
                                        <div className="left-side">                                        
                                           <div className="rate-info"></div>
                                        </div>
                                        <button onClick={this.handleSwitchCurrency} type="button" tabindex="0" className="exchange-switch-button">
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.888916 3.22266L3.11112 1.00045L5.33333 3.22266" stroke="#80A3B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.11108 10.7773L3.11108 0.999619" stroke="#80A3B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.1112 8.77779L10.889 11L8.66675 8.77779" stroke="#80A3B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.8889 1.22228L10.8889 11" stroke="#80A3B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        </button>
                                    </div>
                                </div>





                                <div className="styled__AlertsBlock-th509d-4 cGhoPf">
                                </div>
                                <div className="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa receive-box">
                                    <span className="currency-block__label styled__CurrencyLabel-g3y0ua-1 biCxOe">You get approximately</span>
                                    <input maxLength="16" className="currency-block__value styled__CurrencyValue-g3y0ua-2 dtUlLd" disabled="" value="0.49757115" />
                                    <div className="currency-block__currency styled__CurrencyButtonWrapper-g3y0ua-3 jCKRds">
                                        <button onClick={this.handleShowReceiveCurrency} className="currency-block__switch switchable styled__CurrencySwitch-g3y0ua-4 ZmPKt" type="button" id="currency_button_to">
                                            
                                            <div className="full-name-label">{this.state.receiveCurrency && this.state.receiveCurrency.NAME?this.state.receiveCurrency.NAME:"Ethereum"}</div>{this.state.receiveCurrency && this.state.receiveCurrency.SYMBOL?this.state.receiveCurrency.SYMBOL:"eth"}
                                        </button>
                                    </div>
                                    {this.state.showReceiveCurrency && <CurrencyDropdown onSelect={this.onReceiveCurrencySelect} onClose={this.handleShowReceiveCurrency}></CurrencyDropdown>}
                                   {!this.state.showReceiveCurrency && <div className="styled__DropListWrapper-tlgv5r-0 bZzVdI"></div>}

                                    {/* <div className="styled__DropListWrapper-tlgv5r-0 bZzVdI">
                                        <div id="currency_droplist_to" className="cl-droplist  searchable sc-gqjmRU gywoMT">
                                            <div className="sc-cSHVUG jRcMnK">
                                                <div className="sc-kAzzGY bOMLKt">
                                                    <i style={{ "display": "inline-block", "vertical-align": "middle" }}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.22222 13.4444C10.6587 13.4444 13.4444 10.6587 13.4444 7.22222C13.4444 3.78578 10.6587 1 7.22222 1C3.78578 1 1 3.78578 1 7.22222C1 10.6587 3.78578 13.4444 7.22222 13.4444Z" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M15.0005 14.9995L11.6172 11.6162" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                    <input type="text" placeholder="Type a currency or ticker" value="" />
                                                </div>
                                                <button type="button" tabindex="-1" className="sc-chPdSV iEQJel">
                                                    <i style={{ "display": "inline-block", "vertical-align": "middle" }}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14 2L2 14" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M2 2L14 14" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </button>
                                            </div>
                                            <ul className="sc-dnqmqq sc-VigVT gKLAiY"></ul>
                                        </div>
                                    </div>
                                     */}
                                    <span className="bottom-label">Exchange Rate: <text>1 DAL= $.90</text></span>

                                </div>
                            </div>

                        </div>


                    </section>
                    
                    
                    <section className="styled__Block-sc-1dgkj28-2 eoWQrT sc-uJMKN hfOMXj transaction-detail">
                        <div className="styled__AccordionContent-sc-1dgkj28-4 eaQuem">
                            <div className="accordion-content">
                            <div style={{display:'none'}} className="styled__TransactionDetalsTable-sc-1dgkj28-7 WqVkd">
                            <div className="row"><div className="label">Exchange fee 0.25%</div><div className="value">0.0106698 ETH</div></div>
                            </div>
                            <div>
                            <div className="styled__TransactionDetalsLabel-sc-1dgkj28-6 bxVGjg">
                                <svg width="18" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7143 6.00028H10.4286L8.71428 11.1431L5.28571 0.857422L3.57142 6.00028H1.28571" stroke="#557F96" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                <span>Transaction details</span>
                            </div>
                            </div>
                            </div>
                            <div className="accordion-toggle-button">                            
                                {/* <span className="arrow-down-icon styled__SvgIcon-sc-1dgkj28-5 idEyaG" width="1rem" height="0.6rem"></span> */}
                                <span className="arrow-down-icon styled__SvgIcon-sc-1dgkj28-5 idEyaG" width="1rem" height="0.6rem"></span>
                            </div>
                            </div>
                    </section>
                    
                    
                    <section className="styled__Block-sc-1dgkj28-2 ioLDbv sc-uJMKN hfOMXj">
                        <button type="button" className="bg-primary cl-button  sc-ifAKCX dVuRDF">Connect to a wallet</button>
                    </section>
                </div>

                {this.renderWalletModel(this.handleShowConnectWalletPopup)}
            </React.Fragment>
        )
    }
}
