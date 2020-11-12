import * as React from "react";
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './main/App'
import newStore from './store';
import {Route, Router, Switch} from 'react-router';
import {Redirect} from 'react-router-dom'
import {createBrowserHistory} from 'history';
import {withRouteOnEnter} from './common/utils';
import { getRoute, rawGet } from "./common/api/query";

import {Hello_prod} from './main/Hello_prod'

import { any } from "prop-types";
import { BrowserRouter } from 'react-router-dom'

export const store = newStore()
const history = createBrowserHistory();
// import "@babel/polyfill";


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <BrowserRouter>
          <div>

          <Route
              exact path="/"
              component={withRouteOnEnter((props) => {
                  store.dispatch(getRoute("helloWorld", {}));                  
              }
              )(() => 
              // <Hello framework="React" compiler="Typescript" />
              <Hello_prod framework="React" compiler="Typescript" />
              )}
          />
        

          
          </div>
          </BrowserRouter>
        </Switch>
      </App>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
)
