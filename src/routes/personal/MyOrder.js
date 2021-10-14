import React from 'react';
import { connect } from 'react-redux';
import {ButtonGroup, Button, Row, Col, Tab, Tabs} from 'react-bootstrap';
import { DatePicker, Table } from 'antd';

class MyOrder extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
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
    const {startValue, endOpen, endValue} = this.state;
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'orderId',
      },
      {
        title: '金额',
        dataIndex: 'price',
      },
      {
        title: '下单时间',
        dataIndex: 'orderTime',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title:'操作',
        dataIndex:'operation',
        render: ()=>{
          return(
            <div>
              <a>查看详情</a>
            </div>
          )
        }
      }
    ]

    const dataList = [
      {
        orderId: 'AKM12001',
        price: '1200',
        orderTime: '2020-09-08',
        status: '1'
      }
    ]
    return (<div className="discountStyle">
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tabStyle">
            <Tab eventKey={1} title="全部订单" bsClass='b-radius'>
              <div className="tableM">
                <Table dataSource={dataList} columns={columns} />
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
                placeholder="Start"
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
                placeholder="End"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
            </Col>
            
            
          </div>
        </Col>
      </Row>
    </div>)
  }
}







export default connect()(MyOrder);