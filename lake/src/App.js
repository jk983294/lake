import React from 'react';
import About from './components/About.js';
import Cash from './components/Cash.js';
import Programs from './components/Programs.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Header from app state...",
      cash_data: [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
      { name: 'Page B', uv: 400, pv: 2400, amt: 2400 },
      { name: 'Page C', uv: 100, pv: 2400, amt: 2400 },
      { name: 'Page D', uv: 600, pv: 2400, amt: 2400 },
      { name: 'Page E', uv: 300, pv: 2400, amt: 2400 },
      { name: 'Page F', uv: 200, pv: 2400, amt: 2400 }],
      data1: [],
      data2: 0
    }
  }
  render() {
    return (
      <Container>
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Cash</Nav.Link>
              <Nav.Link href="/programs">Programs</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Router>
          <div>
            <Switch>
              <Route path="/about" ><About /></Route>
              <Route path="/programs" ><Programs /></Route>
              <Route exact path="/" ><Cash cash_data= {this.state.cash_data} /></Route>
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}


export default App;