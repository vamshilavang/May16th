import React, { Component } from 'react';
import _ from 'underscore';
import moment from 'moment';
import { Router, Route, Link, IndexRoute } from 'react-router';
import HttpHelper from '../../utils/httpHelper';
import RequireProvider from './reqProvider/requiredField';
import TermRate from './termAndRateOption/termRate';
import ProductHeading from './productView/productHeading';
import config from '../../config.js';
import { dealerData } from '../../constants/index.js'

export default class eMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            saveEMenu: true,
            products: [],
            active: true,
            datevalue: moment(),
            isError: false,
            VechileInfo_data: '',
            financialInfo_data: '',
            reserveData: '',
            isDataChanged: false,
            isSaved: false,
            dealjacketid: dealerData.dealjacketid,
            dealid: dealerData.dealid,
            deal_type: dealerData.deal_type,
            dealer_code: dealerData.dealer_code,
            originalLoad: true,

        };

        this.events = {};
        this.data = {};
        this.data.eMenusecOne = [];
        this.data.eMenusecOneObject = {};
        this.events.eMenuOptionselect = this.eMenuOptionselect.bind(this);
        this.events.editEMenu = this.editEMenu.bind(this);
        this.events.eMenuOnsave = this.eMenuOnsave.bind(this);
        this.events.eMenuSelect = this.eMenuSelect.bind(this);
        this.events.opendatepicker = this.opendatepicker.bind(this);
        //this.events.handleChange = this.handleChange.bind(this);
        this.getDealerProduct = this.getDealerProduct.bind(this);
        this.fetchDealtype = this.fetchDealtype.bind(this);
        this.returnRequiredFieldResponse = this.returnRequiredFieldResponse.bind(this);
        this.getMappedRequiredField = this.getMappedRequiredField.bind(this);
        this.getRenderdataFields = this.getRenderdataFields.bind(this);
        this.createReqFieldResponse = this.createReqFieldResponse.bind(this);
        this.createRequestdataTosend = this.createRequestdataTosend.bind(this);
        this.renderUI = this.renderUI.bind(this);
        this.handleVinIDChange = this.handleVinIDChange.bind(this);
        this.loadData = this.loadData.bind(this);
        this.mapGroupCategory = this.mapGroupCategory.bind(this);

    }

    componentDidMount() {
        //this.loadData();
                
        HttpHelper(`http://10.117.36.20:6126/api/deal/v1/deal-jackets/310200000002429406/deals/310200000002429407/required-fields/`, 'get')
        .then((reqRes)=>{
            if(reqRes.deal_menu_json.length){
                let resData = JSON.parse(reqRes.deal_menu_json)
               resData = this.mapGroupCategory(resData);
                this.setState({
                    reqFieldResponseUI:resData,
                     products: resData.Products,
                     responseTomap:resData,   
                     originalLoad: false,     
                });
            }else{
                this.loadData();
            }
            
        }).catch(()=>{
            this.loadData();
        })


        //  this.state.VechileInfo_data = require('../../mockAPI/Vehicle.json');
        // //  HttpHelper('http://10.117.36.20:6110/api/mobile/v1/deal/deal-jackets/310200000002432200/deals/310200000002432201/vehicle/', 'get').then(function (data) {
        // //        this.state.VechileInfo_data = data;
        //  //
        //  //
        // //  }.bind(this));
        //  HttpHelper('http://sfizsvl001.devint1.qts.fni:6125/api/deal/v1/deal-jackets/310200000047062723/deals/310200000047062724/deal-finance-summary/', 'get').then(function (data) {
        //        this.state.financialInfo_data = data;
        //
        //  }.bind(this));

        // commented for local testing
        //this.getDealerProduct();
        //this.state.dealerProduct = require('../../mockAPI/dealerProducts.json');

        // plz fetch SendRequestToBE
        //this.state.responseTomap = require('../../mockAPI/SendRequestToBE.json');

        //let mapppedval = _.omit(this.data.responseTomap,'Vehicle');


        //this.state.reqFieldResponseUI = require('../../mockAPI/reqFieldResponseUI.json');

        let vinId = window.document.getElementById('id_vin_number');
        if (vinId)
            vinId.addEventListener('keyup', this.handleVinIDChange);

    }


    handleVinIDChange(event) {
        this.loadData();
    }

    loadData() {
       
        // REaltime API Code
        let callPromiseArr = [];
        callPromiseArr.push(
            //HttpHelper('${config.vehicleAPI}/mobile/v1/deal/deal-jackets/310200000000000101/deals/310200000000000102/vehicle/', 'get')
            HttpHelper(`${config.vehicleAPI}/mobile/v1/deal/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/vehicle/`, 'get')

        )
        callPromiseArr.push(
            //  HttpHelper(`${config.dealFinanceAPI}/deal/v1/deal-jackets/310200000000000016/deals/310200000000000017/deal-finance-summary/`, 'get').then(function (data) {
            HttpHelper(`${config.dealFinanceAPI}/deal/v1/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/deal-finance-summary/`, 'get')
        )

        Promise.all(callPromiseArr).then(data => {
            let vi = data[0]
            let fi = data[1];
            this.setState({
                VechileInfo_data: vi,
                financialInfo_data: fi
            })
            //console.log(vi);
            // if (vi.results[0].vin != null || fi.monthly_payment != null) {

                 this.getDealerProduct();
            // }
        })


    }

    getDealerProduct() {
        HttpHelper(`${config.commonProductsAPI}/deal/v1/dealer-products/`, 'get').then(function (data) {
            this.state.dealerProduct = data;
            this.createReqFieldResponse();

        }.bind(this));
    }


    createRequestdataTosend() {
        HttpHelper(`${config.requiredFieldsAPI}/Rating/RatingRESTAPI/json/requiredfields_json`, 'post', this.state.responseTosend).then(function (data) {

            data.Products.map((p) => {
                if (p.ProviderProductId == null) { p.ProviderProductId = '' }
            })
            let modifiedDate = "/Date(" + Date.now().toString(); + ")/";
            var modDate = modifiedDate + ")/";
            data.keydata.EchoData = '';
            data.keydata.ContractDate = modDate;
            this.state.responseTomap = data;
            this.state.reqFieldResponseUI = data; //manipulating data
            this.state.reqFieldResponseUI.Products = this.getMappedRequiredField();
            this.state.reqFieldResponseUI.Products = this.getRenderdataFields();
            this.setState({ "products": this.state.reqFieldResponseUI.Products });
            //this.createRequiredJson();
        }.bind(this));
    }

    createReqFieldResponse() {
        let dataTosend = {};
        let modifiedDate = "/Date(" + Date.now().toString(); + ")/";
        var modDate = modifiedDate + ")/";

        dataTosend["KeyData"] = {
            "ClientId": "DEM", "ClientDealerId": this.state.dealerProduct.results[0].dealer_id,
            "DTDealerId": this.state.dealerProduct.results[0].dealer_id, "RequestDate": modDate
        };
        HttpHelper(`${config.vehicleAPI}/mobile/v1/deal/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/vehicle/`, 'get').then(function (data) {
            dataTosend["Vehicle"] = { "BookType": "2", "Type": data.certified_used == 'N' ? 1 : 2 };
            this.fetchDealtype(dataTosend)
            //  this.returnRequiredFieldResponse(this.fetchDealtype(dataTosend))
        }.bind(this));
        // dataTosend["Vehicle"] =  { "BookType": "2",  "Type": "1" };
        // this.fetchDealtype(dataTosend);
    }


    fetchDealtype(dataTosend) {
        // HttpHelper(`${config.dealFinanceAPI}/deal/v1/deal-jackets/310200000000000016/deals/310200000000000017/deal-finance-summary/`, 'get').then(function (data) {
        HttpHelper(`${config.dealFinanceAPI}/deal/v1/deal-jackets/${this.state.dealjacketid}/deals/${this.state.dealid}/deal-finance-summary/`, 'get').then(function (data) {
            if (data.finance_method == 'RETL')
                dataTosend["Finance"] = { "DealType": "1" };
            else if (data.finance_method == 'LEAS') {
                dataTosend["Finance"] = { "DealType": "2" };
            }
            else if (data.finance_method == 'BALL') {
                dataTosend["Finance"] = { "DealType": "3" };
            }
            else if (data.finance_method == 'CASH') {
                dataTosend["Finance"] = { "DealType": "4" };
            }
            this.returnRequiredFieldResponse(dataTosend)

        }.bind(this));

    }

    returnRequiredFieldResponse(dataTosend) {
        let productArray = [];
        let productObject = {};
        let returnResponse;
        _.each(this.state.dealerProduct.results, function (item, index) {
            if (item['is_rateable'] && !item['is_deleted']) {
                productObject = {
                    "ProductTypeCode": item.category_code,
                    "ProviderId": item.provider_code,
                    "ProviderDealerId": ""
                }
                productArray.push(productObject); //
            }
        })
        dataTosend['Products'] = productArray;
        this.state.responseTosend = dataTosend;
        this.createRequestdataTosend();
        //  return dataTosend;
    }

    getMappedRequiredField() {
        let responseTomap = this.state.reqFieldResponseUI.Products;
        let dealerProductData = this.state.dealerProduct.results;
        let mappedData = [];
        _.each(responseTomap, function (childitem, i) {

            _.each(dealerProductData, function (item, idx) {
                //comment for API
                if (item['is_rateable'] && !item['is_deleted']) {
                    if ((item['category_code'] == childitem['ProductTypeCode'])
                        && (item['provider_code'] == childitem['ProviderId']) && (item['provider_code'] != null && item['product_id'])) {
                        childitem['ClientProductId'] = item['product_id']

                        mappedData.push(childitem);

                    }
                }
            });

        });
        return mappedData;
    }

    getRenderdataFields() {
        let grpResponseObj = {};
        let RequiredFieldResponseProduct = this.state.reqFieldResponseUI.Products;
        let VehicleInfodata = this.state.VechileInfo_data;
        let financialInfo_data = this.state.financialInfo_data;
        _.each(RequiredFieldResponseProduct, function (item, idx) {
            _.each(item.Fields, function (childitem, index) {
                if (childitem.MappingAPI != '' && childitem.MappingField != '') {
                    if (childitem.MappingAPI == 'Vehicle') {
                        childitem.Value = _.pick(VehicleInfodata.results[0], childitem.MappingField)[childitem.MappingField]
                    } else if (childitem.MappingAPI == 'DealFinanceSummary') {
                        childitem.Value = _.pick(financialInfo_data, childitem.MappingField)[childitem.MappingField]
                    }
                }
                if (childitem.Name == 'provider_dealer_id') {
                    childitem.Value = '';
                } else if (childitem.Name == 'type') {
                    childitem.Value = 'N';
                }
                if (childitem.Value == 'RETL') {
                    childitem.Value = "Finance";
                } else if (childitem.Value == 'LEAS') {
                    childitem.Value = "Lease";
                } else if (childitem.Value == 'BALL') {
                    childitem.Value = "Balloon";
                } else if (childitem.Value == 'CASH') {
                    childitem.Value = "Cash";
                }

                if (Object.keys(grpResponseObj).indexOf(childitem.Category) == -1) {
                    grpResponseObj[childitem.Category] = [];
                }
                if (childitem.DisplayOnUI && childitem.ControlType != 'NA') {
                    grpResponseObj[childitem.Category].push(childitem)
                }
            });
            RequiredFieldResponseProduct[idx]['GroupedCategory'] = grpResponseObj;
            grpResponseObj = {};
        })
        return RequiredFieldResponseProduct
    }

    
    mapGroupCategory(data){
        let grpResponseObj = {};
        data.Products.map((p,i)=>{
            p.Fields.map((f,y)=>{
                if (Object.keys(grpResponseObj).indexOf(f.Category) == -1) {
                    grpResponseObj[f.Category] = [];
                }
                if (f.DisplayOnUI && f.ControlType != 'NA') {
                    grpResponseObj[f.Category].push(f)
                }                
            })
            p.GroupedCategory = grpResponseObj;
            grpResponseObj = {};
        })
        return data;
    }

    eMenuOptionselect(ClientProductId, qid, catname, optvalue, caption) {

        let questiondata = this.state.reqFieldResponseUI.Products;
        let isFilled = true;
        if (questiondata.length > 0) {
            _.map(questiondata, function (category, idx) {
                if (category.ClientProductId + "-" + qid.split('-')[1] == qid) {
                    return (_.map(category.GroupedCategory, function (qs, i) {
                        if (i == catname) {
                            return _.map(qs, function (q, i) {
                                if (q.DisplayOnUI && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 0 && q.FieldValues.length <= 4))) {
                                    q['isValid'] = true;
                                    isFilled = true;

                                    return q.Value = optvalue.Code;
                                } else if (q.DisplayOnUI && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 4))) {
                                    if (optvalue.target && optvalue.target.value) {
                                        q['isValid'] = true;
                                        isFilled = true;

                                        return q.Value = optvalue.target.value;
                                    } else if (optvalue.Code != undefined) {
                                        q['isValid'] = true;
                                        isFilled = true;
                                        q.Value = optvalue.Code;

                                    }
                                } else if (q.DisplayOnUI && q.Caption == caption && (q.ControlType != 'NA' && q.ControlType != 'Calendar') && (q.FieldValues !== undefined && q.FieldValues.length == 0)) {
                                    q['isValid'] = true;
                                    isFilled = true;

                                    q.Value = optvalue.target.value;
                                } else {
                                    if (q['isValid']) {
                                        isFilled = true;
                                    }
                                }
                            })
                        }
                    }))
                }
            })
        }
        this.state.isDataChanged = isFilled;
        if (isFilled) {
            this.state.isSaved = true;
            this.setState({ isError: false });
        }
        else {
            this.setState({ isError: true });
        }
        this.setState({ "reqFieldResponseUI": this.state.reqFieldResponseUI });
    }

    eMenuSelect(ClientProductId, qid, catname, optvalue) {
        //console.log("called");
    }

    eMenuOnsave() {
        let isvalidData = true;
        let questiondata = this.state.reqFieldResponseUI.Products;
        _.map(questiondata, function (category, idx) {

            return (_.map(category.GroupedCategory, function (qs, i) {

                return _.map(qs, function (q, i) {
                    if (q.DisplayOnUI && (!q.Value || q.Value == 'please select') && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 0 && q.FieldValues.length <= 4))) {
                        isvalidData = false;
                        return q['isValid'] = false;
                    } else if (q.DisplayOnUI && (!q.Value || q.Value == 'please select') && (q.ControlType != 'NA' && q.ControlType != 'Calendar' && (q.FieldValues !== undefined && q.FieldValues.length > 4))) {
                        isvalidData = false;
                        return q['isValid'] = false;
                    } else if (q.DisplayOnUI && (!q.Value || q.Value == 'please select') && (q.ControlType != 'NA' && q.ControlType != 'Calendar') && (q.FieldValues !== undefined && q.FieldValues.length == 0)) {
                        isvalidData = false;
                        q['isValid'] = false;
                    } else if (q.DisplayOnUI && (!q.Value || q.Value == 'please select') && (q.ControlType != 'NA' && q.ControlType == 'Calendar') && (q.FieldValues !== undefined && q.FieldValues.length == 0)) {
                        isvalidData = false;
                        q['isValid'] = false;
                    }
                })

            }))

        })

        if (isvalidData) {
            this.state.isSaved = true;
            this.setState({ isError: false, saveEMenu: false });
        } else {
            this.state.isSaved = false;
            this.setState({ isError: true, saveEMenu: true });
        }

        let dataWithNoCategory = [];
        this.state.reserveData = JSON.parse(JSON.stringify(questiondata));// redenring data with category preserved becoz we need to send req to backend without category
        if (this.state.isDataChanged) {
            _.each(questiondata, function (value, i) {
                dataWithNoCategory.push(_.omit(value, 'GroupedCategory'))
            })
            this.state.reqFieldResponseUI.Products = dataWithNoCategory;
            let dataToSend = {};
            //dataToSend['deal_menu_json'] = this.state.reqFieldResponseUI;
            dataToSend['deal_menu_json'] = JSON.stringify(this.state.reqFieldResponseUI);
            dataToSend["deal_id"] = '310200000002429407';
            dataToSend["deal_jacket_id"] = '310200000002429406';
            dataToSend["dlr_cd"] = 1114616;

            HttpHelper(`http://10.117.36.20:6126/api/deal/v1/deal-jackets/310200000002429406/deals/310200000002429407/required-fields/`,

                 'post', dataToSend).then(function (data) {
            // HttpHelper(`http://192.168.17.37:6126/api/deal/v1/deal-jackets/310200000000000101/deals/310200000000000102/required-fields/`,
            //     'post', dataToSend).then(function (data) {

                }.bind(this));
        }

    }

    editEMenu() {
        this.state.reqFieldResponseUI.Products = this.state.reserveData;
        this.setState({ "reqFieldResponseUI": this.state.reqFieldResponseUI });
        this.setState({ "saveEMenu": true });
        this.state.isDataChanged = false;


        //this.setState({"questions":this.data.eMenusecOne})
    }

    opendatepicker(date) {
        let questiondata = this.state.reqFieldResponseUI.Products;
        let isDataChanged = false;
        let isFilled = true;
        if (questiondata.length > 0) {
            _.map(questiondata, function (category, idx) {
                return (_.map(category.GroupedCategory, function (qs, i) {

                    return _.map(qs, function (q, i) {
                        if (q.ControlType == 'Calendar') {
                            q['isValid'] = true;
                            isDataChanged = true;
                            return q.Value = date.toDate();
                        }
                        if (q.ControlType != 'Calendar' && q.isValid == false) {//we setting it to false because by default isvalid is undefined and we are using this field for showing error message . so we dont want error message show
                            isFilled = false;
                        }
                    })

                }))

            })
        }
        this.state.isDataChanged = isDataChanged;
        if (isFilled) {
            this.setState({ isError: false });
        }
        else {
            this.setState({ isError: true });
        }
        this.setState({ reqFieldResponseUI: this.state.reqFieldResponseUI });
    }

    renderUI() {
        if ((this.state.VechileInfo_data == '' || this.state.financialInfo_data == '') && (this.state.originalLoad)) {
            return
        } 
        // else if (this.state.VechileInfo_data.results[0].vin == null || this.state.financialInfo_data.monthly_payment == null) {
        //     return 'No Data to Display'
        // } 
        else {
            let ui = <div>{this.state.reqFieldResponseUI && <RequireProvider header='eMenu' error={this.state.isError}
                IsEdit={this.state.saveEMenu} data={this.state.reqFieldResponseUI} events={this.events} />}
                <TermRate events={this.events.eMenuOnsave} />
                {!this.state.saveEMenu && <ProductHeading items={this.state.dealerProduct} />}</div>
            return ui;
         }
    }

    render() {
        return (
            <div>
                {this.renderUI()}
            </div>
        );
    }

}
