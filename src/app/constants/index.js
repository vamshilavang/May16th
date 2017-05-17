export const GET_RATES = 'get_dealers_rates';

export let dealerData = {};

export function populateDealerData() {
    dealerData = {
        dealjacketid: (window.dealerData) ? window.dealerData.dealjacketid : '310200000000000001',
        dealid: (window.dealerData) ? window.dealerData.dealid : '310200000000000002',
        deal_type: (window.dealerData) ? window.dealerData.deal_type : 'RETL',
        dealer_code: (window.dealerData) ? window.dealerData.dealer_code : '1111132',
        user_first: (window.dealerData) ? window.dealerData.user_first : 'First',
        user_last: (window.dealerData) ? window.dealerData.user_last : 'Last'
    }
} 