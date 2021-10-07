import React from 'react';
import { connect } from 'react-redux';

class MyContract extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      我的合同
    </div>)
  }
}

export default connect()(MyContract);