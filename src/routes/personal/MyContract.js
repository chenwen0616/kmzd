import React from 'react';
import { connect } from 'react-redux';
import { Form, Table, DatePicker, Select } from 'antd';

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
    }
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

  render(){
    const { form } = this.props;
    const { startValue, endOpen, endValue } = this.state;
    return (<div className="discountStyle">
      <div>
        {/* <Form.Item label='筛选状态'>
          {form.getFieldDecorator('status')(
            <Select>
              <Option key={''}>全部</Option>
              <Option key={1}>有效</Option>
              <Option key={2}>无效</Option>
              <Option key={3}>待定</Option>
            </Select>
          )}
        </Form.Item> */}
        <Form.Item>
          <Form.Item>
            {form.getFieldDecorator('startTime')(
              <DatePicker
                disabledDate={this.disabledStartDate}
                format="YYYY-MM-DD HH:ss:mm"
                value={startValue}
                placeholder="开始"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('endTime')(
              <DatePicker
                disabledDate={this.disabledEndDate}
                format="YYYY-MM-DD HH:ss:mm"
                value={endValue}
                placeholder="结束"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
            )}
          </Form.Item>
        </Form.Item>
      </div>
      <Table columns={this.columns} dataSource={[]} />
    </div>)
  }
}

export default Form.create()(connect()(MyContract));