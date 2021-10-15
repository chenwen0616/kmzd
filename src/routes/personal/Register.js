import React from 'react';
import { connect } from 'react-redux';

class Register extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(<div>注册页</div>)
  }
} 

export default connect()(Register)