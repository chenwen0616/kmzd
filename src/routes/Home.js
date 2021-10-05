import React from 'react';
import {connect} from "react-redux";
import {Route,Switch,Redirect} from 'react-router-dom'
import { ButtonToolbar, DropdownButton, MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';

import '../assets/css/home.less';

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div className='homeBox'>
            <div className='mainHome'>
                <div className='col-md-3'>
                    <p className='selectFont'>筛选</p>
                    <div className='selectBox'>
                        <div>
                            <p className='selP'>产品系列</p>
                            <DropdownButton
                                bsStyle="default"
                                title="全部"
                                noCaret
                                id="dropdown-no-caret"
                                className="selBtn"
                            >
                                <span>ss</span>
                                <MenuItem eventKey="1">Action</MenuItem>
                                <MenuItem eventKey="2">Another action</MenuItem>
                                <MenuItem eventKey="3">Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="4">Separated link</MenuItem>
                            </DropdownButton>
                        </div>
                        <div>
                            <p className='selP'>试剂类型</p>
                            <DropdownButton
                                bsStyle="default"
                                title="全部"
                                noCaret
                                id="dropdown-no-caret"
                                className="selBtn"
                            >
                                <span>ss</span>
                                <MenuItem eventKey="1">Action</MenuItem>
                                <MenuItem eventKey="2">Another action</MenuItem>
                                <MenuItem eventKey="3">Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="4">Separated link</MenuItem>
                            </DropdownButton>
                        </div>
                        <div>
                            <p className='selP'>仪器型号</p>
                            <DropdownButton
                                bsStyle="default"
                                title="全部"
                                noCaret
                                id="dropdown-no-caret"
                                className="selBtn"
                            >
                                <span>ss</span>
                                <MenuItem eventKey="1">Action</MenuItem>
                                <MenuItem eventKey="2">Another action</MenuItem>
                                <MenuItem eventKey="3">Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="4">Separated link</MenuItem>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
                <div className='col-md-9'>列表</div>
            </div>
        </div>
    }
}
export default Home