import React from 'react';
import { connect } from 'react-redux';
import {ButtonGroup, Button, Row, Col, Tab, Tabs, Modal} from 'react-bootstrap';
import { Table, DatePicker} from 'antd';

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
        return (<div>{record.startTime}-{record.endTime}</div>)
      }
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '操作',
      dataIndex: 'options'
    }
  ];
  constructor(props){
    super(props);

    this.state={
      detailModalVisible: false,
      discountList: [],
      startValue: null,
      endValue: null,
      endOpen: false,
    }
  }
  componentDidMount(){
    this.getList();
  }

  getList = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    agentDiscountList({
      agentId: uInfo.roleId,
      pageNum: 1,
      pageSize: 10,
      status: 1,
    }).then(res=>{
      console.log(res, 'res 折扣列表')
      if(res&&res.data&&res.data.discountList&&res.data.discountList.length>0){
        this.setState({discountList: res.data.discountList})
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
    const {discountList, startValue, endOpen, endValue} = this.state;
    return (<div className="discountStyle discountBox">
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tabStyle">
            <Tab eventKey={1} title="所有折扣" bsClass='b-radius'>
              <Table columns={this.cloumns} dataSource={discountList} />
            </Tab>
            <Tab eventKey={2} title="使用中">
              <Table columns={this.cloumns} dataSource={[]} />
            </Tab>
            <Tab eventKey={3} title="已使用">
              <Table columns={this.cloumns} dataSource={[]} />
            </Tab>
            <Tab eventKey={4} title="已过期">
              <Table columns={this.cloumns} dataSource={[]} />
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
              <Col md={12} className="colStyle">折扣编号：AKM1232</Col>
              <Col md={6} className="colStyle">使用金额：<span>￥3780</span></Col>
              <Col md={6} className="colStyle">剩余金额：<span>￥3780</span></Col>
            </Row>
            <h2>使用商品</h2>
            <div className="detailTable">
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>订单编号</th>
                    <th>时间</th>
                    <th>使用金额</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看订单</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看订单</a>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看订单</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
    </div>)
  }

  handleCheckDetail =(flag)=>{
    this.setState({detailModalVisible: !!flag})
  }

  handleHide = ()=>{
    this.setState({detailModalVisible: false})
  }
}

export default connect()(MyDiscount);