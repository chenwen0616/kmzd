import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tab, Tabs, Modal} from 'react-bootstrap';
import { Table, DatePicker, Spin, Icon} from 'antd';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {getDict} from '../../api/common'

import { agentDiscountList, agentDiscountDetail } from '../../api/person';

class MyDiscount extends React.Component{
  cloumns = [
    {
      title: '折扣券编号',
      dataIndex: 'discountIssueId',
    },
    {
      title: '已使用金额',
      dataIndex: 'usedMoney',
      render: (text,record)=>{
        let usedPay = 0;
        const discount = record.discount ? record.discount : 0;
        const balance = record.balance ? record.balance : 0;
        usedPay = ((discount*10000 - balance*10000)/10000).toFixed(2);
        return (
          <div>{usedPay}</div>
        )
      }
    },
    {
      title: '剩余金额',
      dataIndex: 'balance',
    },
    {
      title: '期限',
      dataIndex: 'dateTime',
      render: (test,record)=>{
        return (<div>{record.startTime.slice(0,11)}-{record.endTime.slice(0,11)}</div>)
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text,record)=>{
        const {statusList} = this.state;
        // if(statusList.length>0){
        //   const ss =statusList.find(item=>item.dictValue===String(text));
        // }
        return <span>{statusList.length>0 ? statusList.find(item=>item.dictValue===String(text)).dictLabel : ''}</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'options',
      render: (text,record)=>{
        return (<span style={{color:"#004EA2",cursor:'pointer'}} onClick={()=>this.handleCheckDetail(true, record.discountIssueId)}>查看详情</span>)
      }
    }
  ];
  
  detailColumns=[
    {
      title: '序号',
      dataIndex: 'seq',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '订单编号',
      dataIndex: 'orderId',
    },
    {
      title: '时间',
      dataIndex: 'useTime',
    },
    {
      title: '使用金额',
      dataIndex: 'useDiscount',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (text,record)=>{
        return (<Link to={{pathname: '/orderDetail',search:'?id='+record.orderId }}>查看订单</Link>)
      }
    },
  ]
  constructor(props){
    super(props);

    this.state={
      detailModalVisible: false,
      discountList: [],
      startValue: null,
      endValue: null,
      endOpen: false,
      loading: false,
      disDetail: {},
      statusList: [],
      pageNum:1,
      pageSize: 10,
    }
  }
  componentDidMount(){
    this.getList({pageSize:this.state.pageSize,pageNum:this.state.pageNum});
    this.getStatus()
  }

  // 获取折扣列表数据
  getList = (param)=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({loading: true})
    agentDiscountList({
      agentId: uInfo.roleId,
      pageNum:this.state.pageNum,
      pageSize:this.state.pageSize,
      ...param
      // status: 1,
    }).then(res=>{
      this.setState({loading:false})
      if(res&&res.data&&res.data.discountList){
        this.setState({
          discountList: res.data.discountList
        })
      }
    })
  }
  // 获取折扣状态
  getStatus = ()=>{
    getDict({dictType:'crm_discount_use_flag'}).then(res=>{
      if(res&&res.data&&res.data.dictList){
        this.setState({statusList: res.data.dictList})
      }
    })
  }
  // 开始日期不能大于结束日期
  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  // 结束日期不能小于开始日期
  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  // 日期改变时执行的回调
  onChange = (field, value) => {
    const {pageNum, pageSize} = this.state;
    this.setState({
      [field]: value,
    },()=>{
      if(field === 'endValue'){
        const start = this.state.startValue ? moment(this.state.startValue).format('YYYY-MM-DD') : '';
        const end = this.state.endValue ? moment(this.state.endValue).format('YYYY-MM-DD') : '';
        this.getList({
          startDate: start,
          endDate: end,
          pageSize,
          pageNum
        })
      }
    });
  };
  // 开始日期改变时执行的回调
  onStartChange = value => {
    this.onChange('startValue', value);
  };
  // 结束日期改变时执行的回调
  onEndChange = value => {
    this.onChange('endValue', value);
  };

