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
    }
  }

  componentDidMount(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    if(uInfo){
      cartList({agentId: Number(uInfo.roleId)}).then(res=>{
        if(res&&res.data&&res.data.shoppingCartList){
          this.setState({cartLen:res.data.shoppingCartList.length})
        }
      })
    }
    
  }

  render(){
    return <div className='sNav'>
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