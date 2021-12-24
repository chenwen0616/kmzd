import React from 'react';
import { connect } from 'react-redux';
import {Button, Modal, Form, Input, Spin, message} from 'antd'

import { updatePassword } from '../../api/common'

class PersonalSetting extends React.Component{
  constructor(props){
    super(props);
    this.state={
      editVisible: false,
    }
  }
  editPass = (flag)=>{
    this.setState({editVisible: !!flag})
  }
  
  handleCancel=()=>{
    this.setState({editVisible: false})
  }

  loginOut = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    // window.open('/login')
    window.location.href = '/#/login';
    window.location.reload();
  }

  handleEditPass=()=>{
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
            window.location.href = '/#/login';
            window.location.reload();
          }else{
            message.error(res.result.message)
          }
        })
      }
    })
  }

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if(!value){
      callback('请输入！')
    }else{
      if(value && value.length < 6){
        callback('密码长度不能小于6！');
      }else {
        // const { form } = this.props;
        // if (value) {
        //   form.validateFields(['confirm'], { force: true });
        // }
        callback();
      }
    }
  };

  render(){
    const { form }= this.props;
    const {editVisible}= this.state;
    return (
      <Spin spinning={false}>
        <div className='personBread' style={{top:'-92px'}}>
          <a href='/#/home'>首页</a>
          <span> / 设置</span>
        </div>
        <div className="personalR">
          <div>
            <Button type='primary' size='large' onClick={()=>this.editPass(true)}>修改密码</Button>
          </div>
          <div className="mTop">
            <Button type='primary' size='large' onClick={this.loginOut}>退出登录</Button>
          </div>
          
          {editVisible? <Modal
            title="修改密码"
            className='addrBox'
            visible={editVisible}
            onOk={this.handleEditPass}
            onCancel={this.handleCancel}
          >
            <Form.Item label={'旧密码'}>
              {form.getFieldDecorator('oldPassword',{
                rules: [
                  { required: true, message: '请输入!' },
                ]
              })(<Input.Password placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'新密码'} required={true}>
              {form.getFieldDecorator('password',{
                rules: [
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
          </Modal> : null}
        </div>
      </Spin>
    )
  }
}

export default Form.create()(connect()(PersonalSetting));