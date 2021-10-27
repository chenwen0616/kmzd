import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';
import { Checkbox,Icon, Input, Popconfirm, message, Spin, Button } from 'antd';
import {cartList, delCart, orderAdd, updateGoodsNum} from '../api/cart'

import '../assets/css/cart.less';
import { Item } from '../../node_modules/rc-menu/lib';

class Cart extends React.Component{
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.state = {
      cartLists: [],
      loading: false,
      numLoading: false,
    }
  }

  componentDidMount(){
    this.getCartList()
  }

  getCartList = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({loading:true})
    cartList({agentId: Number(uInfo.roleId)}).then(res=>{
      this.setState({loading: false})
      if(res&&res.data&&res.data.shoppingCartList){
        this.setState({cartLists:res.data.shoppingCartList})
      }
    })
  }

  handleChangeCart = (index)=>{
    const list = [...this.state.cartLists]
    list[index].checked = !list[index].checked;
    // 单选框中如果有一个是checked值为true
    const some = list.some((item,index)=>{
      return list[index].checked
    })
    this.setState({
      cartLists: list,
      currentOne: some,
    })
  }

  // 减购物车商品数量
  handleMinus=(index)=>{
    const list = [...this.state.cartLists];
    list[index].num--;
    list[index].num = list[index].num < 1 ? 1 : list[index].num;
    this.setState({numLoading: true})
    updateGoodsNum({
      num: list[index].num,
      shoppingCartId: list[index].shoppingCartId
    }).then(res=>{
      this.setState({numLoading: false})
      if(res&&res.result&&res.result.code===200){
        this.getCartList();
      }
    })
  }
  // 增加购物车商品数量
  handleAdd=(index)=>{
    const list = [...this.state.cartLists];
    list[index].num++;
    this.setState({numLoading: true})
    updateGoodsNum({
      num: list[index].num,
      shoppingCartId: list[index].shoppingCartId
    }).then(res=>{
      this.setState({numLoading: false})
      if(res&&res.result&&res.result.code===200){
        this.getCartList();
      }
    })
  }

  // 删除商品
  handleDelPro = (item)=>{
    delCart({
      shoppingCatIdList: [item]
    }).then(res=>{
      if(res&&res.result&&res.result.code===200){
        message.success('成功');
        this.getCartList();
      }
    })
  }

  // 下单
  handlePlaceOrder=()=>{
    const {cartLists} = this.state;
    const list = cartLists.filter(item=>item.checked)
    if(list.length === 0){
      message.warning('请先勾选商品');
      return;
    }
    const jsonList = [];
    list.forEach(nItem=>{
      jsonList.push(nItem.shoppingCartId);
    })
    const newList = JSON.stringify(jsonList)
    console.log(newList, 'newList')
    localStorage.setItem('placeOrderIdList', newList)
    this.props.history.push('/placeorder');
  }

  render(){
    const { cartLists, loading, numLoading} = this.state;
    return (
      <Spin spinning={loading||numLoading}>
        <div className="cartBox">
          <div className="mainCart">
            <h2>购物车信息</h2>
            <ul className="row cartUl">
              {cartLists.length>0 ? cartLists.map((item,index)=>{
                return (
                  <li className="proList">
                    <Checkbox onChange={()=>this.handleChangeCart(index)} />
                    <div className="proDiv">
                      <div className="col-md-10 cartLeft">
                        <div className="imgBox"><img src={item.url} alt='' style={{width:'97%'}} /></div>
                        <div className="proParameter">
                          <div>
                            <p className="proTitle">{item.name ? item.name : ''}</p>
                            <p className="proType">{item.type}</p>
                            <p className="proPrice">价格：<span>￥{item.price}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <Row className="proDiv">
                          <Row className="show-grid" style={{display:'flex'}}>
                            <div className="centerStyle cBox" onClick={()=>this.handleMinus(index)}>
                              <span className="txt"><Icon type="minus" style={{fontSize:14}} /></span>
                            </div>
                            <Col xs={4} md={4} className="numInput centerStyle inputW">
                              <Input value={item.num} />
                            </Col>
                            <div className="centerStyle cBox" onClick={()=>this.handleAdd(index)}>
                              <span className="txt"><Icon type="plus" /></span>
                            </div>
                          </Row>
                          <div className="del-box">
                            <Popconfirm
                              title="确定要删除当前商品吗?"
                              onConfirm={()=>this.handleDelPro(item.shoppingCartId)}
                              okText="确定"
                              cancelText="取消"
                            >
                              <img alt='删除产品' src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} />
                            </Popconfirm>
                          </div>
                        </Row>
                      </div>
                    </div>
                  </li>
                )
              }) : null}
      
            </ul>
            
            <div className="cartBtnBox">
              <Button type='primary' onClick={this.handlePlaceOrder}>下单</Button>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}
export default connect()(Cart)