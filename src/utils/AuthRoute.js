import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

export default class AuthRoute extends Component {
  render() {
    let token = localStorage.getItem('token')
    return (
      <div>
          {
              token ? <Route {...this.props} />:
              <Redirect to="/login" />
          }
      </div>
    )
  }
}
