import React from 'react';
var axios = require('axios');
import { findDOMNode } from 'react-dom';
import HttpHelper from '../../../utils/httpHelper.js';
import config from '../../../config.js';
import {dealerData} from '../../../constants/index.js';

class GridView extends React.Component {
   constructor(props){
    super(props);
    console.log('config',config);
    this.state = {
      options : this.props.options,
      selectedOption: this.props.selectedOption,
      financialInfo: {},
      isLoading: true,
      rate: '',
      isRateError: false,
      rateMsg: '',
      isTermError: false,
      termMsg:'',
      dealjacketid: dealerData.dealjacketid,
      dealid: dealerData.dealid,
      deal_type: dealerData.deal_type,
      dealer_code: dealerData.dealer_code
    }
    this.updatePayment = this.updatePayment.bind(this);
    this.updateMonthCount = this.updateMonthCount.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
    this.setInitialValues = this.setInitialValues.bind(this);

    this.changeRate = this.changeRate.bind(this);
    this.changeTerm = this.changeTerm.bind(this);

  }
  componentWillMount(){
    this.getInitialValues(this.state.selectedOption);
    this.getDealTerms();
  }
  getDealTerms(){
    // let dealItemsUrl = `${config.dealTermsAPI}/deal/v1/deal-jackets/310200000000000016/deals/310200000000000017/deal-term-rate-options/`;
       let dealItemsUrl = `${config.dealTermsAPI}/deal/v1/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/deal-term-rate-options/`;
    let that  = this;
    HttpHelper(dealItemsUrl, 'get', '').then(function(data){
      that.setState({ dealTerms: data  });
    }.bind(this));
  }
  submitHandle(){
   var dealTerms = this.state.dealTerms;
  console.log('this.refs', this.refs);
   var formData = [];

   var option1 = {};

   option1.term = this.refs.option1Term.value;
   if(this.refs.option1Monthly_payment) {
     option1.payment = this.refs.option1Monthly_payment.value;
     option1.ballon_payment = this.refs.option1Monthly_payment.value;
   }
   if(this.refs.option1Money_factor) option1.money_factor = this.refs.option1Money_factor.value;
   if(this.refs.option1Residual_percentage) option1.residual = this.refs.option1Residual_percentage.value;
   if(this.refs.option1CashApr) option1.apr = this.refs.option1CashApr.value;
   option1.position = '';
   option1.deal_id = dealTerms.deal_id;
   option1.deal_jacket_id = dealTerms.deal_jacket_id;
   option1.dlr_cd= dealTerms.dlr_cd;

   var option2 = {};
   option2.term = this.refs.option2Term.value;
   if(this.refs.option2Monthly_payment) {
     option2.monthly_payment = this.refs.option2Monthly_payment.value;
     option2.ballon_payment = this.refs.option2Monthly_payment.value;
   }
   if(this.refs.option2Money_factor) option2.money_factor = this.refs.option2Money_factor.value;
   if(this.refs.option2Residual_percentage) option2.residual_percentage = this.refs.option2Residual_percentage.value;
   if(this.refs.option2CashApr) option2.apr = this.refs.option1CashApr.value;
   option2.payment = '';
   option2.position = '';
   option2.deal_id = dealTerms.deal_id;
   option2.deal_jacket_id = dealTerms.deal_jacket_id;
   option2.dlr_cd= dealTerms.dlr_cd;

   var option3 = {};
   option3.term = this.refs.option3Term.value;
   if(this.refs.option3Monthly_payment) {
     option3.monthly_payment = this.refs.option3Monthly_payment.value;
     option3.ballon_payment = this.refs.option3Monthly_payment.value;
   }
   if(this.refs.option3Money_factor) option3.money_factor = this.refs.option3Money_factor.value;
   if(this.refs.option3Residual_percentage) option3.residual_percentage = this.refs.option3Residual_percentage.value;
   if(this.refs.option3CashApr) option3.apr = this.refs.option1CashApr.value;
   option3.payment = '';
   option3.position = '';
   option3.deal_id = dealTerms.deal_id;
   option3.deal_jacket_id = dealTerms.deal_jacket_id;
   option3.dlr_cd= dealTerms.dlr_cd;

   var option4 = {};
   option4.term = this.refs.option4Term.value;
   if(this.refs.option4Monthly_payment) {
     option4.monthly_payment = this.refs.option4Monthly_payment.value;
     option4.ballon_payment = this.refs.option4Monthly_payment.value;

   }
   if(this.refs.option4Money_factor) option4.money_factor = this.refs.option4Money_factor.value;
   if(this.refs.option4Residual_percentage) option4.residual_percentage = this.refs.option4Residual_percentage.value;
   if(this.refs.option4CashApr) option4.apr = this.refs.option1CashApr.value;
   option4.payment = '';
   option4.position = '';
   option4.deal_id = dealTerms.deal_id;
   option4.deal_jacket_id = dealTerms.deal_jacket_id;
   option4.dlr_cd= dealTerms.dlr_cd;

   formData.push(option1);
   formData.push(option2);
   formData.push(option3);
   formData.push(option4);
   var deal = {};
   deal.dlr_cd = dealTerms.dlr_cd;
   deal.deal_jacket_id = dealTerms.deal_jacket_id;
   deal.deal_id = dealTerms.deal_id;
   deal.prod_dlr_id = '';
   deal.termrateoptions = formData;

    console.log('Deal', JSON.stringify(deal));
    // var dealPostUrl = `${config.dealTermsAPI}/deal/v1/deal-jackets/310200000000000016/deals/310200000000000017/deal-term-rate-options/`;
    var dealPostUrl = `${config.dealTermsAPI}/deal/v1/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/deal-term-rate-options/`;
    HttpHelper( dealPostUrl, 'post', deal).then(function(data){
      console.log('response', data);
    }.bind(this));

  }

