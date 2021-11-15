import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Row, Col} from 'react-bootstrap';
import { Checkbox,Icon, Input, Popconfirm, message, Spin, Button } from 'antd';
import {cartList, delCart, updateGoodsNum} from '../api/cart';
import action from '../store/action';

import '../assets/css/cart.less';
import { Item } from '../../node_modules/rc-menu/lib';

class Cart extends React.Component{
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.state = {
      cartLists: [],
      loading: false,
      // numLoading: false,
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
        const newData = [];
        if(res.data.shoppingCartList.length>0){
          res.data.shoppingCartList.forEach(item=>{
            newData.push({...item, checked: false})
          })
        }
        this.props.getData(res.data.shoppingCartList)
        this.setState({cartLists:newData})
      }
    })
  }

  handleChangeCart = (e,index)=>{
    const list = [...this.state.cartLists]
    list[index].checked = !list[index].checked;
    console.log(e.target.value, 'eee')
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
  handleMinus=(e,index)=>{
    e.preventDefault();
    const list = [...this.state.cartLists];
    list[index].num--;
    list[index].num = list[index].num < 1 ? 1 : list[index].num;
    this.updateNum(index)
  }
  // 增加购物车商品数量
  handleAdd=(e,index)=>{
    e.preventDefault();
    const list = [...this.state.cartLists];
    list[index].num++;
    // this.setState({numLoading: true})
    this.updateNum(index)
  }

  handleChangeNumber=(e, index, flag)=>{
    e.preventDefault();
    const list = [...this.state.cartLists];
    list[index].num = e.target.value < 1 ? 1 : e.target.value;
    if(flag){
      this.updateNum(index)
    }else{
      this.setState({cartLists:list})
    }
  }

  updateNum = (index)=>{
    const list = [...this.state.cartLists];
    updateGoodsNum({
      num: list[index].num,
      shoppingCartId: list[index].shoppingCartId
    }).then(res=>{
      // this.setState({numLoading: false})
      if(res&&res.result&&res.result.code===200){
        // this.getCartList();
        this.setState({cartLists:list})
      }
    })
  }
  
  // 删除商品
  handleDelPro = (item)=>{
    delCart({
      shoppingCartIdList: item
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

  handleDelOrder=()=>{
    const {cartLists} = this.state;
    const list = cartLists.filter(item=>item.checked);
    if(list.length === 0){
      message.warning('请先勾选商品');
      return;
    }
    const listIds=[];
    list.forEach(item=>{
      listIds.push(item.shoppingCartId)
    })
    this.handleDelPro(listIds)
  }

  render(){
    const { cartLists, loading} = this.state;
    return (
      <Spin spinning={loading}>
        <div className='navBreadTitle'>
          <div className='container'>
            <a href='/#/home'>首页</a>
            <span> / 购物车</span>
          </div>
        </div>
        <div className="cartBox" style={{minHeight:'85vh'}}>
          <div className="mainCart" style={{position:'relative'}}>
            <h2>购物车信息</h2>
            <ul className="row cartUl" style={{minHeight:'60vh'}}>
              {cartLists.length>0 ? cartLists.map((item,index)=>{
                return (
                  <li className="proList" key={index}>
                    <Checkbox checked={!!item.checked} onChange={(e)=>this.handleChangeCart(e,index)} />
                    <div className="proDiv">
                      <div className="col-md-10 cartLeft">
                        <div className="imgBox"><img src={item.url} alt='' style={{width:'97%'}} /></div>
                        <div className="proParameter">
                          <div>
                            <p className="proTitle">{item.name ? item.name : ''}</p>
                            <p className="proType">{item.instrumentType?item.instrumentType: ''}</p>
                            <p className="proPrice">价格：<span>￥{item.price}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <Row className="proDiv">
                          <Row className="show-grid" style={{display:'flex'}}>
                            <div className="centerStyle cBox" onClick={(e)=>this.handleMinus(e,index)}>
                              <span className="txt"><Icon type="minus" style={{fontSize:14}} /></span>
                            </div>
                            <Col xs={4} md={4} className="numInput centerStyle inputW">
                              <Input value={item.num} onChange={e=>this.handleChangeNumber(e,index)} onPressEnter={e=>this.handleChangeNumber(e,index,'flag')} onBlur={e=>this.handleChangeNumber(e,index,'flag')} />
                            </Col>
                            <div className="centerStyle cBox" onClick={(e)=>this.handleAdd(e,index)}>
                              <span className="txt"><Icon type="plus" /></span>
                            </div>
                          </Row>
                          <div className="del-box">
                            <Popconfirm
                              title="确定要删除当前商品吗?"
                              onConfirm={()=>this.handleDelPro([item.shoppingCartId])}
                              okText="确定"
                              cancelText="取消"
                            >
                              <div className='backImg'></div>
                              {/* <img alt='删除产品' src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} /> */}
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
              <Popconfirm
                title="确定要删除当前商品吗?"
                onConfirm={this.handleDelOrder}
                okText="确定"
                cancelText="取消"
              >
                <Button type='danger' style={{marginRight:10}}>删除选中商品</Button>
              </Popconfirm>
              <Button type='primary' onClick={this.handlePlaceOrder}>下单</Button>
            </div>
          </div>
        </div>
      </Spin>
    )
  }
}

export default connect(state=>({...state.cart}),action.cart)(Cart)