import React from 'react';
import { connect } from 'react-redux';

class PersonalSetting extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div className="personalR">
      <div>
        <a href="#" className="btn btn-primary personalBtn" role="button">修改密码</a> 
      </div>
      <div className="mTop">
        <a href="#" className="btn btn-primary personalBtn" role="button">退出登录</a> 
      </div>
      
    </div>)
  }
}

export default connect()(PersonalSetting);