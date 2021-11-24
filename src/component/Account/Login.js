import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Form, Input, message } from 'antd';
// import { Link, withRouter } from 'react-router-dom';

import { apiLogin } from '../../api/person';

import './login.less';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      //验证码
      code: '',
      codeLength: 4,
      fontSizeMin: 20,
      fontSizeMax: 22,
      backgroundColorMin: 240,
      backgroundColorMax: 250,
      colorMin: 10,
      colorMax: 20,
      lineColorMin: 40,
      lineColorMax: 180,
      contentWidth: 96,
      contentHeight: 38,
      showError: false, // 默认不显示验证码的错误信息
    }
  }

  UNSAFE_componentWillMount() {
    this.canvas = React.createRef()
  }

  componentDidMount() {
    // this.canvas = React.createRef()
    this.drawPic()
  }

  // 生成一个随机数
  // eslint-disable-next-line arrow-body-style
  randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  drawPic = () => {
    this.randomCode()
  }

  // 生成一个随机的颜色
  // eslint-disable-next-line react/sort-comp
  randomColor(min, max) {
    const r = this.randomNum(min, max)
    const g = this.randomNum(min, max)
    const b = this.randomNum(min, max)
    return `rgb(${r}, ${g}, ${b})`
  }

  drawText(ctx, txt, i) {
    ctx.fillStyle = this.randomColor(this.state.colorMin, this.state.colorMax)
    const fontSize = this.randomNum(this.state.fontSizeMin, this.state.fontSizeMax)
    ctx.font = fontSize + 'px SimHei'
    const padding = 10;
    const offset = (this.state.contentWidth - 40) / (this.state.code.length - 1)
    let x = padding;
    if (i > 0) {
      x = padding + (i * offset)
    }
    let y = this.randomNum(this.state.fontSizeMax, this.state.contentHeight - 5)
    if (fontSize > 40) {
      y = 40
    }
    const deg = this.randomNum(-10, 10)
    // 修改坐标原点和旋转角度
    ctx.translate(x, y)
    ctx.rotate(deg * Math.PI / 180)
    ctx.fillText(txt, 0, 0)
    // 恢复坐标原点和旋转角度
    ctx.rotate(-deg * Math.PI / 180)
    ctx.translate(-x, -y)
  }

  drawLine(ctx) {
    // 绘制干扰线
    for (let i = 0; i < 1; i++) {
      ctx.strokeStyle = this.randomColor(this.state.lineColorMin, this.state.lineColorMax)
      ctx.beginPath()
      ctx.moveTo(this.randomNum(0, this.state.contentWidth), this.randomNum(0, this.state.contentHeight))
      ctx.lineTo(this.randomNum(0, this.state.contentWidth), this.randomNum(0, this.state.contentHeight))
      ctx.stroke()
    }
  }

  drawDot(ctx) {
    // 绘制干扰点
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = this.randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(this.randomNum(0, this.state.contentWidth), this.randomNum(0, this.state.contentHeight), 1, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  reloadPic = () => {
    this.drawPic()
    this.props.form.setFieldsValue({
      sendcode: '',
    });
  }

  // 输入验证码
  changeCode = e => {
    if (e.target.value.toLowerCase() !== '' && e.target.value.toLowerCase() !== this.state.code.toLowerCase()) {
      this.setState({
        showError: true
      })
    } else if (e.target.value.toLowerCase() === '') {
      this.setState({
        showError: false
      })
    } else if (e.target.value.toLowerCase() === this.state.code.toLowerCase()) {
      this.setState({
        showError: false
      })
    }
  }

  // 随机生成验证码
  randomCode() {
    let random = ''
    // 去掉了I l i o O,可自行添加
    const str = 'QWERTYUPLKJHGFDSAZXCVBNMqwertyupkjhgfdsazxcvbnm1234567890'
    for (let i = 0; i < this.state.codeLength; i++) {
      const index = Math.floor(Math.random() * 57);
      random += str[index];
    }
    this.setState({
      code: random
    }, () => {
      const canvas = this.canvas.current;
      const ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(this.state.backgroundColorMin, this.state.backgroundColorMax)
      ctx.fillRect(0, 0, this.state.contentWidth, this.state.contentHeight)
      // 绘制文字
      for (let i = 0; i < this.state.code.length; i++) {
        this.drawText(ctx, this.state.code[i], i)
      }
      this.drawLine(ctx)
      this.drawDot(ctx)
    })
  }

  handleLoginClick = (ev) => {
    ev.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        let { phone, password } = values;
        apiLogin({
          phone,
          password
        }).then(res => {
          this.setState({ loading: false })
          if (res.data) {
            // 跳转到home页
            const data = {
              userId: res.data.userId,
              userType: res.data.userType,
              roleId: res.data.roleId,
            };
            const jsonData = JSON.stringify(data)
            localStorage.setItem('userInfo', jsonData);
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common["token"] = res.data.token;
            message.success('成功！')
            const flag = window.localStorage.getItem('firstLogin');
            if(flag){
              this.props.history.push('/home');
            }else{
              this.props.history.push('/updatePassword');
            }
          } else {
            message.error(res.result.message);
          }
        }).catch(err => {
          this.setState({ loading: false })
          console.log(err, 'err')
        })
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { loading } = this.state;
    const suffix = (
      <div>
        <canvas
          onClick={this.reloadPic}
          ref={this.canvas}
          width='100'
          height='40'>
        </canvas>
      </div>
    );
    return (<div className="loginBox">
      <div className='logoBox'>
        <img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt='logo' />
      </div>
      <div className="loginB">
        <div className="loginMain">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleLoginClick}>
            <Form.Item className='for-form' label="账号" required={false}>
              {getFieldDecorator('phone', {
                rules: [
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
                rules: [
                  { required: false, message: '请输入密码!' },
                ]
              })(
                <Input.Password
                  size="large"
                  onChange={this.changeCode}
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>

            <Form.Item className='for-form codeForm' label="验证码" required={false}>
              {getFieldDecorator('sendcode', {
                rules: [
                  { required: true, message: '请输入校验码!' },
                  {
                    validator: (rule, value, callback) => {
                      if (value) {
                        if (value.toLowerCase() === this.state.code.toLowerCase()) {
                          callback()
                          this.setState({
                            sendcode: value,
                            showError: false
                          })
                        } else {
                          callback('请输入正确的验证码')
                          this.setState({
                            showError: true
                          })
                        }
                      } else {
                        callback()
                      }
                    }
                  }
                ],
              })(
                <Input
                  size="large"
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={suffix}
                  onChange={this.changeCode}
                  placeholder="请输入校验码"
                />,
              )}
            </Form.Item>

            <Button
              loading={loading}
              type='primary'
              onClick={this.handleLoginClick}
              style={{ width: '100%', height: '40px', background: '#004EA2', border: "1px solid #004EA2" }}
            >登录</Button>
          </Form>
          
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
