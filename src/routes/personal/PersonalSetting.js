import React from 'react';
import { connect } from 'react-redux';

class PersonalSetting extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      设置
    </div>)
  }
}

export default connect()(PersonalSetting);