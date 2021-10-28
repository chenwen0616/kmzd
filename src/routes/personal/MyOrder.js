import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Row, Col, Tab, Tabs} from 'react-bootstrap';
import { DatePicker, Table, Spin } from 'antd';

import {myOrderList} from '../../api/person'

class MyOrder extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      orderList: [],
      loading: false,
    };
  }
  componentDidMount(){
    this.getList()
  }
  getList = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({loading:true})
    myOrderList({agentId:Number(uInfo.roleId),pageNum:1,pageSize:10}).then(res=>{
      console.log(res, '订单列表接口')
      this.setState({loading:false})
      if(res&&res.data&&res.data.orderList&&res.data.orderList.length>0){
        this.setState({orderList:res.data.orderList})
      }
    })
  }
  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
  
  onStartChange = value => {
    this.onChange('startValue', value);
  };
  
  onEndChange = value => {
    this.onChange('endValue', value);
  };
  
  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };
  
  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render(){
    const {startValue, endOpen, endValue, orderList, loading} = this.state;
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'orderId',
      },
      {
        title: '金额',
        dataIndex: 'payMoney',
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
        // render:(text)=>{
        //   const date = new Date(text);
        //   return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay()+" "+(date.getHours()+8)+":"+date.getMinutes()+":"+date.getSeconds();
        // }
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (text,record)=>{
          let statusLabel = '';
          if(text==='1'){ statusLabel = '已订货' }
          if(text==='2'){ statusLabel = '已付款' }
          if(text==='3'){ statusLabel = '已发货' }
          if(text==='4'){ statusLabel = '已取消' }
          return <span>{statusLabel}</span>
        }
      },
      {
        title:'操作',
        dataIndex:'operation',
        render: (text,record)=>{
          return(
            <div>
              <Link to={{pathname: '/orderDetail',search:'?id='+record.orderId }} target='_blank'>查看详情</Link>
            </div>
          )
        }
      }
    ]

    return (
      <Spin spinning={loading}>
        <div className="discountStyle">
          <Row>
            <Col md={12}>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tabStyle">
                <Tab eventKey={1} title="全部订单" bsClass='b-radius'>
                  <div className="tableM">
                    <Table dataSource={orderList} columns={columns} />
                  </div>
                </Tab>
                <Tab eventKey={2} title="已订货">
                  <div className="tableM">
                    <Table dataSource={[]} columns={columns} />
                  </div>
                </Tab>
                <Tab eventKey={3} title="已付款">
                  <div className="tableM">
                    <Table dataSource={[]} columns={columns} />
                  </div>
                </Tab>
                <Tab eventKey={4} title="已发货">
                  <div className="tableM">
                    <Table dataSource={[]} columns={columns} />
                  </div>
                </Tab>
                <Tab eventKey={5} title="已收货">
                  <div className="tableM">
                    <Table dataSource={[]} columns={columns} />
                  </div>
                </Tab>
                <Tab eventKey={6} title="已取消">
                  <div className="tableM">
                    <Table dataSource={[]} columns={columns} />
                  </div>
                </Tab>
              </Tabs>
              <div className="dateBox">
                <Col md={5}>
                  <DatePicker
                    disabledDate={this.disabledStartDate}
                    format="YYYY-MM-DD"
                    value={startValue}
                    placeholder="开始"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                </Col>
                <Col md={1}>-</Col>
                <Col md={5}>
                  <DatePicker
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="结束"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                  />
                </Col>
                
                
              </div>
            </Col>
          </Row>
        </div>
      </Spin>
    
    )
  }
}







export default connect()(MyOrder);