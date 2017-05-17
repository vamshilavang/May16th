import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PackageCard from '../../common/packageCard';
// import { getPackageDetails } from '../../../actions';
import { getDealerPackageDetails, getNameList, getVehicalData, getFincialData } from '../../../actions/print.js';
import {dealerData} from '../../../constants/index.js'

class InvoiceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }

  }

  componentDidMount() {
    let self = this;

    let loadData = [];
    console.log(dealerData);

    loadData.push(this.props.getNameList(dealerData.dealjacketid,dealerData.dealid));
    loadData.push(this.props.getVehicalData(dealerData.dealjacketid,dealerData.dealid));
    loadData.push(this.props.getDealerPackageDetails(dealerData.dealjacketid,dealerData.dealid));
    loadData.push(this.props.getFincialData(dealerData.dealjacketid,dealerData.dealid));

    Promise.all(loadData).then(() => {
      this.setState({ loaded: true })
      setTimeout(() => { window.print() }, 100)
    });
  }

  render() {

    let content = <div></div>;
    if (this.state.loaded) {
      let customerInfo = this.props.printNames.results[0];
      let vehicalInfo = this.props.vehicalData.results[0];
      let financialInfo = this.props.financialInfo;
      let dealerPackage = this.props.dealerPackage.filter((d)=>d.products.length);
      let userName = `${dealerData.user_last}, ${dealerData.user_first}`;
      let d = new Date();
      let currentTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      content = <div>
        <div className='row first-row'>
          <div className='col-md-2 col-sm-2 col-xs-2'><img className="print-image" src="../src/img/kyalaLogo.png" alt="" /></div>
          <div className='col-md-10 col-sm-10 col-xs-10'>
            <div className="row print-summary-top">
              <span className="print-customer-name">{`${customerInfo.first_name} ${customerInfo.last_name}`}</span>
              <span className="print-model-info">{`${vehicalInfo.chrome_year} ${vehicalInfo.chrome_make}  ${vehicalInfo.model_number} ${vehicalInfo.chrome_model} ${vehicalInfo.vin} - ${vehicalInfo.odometer} miles`}</span>
            </div>
            <div className="row print-financial-info">
              <span>Selling Price: ${financialInfo.selling_price}</span>
              <span>Trade In: ${financialInfo.trade_in}</span>
              <span>Payoff: ${financialInfo.payoff}</span>
              <span>Cash Down: ${financialInfo.cashdown}</span>
              <span>Deposit: ${financialInfo.total_down_payment}</span>
              <span>Rebate: ${financialInfo.rebate}</span>
            </div>
            <div className="row print-financial-info">
              <span>Base Amt Financed: ${financialInfo.amount_financed}</span>
              <span>Total Amt Financed: ${financialInfo.amount_financed}</span>
              <span>Term: {financialInfo.term} months</span>
              <span>Rate: {financialInfo.apr} %</span>
              <span>Base Payment: ${financialInfo.days_to_first_payment}</span>
            </div>
          </div>
        </div>

        <div className='row'>
          {
            dealerPackage.map((packages, i) => (
              <div
                key={i}
                className={`col-md-${(12 / dealerPackage.length)} col-sm-${(12 / dealerPackage.length)} col-xs-${(12 / dealerPackage.length)}`}>
                <PackageCard key={`package${i}`}
                  packages={packages}
                />
              </div>
            ))
          }
        </div>

        <div className='row'>
          <div className='col-md-9 col-sm-9 col-xs-9' >
            <span>Signature: ________________________________________________________</span>
          </div>
          <div className='col-md-3 col-sm-3 col-sm-3 text-right'>
            <span>Prepared by:</span><span>{userName} on {currentTime}</span>
          </div>
        </div>

        <div className="row print-footer">
         You should be aware the products above are optional and contain additional benefits, limitations and exclusions from coverage. PLEASE REVIEW THE CONTRACT.  Payments listed above are estimates.  For specific payment information, please refer to the product contract.  The purchase of value added products is NOT required in order to obtain financing or to lease/purchase a vehicle.Each value added optional product may be purchased separately.
        </div>
      </div >
    }

    return (
      <div>{content}</div>
    )
  }
}

//setting it to printNames
function mapStateToProps(state) {
  console.log(state);
  return {

    printNames: state.printNames,
    vehicalData: state.vehicalData,
    financialInfo: state.fincacialInfo,
    dealerPackage: state.dealerPackage,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getFincialData, getNameList, getVehicalData, getDealerPackageDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceView);