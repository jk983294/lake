import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Header from app state...",
      data: [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Monitor</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#cash">Cash</Nav.Link>
              <Nav.Link href="#program">Programs</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#about">about</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <LineChart width={600} height={300} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>;
        </div>

        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}


export default App;