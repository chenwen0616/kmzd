import React from 'react';
import { connect } from 'react-redux';
import {FormGroup, ControlLabel, FormControl,HelpBlock } from 'react-bootstrap';
import {Button} from 'antd';

import ValidateRandomCode from '../../utils/ValidateRandomCode';

import './login.less';

class Login extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(<div className="loginBox">
      <div className='logoBox'>
        <img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt='logo' />
      </div>
      <div className="loginB">
        <div className="loginMain">
            <h2>用户登录</h2>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="账号"
              placeholder="请输入账号"
            />
            <FieldGroup
              id="formControlsText"
              type="text"
              label="密码"
              placeholder="请输入密码"
            />
            {/* <FieldGroup
              id="formControlsText"
              type="text"
              label="验证码"
              placeholder="请输入密码"
            /> */}
            
            <div className="validateCodeS">
              <ValidateRandomCode />
            </div>
            

            {/* <a className="btn btn-primary cartBuyBtn" role="button">登录</a>  */}
            <Button type='primary' style={{width:'100%',height:'40px',background:'#004EA2',border:"1px solid #004EA2"}}>登录</Button>
        </div>
      </div>
    </div>)
  }
} 

function FieldGroup({ id, label, help, ...props }) {
return (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...props} />
    {help && <HelpBlock>{help}</HelpBlock>}
  </FormGroup>
);
}

export default connect()(Login)
