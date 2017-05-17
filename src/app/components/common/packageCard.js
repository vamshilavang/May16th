import React, { Component } from 'react';

class PackageCard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let pkg = this.props.packages;
    return (
      <div className="package-card">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">{pkg.package_name}</h3>
          </div>
          <div className="panel-body print-card">
            {
              pkg.products.map((p, i) => {
                return (
                  <div className="row" key={`${pkg.package_name}_${i}`}>
                    <div className="col-md-6 col-sm-6 col-xs-6 padding-left prod-name">{p.name}</div>
                    <div className="col-md-6 col-sm-6 col-xs-6 text-right padding-right">${p.price}/mo</div>
                    <div className="col-md-6 col-sm-6 col-xs-6 padding-left">{p.term} mo/{p.miles} mi</div>
                    <div className="col-md-6 col-sm-6 col-xs-6 text-right padding-right">{(p.deductible != null && p.deductible != 0) ? `$${p.deductible} Ded` : ``}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <ul className="list-group print-list">
          {
            pkg.package_options.map((opt, i) => {
              return (
                <li key={`${pkg.package_name}_${i}_options`} className="list-group-item"> ____{opt.month} months = {opt.payment}</li>
              )
            })

          }
        </ul>
      </div>
    );
  }
}

export default PackageCard;