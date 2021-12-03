import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Row, Col, Tab, Tabs} from 'react-bootstrap';
import { DatePicker, Table, Spin, Popconfirm, message, Icon } from 'antd';
import moment from 'moment';
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
      render: (text,record)=>{
        return <span>{text? text.slice(0,11) : ''}</span>
      }
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
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  }
  componentDidMount(){
    this.getList()
  }
  // 签收
  handleReceive = (id,status)=>{
    getOrderSign({
      orderId: id,
      status: '4',
    }).then(res=>{
      if(res&&res.result&&res.result.code === 200){
        message.success('成功');
        this.getList();
      }
    })
  }

  // // 取消订单
  // handleCancelOrder = id=>{
  // }

  getList = (param)=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({loading:true})
    myOrderList({
      agentId:Number(uInfo.roleId),
      pageNum:this.state.pageNum,
      pageSize:this.state.pageSize,
      ...param,
    }).then(res=>{
      this.setState({loading:false})
      if(res&&res.data&&res.data.orderList){
        console.log(res, 'res 我的订单')
        this.setState({
          orderList:res.data.orderList,
          total:res.data.total
        })
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
    },()=>{
      if(field === 'endValue'){
        const start = this.state.startValue ? moment(this.state.startValue).format('YYYY-MM-DD') : '';
        const end = this.state.endValue ? moment(this.state.endValue).format('YYYY-MM-DD') : '';
        this.getList({
          startDate: start,
          endDate: end
        })
      }
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

  handlePageChange=(pagenation, flag)=>{
    this.setState({
      pageSize: pagenation.pageSize,
      pageNum:pagenation.current
    })
    this.getList({pageNum:pagenation.current,pageSize:pagenation.pageSize,status: flag})
  }

  handleTabChange=(key)=>{
    const start = this.state.startValue ? moment(this.state.startValue).format('YYYY-MM-DD') : '';
    const end = this.state.endValue ? moment(this.state.endValue).format('YYYY-MM-DD') : '';
    if(key!=='0'){
      this.getList({
        startDate: start,
        endDate: end,
        status: key
      })
    }else{
      this.getList({
        startDate: start,
        endDate: end,
      })
    }
    this.setState({pageNum:1})
  }

  render(){
    const {startValue, endOpen, endValue, orderList, loading} = this.state;
    /**
     * status
     * 1 已订货
     * 2 已付款
     * 3 已发货
     * 4 已收货
     * 5 已取消
     */
    const newPages = {
      current: this.state.pageNum,
      pageSize: this.state.pageSize,
      total: this.state.total
    }
    
    console.log(orderList, 'orderList')
    return (
      <Spin spinning={loading}>
        <div className='personBread'>
          <a href='/#/home'>首页</a>
          <span> / 我的订单</span>
        </div>
        <div className="discountStyle">
          <Row>
            <Col md={12}>
              <Tabs defaultActiveKey={'0'} id="uncontrolled-tab-example" className="tabStyle" onSelect={this.handleTabChange}>
                <Tab eventKey={'0'} title="全部订单" bsClass='b-radius'>
                  <div className="tableM">
                    <Table 
                      rowKey='orderId' 
                      dataSource={orderList} 
                      columns={this.columns} 
                      pagination={newPages}
                      onChange={(pagination)=>this.handlePageChange(pagination,'')} 
                    />
                  </div>
                </Tab>
                <Tab eventKey={'1'} title="已订货">
                  <div className="tableM">
                    <Table 
                      rowKey='orderId' 
                      dataSource={orderList} 
                      columns={this.columns} 
                      pagination={newPages}
                      onChange={(pagination)=>this.handlePageChange(pagination,'1')} 
                    />
                  </div>
                </Tab>
                <Tab eventKey={'2'} title="已付款">
                  <div className="tableM">
                    <Table 
                      dataSource={orderList} 
                      columns={this.columns} 
                      pagination={newPages}
                      onChange={(pagination)=>this.handlePageChange(pagination,'2')} 
                    />
                  </div>
                </Tab>
                <Tab eventKey={'3'} title="已发货">
                  <div className="tableM">
                    <Table 
                      rowKey='orderId' 
                      dataSource={orderList} 
                      columns={this.columns} 
                      pagination={newPages}
                      onChange={(pagination)=>this.handlePageChange(pagination,'3')} 
                    />
                  </div>
                </Tab>
                <Tab eventKey={'4'} title="已收货">
                  <div className="tableM">
                    <Table 
                      rowKey='orderId' 
                      dataSource={orderList} 
                      columns={this.columns} 
                      pagination={newPages}
                      onChange={(pagination)=>this.handlePageChange(pagination,'4')} 
                    />
                  </div>
                </Tab>
                <Tab eventKey={'5'} title="已取消">
                  <div className="tableM">
                    <Table 
                      rowKey='orderId' 
                      dataSource={orderList} columns={this.columns} 
                      pagination={newPages}
                      onChange={(pagination)=>this.handlePageChange(pagination,'5')} 
                    />
                  </div>
                </Tab>
              </Tabs>
              <div className="dateBox">
                <div style={{display:'flex',alignItems:'center'}}>
                  <Col md={5}>
                    <DatePicker
                      disabledDate={this.disabledStartDate}
                      format="YYYY-MM-DD"
                      value={startValue}
                      placeholder="开始日期"
                      onChange={this.onStartChange}
                      onOpenChange={this.handleStartOpenChange}
                    />
                  </Col>
                  <Col md={1} style={{display:'flex',justifyContent:'center'}}><Icon type="minus" /></Col>
                  <Col md={5}>
                    <DatePicker
                      disabledDate={this.disabledEndDate}
                      format="YYYY-MM-DD"
                      value={endValue}
                      placeholder="结束日期"
                      onChange={this.onEndChange}
                      open={endOpen}
                      onOpenChange={this.handleEndOpenChange}
                    />
                  </Col>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Spin>
    
    )
  }
}







export default connect()(MyOrder);