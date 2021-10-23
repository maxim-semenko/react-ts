import React from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from "./components/HomePage";
import AboutBreed from "./components/AboutBreed";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path="/breed/:name" component={AboutBreed}/>
            </Switch>
        </div>
    );
}

export default App;
