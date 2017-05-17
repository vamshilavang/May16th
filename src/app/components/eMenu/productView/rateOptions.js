import React, {Component} from 'react';

export default class RatesOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isSelected
    };
  }
  OnChange = e => {
    this.props.onSelect({checked:!this.state.isChecked , price: this.props.opt.RetailRate, OptionId: this.props.opt.OptionId })
    this.setState({
      isChecked: !this.state.isChecked
    });
  }
  render() {
    let options= {checked: false, disabled: false};
    if(this.state.isChecked){
      options.checked= true;
    }
    if(this.props.IsSurcharge){
      options.disabled = true;
    }

    return(
      <p>
        <input type="checkbox" {...options} onChange={e => this.OnChange(e)} />
         <span className="r-small-left-padding">{this.props.OptionDesc}
         </span>
      </p>);
  }
}
