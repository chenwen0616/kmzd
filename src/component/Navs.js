import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { connect } from 'react-redux';
import {Nav, NavItem } from 'react-bootstrap'
import {Link, NavLink, withRouter} from 'react-router-dom';

class Navs extends React.Component{
  constructor(props){
    super(props);

    this.state={
      count:1,
    }
  }

  render(){
    return <div className='sNav'>
      <div className='nav navBox'>
        <div className='col-md-2'>
          <img src={process.env.PUBLIC_URL + '/img/logo2.png'} style={{width:'100%'}} />
        </div>
          <Nav bsStyle="pills" activeKey={1}>{/* onSelect={handleSelect} */}
            <NavItem eventKey={1} href="#home">订购项目</NavItem>
            <NavItem eventKey={2} href="#cart" title="购物车">购物车</NavItem>
            <NavItem eventKey={3} href="#personal" title='个人中心'>个人中心</NavItem>
          </Nav>
      </div>
    </div>;
  }

  handleClick = ev =>{
    this.setState({
      count: this.state.count+1
    })
  }
}
export default withRouter(connect()(Navs));