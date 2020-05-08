import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
import './style.css'
import './media-style.css'
import CurrencyDropdown from './CurrencyDropdown';
import Account from '../shared/AccountNumber';
import Connections from '../shared/Connections';
import Balance from '../shared/Balance';
import { getDefaultTokens } from './../../utils/TokenIcon'
import OrderDetails from './OrderDetails';
import NextStepText from '../shared/NextStepText';

export default class Exchange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showExchangeFee:false,
            currentStep:1,
            showConnectWalletPopup: false,
            sendCurrency: {},
            receiveCurrency: {},
            sendValue: 0,
            receiveValue: 0,
            showSendCurrency: false,
            showReceiveCurrency: false,
            totalEstimatedUsd: 0,
            minimumSendToken:0,
            totalEstimatedUsd:10,
            pendingRequest:false,
            orderDetails:null,
            transDetails:null,
            requestError:null,
            exchangeFee_Percent:parseFloat(process.env.REACT_APP_DEFAULT_EXCHANGE_FEE),
            exchangeFee:0,
            overwrite_Percent:0,
            overwriteAmount:0
        }
        this.handleSwitchCurrency = this.handleSwitchCurrency.bind(this);
        this.onSendCurrencySelect = this.onSendCurrencySelect.bind(this);
        this.onReceiveCurrencySelect = this.onReceiveCurrencySelect.bind(this);
        this.handleShowSendCurrency = this.handleShowSendCurrency.bind(this);
        this.handleShowReceiveCurrency = this.handleShowReceiveCurrency.bind(this);
        this.handleShowConnectWalletPopup = this.handleShowConnectWalletPopup.bind(this);
        this.handleSendValueChange = this.handleSendValueChange.bind(this);
        this.handleNext=this.handleNext.bind(this)
        this.handleOnBackClick=this.handleOnBackClick.bind(this)
        this.handleOnTransactionComplete=this.handleOnTransactionComplete.bind(this)
        this.handleOnInitTransaction=this.handleOnInitTransaction.bind(this)
        this.handleOnTransactionFail=this.handleOnTransactionFail.bind(this)
    }


    componentDidMount() {
        if (!this.state.sendCurrency.SYMBOL) {
            const defaultCurrencies = getDefaultTokens(process.env.REACT_APP_DEFAULT_EXCHANGE)
            if (defaultCurrencies.length == 2) {
                let sendCurrency = defaultCurrencies[0];
                let receiveCurrency = defaultCurrencies[1];

                const sendCurrency_priceResponse = sendCurrency.key == "ETH" ? this.getCoinPrice("ethereum", "usd") : this.getTokenPrice(sendCurrency.key, 'usd');
                const receiveCurrency_priceResponse = receiveCurrency.key == "ETH" ? this.getCoinPrice("ethereum", "usd") : this.getTokenPrice(receiveCurrency.key, 'usd');
               
                Promise.all([sendCurrency_priceResponse, receiveCurrency_priceResponse]).then((responses) => {
                    
                    const res_Send = responses[0];
                    const res_Recieve = responses[1];
                    if (res_Recieve.success && Object.values(res_Recieve.data).length > 0 && res_Send.success && Object.values(res_Send.data).length > 0) {
                        const send_rate = Object.values(Object.values(res_Send.data)[0])[0];                       
                        const receive_rate = Object.values(Object.values(res_Recieve.data)[0])[0];                       
                        const minimunSendAmount=(parseFloat(sendCurrency.MIN_ALLOWED_AMOUNT_IN_USD || process.env.REACT_APP_DEFAULT_MIN_ALLOWED_AMOUNT_IN_USD).toFixed(2)/send_rate).toFixed(8);
                        const minimunRecieveAmount=(parseFloat(sendCurrency.MIN_ALLOWED_AMOUNT_IN_USD || process.env.REACT_APP_DEFAULT_MIN_ALLOWED_AMOUNT_IN_USD).toFixed(2)/receive_rate).toFixed(8);
                        const totalEstimatedUsd = (minimunSendAmount * send_rate).toFixed(2);
                        const exchangeFee_Percent=receiveCurrency.EXCHANGE_FEE || parseFloat(process.env.REACT_APP_DEFAULT_EXCHANGE_FEE);
                        const exchangeFee=exchangeFee_Percent>0?(parseFloat(exchangeFee_Percent)*minimunRecieveAmount/100).toFixed(8):0; 
                        const overwrite_Percent=receiveCurrency.PRICE_OVERWRITE || 0;
                        const overwriteAmount=overwrite_Percent>0?(parseFloat(overwrite_Percent)*minimunRecieveAmount/100).toFixed(8):0;                                               
                        
                        this.setState({
                            sendCurrency: { ...sendCurrency, usdRate: send_rate },
                            receiveCurrency: { ...receiveCurrency, usdRate: receive_rate },
                            sendValue:minimunSendAmount,
                            receiveValue: parseFloat(eval(minimunRecieveAmount-exchangeFee)+eval(overwriteAmount)).toFixed(8),
                            totalEstimatedUsd:totalEstimatedUsd,
                            minimumSendToken:minimunSendAmount,
                            exchangeFee_Percent,
                            exchangeFee,
                            overwrite_Percent,
                            overwriteAmount
                        })
                    }

                }).catch(err => console.log(err));

            }

        }
    }

    handleShowConnectWalletPopup = () => {

        this.setState({
            showConnectWalletPopup: !this.state.showConnectWalletPopup
        })
    }

    renderWalletModel(handleShowConnectWalletPopup) {
        return <Modal dialogClassName="modal-wallet" centered={true} show={this.state.showConnectWalletPopup} onHide={handleShowConnectWalletPopup}>
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

    onSendCurrencySelect(currency) {
        this.setState({
            sendCurrency: currency
        })
        this.handleShowSendCurrency();
        const priceResponse = currency.key == "ETH" ? this.getCoinPrice("ethereum", "usd") : this.getTokenPrice(currency.key, 'usd');
        priceResponse.then(res => {
            if (res.success && Object.values(res.data).length > 0) {
                const rate = Object.values(Object.values(res.data)[0])[0];
                const totalEstimatedUsd = (this.state.sendValue * rate).toFixed(2);
                const receiveCurrency_rate = this.state.receiveCurrency.usdRate ? this.state.receiveCurrency.usdRate : 0;
                const receiveValue = (totalEstimatedUsd / receiveCurrency_rate).toFixed(8);
                const minimunSendAmount=(parseFloat(currency.MIN_ALLOWED_AMOUNT_IN_USD || process.env.REACT_APP_DEFAULT_MIN_ALLOWED_AMOUNT_IN_USD).toFixed(2)/rate).toFixed(8);
                const exchangeFee_Percent=this.state.receiveCurrency.EXCHANGE_FEE || parseFloat(process.env.REACT_APP_DEFAULT_EXCHANGE_FEE);
                const exchangeFee=exchangeFee_Percent>0?(parseFloat(exchangeFee_Percent)*receiveValue/100).toFixed(8):0;
                const overwrite_Percent=this.state.receiveCurrency.PRICE_OVERWRITE || 0;
                const overwriteAmount=overwrite_Percent>0?(parseFloat(overwrite_Percent)*receiveValue/100).toFixed(8):0;
               
                this.setState({
                    sendCurrency: { ...currency, usdRate: rate },
                    totalEstimatedUsd: totalEstimatedUsd,
                    receiveValue:parseFloat(eval(receiveValue-exchangeFee)+eval(overwriteAmount)).toFixed(8),
                    minimumSendToken:minimunSendAmount,
                    exchangeFee_Percent,
                    exchangeFee,
                    overwrite_Percent,
                    overwriteAmount
                })
              
            }
        })
            .catch(err => console.log(err));
    }

    onReceiveCurrencySelect(currency) {
        this.setState({
            receiveCurrency: currency
        })
        this.handleShowReceiveCurrency();
        const priceResponse = currency.key == "ETH" ? this.getCoinPrice("ethereum", "usd") : this.getTokenPrice(currency.key, 'usd');
        priceResponse.then(res => {
            if (res.success && Object.values(res.data).length > 0) {
                const rate = Object.values(Object.values(res.data)[0])[0];
                const totalEstimatedUsd = this.state.totalEstimatedUsd;
                const receiveValue = (totalEstimatedUsd / rate).toFixed(8);
                const exchangeFee_Percent=currency.EXCHANGE_FEE || parseFloat(process.env.REACT_APP_DEFAULT_EXCHANGE_FEE);
                const exchangeFee=exchangeFee_Percent>0?(parseFloat(exchangeFee_Percent)*receiveValue/100).toFixed(8):0;
                const overwrite_Percent=currency.PRICE_OVERWRITE || 0;
                const overwriteAmount=overwrite_Percent>0?(parseFloat(overwrite_Percent)*receiveValue/100).toFixed(8):0; 

                this.setState({
                    receiveCurrency: { ...currency, usdRate: rate },
                    receiveValue:parseFloat(eval(receiveValue-exchangeFee)+eval(overwriteAmount)).toFixed(8),
                    exchangeFee_Percent,
                    exchangeFee,
                    overwrite_Percent,
                    overwriteAmount
                })
               
            }
        })
            .catch(err => console.log(err));
    }

    handleShowSendCurrency = () => {
        this.setState({
            showSendCurrency: !this.state.showSendCurrency
        })
    }

    handleShowReceiveCurrency = () => {
        this.setState({
            showReceiveCurrency: !this.state.showReceiveCurrency
        })
    }

    handleSwitchCurrency = () => {
        const sendCurrency = this.state.sendCurrency;
        const receiveCurrency = this.state.receiveCurrency;
        const minimunSendAmount=(parseFloat(sendCurrency.MIN_ALLOWED_AMOUNT_IN_USD || process.env.REACT_APP_DEFAULT_MIN_ALLOWED_AMOUNT_IN_USD).toFixed(2)/receiveCurrency.usdRate).toFixed(8);
        this.setState({
            sendCurrency: receiveCurrency,
            receiveCurrency: sendCurrency,
            minimumSendToken:minimunSendAmount
        },()=>{
            this.handleSendValueChange({target:{value:this.state.sendValue}})
        })
    }

    handleSendValueChange(event) {
        let value = event.target.value;
        const rate = this.state.sendCurrency.usdRate ? this.state.sendCurrency.usdRate : 0;
        const totalEstimatedUsd = (value * rate).toFixed(2);
        const receiveCurrency_rate = this.state.receiveCurrency.usdRate ? this.state.receiveCurrency.usdRate : 0;
        const receiveValue = (totalEstimatedUsd / receiveCurrency_rate).toFixed(8);
        const exchangeFee_Percent=this.state.receiveCurrency.EXCHANGE_FEE || parseFloat(process.env.REACT_APP_DEFAULT_EXCHANGE_FEE);
        const exchangeFee=exchangeFee_Percent>0?(parseFloat(exchangeFee_Percent)*receiveValue/100).toFixed(8):0;
        console.log('exchangeFee',exchangeFee,receiveValue,receiveValue-exchangeFee)
        const overwrite_Percent=this.state.receiveCurrency.PRICE_OVERWRITE || 0;
        const overwriteAmount=overwrite_Percent>0?(parseFloat(overwrite_Percent)*receiveValue/100).toFixed(8):0; 
        console.log('overwriteAmount',overwriteAmount,receiveValue,  parseFloat(eval(receiveValue-exchangeFee)+eval(overwriteAmount)).toFixed(8))
        this.setState({ 
            sendValue: event.target.value, 
            totalEstimatedUsd, 
            receiveValue:parseFloat(eval(receiveValue-exchangeFee)+eval(overwriteAmount)).toFixed(8),
            exchangeFee_Percent,
            exchangeFee,
            overwrite_Percent,
            overwriteAmount 
        });

    }


    getTokenPrice = async (contractAddress, vs_currency) => {
        const response = await fetch('/api/token_price/' + contractAddress + '/' + vs_currency);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    getCoinPrice = async (name, vs_currency) => {
        const response = await fetch('/api/coin_price/' + name + '/' + vs_currency);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleNext=()=>{
        this.setState({
            currentStep:2
        })
    }

    handleOnBackClick=()=>{
        this.setState({
            currentStep:1,
            pendingRequest:false,
            orderDetails:null,
            transDetails:null,
            requestError:null
        })
    }

    isValid=()=>{
        return this.state.sendValue>0 && this.state.receiveValue>0 && this.state.totalEstimatedUsd>0
    }

    isMinimunEstimatedAmount=()=>{      
        return (parseFloat(this.state.totalEstimatedUsd).toFixed(2)-parseFloat(this.state.sendCurrency.MIN_ALLOWED_AMOUNT_IN_USD || process.env.REACT_APP_DEFAULT_MIN_ALLOWED_AMOUNT_IN_USD).toFixed(2))<0
    }

    toggleShowExchangeFee=()=>{
        this.setState({
            showExchangeFee:!this.state.showExchangeFee
        })
    }

    handleOnInitTransaction=(orderDetails)=>{
        this.setState({
            pendingRequest:true,
            orderDetails:orderDetails,
            transDetails:null,
            requestError:null
        })
    }

    handleOnTransactionComplete=async(transDetails,orderDetails)=>{
        await this.saveTransaction(orderDetails);
        this.setState({
            pendingRequest:false,
            transDetails:transDetails,
            requestError:null
        })
    }

    saveTransaction=async (transaction) =>await  fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{...transaction}]),
      });
     

    handleOnTransactionFail=(error)=>{
        this.setState({
            pendingRequest:false,
            transDetails:null,
            requestError:error
        })

    }

    render() {

        return (
            <React.Fragment>
               
               { this.state.currentStep==1 && <div className="styled__PageWrapper-sc-1dgkj28-0 kGkjno">
                    <section className="connect-wallet" >
                        <Account action={this.handleShowConnectWalletPopup}></Account>

                    </section>
                    <section className="styled__Block-sc-1dgkj28-2 ioLDbv sc-uJMKN hfOMXj exchnage-container" >

                        <div className="styled__CalculatorWrapper-sc-1dgkj28-3 KHQcz">
                            <span className="wallet-balance"><Balance></Balance></span>
                            <div className="exchange-block is-processing styled__ExchangeBlock-th509d-0 fzipjT">

                                <div className="currency-block styled__WrapperCurrency-g3y0ua-0 rGnYa send-box" style={{}}>
                                    <span className="currency-block__label styled__CurrencyLabel-g3y0ua-1 biCxOe">You send</span>
                                    <input style={this.isValid()?{}:{'border-color': 'rgba(255, 176, 0, 0.294)'}} onChange={this.handleSendValueChange} value={this.state.sendValue} maxLength="16" className="currency-block__value styled__CurrencyValue-g3y0ua-2 dtUlLd" />
                                    <div className="currency-block__currency styled__CurrencyButtonWrapper-g3y0ua-3 jCKRds">
                                        <button onClick={this.handleShowSendCurrency.bind()} className="currency-block__switch switchable styled__CurrencySwitch-g3y0ua-4 ZmPKt" type="button" id="currency_button_from">
                                            <div className="full-name-label">{this.state.sendCurrency && this.state.sendCurrency.NAME ? this.state.sendCurrency.NAME : "US Dollar"}</div>{this.state.sendCurrency && this.state.sendCurrency.SYMBOL ? this.state.sendCurrency.SYMBOL : "usd"}
                                        </button>
                                    </div>
                                    {this.state.showSendCurrency && <CurrencyDropdown onSelect={this.onSendCurrencySelect} onClose={this.handleShowSendCurrency}></CurrencyDropdown>}
                                    {!this.state.showSendCurrency && <div className="styled__DropListWrapper-tlgv5r-0 bZzVdI"></div>}

                                   {!this.isMinimunEstimatedAmount() && <span className="bottom-label">Estimated Value: <text>${this.state.totalEstimatedUsd}</text></span>}
                                    {this.isMinimunEstimatedAmount() && <div className="styled__AlertsBlock-th509d-4 cGhoPf">
                                        <div type="yellow" className="styled__Alert-bkwpwx-0 hEMJGK">Minimum amount: {this.state.minimumSendToken} {this.state.sendCurrency.SYMBOL}<div className="styled__ButtonWrapper-bkwpwx-1 cPyZOh">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="white" fill-rule="evenodd" d="M12.961 11.999l6.722 6.723a.678.678 0 1 1-.961.958L12 12.96 5.278 19.68a.68.68 0 0 1-.96 0 .678.678 0 0 1 0-.958l6.72-6.723-6.72-6.722a.68.68 0 1 1 .96-.96L12 11.04l6.722-6.722a.68.68 0 1 1 .961.96L12.96 12z"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    }
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
                                    <input disabled="" value={this.state.receiveValue} maxLength="16" className="currency-block__value styled__CurrencyValue-g3y0ua-2 dtUlLd" />
                                    <div className="currency-block__currency styled__CurrencyButtonWrapper-g3y0ua-3 jCKRds">
                                        <button onClick={this.handleShowReceiveCurrency} className="currency-block__switch switchable styled__CurrencySwitch-g3y0ua-4 ZmPKt" type="button" id="currency_button_to">

                                            <div className="full-name-label">{this.state.receiveCurrency && this.state.receiveCurrency.NAME ? this.state.receiveCurrency.NAME : "Ethereum"}</div>{this.state.receiveCurrency && this.state.receiveCurrency.SYMBOL ? this.state.receiveCurrency.SYMBOL : "eth"}
                                        </button>
                                    </div>
                                    {this.state.showReceiveCurrency && <CurrencyDropdown onSelect={this.onReceiveCurrencySelect} onClose={this.handleShowReceiveCurrency}></CurrencyDropdown>}
                                    {!this.state.showReceiveCurrency && <div className="styled__DropListWrapper-tlgv5r-0 bZzVdI"></div>}
                                    
                                    <span className="bottom-label">Exchange Rate: <text>1 {this.state.receiveCurrency.SYMBOL ? this.state.receiveCurrency.SYMBOL : ''}= ${this.state.receiveCurrency.usdRate ? this.state.receiveCurrency.usdRate : 0}</text></span>

                                </div>
                            </div>

                        </div>


                    </section>


                    <section className="styled__Block-sc-1dgkj28-2 eoWQrT sc-uJMKN  transaction-detail">
                        <div className="styled__AccordionContent-sc-1dgkj28-4 eaQuem">
                            <div className="accordion-content">
                               {this.state.showExchangeFee && <div  className="styled__TransactionDetalsTable-sc-1dgkj28-7 WqVkd">
                                <div className="row">
                                    <div className="label">Exchange fee:<span> {this.state.exchangeFee_Percent}%</span></div>
                                    <div className="label">Estimated arrival:<span> 5-30 mins</span> </div>
                                </div>

                                </div>} 
                                
                                {!this.state.showExchangeFee && <div>
                                    <div className="styled__TransactionDetalsLabel-sc-1dgkj28-6 bxVGjg">
                                        <svg width="18" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.7143 6.00028H10.4286L8.71428 11.1431L5.28571 0.857422L3.57142 6.00028H1.28571" stroke="#557F96" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        <span>Transaction details</span>
                                    </div>
                                </div>}
                            </div>
                            <div onClick={this.toggleShowExchangeFee.bind(this)} className="accordion-toggle-button">
                                {/* <span className="arrow-down-icon styled__SvgIcon-sc-1dgkj28-5 idEyaG" width="1rem" height="0.6rem"></span> */}
                                <span className="arrow-down-icon styled__SvgIcon-sc-1dgkj28-5 idEyaG" width="1rem" height="0.6rem"></span>
                            </div>
                        </div>
                    </section>


                    <section className="styled__Block-sc-1dgkj28-2 ioLDbv sc-uJMKN hfOMXj">
                        <NextStepText 
                         sendCurrency={this.state.sendCurrency}
                         receiveCurrency={this.state.receiveCurrency}
                         sendValue={this.state.sendValue}
                         receiveValue={this.state.receiveValue}
                         disabled={!this.isValid()} 
                         OnConnectWallet={this.handleShowConnectWalletPopup}
                         OnNextStep={this.handleNext} 
                         OnInitTransaction={this.handleOnInitTransaction}
                         OnTransactionComplete={this.handleOnTransactionComplete}
                         OnTransactionFail={this.handleOnTransactionFail}
                         ></NextStepText>
                    </section>
                </div>
                }

{this.state.currentStep==2 && <OrderDetails 
 pendingRequest={this.state.pendingRequest}
 orderDetails={this.state.orderDetails}
 transDetails={this.state.transDetails}
 requestError={this.state.requestError}
OnClickBack={this.handleOnBackClick}></OrderDetails>}

                {this.renderWalletModel(this.handleShowConnectWalletPopup)}
            </React.Fragment>
        )
    }
}
