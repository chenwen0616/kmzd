import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch, Redirect, NavLink, Link} from 'react-router-dom';

import BaseInfo from './personal/BaseInfo'
import AddressManage from './personal/AddressManage'
import MyContract from './personal/MyContract'
import MyDiscount from './personal/MyDiscount'
import MyNews from './personal/MyNews'
import MyOrder from './personal/MyOrder'
import PersonalSetting from './personal/PersonalSetting'
import { Row } from 'react-bootstrap'

import '../assets/css/personal.less';

class Personal extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div className="personalBox">
      <div className="mainPersonal">
        <ul className="col-md-3 menuBox">
          <li><NavLink to='/personal/baseinfo'>
            基础信息
          </NavLink></li>
          <li><NavLink to='/personal/orders'>我的订单</NavLink></li>
          <li><NavLink to='/personal/discount'>我的折扣</NavLink></li>
          <li><NavLink to='/personal/news'>我的消息</NavLink></li>
          <li><NavLink to='/personal/addrmanage'>地址管理</NavLink></li>
          <li><NavLink to='/personal/contract'>我的合同</NavLink></li>
          <li><NavLink to='/personal/settings'>设置</NavLink></li>
        </ul>
        <div className="col-md-9">
          <Switch>
            <Route path='/personal/baseinfo' component={BaseInfo} />
            <Route path='/personal/orders' component={MyOrder} />
            <Route path='/personal/discount' component={MyDiscount} />
            <Route path='/personal/news' component={MyNews} />
            <Route path='/personal/addrmanage' component={AddressManage} />
            <Route path='/personal/contract' component={MyContract} />
            <Route path='/personal/settings' component={PersonalSetting} />
            {/* 默认展示基本信息 */}
            <Redirect from='/personal' to='personal/baseinfo' />
          </Switch>
        </div>
      </div>
    </div>)
  }
}
export default connect()(Personal)