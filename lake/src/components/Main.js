import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from './About.js';
import Cash from './Cash.js';
import Programs from './Programs.js';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/about" ><About /></Route>
                            <Route path="/programs" ><Programs /></Route>
                            <Route exact path="/" ><Cash /></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Main;