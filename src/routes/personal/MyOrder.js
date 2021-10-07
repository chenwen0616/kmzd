import React from 'react';
import { connect } from 'react-redux';

class MyOrder extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      我的订单
    </div>)
  }
}

export default connect()(MyOrder);