import React from 'react';
import { connect } from 'react-redux';
import {Switch, Redirect, NavLink,} from 'react-router-dom';

import BaseInfo from './personal/BaseInfo'
import AddressManage from './personal/AddressManage'
import MyContract from './personal/MyContract'
import MyDiscount from './personal/MyDiscount'
import MyNews from './personal/MyNews'
import MyOrder from './personal/MyOrder'
import AuthRoute from '../utils/AuthRoute';

import PersonalSetting from './personal/PersonalSetting'

import '../assets/css/personal.less';


class Personal extends React.Component{
  // constructor(props){
  //   super(props);
  // }
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
            <AuthRoute path='/personal/baseinfo' component={BaseInfo} />
            <AuthRoute path='/personal/orders' component={MyOrder} />
            <AuthRoute path='/personal/discount' component={MyDiscount} />
            <AuthRoute path='/personal/news' component={MyNews} />
            <AuthRoute path='/personal/addrmanage' component={AddressManage} />
            <AuthRoute path='/personal/contract' component={MyContract} />
            <AuthRoute path='/personal/settings' component={PersonalSetting} />
            {/* 默认展示基本信息 */}
            <Redirect from='/personal' to='personal/baseinfo' />
          </Switch>
        </div>
      </div>
    </div>)
  }
}
export default connect()(Personal)