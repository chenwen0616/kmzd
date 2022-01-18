import React from 'react';
import { connect } from 'react-redux';
import { Badge, Col } from 'react-bootstrap'
import { withRouter, NavLink} from 'react-router-dom';
import { cartList } from '../api/cart';

import action from '../store/action';

class Navs extends React.Component{
  constructor(props){
    super(props);

    this.state={
      cartLen: 0,
      hidden: window.location.hash.includes('/login'),
    }
  }

  componentDidMount(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    if(uInfo){
      this.reduxGetCartData(uInfo)
    }
    console.log(window.location.hash, 'hash')
    console.log(this.props, 'props')
    console.log(this.state.hidden, 'hidden');
    window.addEventListener("hashchange", () => {
      this.setState({hidden:window.location.hash.includes('/login')})
    })
    // window.onhashchange = () => {
    //   this.setState({hidden:window.location.hash.includes('/login')})
    // }
  }

  // 存入redux
  reduxGetCartData=(uInfo)=>{
    cartList({agentId: Number(uInfo.roleId)}).then(response=>{
      if(response&&response.data&&response.data.shoppingCartList){
        this.props.getData(response.data.shoppingCartList)
      }
    })
  }

  render(){
    return <div className='sNav' style={{display:this.state.hidden?'none':'block'}}>
      <div className='nav container'>
        <Col md={2} sm={12} style={{height:'80px',display:'flex'}}>
          <img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt='logo' />
        </Col>
        <Col md={10} sm={12} className="navTop">
          <NavLink to='/home'>订购项目</NavLink>
          <NavLink to='/cart'>购物车{this.props.orderData.length!==0 ? <Badge>{this.props.orderData.length}</Badge> : ''}</NavLink>
          <NavLink to='/personal'>个人中心</NavLink>
        </Col>
      </div>
    </div>;
  }

}
export default withRouter(connect(state=>({...state.cart}),action.cart)(Navs));