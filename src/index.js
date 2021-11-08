import React from 'react';
import {render} from 'react-dom';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import {Provider} from 'react-redux'
import {ConfigProvider} from 'antd';
import store from './store/index';
// import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/reset.min.css';
import './assets/css/common.less'

import Navs from './component/Navs';
import NavBread from './component/NavBread';
import Footer from './component/Footer';
import Home from './routes/Home';
import Cart from './routes/Cart';
import Personal from './routes/Personal';
import OrderDetail from './routes/personal/OrderDetail';
import Login from './component/Account/Login';
import PlaceOrder from './routes/PlaceOrder';
import updatePassword from './component/Account/UpdatePassword';
import AuthRoute from './utils/AuthRoute';


const token = localStorage.getItem('token')
const userInfo = localStorage.getItem('userInfo');
const uInfo = JSON.parse(userInfo);

render(
<ConfigProvider locale={zhCN}>
  <Provider store={store}>
    <HashRouter className='mainName'>
      <div>
        <Navs />
        <Switch>
          <AuthRoute path='/home' component={Home} />
          <AuthRoute path='/cart' component={Cart} />
          <AuthRoute path='/personal' component={Personal} uInfo={uInfo} />
          <AuthRoute path='/orderDetail' component={OrderDetail} />
          <AuthRoute path='/placeorder' component={PlaceOrder} />
          <Route path='/login' component={Login} />
          <Route path='/updatePassword' component={updatePassword} />
          {token ? <Redirect exact to='/home' /> : <Redirect exact to='/login' />}
        </Switch>
        <Footer />
      </div>
    </HashRouter>
  </Provider> 
</ConfigProvider>,document.getElementById('root'))


