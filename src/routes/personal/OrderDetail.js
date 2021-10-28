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
      data: [],
    }
  }

  componentDidMount(){
    console.log(this.props, 'this.props')
    const param = this.GetQueryString('id')
    console.log(param, 'param')
  }

  GetQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    console.log(window.location.search,'rrrr')
    if (r != null) return unescape(r[2]); return null;
  }

  getDetail=()=>{
    // const {} = this.props;
    // myOrderDetail({})
  }

  render(){
    return (<div className="personalBox">
      <div className="mainPersonal">
        <div className="detailBox">
          <Row>
            <h2>订单信息</h2>
            <Row className="detailInfoStyle">
              <Col md={5}>订单编号：AKM1001</Col>
              <Col md={7}>订单状态：已发货</Col>
              <Col md={5}>下单时间：2021/10/15</Col>
              <Col md={7}>订单金额：￥2356.98</Col>
              <Col md={5}>实际支付：￥2356.98</Col>
              <Col md={7}>发货时间：2021/10/15</Col>
              <Col md={5}>使用折扣：￥2356.98</Col>
              <Col md={7}>快递单号：SF8908901524</Col>
              <Col md={5}>快递名称：顺丰</Col>
              <Col md={7}>收货日期：2021/10/15</Col>
            </Row>
          </Row>
          <Row>
            <h2>购物信息</h2>
            <ul className="row cartUl">
              <li className="proList">
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
              </li>
              <li className="proList">
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
              </li>
            </ul>
          </Row>
          <Row className="detailInfoStyle">
            <h2>收货人信息</h2>
            <Row>
              <Col md={3}>姓名：ddd</Col>
              <Col md={9}>手机号：13310011001</Col>
              <Col md={12}>地址：北京市朝阳区嘉盛大厦2012</Col>
            </Row>
          </Row>
          <Row className="m-bottom detailInfoStyle">
            <h2>收发票信息</h2>
            <Row>
              <Col md={3}>姓名：ddd</Col>
              <Col md={9}>手机号：13310011001</Col>
              <Col md={12}>地址：北京市朝阳区嘉盛大厦2012</Col>
            </Row>
          </Row>
        </div>
      </div>
    </div>)
  }
}

export default connect()(OrderDetail);