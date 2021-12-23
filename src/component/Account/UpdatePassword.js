import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, message } from 'antd';

import { updatePassword } from '../../api/common'

import './login.less';

class UpdatePassword extends React.Component{
  // constructor(props){
  //   super(props);
  // }

  handleUpdatePass=()=>{
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        updatePassword({
          oldPassword: values.oldPassword,
          password: values.password
        }).then(res=>{
          if(res&&res.result&&res.result.code===200){
            message.success('成功');
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            localStorage.setItem('firstLogin', true)
            window.location.href = '/#/login';
            window.location.reload();
          }else{
            message.error(res.result.message)
          }
        })
      }
    })
  }

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('密码不能为空');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('密码长度不能小于6');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  render(){
    const { form } = this.props;
    return (
      <div className="loginBox">
        <div className='logoBox'>
          <img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt='logo' />
        </div>
        <div className='updatePassTitle'>
          <p>修改密码</p>
        </div>
        <div className='updatePassContent'>
          <Form.Item label={'旧密码'}>
            {form.getFieldDecorator('oldPassword',{
              rules: [
                { required: true, message: '请输入!' },
              ]
            })(<Input.Password placeholder='请输入' />)}
          </Form.Item>
          <Form.Item label={'新密码'}>
            {form.getFieldDecorator('password',{
              rules: [
                { required: true, message: '请输入!' },
                {
                  validator: this.checkPassword,
                },
              ]
            })(<Input.Password placeholder='请输入' />)}
          </Form.Item>
          <Form.Item label={'确认新密码'}>
            {form.getFieldDecorator('confirm',{
              rules: [
                { required: true, message: '请输入!' },
                {
                  validator: this.checkConfirm,
                },
              ]
            })(<Input.Password placeholder='请输入' />)}
          </Form.Item>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button type='primary' onClick={this.handleUpdatePass}>确认修改</Button>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Form.create()(connect()(UpdatePassword));