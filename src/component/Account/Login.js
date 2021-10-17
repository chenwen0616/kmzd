import React from 'react';
import { connect } from 'react-redux';
import {FormGroup, ControlLabel, FormControl,HelpBlock } from 'react-bootstrap';
import {Button, Form, Input} from 'antd';
import {Link,  withRouter} from 'react-router-dom';

import {apiLogin} from '../../api/person';

import ValidateRandomCode from '../../utils/ValidateRandomCode';

import './login.less';

class Login extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  handleLoginClick = (ev)=>{
    // this.props.history.push('/home');
    ev.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let {phone,password} = values;
        let result = await apiLogin({
          phone:'13312331233',
          password:'123456'
        });
        console.log(result, '登录')

        // let xhr=new XMLHttpRequest();
        // const info="phone="+'admin&password=admin123';
        // console.log(xhr, 'xhr')
        // xhr.onreadystatechange=function () {        //四个请求返回状态
        //   if (xhr.readyState==4){
        //       console.log(4);
        //       console.log(xhr.responseText, 'ddd');
        //   }
        // };
        // xhr.open('post','https://crmtest.chemclin.com/api/common/login/appLogin?password=admin123&phone=admin');
        // xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        // xhr.send(info);

        
      }
    });
  }
  
  render(){
    const {form:{ getFieldDecorator }} = this.props;
    return(<div className="loginBox">
      <div className='logoBox'>
        <img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt='logo' />
      </div>
      <div className="loginB">
        <div className="loginMain">
            <h2>用户登录</h2>
            <Form.Item className='for-form' label="账号" required={false}>
              {getFieldDecorator('phone', {
                rules:[
                  { required: true, message: '请输入账号!' },
                ]
              })(
                <Input
                  size="large"
                  onChange={this.changeCode}
                  placeholder="请输入账号"
                />,
              )}
            </Form.Item>
            <Form.Item className='for-form' label="密码" required={false}>
              {getFieldDecorator('password', {
                rules:[
                  { required: true, message: '请输入密码!' },
                ]
              })(
                <Input
                  size="large"
                  onChange={this.changeCode}
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            
            <div className="validateCodeS">
              <ValidateRandomCode />
            </div>
            

            {/* <a className="btn btn-primary cartBuyBtn" role="button">登录</a>  */}
            <Button type='primary' onClick={this.handleLoginClick} style={{width:'100%',height:'40px',background:'#004EA2',border:"1px solid #004EA2"}}>登录</Button>
        </div>
      </div>
    </div>)
  }
} 

// function FieldGroup({ id, label, help, ...props }) {
// return (
//   <FormGroup controlId={id}>
//     <ControlLabel>{label}</ControlLabel>
//     <FormControl {...props} />
//     {help && <HelpBlock>{help}</HelpBlock>}
//   </FormGroup>
// );
// }

// export default withRouter(connect()(Login))
export default Form.create()(connect()(Login));
