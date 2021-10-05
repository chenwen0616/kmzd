import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { connect } from 'react-redux';

class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            底部
        </div>;
    }
}
export default connect()(Footer);