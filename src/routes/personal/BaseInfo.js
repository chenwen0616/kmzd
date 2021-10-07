import React from 'react';
import { connect } from 'react-redux';

class BaseInfo extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      基本信息
    </div>)
  }
}

export default connect()(BaseInfo);