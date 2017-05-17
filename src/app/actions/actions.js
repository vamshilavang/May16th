import {GET_RATES} from '../constants/index';
import axios from 'axios';
import httpHelper from '../utils/httpHelper';
import config from '../config.js';
import {dealerData} from '../constants/index.js';

const dealjacketid = dealerData.dealjacketid;
const dealid = dealerData.dealid;
const rateUrl = `${config.dealProductsAPI}/deal/v1/deal-jackets/${dealjacketid}/deals/${dealid}/required-fields/`;
//const rateUrl = '${config.dealProductsAPI}/deal/v1/deal-jackets/310200000000000101/deals/310200000000000102/required-fields/';
//const rateUrl = '${config.dealProductsAPI}/deal/v1/deal-jackets/310200000002429406/deals/310200000002429407/required-fields';
export var setInitialValues = (values) => {
  return {
    type: 'SET_INITIAL_VALUES',
    values
  }
}
export function updateProductRate(rate, productId) {
  return (dispatch) => {
      dispatch({type:'UPDATE_PRODUCT_RATE', values: {rate: rate, id: productId}});
  }
}

export function getDealerRates(providerId) {
  return (dispatch) => {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
     axios.get(rateUrl).then((data) => {
      let deal_menu_json = data.data.deal_menu_json;
      deal_menu_json = JSON.parse(deal_menu_json);
      deal_menu_json.keydata = getRateRequestBody(providerId);
    //  const url = 'http://10.117.18.27:6220/Rating/RatingRESTAPI/json/rates_json';
      const url = '${config.ratingAPI}/Rating/RatingRESTAPI/json/rates_json';
      axios.post(url, deal_menu_json, config).then(function(response) {
        console.log('Rate-response',response);
          dispatch({type: GET_RATES,values: response});
        })
        .catch((e) => {
        });
    });
  }
}

function getRateRequestBody(providerId) {
  const keyData = {
    "EchoData": window.dealerData.dealid,
  //  "EchoData": "64763",
    "ClientId": "DEM",
    "ClientDealerId": providerId,
    "DTDealerId": providerId,
    "RequestDate":  `\/Date(${new Date().getTime()})\/`,
    "ContractDate":  `\/Date(${new Date().getTime()})\/`
  }

//  const deal_menu = JSON.parse(data.data.deal_menu_json);
  // keyData.ClientDealerId =providerId;
  // keyData.DTDealerId = providerId;
  // keyData.RequestDate =
  // keyData.ContractDate = `\/Date(${new date().getTime()})\/`;

  return keyData;
}