  updateMonthCount(event){

    let updatedPayment = parseInt(this.state.rate) * parseInt(event.target.value);
    this.setState({monthCount:event.target.value, totalPayment: updatedPayment})
   }

  updatePayment(event){
    let updatedPayment = parseInt(this.state.monthCount) * parseInt(event.target.value);
    this.setState({rate: event.target.value, totalPayment: updatedPayment});
   }
   getInitialValues(selectedOption){
    let that = this;
    //let apiUrl = `${config.dealFinanceAPI}/deal/v1/deal-jackets/310200000000000016/deals/310200000000000017/deal-finance-summary/`;
    let apiUrl = `${config.dealFinanceAPI}/deal/v1/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/deal-finance-summary/`;
    console.log('apiUrl',apiUrl);
    HttpHelper(apiUrl, 'get', '').then(function(data){
      that.setInitialValues(data);
    }.bind(this));

   }
   setInitialValues(financialData){
    const  type = (financialData.finance_method === 'RETL' && (financialData.term === 0 || financialData.term === 1)) ? 'CASH' : financialData.finance_method;
    financialData.finance_method = type;
      this.setState({
        financialInfo: financialData,
        isLoading: false
      });
   }
   changeRate(target, event){
     var cVal = event.target.value;
     if(isNaN(this.refs[target].value)){
       this.refs[target].className = "form-control borderd-hfit err";
     }else if(parseFloat(this.refs[target].value) > 99.99){
       this.refs[target].className = "form-control borderd-hfit err";
     }else{
       this.refs[target].className = "form-control borderd-hfit";
    }

      if(isNaN(event.target.value)){
         this.setState({
          rate: cVal,
          isRateError: true,
          rateMsg: 'Please Enter Numeric Values'
        });
      }else if(parseFloat(cVal) > 99.9999){
        console.log('More than 99')
        this.setState({
          rate: cVal,
          isRateError: true,
          rateMsg: 'Value Should not Exceed 99.9999'
        });
      }else{
           this.setState({
            rate: cVal,
            isRateError: false,
            rateMsg: ''
          });
      }
   }

   changeTerm(target, event){
    if(isNaN(this.refs[target].value)){
      this.refs[target].className = "form-control borderd-hfit err";
    }else if(parseInt(this.refs[target].value) > 999){
      this.refs[target].className = "form-control borderd-hfit err";
    }else{
      this.refs[target].className = "form-control borderd-hfit";
    }

   }

  render() {
    let dtls = this.state;
    let options = this.state.options;
    const {financialInfo} = this.state;
    // console.log('financialInfo.finance_method', financialInfo)
    return (
      <div>
      {
        [...options].map((option, i) =>
    <div key={i} className="span3">
      {
        !dtls.isLoading  ?
        <div className="r-panel">
          <p>{option.name !== 'option 1' ? <input type="checkbox" name={option.name} readOnly="true" /> : null } {option.name} </p>
          <div className="lessPad">
          {financialInfo.finance_method === 'CASH' &&
          <div className="cashDtlsForm">
            <label className="opt-label">Term</label>
            <div className="default-margin-tp-btm cus-input lessPad">

            <input type="text" className={"form-control borderd-hfit "+(dtls.isTermError && 'err')}
              defaultValue = {option.position === 1 ? 1 : (12 * (parseInt(option.position) - 1)) }
              ref={option.title+"Term"}
              disabled = { option.position === 1 ? 'disabled' : false }
              onChange={(event)=>this.changeTerm(option.title+"Term", event)} />

           </div>

           <label className="opt-label"> Rate</label>
            <div className="input-append default-margin-tp-btm cus-input lessPad">

            <input type="text" className="form-control borderd hfit "
             ref={option.title+"CashApr"}
             defaultValue = { option.position === 1 ? 1 : 0 }
             disabled = { option.position === 1 ? 'disabled' : false }
             onChange={(event)=>this.changeRate(option.title+"CashApr", event)} />
             <span className="add-on" id="sizing-addon2">%</span>
             </div>

             <label className="opt-label">Payment</label>
             <div className="input-append input-prepend default-margin-tp-btm cus-input cus-payment lessPad">
              <span className="add-on cus-addon" id="sizing-addon2">$</span>

               <input type="text" className="form-control"
                 ref={option.title+"Monthly_payment"}
                 defaultValue = {option.position === 1 ? dtls.financialInfo.monthly_payment : '' }
                 onChange={(event)=>this.changeTerm(option.title+"Monthly_payment", event)}
                 disabled = { option.position  ? 'disabled' : false }/>
             </div>

           </div>

          }


          {financialInfo.finance_method === 'RETL' &&

            <div className="retlDtlsForm">
              <label className="opt-label">Term</label>
              <div className="input-prepend input-append default-margin-tp-btm cus-input lessPad">
              <input type="text" className={"form-control borderd-hfit "}
                defaultValue = {option.position === 1 ? dtls.financialInfo.term : (dtls.financialInfo.term + (12 * (parseInt(option.position) - 1))) }
                ref={option.title+"Term"}
                disabled = { option.position === 1 ? 'disabled' : false }
                onChange={(event)=>this.changeTerm(option.title+"Term", event)} />

              </div>

              <label className="opt-label">APR</label>
              <div className="input-append default-margin-tp-btm cus-input lessPad">

              <input type="text" className={"form-control borderd hfit "}
                ref={option.title+"CashApr"}
                defaultValue = {option.position === 1 ? dtls.financialInfo.apr : ''}
                disabled = { option.position === 1 ? 'disabled' : false }
                onChange={(event)=>this.changeRate(option.title+"CashApr", event)} />

                <span className="add-on s-addon" id="sizing-addon2">%</span>
              </div>

                <label className="opt-label">Payment</label>
                <div className="input-prepend input-append default-margin-tp-btm cus-input cus-payment lessPad">
                <span className="add-on" id="sizing-addon2">$</span>

                  <input type="text" className="form-control"
                    ref={option.title+"Monthly_payment"}
                    defaultValue = {option.position === 1 ? dtls.financialInfo.monthly_payment : '' }
                    onChange={(event)=>this.changeTerm(option.title+"Monthly_payment", event)}
                    disabled = { option.position  ? 'disabled' : false } />
                </div>

           </div>
          }

          {financialInfo.finance_method === 'LEAS' &&
          <div className="leasDtlsForm">
            <label className="opt-label">Term</label>
            <div className="input-append default-margin-tp-btm cus-input lessPad">
            <input type="text" className={"form-control borderd-hfit "}
              defaultValue = {option.position === 1 ? dtls.financialInfo.term : (dtls.financialInfo.term + (12 * (parseInt(option.position) - 1))) }
              ref={option.title+"Term"}
              disabled = { option.position === 1 ? 'disabled' : false }
              onChange={(event)=>this.changeTerm(option.title+"Term", event)} />
            </div>
            <label className="opt-label">APR</label>
            <div className="input-append default-margin-tp-btm cus-input lessPad">
            <input type="text" className="form-control borderd hfit"
              ref={option.title+"CashApr"}
              onChange={(event)=>this.changeRate(option.title+"CashApr", event)}
              disabled = { option.position === 1 ? 'disabled' : false }/>
              <span className="add-on" id="sizing-addon2">%</span>
            </div>


            <label className="opt-label">Money Factor</label>
            <div className="input-append default-margin-tp-btm cus-input lessPad">
              <input type="text" className="form-control borderd-hfit"
                ref={option.title+"Money_factor"}
                onChange={(event)=>this.changeRate(option.title+"Money_factor", event)}
               defaultValue = {option.position === 1 ? (financialInfo.money_factor/2400) : '' }
               disabled = { option.position === 1 ? 'disabled' : false }/>
            </div>
            <label className="opt-label">Residual</label>
            <div className="input-append default-margin-tp-btm cus-input lessPad">
              <input type="text" className="form-control borderd hfit"
              ref={option.title+"Residual_percentage"}
              onChange={(event)=>this.changeRate(option.title+"Residual_percentage", event)}
              defaultValue = {option.position === 1 ? financialInfo.residual_percentage : '' }
              disabled = { option.position === 1 ? 'disabled' : false }/>
              <span className="add-on" id="sizing-addon2">%</span>
            </div>

            <label className="opt-label">Payment</label>
            <div className="input-append input-prepend default-margin-tp-btm cus-input cus-payment lessPad">
            <span className="add-on cus-addon" id="sizing-addon2">$</span>
            <input type="text" className="form-control"
                ref={option.title+"Monthly_payment"}
                defaultValue = {option.position === 1 ? dtls.financialInfo.monthly_payment : '' }
                onChange={(event)=>this.changeTerm(option.title+"Monthly_payment", event)}
                disabled = { option.position  ? 'disabled' : false } />
              </div>
            </div>
          }

          {financialInfo.finance_method === 'BALL' &&
          <div className="leasDtlsForm">
            <label className="opt-label">Term</label>
            <div className="input-append default-margin-tp-btm cus-input lessPad">
            <input type="text" className={"form-control borderd-hfit "}
              defaultValue = {option.position === 1 ? dtls.financialInfo.term : (dtls.financialInfo.term + (12 * (parseInt(option.position) - 1))) }
              ref={option.title+"Term"}
              disabled = { option.position === 1 ? 'disabled' : false }
              onChange={(event)=>this.changeTerm(option.title+"Term", event)} />
            </div>

            <label className="opt-label">APR</label>
            <div className="input-append default-margin-tp-btm cus-input lessPad">

            <input type="text" className={"form-control borderd hfit "}
              ref={option.title+"CashApr"}
              defaultValue = {option.position === 1 ? dtls.financialInfo.apr : ''}
              disabled = { option.position === 1 ? 'disabled' : false }
              onChange={(event)=>this.changeRate(option.title+"CashApr", event)} />

              <span className="add-on" id="sizing-addon2">%</span>
            </div>

             <label className="opt-label">Balloon Payment</label>
             <div className="input-append input-prepend default-margin-tp-btm cus-input cus-payment balloon-payment lessPad">

              <span className="add-on" id="sizing-addon2">$</span>
               <input type="text" className="form-control"
                ref={option.title+"Residual_percentage"}
                defaultValue = {option.position === 1 ? dtls.financialInfo.residual_percentage : '' }
                disabled = { option.position  ? 'disabled' : false }
                onChange={(event)=>this.changeRate(option.title+"Residual_percentage", event)} />
             </div>

             <label className="opt-label">Payment</label>
             <div className="input-prepend input-append default-margin-tp-btm cus-input cus-payment lessPad">
             <span className="add-on" id="sizing-addon2">$</span>
             <input type="text" className="form-control"
                 ref={option.title+"Monthly_payment"}
                 defaultValue = {option.position === 1 ? dtls.financialInfo.monthly_payment : '' }
                 onChange={(event)=>this.changeTerm(option.title+"Monthly_payment", event)}
                 disabled = { option.position  ? 'disabled' : false } />
            </div>


            </div>
          }



          </div>
        </div>

        : <h3> Loading Info...</h3>
      }

        </div>
      )}
      </div>
     )

  }

}
export default GridView;
