import React from 'react';
import { connect } from 'react-redux';

class Personal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            个人中心
        </div>)
    }
}
export default connect()(Personal)