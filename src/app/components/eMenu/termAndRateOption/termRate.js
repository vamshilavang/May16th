import React from 'react';
import GridView from './GridView';

class TermRate extends React.Component {
  constructor(props){
   super(props);

 this.state = {
    optionTypes: [
      { name: 'option 1', position: 1 , title : 'option1'},
      { name: 'option 2', position: 2 , title : 'option2'},
      { name: 'option 3', position: 3 , title : 'option3'},
      { name: 'option 4', position: 4 , title : 'option4'}
    ]
  }
}
render() {
  let options = this.state.optionTypes;

  return (
    <div className="container-fluid row">
      <span className="term-rate">Term & Rate Options</span>
      <div className="App">
            <GridView options={this.state.optionTypes} selectedOption={'LEAS'} ref="grid" />
        <button className="btn btn-primary pull-right btn-cus" type="button" onClick={()=> {this.props.events(); this.refs.grid.submitHandle() }}>get rates</button>
      </div>
    </div>
    );
}


 }
export default TermRate;
