import * as React from 'react';
import { Provider, ProviderProps } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../App';

const Root: React.SFC<ProviderProps> = ({ store }) => (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>
);

export default Root;