export var setInitialValuesReducer = (state={}, action) => {
	switch(action.type){
		case 'SET_INITIAL_VALUES':
		 return action.value;
		default:
		 return state;
	}
}
// updating the store
export var getPrintNamesReducer = (state = {}, action) => {
	switch (action.type) {
		case 'PRINT_NAMES_LIST':
			return action.printNames;
		default:
			return state;
	}
}
export var getVehicalDataReducer = (state = {}, action) => {
	switch (action.type) {
		case 'VEHICAL_DATA':
			return action.vehicalData;
		default:
			return state;
	}
}
export var getPackageDetailsReducer = (state = [], action) => {
	switch (action.type) {
		case 'DEALER_PACKAGE_DATA':
			return action.dealerPackagInfo;
		default:
			return state;
	}
}
export var getFincialDataReducer = (state = {}, action) => {
	switch (action.type) {
		case 'FINANCIAL_DATA':
			return action.fincancialData;
		default:
			return state;
	}
}

