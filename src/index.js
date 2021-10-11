import React from 'react';
import ReactDOM, {render} from 'react-dom';
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
// import 'jquery/dist/jquery.js';
// import 'bootstrap/dist/js/bootstrap.js';

import Navs from './component/Navs';
import NavBread from './component/NavBread';
import Footer from './component/Footer';
import Home from './routes/Home';
import Cart from './routes/Cart';
import Personal from './routes/Personal';
import OrderDetail from './routes/personal/OrderDetail';

render(<ConfigProvider locale={zhCN}>
    <Provider store={store}>
        <HashRouter className='mainName'>
            <div>
                <Navs />
                <NavBread />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/personal' component={Personal} />
                    <Route path='/orderDetail' component={OrderDetail} />
                    <Redirect to='/?lx=unsafe' />
                </Switch>
                <Footer />
            </div>
        </HashRouter>
    </Provider> 
</ConfigProvider>,document.getElementById('root'))


