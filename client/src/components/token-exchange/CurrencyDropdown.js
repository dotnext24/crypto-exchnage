import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatEther } from '@ethersproject/units'
import {INITIAL_TOKENS_CONTEXT,TokenLogo} from '../../utils/TokenIcon'
import TokenBalance from '../shared/TokenBalance'

export default class CurrencyDropdown extends Component {   

    constructor(props){
      super(props)
      this.state={
        value:"",
        currencies:"",
        filteredCurrencies:""
      }
      this.handleChange=this.handleChange.bind();
      this.onSelect=this.onSelect.bind();
    }

    async componentDidMount(){
        if(this.state.currencies==""){
            let tokens="";          
        if(sessionStorage.getItem('tokens')==null || sessionStorage.getItem('tokens')==undefined || sessionStorage.getItem('tokens')==""){
         tokens=await INITIAL_TOKENS_CONTEXT();         
         sessionStorage.setItem('tokens',JSON.stringify(tokens))
        }else{
            tokens=JSON.parse(sessionStorage.getItem('tokens'));
        }



        this.setState({
            currencies:tokens[1],
            filteredCurrencies:tokens[1]
        })
    }
    }

    onSelect=(key)=>{ 
       this.props.onSelect({...this.state.currencies[key],key});
    }

    handleChange=(event)=>{
        let value=event.target.value;
        this.setState({value: event.target.value});
       

        let currencies={};
        let valuetoLowerCase=value.toLowerCase();
        Object.keys(this.state.currencies).forEach(key=>{
            const currency=this.state.currencies[key];
            let SYMBOL=currency.SYMBOL.toLowerCase();
            let NAME=currency.NAME.toLowerCase();
            let IsSymbol = SYMBOL.toLowerCase().includes(valuetoLowerCase);
            let IsName = NAME.toLowerCase().includes(valuetoLowerCase);          
            if(IsSymbol==true || IsName==true)
            currencies[key]=currency;
        })

        this.setState({
            filteredCurrencies:currencies
        })

    }

     sortFunc(a, b,sortingArr) {
        // var sortingArr = [ 'b', 'c', 'b', 'b', 'c', 'd' ];
        return sortingArr.indexOf(a[1]) - sortingArr.indexOf(b[1]);
      }

      getCurrencyArray(currencies){
          let arr=[];
        Object.keys(currencies).map(key=>{           
            let currency=currencies[key];
            currency.key=key;
            arr.push(currency)
        })

        return arr;
      }


      
      
    render() {
       
        let currencies=this.state.filteredCurrencies;

        if(!currencies )
        return "";
        let currencyArry=this.getCurrencyArray(currencies);
        let assets=this.props.assets;
        // assets.push({symbol:"ETH",balance:'899999'});
        // assets.push({symbol:'ANT',balance:'100'})
        // assets.push({symbol:'GEN',balance:'50'})
        // assets.push({symbol:'LINK',balance:'200'})
        let sortedCurrency=[];
        assets.sort(function (a, b) {
            return parseFloat(b.balance) - parseFloat(a.balance);
          });
        
         assets.forEach(a=>{
            let c= currencyArry.filter(x=>x.SYMBOL==a.symbol);
            if(c.length>0){
              sortedCurrency.push(c[0]);
              currencyArry=currencyArry.filter(x=>x.SYMBOL!=a.symbol);
            }
         }) 

         currencyArry= sortedCurrency.concat(currencyArry);
          

       
        
        return (
            <div className="styled__DropListWrapper-tlgv5r-0 bZzVdI">
            <div id="currency_droplist_from" className="cl-droplist  searchable sc-gqjmRU gywoMT">
                <div className="sc-cSHVUG jRcMnK">
                    <div className="sc-kAzzGY bOMLKt">
                        <i  style={{ "display": "inline-block", "vertical-align": "middle" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.22222 13.4444C10.6587 13.4444 13.4444 10.6587 13.4444 7.22222C13.4444 3.78578 10.6587 1 7.22222 1C3.78578 1 1 3.78578 1 7.22222C1 10.6587 3.78578 13.4444 7.22222 13.4444Z" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M15.0005 14.9995L11.6172 11.6162" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </i>
                        <input autoFocus className="form-control" type="text" placeholder="Type a currency or ticker" onChange={this.handleChange} value={this.state.value} />
                    </div>
                    <button type="button" tabindex="-1" className="btn sc-chPdSV iEQJel">
                        <i onClick={this.props.onClose} style={{ "display": "inline-block", "vertical-align": "middle" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 2L2 14" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M2 2L14 14" stroke="#80A3B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </i>
                    </button>
                </div>

                <ul className="sc-htpNat sc-fjdhpX bZoPFN">
                
                    {currencyArry.map(c=>{
                        
                        const currency=c;
                        const key=c.key;
                        const tokenBalance=assets.filter(x=>x.symbol==currency.SYMBOL).length>0?assets.filter(x=>x.symbol==currency.SYMBOL)[0].balance:"0";
                        
                        // if(this.props.skip && this.props.skip.SYMBOL && currency.SYMBOL!=this.props.skip.SYMBOL)                        
                    return(<li onClick={()=>this.onSelect(key)} className="sc-ifAKCX sc-cSHVUG ZfCCL"><button className="sc-kAzzGY cCVEey" type="button" tabindex="0"><div className="coin-list-item"><div className="coin-info"><i className="coin-icon"><img height="24" width="24" src={`./assets/tokens/${key}.png`}/></i><span className="coin-name" style={{fontWeight:'normal'}}><span className="coin-ticker" style={{fontWeight:'bolder',fontSize:'15px'}}>{currency.SYMBOL}</span>{currency.NAME}</span></div><div className="icons"><span className="fixed-rate-status"><TokenBalance tokenBalance={tokenBalance} /></span></div></div></button></li>)
                    })}
                    
                </ul>
            </div>
        </div>
        )
    }

     propTypes = {
        prop: PropTypes
    }
}
