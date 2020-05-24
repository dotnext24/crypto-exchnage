import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {INITIAL_TOKENS_CONTEXT,TokenLogo} from '../../utils/TokenIcon'

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
        const tokens=await INITIAL_TOKENS_CONTEXT();
        this.setState({
            currencies:tokens[1],
            filteredCurrencies:tokens[1]
        })
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
    render() {
        let currencies=this.state.filteredCurrencies;
        if(!currencies)
        return "";
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
                        <input className="form-control" type="text" placeholder="Type a currency or ticker" onChange={this.handleChange} value={this.state.value} />
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
                
                    {Object.keys(currencies).map(key=>{
                        const currency=currencies[key];
                    return(<li onClick={()=>this.onSelect(key)} className="sc-ifAKCX sc-cSHVUG ZfCCL"><button className="sc-kAzzGY cCVEey" type="button" tabindex="0"><div className="coin-list-item"><div className="coin-info"><i className="coin-icon"><img height="24" width="24" src={`./assets/tokens/${key}.png`}/></i><span className="coin-name" style={{fontWeight:'normal'}}><span className="coin-ticker" style={{fontWeight:'bolder',fontSize:'15px'}}>{currency.SYMBOL}</span>{currency.NAME}</span></div><div className="icons"><span className="fixed-rate-status">-</span></div></div></button></li>)
                    })}
                    <li className="sc-ifAKCX sc-cSHVUG ZfCCL"><button className="active sc-kAzzGY cCVEey" type="button" tabindex="0"><div className="coin-list-item"><div className="coin-info"><i className="coin-icon"></i><span className="coin-name"><span className="coin-ticker">btc</span>Bitcoin</span></div><div className="icons"><span className="fixed-rate-status"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6667 6.9668H3.33333C2.59695 6.9668 2 7.56375 2 8.30013V12.9668C2 13.7032 2.59695 14.3001 3.33333 14.3001H12.6667C13.403 14.3001 14 13.7032 14 12.9668V8.30013C14 7.56375 13.403 6.9668 12.6667 6.9668Z" stroke="#10D078" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.66675 6.9668V4.30013C4.66675 3.41608 5.01794 2.56823 5.64306 1.94311C6.26818 1.31799 7.11603 0.966797 8.00008 0.966797C8.88414 0.966797 9.73198 1.31799 10.3571 1.94311C10.9822 2.56823 11.3334 3.41608 11.3334 4.30013V6.9668" stroke="#10D078" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></div></div></button></li>
                    
                </ul>
            </div>
        </div>
        )
    }

     propTypes = {
        prop: PropTypes
    }
}
