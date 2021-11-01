import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Row, Col, Tab, Tabs} from 'react-bootstrap';
import { DatePicker, Table, Spin, Popconfirm, message } from 'antd';

import {myOrderList, getOrderSign} from '../../api/person'

class MyOrder extends React.Component{
  columns = [
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
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text,record)=>{
        let statusLabel = '';
        if(text==='1'){ statusLabel = '已订货' }
        if(text==='2'){ statusLabel = '已付款' }
        if(text==='3'){ statusLabel = '已发货' }
        if(text==='4'){ statusLabel = '已收货' }
        if(text==='5'){ statusLabel = '已取消' }
        return <span>{statusLabel}</span>
      }
    },
    {
      title:'操作',
      dataIndex:'operation',
      render: (text,record)=>{
        return(
          <div>
            <Fragment>
              <Link to={{pathname: '/orderDetail',search:'?id='+record.orderId }} target='_blank' style={{paddingRight:10}}>查看详情</Link>
              {/* {record.status === '1' ? <span className='myOrderBtnTxt' onClick={this.handleCancelOrder}>取消</span> : null} */}
              {record.status === '3' ? <Fragment>
                <Popconfirm
                  title="确认收到货了吗?"
                  onConfirm={()=>this.handleReceive(record.orderId,record.status)}
                  okText="确定"
                  cancelText="取消"
                >
                  <span className='myOrderBtnTxt'>签收</span>
                </Popconfirm>
                {/* <span className='myOrderBtnTxt'>快递单号</span> */}
              </Fragment> : null}
            </Fragment>
            
          </div>
        )
      }
    }
  ]
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
  // 签收
  handleReceive = (id,status)=>{
    console.log(id, '签收货品', status)
    getOrderSign({
      orderId: id,
      status,
    }).then(res=>{
      if(res&&res.result&&res.result.code === 200){
        message.success('成功');
        this.getList();
      }
    })
  }

  // // 取消订单
  // handleCancelOrder = id=>{
  //   console.log(id, '取消订单')
  // }

  getList = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({loading:true})
    myOrderList({agentId:Number(uInfo.roleId),pageNum:1,pageSize:10}).then(res=>{
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
    let proList, payList, deliveryList, receiveList,cancelList;
    if(orderList.length>0){
      proList = orderList.filter(item=>item.status==='1');  // 已订货
      payList = orderList.filter(item=>item.status==='2');  // 已付款
      deliveryList = orderList.filter(item=>item.status==='3');  // 已发货
      receiveList = orderList.filter(item=>item.status==='4');  // 已收货
      cancelList = orderList.filter(item=>item.status==='5');  // 已取消
    }
    
    return (
      <Spin spinning={loading}>
        <div className="discountStyle">
          <Row>
            <Col md={12}>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tabStyle">
                <Tab eventKey={1} title="全部订单" bsClass='b-radius'>
                  <div className="tableM">
                    <Table dataSource={orderList} columns={this.columns} />
                  </div>
                </Tab>
                <Tab eventKey={2} title="已订货">
                  <div className="tableM">
                    <Table dataSource={proList} columns={this.columns} />
                  </div>
                </Tab>
                <Tab eventKey={3} title="已付款">
                  <div className="tableM">
                    <Table dataSource={payList} columns={this.columns} />
                  </div>
                </Tab>
                <Tab eventKey={4} title="已发货">
                  <div className="tableM">
                    <Table dataSource={deliveryList} columns={this.columns} />
                  </div>
                </Tab>
                <Tab eventKey={5} title="已收货">
                  <div className="tableM">
                    <Table dataSource={receiveList} columns={this.columns} />
                  </div>
                </Tab>
                <Tab eventKey={6} title="已取消">
                  <div className="tableM">
                    <Table dataSource={cancelList} columns={this.columns} />
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