import React from 'react';
import { connect } from 'react-redux';
import { Button, Table, Input, Form, message, Modal, Popconfirm } from 'antd';
import { confirmOrderInfo, orderAdd, cartList } from '../api/cart'
import { Link } from 'react-router-dom';
import action from '../store/action'
import { agentAddrUpdate, agentAddrDel } from '../api/person';
import { getDict } from '../api/common';  // 调用字典接口

import '../assets/css/cart.less';
import { strictEqual } from 'assert';

class PlaceOrder extends React.Component {
  columns = [
    {
      title: '序号',
      dataIndex: 'seq',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '编号',
      dataIndex: 'discountIssueId',
    },
    {
      title: '剩余金额',
      dataIndex: 'balance',
      render: (text, record) => {
        return (
          <Form.Item style={{ marginBottom: 0 }}>
            {this.props.form.getFieldDecorator('balance' + record.discountIssueId)(
              <span>{text? text.toFixed(2) : 0}</span>
            )}
          </Form.Item>
        )
      }
    },
    {
      title: '使用金额',
      dataIndex: 'useDiscount',
      render: (text, record) => {
        return (
          <Form.Item style={{ marginBottom: 0 }}>
            {this.props.form.getFieldDecorator('useDiscount' + record.discountIssueId, {
              rules: [
                {
                  validator: this.checkDiscount
                },
              ],
              initialValue: record.useDiscount ? record.useDiscount : 0
            })(<Input placeholder="请输入" onChange={(e) => this.changeUseDiscount(e, record.discountIssueId)} />)}
          </Form.Item>
        )
      }
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      addressList: [],
      addressInvoiceList: {},
      addressReceiveList: {},
      placeOrderList: [],
      discountPrice: 0,
      totalNum: 0,
      afterPrice: 0,
      totalPrice: 0,
      orderInfo: {},
      addrLoading: false,
      addrVisible: false,
      addrType: 1, // 收货地址 or 发票地址,
      addressId: 0,
      bottleData: [],
      regionData: [],
    }
  }

  componentDidMount() {
    this.getOrderInfo();
    this.getRegionData();
    this.getBottleData();
  }

  checkDiscount = (rule, value, callback) => {
    var reg = /^\d+(?=\.{0,1}\d+$|$)/;
    if (!reg.test(value)) {
      callback('请输入正确的数值')
    } else {
      callback()
    }
  }

  getOrderInfo = () => {
    const orderIdList = JSON.parse(localStorage.getItem('placeOrderIdList'));
    confirmOrderInfo({ shoppingCartIdList: orderIdList }).then(res => {
      if (res && res.data) {
        this.setState({ orderInfo: res.data }, () => {
          this.getTotal(res.data)
        })
      }
    })
  }

  // componentWillUnmount(){
  //   localStorage.removeItem('placeOrderIdList')
  // }

  getTotal = (data) => {
    const disPrice = data.discountList && data.discountList.length > 0 ? data.discountList.reduce((cur, next) => {
      return ((cur*10000 + next.useDiscount*10000)/10000).toFixed(2)
    }, 0) : 0
    const totalNum = data.orderItemList && data.orderItemList.length > 0 ? data.orderItemList.reduce((cur, next) => {
      return cur + next.num
    }, 0) : 0
    this.setState({
      afterPrice: ((parseFloat(data.sumMoney) * 100000 - parseFloat(disPrice) * 100000 - data.fullReductionMoney * 100000) / 100000).toFixed(2),
      discountPrice: disPrice,
      totalNum,
    })
  }

  // 获取瓶型字典
  getBottleData = () => {
    getDict({
      dictType: 'crm_reagent_bottle'
    }).then(res => {
      if (res && res.data) {
        if (res.data.dictList && res.data.dictList.length > 0) {
          this.setState({ bottleData: res.data.dictList })
        }
      } else {
        message.error(res.result.message)
      }
    })
  }

  // 获取地域字典
  getRegionData = () => {
    getDict({ dictType: 'crm_reagent_region' }).then(res => {
      if (res && res.data) {
        if (res.data.dictList && res.data.dictList.length > 0) {
          this.setState({ regionData: res.data.dictList })
        }
      } else {
        message.error(res.result.message)
      }
    })
  }

  // checkDiscount=(rule, value, callback)=>{
  //   callback();
  // }

  changeUseDiscount = (e, id) => {
    const request = { ...this.state.orderInfo };
    request.discountList.forEach(item => {
      if (item.discountIssueId === id) {
        item.useDiscount = parseFloat(e.target.value)
      }
    })
    this.getTotal(request)
    // console.log(request, 'request')
    this.setState({
      orderInfo: request,
    })
  }

