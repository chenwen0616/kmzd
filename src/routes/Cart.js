import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { FormGroup, FormControl, Row, Col} from 'react-bootstrap';
import { Checkbox,Icon, Input } from 'antd';
import {cartList} from '../api/cart'

import '../assets/css/cart.less';
import { Item } from '../../node_modules/rc-menu/lib';

class Cart extends React.Component{
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.state = {
      cartLists: [],
    }
  }

  componentDidMount(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    cartList({agentId: Number(uInfo.roleId)}).then(res=>{
      if(res&&res.data&&res.data.shoppingCartList){
        this.setState({cartLists:res.data.shoppingCartList})
      }
      console.log(res, 'res 购物车列表')
    })
  }

  handleChangeCart = (checkedVal)=>{
    console.log(checkedVal, '选中的值')
  }

  render(){
    const { cartLists} = this.state;
    const newArr = [];
    if(cartLists.length>0){
      cartLists.forEach(item=>{
        newArr.push({
          label: <li className='proList'>
            <div className="proDiv">
              <div className="col-md-10 cartLeft">
                <div className="imgBox"><img src={item.url} alt='' style={{width:'97%'}} /></div>
                <div className="proParameter">
                  <div>
                    <p className="proTitle">{item.name ? item.name : ''}诊断产品 LICA系列 series</p>
                    <p className="proType">{item.type}</p>
                    <p className="proPrice">价格：<span>￥{item.price}</span></p>
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
                      <Input value={item.num} />
                    </Col>
                    <div className="centerStyle cBox">
                      <span className="txt"><Icon type="plus" /></span>
                    </div>
                  </Row>
                  <div className="del-box">
                    <img alt='删除产品' src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} />
                  </div>
                </Row>
              </div>
            </div>
          </li>,
          value: item,
        })
      })
    }

    return (<div className="cartBox">
      <div className="mainCart">
        <h2>购物车信息</h2>
        <ul className="row cartUl">
          <Checkbox.Group
            options={newArr}
            onChange={this.handleChangeCart}
            defaultValue={[]}
          />
          
          {/* {cartLists.length>0 ? cartLists.map((item,index)=>{
            return (
              <li className="proList">
                <div className="proDiv">
                  <div className="col-md-10 cartLeft">
                    <div className="imgBox"><img src={item.url} alt='' style={{width:'97%'}} /></div>
                    <div className="proParameter">
                      <div>
                        <p className="proTitle">{item.name ? item.name : ''}诊断产品 LICA系列 series</p>
                        <p className="proType">{item.type}</p>
                        <p className="proPrice">价格：<span>￥{item.price}</span></p>
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
                          <Input value={item.num} />
                        </Col>
                        <div className="centerStyle cBox">
                          <span className="txt"><Icon type="plus" /></span>
                        </div>
                      </Row>
                      <div className="del-box">
                        <img alt='删除产品' src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} />
                      </div>
                    </Row>
                  </div>
                </div>
              </li>
            )
          }) : null} */}
  
        </ul>
        <div className="cartBtnBox">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link 
            to="/placeorder" 
            className="btn btn-primary cartBuyBtn" 
            role="button"
          >下单</Link> 
        </div>
        
      </div>
    </div>)
  }
}
export default connect()(Cart)