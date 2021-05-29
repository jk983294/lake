import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './About.js';
import Cash from './Cash.js';
import Programs from './Programs.js';
import Tube from './Tube.js';
import Position from './Position.js';
import Trades from './Trades.js';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/about" ><About /></Route>
                            <Route path="/programs" ><Programs /></Route>
                            <Route path="/position" ><Position /></Route>
                            <Route path="/trades" ><Trades /></Route>
                            <Route path="/tube" ><Tube /></Route>
                            <Route exact path="/" ><Cash /></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Main;