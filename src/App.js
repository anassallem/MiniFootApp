import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { StyleProvider } from 'native-base';
import reducers from './reducers';
import Router from './Router';
import getTheme from './theme/components';
import material from './theme/variables/material';

class App extends Component {

    render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
        <StyleProvider style={getTheme(material)}>
          <Provider store={store}>
            <Router />
          </Provider>
        </StyleProvider>
        );
    }
}
export default App;
