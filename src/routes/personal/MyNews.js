import React from 'react';
import { connect } from 'react-redux';
import {ListGroup, ListGroupItem} from 'react-bootstrap'

import { getMessage } from '../../api/common';

class MyNews extends React.Component{
  constructor(props){
    super(props);
    this.state={
      messageList:[],
    }
  }
  componentDidMount(){
    this.getList();
  }

  getList = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    getMessage({
      userId: uInfo.userId,
      pageNum:1,
      pageSize: 10
    }).then(res=>{
      if(res&&res.data&&res.data.messageList){
        this.setState({messageList: res.data.messageList})
      }
      console.log(res, 'res')
    })
  }

  render(){
    const { messageList } = this.state;
    return (<div className="m-top newsBox m-left">
      <ListGroup>
        {messageList.length>0 ? messageList.map(item=>{
          return (
            <ListGroupItem href="javascript:;">
              <span className="s-l-txt">{item.message}</span>
              <span className="s-r-txt">{item.createTime}</span>
            </ListGroupItem>
          )
        }) : <div>暂无数据</div>}
      </ListGroup>
    </div>)
  }
}

export default connect()(MyNews);