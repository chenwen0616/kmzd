import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';
import {Grid, Row, Col, ButtonToolbar, Button} from 'react-bootstrap';


class App extends Component {
  render() {
      return (
          <div className="App">
              {/* <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
              </header> */}
              <Grid>
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
                              <Button bsStyle="warning">Primary</Button>
                              <Button bsStyle="success">Success</Button>
                              <Button bsStyle="info">Info</Button>
                          </ButtonToolbar>
                      </Col>
                  </Row>
              </Grid>
          </div>
      );
  }
}

export default App;
