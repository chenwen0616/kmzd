import React from 'react';
import { connect } from 'react-redux';
import { Form, Table, DatePicker, Select, Col, Row, Button } from 'antd';

import { agentContractList } from '../../api/person'

const { Option } = Select;

class MyContract extends React.Component{
  columns = [
    {
      title: '序号',
      dataIndex: 'seq',
    },
    {
      title: '类型',
      dataIndex: 'contractType'
    },
    {
      title: '编号',
      dataIndex: 'contractId'
    },
    {
      title: '有效期',
      dataIndex: 'signDate'
    },
    {
      title: '状态',
      dataIndex: 'contractStatus'
    },
    {
      title: '文件',
      dataIndex: 'attachmentPath '
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render(){
        return (
          <div>
            <a>下载</a>
            <a>查看详情</a>
          </div>
        )
      }
    },
  ]
  constructor(props){
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      contractList: [],
    }
  }
  componentDidMount(){
    this.getList();
  }
  getList=()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    agentContractList({
      agentId: uInfo.roleId,
      pageNum: 1,
      pageSize: 10,
    }).then(res=>{
      if(res&&res.data&&res.data.contractList){
        this.setState({contractList: res.data.contractList})
      }
      console.log(res, 'res 合同列表')
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

  handleSearch = ()=>{
    console.log('查询')
  }

  render(){
    const { form } = this.props;
    const { startValue, endOpen, endValue, contractList } = this.state;
    return (<div className="discountStyle">
      <div className='contractFilterS'>
        <Row>
          <Col md={6}>
            <Form.Item label='筛选状态'>
              {form.getFieldDecorator('status',{
                initialValue: '0'
              })(
                <Select>
                  <Option key={'0'}>全部</Option>
                  <Option key={1}>有效</Option>
                  <Option key={2}>无效</Option>
                  <Option key={3}>待定</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={10}>
            <Form.Item>
              <Form.Item>
                {form.getFieldDecorator('startTime')(
                  <DatePicker
                    disabledDate={this.disabledStartDate}
                    format="YYYY-MM-DD"
                    value={startValue}
                    placeholder="开始日期"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                )}
              </Form.Item>
              <span style={{display:'inline-block',padding:'0 10px',color:'#888',height:'40px'}}>—</span>
              <Form.Item>
                {form.getFieldDecorator('endTime')(
                  <DatePicker
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="结束日期"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                  />
                )}
              </Form.Item>
            </Form.Item>
          </Col>
          <Col md={4}>
            <Button type='primary' size={'large'} onClick={this.handleSearch}>查询</Button>
          </Col>
        </Row>
      </div>
      <Table columns={this.columns} dataSource={contractList} />
    </div>)
  }
}

export default Form.create()(connect()(MyContract));