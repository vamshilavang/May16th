import React, { Component } from 'react';

  class PlanMenu extends Component {
    constructor() {
      super();
      this.renderPlan=this.renderPlan.bind(this);
    }
    renderPlan(planList){
                  var listProducts =  planList.map((itm, index) =>
                    <div style={{"border": "1px solid #ccc","padding": "3px 6px","margin":" 5px"}} className ="btn" key={"itmVl1"+index} >
                     <span>{itm.title}</span>
                    </div>
                  );
                  return listProducts;
    }
      render() {
        return (
            <div className="menu-options">
          <div className="pull-right menu-options">
            {this.renderPlan([{title: 'PLATINUM'}, {title: 'GOLD'}, {title: 'SILVER'},{title: 'BASIC'}])}
          </div>
            </div>
         )
       }
  }
  export default PlanMenu;