  // 下单提交
  handleOrderAdd = () => {
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    const { orderInfo } = this.state;
    const requestVo = {};
    Object.assign(requestVo, orderInfo);
    const newArr = [];
    const isFlag = [];
    requestVo.useMoney = this.state.discountPrice ? this.state.discountPrice : 0;
    requestVo.payMoney = this.state.afterPrice;
    orderInfo.discountList.forEach(item => {
      if (!item.useDiscount) {
        item.useDiscount = 0;
      }
      newArr.push(item)
    })
    requestVo.discountList = newArr;
    requestVo.discountList.forEach(item => {
      if (item.useDiscount > item.balance || item.useDiscount > requestVo.sumMoney) {
        isFlag.push(false)
      } else {
        isFlag.push(true);
      }
    })
    const every = isFlag.every(item => item);
    if (!every) {
      message.warning('使用金额不能超过剩余金额或者应付金额');
      return;
    };
    const someD = requestVo.discountList.some(dis => Number(dis.useDiscount) < 0);
    if (someD) {
      return;
    }
    orderAdd(requestVo).then(res=>{
      if(res&&res.result&&res.result.code&&res.result.code === 200){
        localStorage.removeItem('placeOrderIdList')
        message.success('成功')
        this.props.history.push('/home');
        cartList({agentId: Number(uInfo.roleId)}).then(response=>{
          this.setState({loading: false})
          if(response&&response.data&&response.data.shoppingCartList){
            this.props.getData(response.data.shoppingCartList)
          }
        })
      }else{
        message.error(res.result.message)
      }
    })
  }

