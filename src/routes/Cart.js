import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div>
            购物车
        </div>)
    }
}
export default connect()(Cart)