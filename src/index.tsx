import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/Store";
import {BrowserRouter} from "react-router-dom";
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

