import React from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {myOrderDetail} from '../../api/person'

import '../../assets/css/cart.less';
import '../../assets/css/personal.less';

class OrderDetail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      orderDetail: [],
    }
  }

  componentDidMount(){
    console.log(this.props, 'this.props')
    this.getDetail();
  }

  getQueryVariable=(variable)=>{
    const {location}= this.props;
    const query = location.search;
    const vars = query.split("=");
    // console.log(vars, 'vars')
    return vars[1];
  }

  getDetail=()=>{
    const param = this.getQueryVariable()
    myOrderDetail({oderId:param}).then(res=>{
      if(res&&res.data){
        this.setState({orderDetail:res.data})
      }
      console.log(res, 'res 订单详情')
    })
  }

  render(){
    const {orderDetail} = this.state;
    const orderStatus = [
      {label: '已订货', value: '1'},
      {label: '已付款', value: '2'},
      {label: '已发货', value: '3'},
      {label: '已收货', value: '4'},
      {label: '已取消', value: '5'},
    ]
    return (<div className="personalBox">
      <div className="mainPersonal">
        <div className="detailBox">
          <Row>
            <h2>订单信息</h2>
            <Row className="detailInfoStyle">
              <Col md={5}>订单编号：{orderDetail&&orderDetail.orderId ? orderDetail.orderId : ''}</Col>
              <Col md={7}>订单状态：{orderDetail&&orderDetail.status ? orderStatus.find(item=>item.value === orderDetail.status).label : ''}</Col>
              <Col md={5}>下单时间：{orderDetail&&orderDetail.orderTime ? orderDetail.orderTime : ''}</Col>
              <Col md={7}>订单金额：￥{orderDetail&&orderDetail.payMoney ? orderDetail.payMoney : ''}</Col>
              <Col md={5}>实际支付：￥{orderDetail&&orderDetail.sumMoney ? orderDetail.sumMoney : ''}</Col>
              <Col md={7}>发货时间：{orderDetail&&orderDetail.sendTime ? orderDetail.sendTime : ''}</Col>
              <Col md={5}>使用折扣：￥{orderDetail&&orderDetail.useDiscount ? orderDetail.useDiscount : 0}</Col>
              <Col md={7}>快递单号：{orderDetail&&orderDetail.oddNumber ? orderDetail.oddNumber : ''}</Col>
              <Col md={5}>快递名称：{orderDetail&&orderDetail.oddCompany ? orderDetail.oddCompany : ''}</Col>
              <Col md={7}>收货日期：{orderDetail&&orderDetail.signTime ? orderDetail.signTime : ''}</Col>
            </Row>
          </Row>
          <Row>
            <h2>购物信息</h2>
            <ul className="row cartUl">
              {orderDetail&&orderDetail.orderItemList ? orderDetail.orderItemList.map(item=>{
                  return (
                    <li className="proList">
                      <div className="proDiv">
                        <div className="col-md-10 cartLeft">
                          <div className="imgBox">
                            <img src={item.url?item.url:''} alt={''} style={{width:'98%'}} />
                          </div>
                          <div className="proParameter">
                            <div>
                              <p className="proTitle">{item.name?item.name:''}</p>
                              <p className="proType">{item.type?item.type:''}</p>
                              <p className="proPrice">开票价：<span>￥{item.price?item.price:''}</span></p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1">
                          X{item.num?item.num:0}
                        </div>
                        <div className="col-md-1 fcolor">
                          ￥{(item.num&&item.price) ? item.num*item.price : 0}
                        </div>
                      </div>
                    </li>
                  )
              }) : null}
              
              {/* <li className="proList">
                <div className="proDiv">
                  <div className="col-md-10 cartLeft">
                    <div className="imgBox"></div>
                    <div className="proParameter">
                      <div>
                        <p className="proTitle">诊断产品 LICA系列 series</p>
                        <p className="proType">LICA 500</p>
                        <p className="proPrice">开票价：<span>￥5390</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1">
                    X10
                  </div>
                  <div className="col-md-1 fcolor">
                    ￥5390
                  </div>
                </div>
              </li> */}
            </ul>
          </Row>
          <Row className="detailInfoStyle">
            <h2>收货人信息</h2>
            <Row>
              <Col md={3}>姓名：{(orderDetail.goodAddress&&orderDetail.goodAddress.consignee) ?orderDetail.goodAddress.consignee :''}</Col>
              <Col md={9}>手机号：{(orderDetail.goodAddress&&orderDetail.goodAddress.phone) ?orderDetail.goodAddress.phone :''}</Col>
              <Col md={12}>地址：{(orderDetail.goodAddress&&orderDetail.goodAddress.address) ?orderDetail.goodAddress.address :''}</Col>
            </Row>
          </Row>
          <Row className="m-bottom detailInfoStyle">
            <h2>收发票信息</h2>
            <Row>
              <Col md={3}>姓名：{(orderDetail.invoiceAddress&&orderDetail.invoiceAddress.consignee) ? orderDetail.invoiceAddress.consignee: ''}</Col>
              <Col md={9}>手机号：{(orderDetail.invoiceAddress&&orderDetail.invoiceAddress.phone) ? orderDetail.invoiceAddress.phone: ''}</Col>
              <Col md={12}>地址：{(orderDetail.invoiceAddress&&orderDetail.invoiceAddress.address) ? orderDetail.invoiceAddress.address: ''}</Col>
            </Row>
          </Row>
        </div>
      </div>
    </div>)
  }
}

export default connect()(OrderDetail);