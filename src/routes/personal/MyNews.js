import React from 'react';
import { connect } from 'react-redux';

class MyNews extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      我的消息
    </div>)
  }
}

export default connect()(MyNews);