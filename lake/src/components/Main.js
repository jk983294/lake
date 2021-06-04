import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './About.js';
import Cash from './Cash.js';
import Programs from './Programs.js';
import Tube from './Tube.js';
import Position from './Position.js';
import Trades from './Trades.js';
import Alpha from './Alpha.js';
import MD from './MD.js';

class Main extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/about" ><About /></Route>
                            <Route path="/md" ><MD global_info={this.props.global_info} /></Route>
                            <Route path="/programs" ><Programs global_info={this.props.global_info} /></Route>
                            <Route path="/position" ><Position global_info={this.props.global_info} /></Route>
                            <Route path="/trades" ><Trades global_info={this.props.global_info} /></Route>
                            <Route path="/alpha" ><Alpha global_info={this.props.global_info} /></Route>
                            <Route path="/tube" ><Tube global_info={this.props.global_info} /></Route>
                            <Route exact path="/" ><Cash global_info={this.props.global_info} /></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Main;