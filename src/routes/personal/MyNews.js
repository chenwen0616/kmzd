import React from 'react';
import { connect } from 'react-redux';
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import { Spin, Collapse } from 'antd';

import { getMessage } from '../../api/common';

const { Panel } = Collapse;

class MyNews extends React.Component{
  constructor(props){
    super(props);
    this.state={
      messageList:[],
      loading: false,
    }
  }
  componentDidMount(){
    this.getList();
  }

  getList = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({loading: true})
    getMessage({
      userId: uInfo.userId,
      pageNum:1,
      pageSize: 10
    }).then(res=>{
      this.setState({loading: false})
      if(res&&res.data&&res.data.messageList){
        this.setState({messageList: res.data.messageList})
      }
      console.log(res, 'res')
    })
  }

  getTitle=(item)=>{
    const header = <div style={{display:'flex'}}>
      <span className="s-l-txt">{item.title}</span>
      <span className="s-r-txt">{item.createTime.slice(0,11)}</span>
    </div>
    return header
  }
  render(){
    const { messageList, loading } = this.state;
    return (
      <Spin spinning={loading}>
        <div className='personBread'>
          <a href='/#/home'>首页</a>
          <span> / 我的消息</span>
        </div>
        <div className="m-top newsBox m-left">
          <ListGroup>
            {messageList.length>0 ? messageList.map(item=>{
              return (
                <Collapse defaultActiveKey={[]} bordered={false}>
                  <Panel header={this.getTitle(item)} key="1">
                    <p style={{fontWeight:'bold'}}>{item.title}</p>
                    <p style={{color:'#999'}}>{item.createTime.slice(0,11)}</p>
                    <p style={{marginTop:10}}>{item.message}</p>
                  </Panel>
                </Collapse>
              )
            }) : <div>暂无数据</div>}
          </ListGroup>
        </div>
      </Spin>
    
    )
  }
}

export default connect()(MyNews);