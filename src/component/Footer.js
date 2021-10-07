import React from 'react';
import ReactDOM, {render} from 'react-dom';
import { connect } from 'react-redux';

class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className="bottom">
            <p className="bottomTitle">copy right© 2018 kemeizhenduan</p>
        </div>;
    }
}
export default connect()(Footer);