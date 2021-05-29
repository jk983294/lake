import React from 'react';
import Main from './components/Main.js';
import { Container, Nav, Navbar } from 'react-bootstrap';


class App extends React.Component {
  render() {
    return (
      <Container>
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Cash</Nav.Link>
              <Nav.Link href="/position">Position</Nav.Link>
              <Nav.Link href="/trades">Trades</Nav.Link>
              <Nav.Link href="/programs">Programs</Nav.Link>
              <Nav.Link href="/tube">Tube</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Main />
      </Container>
    );
  }
}


export default App;