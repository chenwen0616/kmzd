import React from 'react';
// import ReactDOM, {render} from 'react-dom';
import { connect } from 'react-redux';

class Footer extends React.Component{
    constructor(props){
      super(props);

      this.state={
        hidden:window.location.hash.includes('/login')
      }
    }

    componentDidMount(){
      window.addEventListener("hashchange",() => {
        this.setState({hidden:window.location.hash.includes('/login')})
      })
    }

    render(){
        return <div className="bottom" style={{display:this.state.hidden?'none':'block'}}>
            <p className="bottomTitle">copy right© 2018 kemeizhenduan</p>
        </div>;
    }
}
export default connect()(Footer);