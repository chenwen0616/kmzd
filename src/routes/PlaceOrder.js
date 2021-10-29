import React from 'react';
import { connect } from 'react-redux';
import {Button,  Table, Input, Form, message} from 'antd';
import { confirmOrderInfo, orderAdd, cartList } from '../api/cart'
import action from '../store/action'

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
      orderInfo: {}
    }
  }

  componentDidMount(){
    const orderIdList = JSON.parse(localStorage.getItem('placeOrderIdList'));
    console.log(orderIdList, 'orderIdList')
    confirmOrderInfo({shoppingCartIdList: orderIdList}).then(res=>{
      if(res&&res.data){
        this.setState({orderInfo:res.data},()=>{
          this.getTotal(res.data)
        })
      }
    })
  }

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

  render(){
    const { addressInvoiceList, discountPrice, orderInfo } = this.state;
    return(
      <div className="cartBox">
        <div className="mainCart">
          <div className="addressInfo">
            <h3>地址信息</h3>
            <p className="selP">请选择配送地址</p>
            <p className="tip">您想使用的是下方显示的地址吗？如果是，点击相应的“配送到这个地址”按钮，或者您可以输入一个新的送货地址：<a>添加新地址</a></p>
            <div className="addrMsg">
              <h3>收货地址</h3>
              <div>
                <p>所在地区：{}</p>
                <p>地址：{(orderInfo&&orderInfo.goodAddress&&orderInfo.goodAddress.address) ? orderInfo.goodAddress.address : ''}</p>
                <p>手机号：{(orderInfo&&orderInfo.goodAddress&&orderInfo.goodAddress.phone) ? orderInfo.goodAddress.phone : ''}</p>
              </div>
            </div>
            <div className="addrMsg">
              <h3>发票地址</h3>
              <div>
                <p>所在地区：{}</p>
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
                          <p className="proType">{item.type}</p>
                          <p className="proPrice">开票价：<span>￥{item.price}</span></p>
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
            <p>
              <span>{`使用优惠券，一共优惠${discountPrice}元，`}</span>
              <span className="totalNum">共{this.state.totalNum}件商品，一共￥{this.state.afterPrice}元</span>
            </p>
            <Button type="primary" onClick={this.handleOrderAdd}>提交</Button>
          </div>
          
        </div>
      </div>
    )
  }
}

export default Form.create()(connect(state=>({...state.cart}),action.cart)(PlaceOrder));