  // 日期面板是否展开
  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };
  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  // 分页执行回调
  handleChangePage = (pagination,flag)=>{
    this.setState({
      pageSize: pagination.pageSize,
      pageNum:pagination.current
    })
    this.getList({pageNum:pagination.current,pageSize:pagination.pageSize,status: flag})
  }

  // tab页切换时不同状态下请求的数据
  handleTabChange=(key)=>{
    const start = this.state.startValue ? moment(this.state.startValue).format('YYYY-MM-DD') : '';
    const end = this.state.endValue ? moment(this.state.endValue).format('YYYY-MM-DD') : '';
    if(key!=='-1'){
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

  // 我的折扣-页面
  render(){
    const {discountList, startValue, endOpen, endValue, loading, disDetail} = this.state;
    // if(disDetail&&disDetail.discountUsedList&&disDetail.discountUsedList.length>0){
    //   disDetail.discountUsedList.sort((a,b)=>{
    //     return b.useTime < a.useTime ? -1 : 1
    //   })
    // }
    const newPagesTotal = {
      current: this.state.pageNum,
      pageSize: this.state.pageSize,
      total: this.state.total
    }
    return (
      // loading （Spin）
      <Spin spinning={loading}>
        <div className='personBread'>
          <a href='/#/home'>首页</a>
          <span> / 我的折扣</span>
        </div>
        <div className="discountStyle discountBox">
          <Row>
            <Col md={12}>
              <Tabs defaultActiveKey={'-1'} id="uncontrolled-tab-example" className="tabStyle" onSelect={this.handleTabChange}>
                <Tab eventKey={'-1'} title="所有折扣" bsClass='b-radius'>
                  <Table 
                    columns={this.cloumns} 
                    dataSource={discountList} 
                    rowKey='discountIssueId' 
                    pagination={newPagesTotal}
                    onChange={(pagination)=>this.handleChangePage(pagination,'')}
                  />
                </Tab>
                <Tab eventKey={'0'} title="使用中">
                  <Table 
                    columns={this.cloumns} 
                    dataSource={discountList.length>0 ? discountList.filter(item=>item.status===0) : []} 
                    rowKey='discountIssueId' 
                    pagination={newPagesTotal}
                    onChange={(pagination)=>this.handleChangePage(pagination,'0')}
                  />
                </Tab>
                <Tab eventKey={'1'} title="已使用">
                  <Table 
                    columns={this.cloumns} 
                    dataSource={discountList.length>0 ? discountList.filter(item=>item.status===1) : []} 
                    rowKey='discountIssueId' 
                    pagination={newPagesTotal}
                    onChange={(pagination)=>this.handleChangePage(pagination,'1')}
                  />
                </Tab>
                <Tab eventKey={'2'} title="已过期">
                  <Table 
                    columns={this.cloumns} 
                    dataSource={discountList.length>0 ? discountList.filter(item=>item.status===2) : []} 
                    rowKey='discountIssueId' 
                    pagination={newPagesTotal}
                    onChange={(pagination)=>this.handleChangePage(pagination,'2')}
                  />
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
          {/* 点击查看详情的对话框 */}
          <Modal
            show={this.state.detailModalVisible}
            onHide={this.handleHide}
            aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                折扣详情
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modalBox">
                <h2>基础信息</h2>
                <Row>
                  <Col md={12} className="colStyle">折扣编号：{disDetail&&disDetail.discountDetail&&disDetail.discountDetail.discountIssueId ? disDetail.discountDetail.discountIssueId : ''}</Col>
                  <Col md={6} className="colStyle">折扣总额：<span>￥{disDetail&&disDetail.discountDetail&&disDetail.discountDetail.discount ? disDetail.discountDetail.discount : ''}</span></Col>
                  <Col md={6} className="colStyle">剩余金额：<span>￥{disDetail&&disDetail.discountDetail&&disDetail.discountDetail.balance ? disDetail.discountDetail.balance : ''}</span></Col>
                </Row>
                <h2>使用商品</h2>
                <div className="detailTable">
                  <Table columns={this.detailColumns} rowKey='seq' dataSource={disDetail&&disDetail.discountUsedList ? disDetail.discountUsedList : []} />
                </div>
                
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </Spin>
    )
  }

  handleCheckDetail =(flag,id)=>{
    this.setState({
      detailModalVisible: !!flag,
    }, ()=>{
      agentDiscountDetail({
        discountIssueId: id
      }).then(res=>{
        if(res&&res.data){
          this.setState({
            disDetail: res.data
          })
        }
      })
    })
  }

  handleHide = ()=>{
    this.setState({detailModalVisible: false})
  }
}

export default connect()(MyDiscount);