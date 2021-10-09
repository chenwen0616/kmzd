import React from 'react';
import { connect } from 'react-redux';
import {ListGroup, ListGroupItem, Col} from 'react-bootstrap'

class MyNews extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
    }
  }
  render(){
    return (<div className="m-top newsBox m-left">
      <ListGroup>
        <ListGroupItem href="javascript:;">
          <span className="s-l-txt">有一条消息是这么写的有一条消息是这么写的有一条有一条消息是这</span>
          <span className="s-r-txt">2021-11-15 23:23:22</span>
        </ListGroupItem>
        <ListGroupItem href="javascript:;">
          <span className="s-l-txt">有一条消息是这么写的有一条消息是这么写的有一条有一条消息是这</span>
          <span className="s-r-txt">2021-11-15 23:23:22</span>
        </ListGroupItem>
        <ListGroupItem href="javascript:;">
          <span className="s-l-txt">有一条消息是这么写的有一条消息是这么写的有一条有一条消息是这</span>
          <span className="s-r-txt">2021-11-15 23:23:22</span>
        </ListGroupItem>
        <ListGroupItem href="javascript:;">
          <span className="s-l-txt">有一条消息是这么写的有一条消息是这么写的有一条有一条消息是这</span>
          <span className="s-r-txt">2021-11-15 23:23:22</span>
        </ListGroupItem>
      </ListGroup>
    </div>)
  }
}

export default connect()(MyNews);