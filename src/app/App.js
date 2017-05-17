import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './createStore';
import Emenu from './components/eMenu/eMenu';
import InvoiceView from './components/eMenu/invoice/invoiceView.js';
import { Router, Route, Link, IndexRoute} from 'react-router';
var useRouterHistory = require('react-router/lib/useRouterHistory');
var createHashHistory  = require('history/lib/createHashHistory');

var history = useRouterHistory(createHashHistory)({ queryKey: false });


const store = createStore(
  reducers,
  applyMiddleware(thunk));



class App extends Component {
  
  render() {
    let content = (window.location.href.indexOf('printselection')>-1) ? <InvoiceView/> : <Emenu />;
    return (
      <Provider store={store}>
        <div>
          <div className="container-fluid" style={{marginTop: '10px'}}>
            {content}
          </div>
        </div>
      </Provider>
    );
  }
}
export default App;
