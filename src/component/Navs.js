import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { connect } from 'react-redux';
import {Nav, NavItem } from 'react-bootstrap'

class Navs extends React.Component{
    constructor(props){
        super(props);
    }

    // handleSelect(selectedKey)=> {
    //     alert(`selected ${selectedKey}`);
    // }
    
    render(){
        return <div className='sNav'>
            <div className='nav navBox'>
                <div className='col-md-2'><img src='../assets/img/login_bg.png' /><a></a></div>
                {/* <ul className='col-md-10 list-inline'>
                    <li className='col-md-2' role="presentation"><a href='javascript:;'>首页</a></li>
                    <li className='col-md-2' role="presentation"><a href='javascript:;'>购物车</a></li>
                    <li className='col-md-2' role="presentation"><a href='javascript:;'>个人中心</a></li>
                </ul> */}
                <Nav bsStyle="pills" activeKey={1}>{/* onSelect={handleSelect} */}
                    <NavItem eventKey={1} href="/home">
                    首页
                    </NavItem>
                    <NavItem eventKey={2} title="购物车">
                    购物车
                    </NavItem>
                    <NavItem eventKey={3} title='个人中心'>
                    个人中心
                    </NavItem>
                </Nav>
            </div>
        </div>;
    }
}
export default connect()(Navs);