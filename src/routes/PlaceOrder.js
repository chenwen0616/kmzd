import React from 'react';
import { connect } from 'react-redux';
import {Button, Table, Input, Form, message, Modal} from 'antd';
import { confirmOrderInfo, orderAdd, cartList } from '../api/cart'
import action from '../store/action'
import { agentAddrAdd } from '../api/person';

import '../assets/css/cart.less';

class PlaceOrder extends React.Component{
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
    },
    {
      title: '使用金额',
      dataIndex: 'useDiscount',
      render:(text,record)=>{
        return (
        <Form.Item style={{marginBottom:0}}>
          {this.props.form.getFieldDecorator('useDiscount' + record.discountIssueId, {
            // rules:[
            //   {validator: this.checkDiscount,},
            // ],
            initialValue: record.useDiscount ? record.useDiscount : 0
          })(<Input placeholder="请输入" onChange={(e)=>this.changeUseDiscount(e,record.discountIssueId)} />)}
        </Form.Item>
        )
      }
    }
  ];
  constructor(props){
    super(props);
    this.state={
      addressList:[],
      addressInvoiceList: {},
      addressReceiveList: {},
      placeOrderList:[],
      discountPrice: 0,
      totalNum: 0,
      afterPrice: 0,
      totalPrice: 0,
      orderInfo: {},
      addrLoading: false,
      addrVisible: false,
    }
  }

  componentDidMount(){
    this.getOrderInfo();
  }

  getOrderInfo = ()=>{
    const orderIdList = JSON.parse(localStorage.getItem('placeOrderIdList'));
    confirmOrderInfo({shoppingCartIdList: orderIdList}).then(res=>{
      if(res&&res.data){
        this.setState({orderInfo:res.data},()=>{
          this.getTotal(res.data)
        })
      }
    })
  }

  // componentWillUnmount(){
  //   localStorage.removeItem('placeOrderIdList')
  // }

  getTotal=(data)=>{
    const proTotal = data.orderItemList&&data.orderItemList.length>0 ? data.orderItemList.reduce((cur,next)=>{
      return cur + next.price*next.num
    },0) : 0
    const disPrice = data.discountList&&data.discountList.length>0 ? data.discountList.reduce((cur,next)=>{
      return cur + next.useDiscount
    },0) : 0
    console.log(data, 'data')
    console.log(proTotal, 'proTotal')
    console.log(disPrice, 'disPrice')
    const totalNum = data.orderItemList&&data.orderItemList.length>0 ? data.orderItemList.reduce((cur,next)=>{
      return cur + next.num
    },0) : 0

    this.setState({
      afterPrice: parseFloat(proTotal) - parseFloat(disPrice),
      discountPrice: disPrice,
      totalNum,
    })
  }

  checkDiscount=(rule, value, callback)=>{
    console.log(value, 'value', rule)
  }

  changeUseDiscount=(e,id)=>{
    const request = {...this.state.orderInfo};
    request.discountList.forEach(item=>{
      if(item.discountIssueId === id){
        item.useDiscount = parseFloat(e.target.value)
      }
    })
    this.getTotal(request)
    console.log(request, 'request')
    this.setState({
      orderInfo: request,
    })
  }

  // 下单提交
  handleOrderAdd = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    const {orderInfo} = this.state;
    const requestVo = {};
    Object.assign(requestVo, orderInfo);
    requestVo.useMoney = this.state.discountPrice;
    requestVo.payMoney = this.state.afterPrice;
    console.log(requestVo, 'requestVo 下单参数');
    
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
      }
      console.log(res, 'res 下单后返回的结果')
    })
  }

  // 新增默认地址
  handleAddVisible = ()=>{
    this.setState({addrVisible:true})
  }
  handleCancelAddr = ()=>{
    this.setState({addrVisible:false})
  }
  handleAdd = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    const {form} = this.props;
    form.validateFields((err, values) => {
      if(err) return;
      this.setState({addrLoading:true})
      const requestVo = {};
      Object.assign(requestVo, values);
      requestVo.type = this.state.addrType;
      // requestVo.address = values.area.length>0 ? values.area[0]+values.area[1]+values.area[2]+values.detailAddr : '';
      requestVo.address = values.detailAddr;
      requestVo.agentId = uInfo.roleId;
      requestVo.def = '1';
      agentAddrAdd(requestVo).then(res=>{
        this.setState({addrLoading:false})
        if(res&&res.result&&res.result.code ===200){
          message.success('成功！');
          this.handleCancelAddr();
          this.getOrderInfo();
        }
      })
    })
  }

  render(){
    const { addressInvoiceList, discountPrice, orderInfo, addrVisible, addrLoading } = this.state;
    const {form} = this.props;
    return(
      <div className="cartBox">
        <div className="mainCart">
          <div className="addressInfo">
            <h3>地址信息</h3>
            <p className="selP">请选择配送地址</p>
            <p className="tip">您想使用的是下方显示的地址吗？如果是，点击相应的“配送到这个地址”按钮，或者您可以输入一个新的送货地址：<a onClick={this.handleAddVisible}>添加新地址</a></p>
            <div className="addrMsg">
              <h3>收货地址</h3>
              <div>
                {/* <p>所在地区：{}</p> */}
                <p>联系人：{((orderInfo&&orderInfo.goodAddress&&orderInfo.goodAddress.consignee))?orderInfo.goodAddress.consignee : ''}</p>
                <p>地址：{(orderInfo&&orderInfo.goodAddress&&orderInfo.goodAddress.address) ? orderInfo.goodAddress.address : ''}</p>
                <p>手机号：{(orderInfo&&orderInfo.goodAddress&&orderInfo.goodAddress.phone) ? orderInfo.goodAddress.phone : ''}</p>
              </div>
            </div>
            <div className="addrMsg">
              <h3>发票地址</h3>
              <div>
                {/* <p>所在地区：{}</p> */}
                <p>联系人：{((orderInfo&&orderInfo.invoiceAddress&&orderInfo.invoiceAddress.consignee))?orderInfo.invoiceAddress.consignee : ''}</p>
                <p>地址：{(orderInfo&&orderInfo.invoiceAddress&&orderInfo.invoiceAddress.address) ? orderInfo.invoiceAddress.address : ''}</p>
                <p>手机号：{(orderInfo&&orderInfo.invoiceAddress&&orderInfo.invoiceAddress.phone) ? orderInfo.invoiceAddress.phone : ''}</p>
              </div>
            </div>
          </div>
          <ul className="row cartUl pOul">
            {orderInfo.orderItemList&&orderInfo.orderItemList.length>0 ? orderInfo.orderItemList.map(item=>{
              return (
                <li className="proList">
                  <div className="proDiv">
                    <div className="col-md-9 cartLeft">
                      <div className="imgBox"><img src={item.url} alt={item.url} style={{width:'98%'}} /></div>
                      <div className="proParameter">
                        <div>
                          <p className="proTitle">{item.name}</p>
                          <p className="proType">{item.instrumentType}</p>
                          <p className="proPrice">开票价：<span>￥{item.price}</span></p>
                          <p className='proType'>{item.discountDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1">
                      X{item.num}
                    </div>
                    <div className="col-md-2">
                      总价：{item.price&&item.num ? `￥${Number(item.price)*item.num}` : 0}
                    </div>
                  </div>
                </li>
              )
            }) : null}
            
          </ul>
          <div className="orderTable">
            <Table 
              columns={this.columns} 
              dataSource={orderInfo.discountList?orderInfo.discountList:[]} 
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

        {addrVisible? 
        <Modal
            title='新增地址'
            className='addrBox'
            visible={addrVisible}
            onOk={this.handleAdd}
            onCancel={this.handleCancelAddr}
            confirmLoading={addrLoading}
          >
            <Form.Item label={'收货人'}>
              {form.getFieldDecorator('consignee',{
                rules: [
                  { required: true, message: '请输入收货人!' },
                ],
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'详细地址'}>
              {form.getFieldDecorator('detailAddr',{
                rules: [
                  { required: true, message: '请输入详细地址!' },
                ]
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'手机号码'}>
              {form.getFieldDecorator('phone',{
                rules: [
                  { required: true, message: '请输入手机号码!' },
                ]
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'固定电话'}>
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
            </Form.Item>
          </Modal> : null}
      </div>
    )
  }
}

export default Form.create()(connect(state=>({...state.cart}),action.cart)(PlaceOrder));