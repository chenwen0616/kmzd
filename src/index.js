import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux'
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

render(<Provider store={store}>
    <HashRouter className='mainName'>
        <div>
            <Navs />
            <NavBread />
            <Switch>
                <Route path='/home' exact component={Home} />
                <Route path='/cart' component={Cart} />
                <Route path='/personal' component={Personal} />
                {/* <Redirect to='/?lx=unsafe' /> */}
            </Switch>
            <Footer />
        </div>
    </HashRouter>
</Provider>,document.getElementById('root'))


