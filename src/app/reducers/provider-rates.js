import {GET_RATES} from '../constants/index.js';
const initialState = {
	ratesInfo: [],
	productPrice: new Map()
};
export default function rates(state = initialState, action) {
  switch (action.type) {
    case GET_RATES:
      return { ...state,
        ratesInfo: action.values.data.Products
      };
    case 'UPDATE_PRODUCT_RATE':
      const {
        rate,
        id
      } = action.values;
      let newProductPrice = state.productPrice;
      newProductPrice.set(id, rate);
      return { ...state, productPrice: newProductPrice };
    default:
      return { ...state };
  }
}
