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
      title: '已使用金券',
      dataIndex: '',
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
    }
  }
  componentDidMount(){
    this.getList();
    this.getStatus()
  }

  getList = (param)=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({loading: true})
    agentDiscountList({
      agentId: uInfo.roleId,
      pageNum: 1,
      pageSize: 10,
      ...param
      // status: 1,
    }).then(res=>{
      this.setState({loading:false})
      if(res&&res.data&&res.data.discountList){
        this.setState({discountList: res.data.discountList})
      }
    })
  }

  getStatus = ()=>{
    getDict({dictType:'crm_discount_use_flag'}).then(res=>{
      if(res&&res.data&&res.data.dictList){
        this.setState({statusList: res.data.dictList})
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

  render(){
    const {discountList, startValue, endOpen, endValue, loading, disDetail} = this.state;
    return (
      <Spin spinning={loading}>
        <div className='personBread'>
          <a href='/#/home'>首页</a>
          <span> / 我的折扣</span>
        </div>
        <div className="discountStyle discountBox">
          <Row>
            <Col md={12}>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tabStyle">
                <Tab eventKey={1} title="所有折扣" bsClass='b-radius'>
                  <Table columns={this.cloumns} dataSource={discountList} rowKey='discountIssueId' />
                </Tab>
                <Tab eventKey={2} title="使用中">
                  <Table columns={this.cloumns} dataSource={discountList.length>0 ? discountList.filter(item=>item.status===0) : []} rowKey='discountIssueId' />
                </Tab>
                <Tab eventKey={3} title="已使用">
                  <Table columns={this.cloumns} dataSource={discountList.length>0 ? discountList.filter(item=>item.status===1) : []} rowKey='discountIssueId' />
                </Tab>
                <Tab eventKey={4} title="已过期">
                  <Table columns={this.cloumns} dataSource={discountList.length>0 ? discountList.filter(item=>item.status===2) : []} rowKey='discountIssueId' />
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
                  <Col md={6} className="colStyle">使用金额：<span>￥{disDetail&&disDetail.discountDetail&&disDetail.discountDetail.discount ? disDetail.discountDetail.discount : ''}</span></Col>
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