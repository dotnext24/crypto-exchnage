import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
import './style.css'
import './media-style.css'
import CurrencyDropdown from './CurrencyDropdown';

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
        return <Modal backdrop={false} centered={true} show={this.state.showConnectWalletPopup} onHide={handleShowConnectWalletPopup}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleShowConnectWalletPopup}>
                    Close
          </Button>
                <Button variant="primary" onClick={handleShowConnectWalletPopup}>
                    Save Changes
          </Button>
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

    render() {
        return (
            <React.Fragment>
                <div class="styled__PageWrapper-sc-1dgkj28-0 kGkjno">
                    <section class="connect-wallet" >
                        <a onClick={this.handleShowConnectWalletPopup}>Connect Wallet</a>
                    </section>
                    <section class="styled__Block-sc-1dgkj28-2 ioLDbv sc-uJMKN hfOMXj exchnage-container" >

                        <div class="styled__CalculatorWrapper-sc-1dgkj28-3 KHQcz">
                            <div class="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT">
                                <div class="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa send-box" style={{}}>
                                    <span class="currency-block__label styled__CurrencyLabel-g3y0ua-1 biCxOe">You send</span>
                                    <input maxlength="16" class="currency-block__value styled__CurrencyValue-g3y0ua-2 dtUlLd" value="100" />
                                    <div class="currency-block__currency styled__CurrencyButtonWrapper-g3y0ua-3 jCKRds">
                                        <button onClick={this.handleShowSendCurrency.bind()} class="currency-block__switch switchable styled__CurrencySwitch-g3y0ua-4 ZmPKt" type="button" id="currency_button_from">
                                            <div class="full-name-label">{this.state.sendCurrency && this.state.sendCurrency.NAME?this.state.sendCurrency.NAME:"US Dollar"}</div>{this.state.sendCurrency && this.state.sendCurrency.SYMBOL?this.state.sendCurrency.SYMBOL:"usd"}
                                        </button>
                                    </div>
                                   {this.state.showSendCurrency && <CurrencyDropdown onSelect={this.onSendCurrencySelect}></CurrencyDropdown>}
                                   {!this.state.showSendCurrency && <div class="styled__DropListWrapper-tlgv5r-0 bZzVdI"></div>}

                                    <span className="bottom-label">Estimated Value: <text>$270.10</text></span>
                                </div>



                                <div class="styled__AlertsBlock-th509d-4 cGhoPf">
                                </div>
                                <div class="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa receive-box">
                                    <span class="currency-block__label styled__CurrencyLabel-g3y0ua-1 biCxOe">You get approximately</span>
                                    <input maxlength="16" class="currency-block__value styled__CurrencyValue-g3y0ua-2 dtUlLd" disabled="" value="0.49757115" />
                                    <div class="currency-block__currency styled__CurrencyButtonWrapper-g3y0ua-3 jCKRds">
                                        <button onClick={this.handleShowReceiveCurrency} class="currency-block__switch switchable styled__CurrencySwitch-g3y0ua-4 ZmPKt" type="button" id="currency_button_to">
                                            
                                            <div class="full-name-label">{this.state.receiveCurrency && this.state.receiveCurrency.NAME?this.state.receiveCurrency.NAME:"Ethereum"}</div>{this.state.receiveCurrency && this.state.receiveCurrency.SYMBOL?this.state.receiveCurrency.SYMBOL:"eth"}
                                        </button>
                                    </div>
                                    {this.state.showReceiveCurrency && <CurrencyDropdown onSelect={this.onReceiveCurrencySelect}></CurrencyDropdown>}
                                   {!this.state.showReceiveCurrency && <div class="styled__DropListWrapper-tlgv5r-0 bZzVdI"></div>}

                                    {/* <div class="styled__DropListWrapper-tlgv5r-0 bZzVdI">
                                        <div id="currency_droplist_to" class="cl-droplist  searchable sc-gqjmRU gywoMT">
                                            <div class="sc-cSHVUG jRcMnK">
                                                <div class="sc-kAzzGY bOMLKt">
                                                    <i style={{ "display": "inline-block", "vertical-align": "middle" }}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.22222 13.4444C10.6587 13.4444 13.4444 10.6587 13.4444 7.22222C13.4444 3.78578 10.6587 1 7.22222 1C3.78578 1 1 3.78578 1 7.22222C1 10.6587 3.78578 13.4444 7.22222 13.4444Z" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M15.0005 14.9995L11.6172 11.6162" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                    <input type="text" placeholder="Type a currency or ticker" value="" />
                                                </div>
                                                <button type="button" tabindex="-1" class="sc-chPdSV iEQJel">
                                                    <i style={{ "display": "inline-block", "vertical-align": "middle" }}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14 2L2 14" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M2 2L14 14" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </i>
                                                </button>
                                            </div>
                                            <ul class="sc-dnqmqq sc-VigVT gKLAiY"></ul>
                                        </div>
                                    </div>
                                     */}
                                    <span className="bottom-label">Exchange Rate: <text>1 DAL= $.90</text></span>

                                </div>
                            </div>

                        </div>


                    </section>
                    <section class="styled__Block-sc-1dgkj28-2 ioLDbv sc-uJMKN hfOMXj">
                        <button type="button" class="bg-primary cl-button  sc-ifAKCX dVuRDF">Connect to a wallet</button>
                    </section>
                </div>

                {this.renderWalletModel(this.handleShowConnectWalletPopup)}
            </React.Fragment>
        )
    }
}
