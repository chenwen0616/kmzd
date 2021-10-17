import React from 'react';
import { connect } from 'react-redux';
import {Nav, NavItem, Badge } from 'react-bootstrap'
import {Link,  withRouter} from 'react-router-dom';

class Navs extends React.Component{
  constructor(props){
    super(props);

    this.state={
      count:1,
      navTag:1,
    }
  }

  render(){
    const {navTag} = this.state;
    return <div className='sNav'>
      <div className='nav navBox'>
        <div className='col-md-2' style={{height:'80px',display:'flex'}}>
          <img src={process.env.PUBLIC_URL + '/img/logo2.png'} alt='logo' />
        </div>
          <Nav bsStyle="pills" activeKey={navTag} onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="#home">订购项目</NavItem>
            <NavItem eventKey={2} href="#cart" title="购物车">购物车<Badge>42</Badge></NavItem>
            <NavItem eventKey={3} href="#personal" title='个人中心'>个人中心</NavItem>
          </Nav>
          <div style={{display:'none'}}>
            <Link to='/login'>登录</Link>
            <Link to='/register'>注册</Link>
          </div>
      </div>
    </div>;
  }

  handleClick = ev =>{
    this.setState({
      count: this.state.count+1
    })
  }

  handleSelect = (tag)=>{
    this.setState({navTag:tag});
  }
}
export default withRouter(connect()(Navs));