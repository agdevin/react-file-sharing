import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

import List from "./components/List/list";
import Upload from "./components/Upload/upload";

export default function App() {
  return (
    <Router>
      <div className="header">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/list">
            <img className="logo" src={require('./logo.png')} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/list">List</Nav.Link>
              <Nav.Link href="/upload">Upload</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="content">
        <Container>
          <Switch>
          <Route path="/list">
              <List />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}