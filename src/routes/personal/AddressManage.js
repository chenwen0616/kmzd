import React from 'react';
import { connect } from 'react-redux';

class AddressManage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      地址管理
    </div>)
  }
}

export default connect()(AddressManage);