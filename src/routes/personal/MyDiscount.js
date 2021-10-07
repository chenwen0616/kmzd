import React from 'react';
import { connect } from 'react-redux';

class MyDiscount extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      我的折扣
    </div>)
  }
}

export default connect()(MyDiscount);