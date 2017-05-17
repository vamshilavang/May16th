// MockAPI Import
import httpHelper from '../utils/httpHelper';
import config from '../config.js';


const printNames = require('../mockAPI/printNames.json');
const vehicalData = require('../mockAPI/Vehicle.json');
const dealerPackageData = require('../mockAPI/dealerPackage.json');
const financialInfoData = require('../mockAPI/financialInfo.json');


//after calling functions
export const getPackageDetails = (values) => {
    return {
        type: GET_PACKAGE_DETAILS,
        values
    }
}
export const getNameList_success = (printNames) => {
    return {
        type: 'PRINT_NAMES_LIST',
        printNames
    }
}
export const getVehicalData_success = (vehicalData) => {
    return {
        type: 'VEHICAL_DATA',
        vehicalData
    }
}
export const getPackageDetails_success = (dealerPackagInfo) => {
    return {
        type: 'DEALER_PACKAGE_DATA',
        dealerPackagInfo
    }
}
export const getFincialData_success = (fincancialData) => {
    return {
        type: 'FINANCIAL_DATA',
        fincancialData
    }
}
//action creators
export function getNameList(dealjacketid,dealid) {
    return function (dispatch, getState) {
       return httpHelper(`${config.customerAPI}/mobile/v1/deal/deal-jackets/${dealjacketid}/deals/${dealid}/simple-customer/`, 'get')
            .then((printNames) => {
                dispatch(getNameList_success(printNames));
                return printNames;
            })
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         dispatch(getNameList_success(printNames));
        //         resolve(printNames);
        //     }, 100)
        // })
    }
}
export function getVehicalData(dealjacketid,dealid) {
    return function (dispatch, getState) {
        return httpHelper(`${config.vehicleAPI}/mobile/v1/deal/deal-jackets/${dealjacketid}/deals/${dealid}/vehicle/`, 'get')
            .then((vehicalData) => {
                dispatch(getVehicalData_success(vehicalData));
                return vehicalData;
            })

            /////////////
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         dispatch(getVehicalData_success(vehicalData));
        //         resolve(vehicalData);
        //     }, 100)
        // })
    }
}
export function getDealerPackageDetails(dealjacketid,dealid) {
    return function (dispatch, getState) {
        return httpHelper(`http://10.117.36.20:6126/api/deal/v1/deal-jackets/310200000002429406/deals/310200000002429407/package-products-temp/`, 'get')
            .then((dealerPackageData) => {
                dispatch(getPackageDetails_success(dealerPackageData));
                return dealerPackageData;
            })
            /////////////
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         dispatch(getPackageDetails_success(dealerPackageData));
        //         resolve(dealerPackageData);
        //     }, 100)
        // })
    }
}
export function getFincialData(dealjacketid,dealid) {
    return function (dispatch, getState) {
        
         return httpHelper(`${config.dealFinanceAPI}/deal/v1/deal-jackets/${dealjacketid}/deals/${dealid}/deal-finance-summary/`, 'get')
            .then((financialInfoData) => {
                dispatch(getFincialData_success(financialInfoData));
                return financialInfoData;
            })

        /////
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         dispatch(getFincialData_success(financialInfoData));
        //         resolve(financialInfoData);
        //     }, 100)
        // })
    }
}
