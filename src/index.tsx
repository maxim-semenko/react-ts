import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/Store";
import {BrowserRouter} from "react-router-dom";
import {IntlProvider} from "react-intl";
import Russian from "./languages/ru-RU.json"
import English from "./languages/en-US.json"
import Wrapper from "./components/Wrapper";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Wrapper>
                <Provider store={store}>
                    <App/>
                </Provider>
            </Wrapper>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

