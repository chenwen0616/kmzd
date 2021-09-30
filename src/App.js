import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, ButtonToolbar, Button} from 'react-bootstrap';


class App extends Component {
  render() {
      return (
          <div className="App">
              {/* <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
              </header> */}
              <Container>
                  <Row className="show-grid">
                      <Col xs={12} md={4}>
                          <p className="App-intro">
                              Buttons Demo
                          </p>
                      </Col>
                      <Col xs={6} md={8}>
                          <ButtonToolbar>
                              {/* Standard button */}
                              <Button>Default</Button>
                              <Button variant="warning">Primary</Button>
                              <Button variant="success">Success</Button>
                              <Button variant="info">Info</Button>
                          </ButtonToolbar>
                      </Col>
                  </Row>
              </Container>
          </div>
      );
  }
}

export default App;
