import React, { Component } from 'react';

class PlanOption extends Component {
  constructor() {
    super();
    this.renderPlan=this.renderPlan.bind(this);
  }

  renderPlan(planList){
            var moreProductOptions = planList,
            listProducts =  moreProductOptions.map((moreProduct, index) =>
              <div className ="col-xs-3" key={"itmVl"+index}>
              <div className ="r-panel1" key={"itmVl1"+index}>
               <p><input type="radio" name="plans" value={moreProduct.title} /><span className="plans-radio-option">{moreProduct.title}</span></p>
               <span className="prod-tot">Total Cost</span>
               <div className="input-group default-margin-tp-btm">
                <span className="input-group-addon" id="sizing-addon2">$</span>
                <input type="text" className="form-control"/>
               </div>
               <span className="prod-tot">Total Price</span>
              <div className="input-group default-margin-tp-btm">
                <span className="input-group-addon" id="sizing-addon2">$</span>
                <input type="text" className="form-control"/>
               </div>
              </div>
              </div>
            );
            return listProducts;
  }
  render() {
      return (
         <div>
          {this.renderPlan([{title: 'PLATINUM'}, {title: 'GOLD'}, {title: 'SILVER'},{title: 'BASIC'}])}
          <hr/>
           <button className="btn btn-primary pull-right p-btn">presentation mode</button>
           <button className="btn btn-default pull-right p-btn"><a href="/#/printselection" target="_blank">Print Menu</a></button>
           <button className="btn btn-default pull-right p-btn">Print FinalMenu</button>
           <button className="btn btn-default pull-right p-btn">Decline Pacakge</button>
         </div>
          )
          }
}
export default PlanOption;
