import React from 'react';
import { connect } from 'react-redux';
import {Checkbox, FormGroup, FormControl, Row, Col} from 'react-bootstrap';
import { Icon } from 'antd';

import '../assets/css/cart.less';

class Cart extends React.Component{
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
  }

  render(){
    return (<div className="cartBox">
      <div className="mainCart">
        <h2>购物车信息</h2>
        <ul className="row cartUl">
          <li className="proList">
            <div className="proDiv">
              <div className="col-md-10 cartLeft">
                <Checkbox></Checkbox> 
                <div className="imgBox"></div>
                <div className="proParameter">
                  <div>
                    <p className="proTitle">诊断产品 LICA系列 series</p>
                    <p className="proType">LICA 500</p>
                    <p className="proPrice">开票价：<span>￥5390</span></p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                数量
              </div>
            </div>
          </li>
          <li className="proList">
            <div className="proDiv">
              <div className="col-md-10 cartLeft">
                <Checkbox></Checkbox> 
                <div className="imgBox"></div>
                <div className="proParameter">
                  <div>
                    <p className="proTitle">诊断产品 LICA系列 series</p>
                    <p className="proType">LICA 500</p>
                    <p className="proPrice">开票价：<span>￥5390</span></p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                数量
              </div>
            </div>
          </li>
          <li className="proList">
            <div className="proDiv">
              <div className="col-md-10 cartLeft">
                <Checkbox></Checkbox> 
                <div className="imgBox"></div>
                <div className="proParameter">
                  <div>
                    <p className="proTitle">诊断产品 LICA系列 series</p>
                    <p className="proType">LICA 500</p>
                    <p className="proPrice">开票价：<span>￥5390</span></p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <Row className="proDiv">
                  <Row className="show-grid" style={{display:'flex'}}>
                    <div className="centerStyle cBox">
                      <span className="txt"><Icon type="minus" style={{fontSize:14}} /></span>
                    </div>
                    <Col xs={4} md={4} className="numInput centerStyle inputW">
                      <FormGroup><FormControl type="text" placeholder="" /></FormGroup>
                    </Col>
                    <div className="centerStyle cBox">
                      <span className="txt"><Icon type="plus" /></span>
                    </div>
                  </Row>
                  <div className="del-box">
                    <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} />
                  </div>
                </Row>
                
              </div>
            </div>
          </li>

          <li className="proList">
            <div className="proDiv">
              <div className="col-md-10 cartLeft">
                <Checkbox></Checkbox> 
                <div className="imgBox"></div>
                <div className="proParameter">
                  <div>
                    <p className="proTitle">诊断产品 LICA系列 series</p>
                    <p className="proType">LICA 500</p>
                    <p className="proPrice">开票价：<span>￥5390</span></p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                数量
              </div>
            </div>
          </li>
        </ul>
        <div className="cartBtnBox">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="btn btn-primary cartBuyBtn" role="button">下单</a> 
        </div>
        
      </div>
    </div>)
  }
}
export default connect()(Cart)