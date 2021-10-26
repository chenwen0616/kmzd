import React from 'react';
import { connect } from 'react-redux';
import {Button, Modal, Form, Input} from 'antd'

class PersonalSetting extends React.Component{
  constructor(props){
    super(props);
    this.state={
      editVisible: false,
    }
  }
  editPass = (flag)=>{
    console.log(flag, 'flag')
    this.setState({editVisible: !!flag})
  }
  
  handleCancel=()=>{
    this.setState({editVisible: false})
  }

  loginOut = ()=>{
    localStorage.removeItem('token');
    window.open('/login')
  }

  handleEditPass=()=>{
    console.log('修改密码')
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

  render(){
    const { form }= this.props;
    const {editVisible}= this.state;
    return (<div className="personalR">
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
        <Form.Item label={'新密码'}>
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
    </div>)
  }
}

export default Form.create()(connect()(PersonalSetting));