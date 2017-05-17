import React, { Component } from 'react';
    import Product from './ProductView';
    import PlanOption from './planList';
    import PlanMenu from './planMenu';
    import axios from 'axios';
    import _ from 'underscore';

    function getProviders(providersName){
      const keys = Object.keys(providersName);
      const ProviderInfo = [];
      for(let i=0;i<keys.length;i++){
        const provider = providersName[keys[i]];
          ProviderInfo.push({
            providerName: provider[0].provider_name,
            providerId: provider[0].dealer_id,
            product_code: provider[0].category_code
          });
      }
      return ProviderInfo;
    }

    class ProductHeading extends Component {
      constructor(props) {
        super(props);
        const groupedList = _.groupBy(props.items.results, 'category_code');
        let result = this.getProductInfo(groupedList);
        this.state = {
         productsArr: result
        };
     }
     getDefaultProduct(items){
       let defaultIndex = 0;
       for (let i = 0; i < items.length; i++) {
         if(items[i].is_default){
           defaultIndex = i;
         }
       }
       return defaultIndex;
     }

      getProductInfo(groupedProductList){
        const keys =Object.keys(groupedProductList);
        const productList = [];
        for (let i =0; i<keys.length; i++){
          let items =groupedProductList[keys[i]];
          const defaultIndex = this.getDefaultProduct(groupedProductList[keys[i]])
          let providersName =_.groupBy(items,'provider_name');
          const item = items[defaultIndex];
          productList.push({
             id: item.product_id,
             title: item.name,
          //   dealer_id: ite
             providerList: getProviders(providersName),
             catCode:item.category_code,
             price:item.cost,
             default_price: item.default_price,
             isRateable : item.is_rateable,
             extension_data : item.extension_data,
             imageUrl: item.image_url
          });

       }
        return productList;
    }

      render() {
        let products = this.state.productsArr;
        return (
          <div className="container-fluid">
            <div className="row">
            <PlanMenu showRates={true} />
            <div>
              <h3 className="r-bottom" key={"productsHeading"+products.length}>Products</h3>
              <hr className="r-top-no-margin" />
              {
                products.map((product, i) =>
                <Product key={"product_" + product.id} optType={product} />
              )
                }
            </div>
            <div>
            <PlanOption />
            </div>
          </div>
          </div>
        );
      }
    }

    export default ProductHeading;
