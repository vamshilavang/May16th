import { combineReducers } from 'redux';
import {
	setInitialValuesReducer,
	getPackageDetailsReducer,
	getPrintNamesReducer,
	getVehicalDataReducer,
	getFincialDataReducer
} from '../reducers/reducers';
import rates from '../reducers/provider-rates';

export default combineReducers({
	setInitialValues: setInitialValuesReducer,
	printNames: getPrintNamesReducer,
	vehicalData: getVehicalDataReducer,
	fincacialInfo: getFincialDataReducer,
	dealerPackage: getPackageDetailsReducer,
	rates,
});