  // 编辑默认地址
  handleAddVisible = (flag, addrType, addrId) => {
    this.setState({
      addrVisible: true,
      addrType,
      addressId: addrId
    })
  }
  handleCancelAddr = () => {
    this.setState({ addrVisible: false })
  }
  handleAdd = () => {
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      this.setState({ addrLoading: true })
      const requestVo = {};
      Object.assign(requestVo, values);
      requestVo.type = this.state.addrType;
      // requestVo.address = values.area.length>0 ? values.area[0]+values.area[1]+values.area[2]+values.detailAddr : '';
      requestVo.address = values.detailAddr;
      requestVo.agentId = uInfo.roleId;
      requestVo.def = '1';
      requestVo.addressId = this.state.addressId;
      agentAddrUpdate(requestVo).then(res => {
        this.setState({ addrLoading: false })
        if (res && res.result && res.result.code === 200) {
          message.success('成功！');
          this.handleCancelAddr();
          this.getOrderInfo();
        }
      })
    })
  }

  // 删除地址
  handleDel = (addrId) => {
    agentAddrDel({ addressId: addrId }).then(res => {
      if (res && res.result && res.result.code === 200) {
        message.success('成功！');
        this.getOrderInfo();
      }
    })
  }

  render() {
    const { discountPrice, orderInfo, addrVisible, addrLoading, addrType, bottleData, regionData } = this.state;
    const { form } = this.props;
    let consignee;
    let address;
    let phone;
    if (addrType === 1) {
      consignee = orderInfo && orderInfo.goodAddress && orderInfo.goodAddress.consignee ? orderInfo.goodAddress.consignee : '';
      address = orderInfo && orderInfo.goodAddress && orderInfo.goodAddress.address ? orderInfo.goodAddress.address : '';
      phone = orderInfo && orderInfo.goodAddress && orderInfo.goodAddress.phone ? orderInfo.goodAddress.phone : '';
    } else {
      consignee = orderInfo && orderInfo.invoiceAddress && orderInfo.invoiceAddress.consignee ? orderInfo.invoiceAddress.consignee : '';
      address = orderInfo && orderInfo.invoiceAddress && orderInfo.invoiceAddress.address ? orderInfo.invoiceAddress.address : '';
      phone = orderInfo && orderInfo.invoiceAddress && orderInfo.invoiceAddress.phone ? orderInfo.invoiceAddress.phone : '';
    }

    return (
      <div className="cartBox">
        <div className="mainCart">
          <div className="addressInfo">
            <h3>地址信息</h3>
            <p className="selP">请选择配送地址</p>
            <p className="tip">您想使用的是下方显示的地址吗？如果不是，您可以选择另一个地址或者输入一个新的送货地址：选择或
              <Link to={{ pathname: '/personal/addrmanage', query: { placeType: '1' } }}>添加新地址</Link>
            </p>
            <div className="addrMsg">
              <h3>收货地址</h3>
              <div>
                <p>联系人：{((orderInfo && orderInfo.goodAddress && orderInfo.goodAddress.consignee)) ? orderInfo.goodAddress.consignee : ''}</p>
                <p>地址：{(orderInfo && orderInfo.goodAddress && orderInfo.goodAddress.address) ? orderInfo.goodAddress.address : ''}</p>
                <p>手机号：{(orderInfo && orderInfo.goodAddress && orderInfo.goodAddress.phone) ? orderInfo.goodAddress.phone : ''}</p>
              </div>
              <Popconfirm
                title="是否确认删除该地址?"
                onConfirm={() => this.handleDel(orderInfo.goodAddress.addressId)}
                okText="确定"
                cancelText="取消"
              >
                <div className='backImg addrPosition' style={{ cursor: 'pointer' }}></div>
              </Popconfirm>
              <div className='editTxt' onClick={() => this.handleAddVisible(true, 1, orderInfo.goodAddress.addressId)}>编辑</div>
            </div>
            <div className="addrMsg">
              <h3>发票地址</h3>
              <div>
                {/* <p>所在地区：{}</p> */}
                <p>联系人：{((orderInfo && orderInfo.invoiceAddress && orderInfo.invoiceAddress.consignee)) ? orderInfo.invoiceAddress.consignee : ''}</p>
                <p>地址：{(orderInfo && orderInfo.invoiceAddress && orderInfo.invoiceAddress.address) ? orderInfo.invoiceAddress.address : ''}</p>
                <p>手机号：{(orderInfo && orderInfo.invoiceAddress && orderInfo.invoiceAddress.phone) ? orderInfo.invoiceAddress.phone : ''}</p>
              </div>
              <div className='editTxt' onClick={() => this.handleAddVisible(true, 2, orderInfo.invoiceAddress.addressId)}>编辑</div>
            </div>
          </div>
          <ul className="row cartUl pOul">
            {orderInfo.orderItemList && orderInfo.orderItemList.length > 0 ? orderInfo.orderItemList.map(item => {
              return (
                <li className="proList" key={item.shoppingCartId}>
                  <div className="proDiv">
                    <div className="col-md-9 cartLeft">
                      <div className="imgBox"><img src={item.url} alt={item.url} style={{ width: '98%' }} /></div>
                      <div className="proParameter">
                        <div>
                          <p className="proTitle">{item.name}</p>
                          <p className="proType">
                            {item.instrumentTypeName ? <span style={{ display: 'inline-block', marginRight: 20 }}>{item.instrumentTypeName}</span> : ''}
                            <span style={{ marginRight: 15, minWidth: 50, display: 'inline-block' }}>瓶型：{(item.bottleType && bottleData.length > 0) ? bottleData.find(b => b.dictValue === item.bottleType).dictLabel : ''}</span>
                            <span>地域：{(item.regionCode && regionData.length > 0) ? regionData.find(r => r.dictValue === item.regionCode).dictLabel : ''}</span>
                          </p>
                          <p className="proPrice">开票价：<span>￥{item.price}</span></p>
                          <p className='proType'>{item.discountDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1">
                      X{item.num}
                    </div>
                    <div className="col-md-2">
                      总价：{item.price && item.num ? `￥${Number(item.price) * item.num}` : 0}
                    </div>
                  </div>
                </li>
              )
            }) : null}

          </ul>
          <div className="orderTable">
            <Table
              columns={this.columns}
              dataSource={orderInfo.discountList ? orderInfo.discountList : []}
              pagination={false}
              bordered={true}
            />
          </div>

          <div className="totalBox">
            {discountPrice ?
              <p>
                <span>{`使用优惠券，一共优惠${discountPrice}元，`}</span>
                <span className="totalNum">共{this.state.totalNum}件商品，一共￥{this.state.afterPrice}元</span>
              </p>
              : null}
            <Button type="primary" onClick={this.handleOrderAdd}>提交</Button>
          </div>

        </div>

        {addrVisible ?

          <Modal
            title='编辑地址'
            className='addrBox'
            visible={addrVisible}
            onOk={this.handleAdd}
            onCancel={this.handleCancelAddr}
            confirmLoading={addrLoading}
          >
            <Form.Item label={'收货人'}>
              {form.getFieldDecorator('consignee', {
                rules: [
                  { required: true, message: '请输入收货人!' },
                ],
                initialValue: consignee
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'详细地址'}>
              {form.getFieldDecorator('detailAddr', {
                rules: [
                  { required: true, message: '请输入详细地址!' },
                ],
                initialValue: address
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'手机号码'}>
              {form.getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请输入手机号码!' },
                  {
                    pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
                    message: '手机号格式错误！',
                  },
                ],
                initialValue: phone
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            {/* <Form.Item label={'固定电话'}>
              {form.getFieldDecorator('telephone',{
                rules: [
                  { required: false, message: '请输入固定电话!' },
                ]
              })(
                <Input placeholder='请输入' />
              )}
            </Form.Item>
            <Form.Item label={'邮箱编码'}>
              {form.getFieldDecorator('email',{
                rules: [
                  { required: false, message: '请输入邮箱编码!' },
                ]
              })(
                <Input placeholder='请输入' />
              )}
            </Form.Item> */}
          </Modal> : null}
      </div>
    )
  }
}

export default Form.create()(connect(state => ({ ...state.cart }), action.cart)(PlaceOrder));