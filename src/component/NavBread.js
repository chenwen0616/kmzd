import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { connect } from 'react-redux';
import {Nav, NavItem } from 'react-bootstrap'

class NavBread extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return <div className='navBreadTitle'>
            <p className='bTitle'>首页</p>
        </div>
    }
}
export default connect()(NavBread);