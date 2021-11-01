import React from 'react';
// import ReactDOM, {render} from 'react-dom';
import { connect } from 'react-redux';
// import {Nav, NavItem } from 'react-bootstrap'

class NavBread extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const a = window.location.href;
        console.log(a, 'asssfd')
        console.log(this.props, 'this.props 面包屑');
    }
    
    render(){
        return <div className='navBreadTitle'>
            <a className='bTitle'>首页</a>
        </div>
    }
}
export default connect()(NavBread);