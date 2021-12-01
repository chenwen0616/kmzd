import React from 'react';
import { connect } from 'react-redux';
import { Form, Table, DatePicker, Select, Col, Row, Button, Spin, Icon } from 'antd';
import moment from 'moment';
import { agentContractList } from '../../api/person'
import { getDict } from '../../api/common'

const { Option } = Select;

class MyContract extends React.Component{
  columns = [
    {
      title: '序号',
      dataIndex: 'seq',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '类型',
      dataIndex: 'contractType',
      render: (text,record)=>{
        const { contractTypeList } = this.state;
        const type = contractTypeList.length>0 ?contractTypeList.find(item=>item.dictValue === String(text)).dictLabel : '';
        return <span>{type}</span>
      }
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
      dataIndex: 'contractStatus',
      render: (text,record)=>{
        const {contractStatusList} = this.state;
        const status = contractStatusList.length>0 ?contractStatusList.find(item=>item.dictValue === String(text)).dictLabel : '';
        return <span>{status}</span>
      }
    },
    {
      title: '文件',
      dataIndex: 'attachmentPath ',
      render(text,record){
        const path = record.attachmentPath;
        const name=path.substring(path.lastIndexOf("/")+1);
        return <span>{name}</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record)=>{
        return (
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a style={{paddingRight:10}} onClick={()=>this.handleDownloadFile(record.attachmentPath)}>下载</a>
            <a href={record.attachmentPath} target='_blank' rel="noreferrer">查看详情</a>
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
      contractStatusList: [],
      contractTypeList: [],
      loading: false,
    }
  }

  handleDownloadFile =(path)=>{
    const x = new XMLHttpRequest();
    x.open("GET", path);
    x.responseType = 'blob';
    x.onload=function(e) {
        // 会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
        // 这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
        const url = window.URL.createObjectURL(x.response)
        const a = document.createElement('a');
        a.href = url
        a.setAttribute('download','')
        a.click()
    }
    x.send();
  }

  // 获取合同状态
  getContractStatus = ()=>{
    getDict({dictType:'crm_contract_status'}).then(res=>{
      if(res&&res.data&&res.data.dictList&&res.data.dictList.length>0){
        this.setState({contractStatusList: res.data.dictList})
      }
    })
  }
  // 获取合同类型
  getContractType = () =>{
    getDict({dictType:'crm_contract_type'}).then(res=>{
      if(res&&res.data&&res.data.dictList&&res.data.dictList.length>0){
        // console.log(res.data.dictList, '合同类型')
        this.setState({contractTypeList: res.data.dictList})
      }
    })
  }

  componentDidMount(){
    this.getList();
    this.getContractStatus();
    this.getContractType();
  }
  getList=(param)=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({loading:true})
    agentContractList({
      agentId: uInfo.roleId,
      pageNum: 1,
      pageSize: 10,
      ...param,
    }).then(res=>{
      this.setState({loading: false})
      if(res&&res.data&&res.data.contractList){
        this.setState({contractList: res.data.contractList})
      }
      // console.log(res, 'res 合同列表')
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
    const { form } = this.props;
    form.validateFields((err, values) => {
      if(!err){
        const requestVo = {};
        requestVo.contractStatus = values.status;
        requestVo.startDate = values.startTime ? moment(values.startTime).format('YYYY-MM-DD') : '';
        requestVo.endDate = values.endTime ? moment(values.endTime).format('YYYY-MM-DD') : '';
        this.getList(requestVo)
      }
    })
  }

  render(){
    const { form } = this.props;
    const { endOpen, contractList, contractStatusList, loading } = this.state;
    return (
      <Spin spinning={loading}>
        <div className='personBread'>
          <a href='/#/home'>首页</a>
          <span> / 我的合同</span>
        </div>
        <div className="discountStyle">
          <div className='contractFilterS'>
            <Row>
              <Col md={6}>
                <Form.Item label='筛选状态'>
                  {form.getFieldDecorator('status',{
                    initialValue: ''
                  })(
                    <Select>
                      <Option key='' value=''>全部</Option>
                      {contractStatusList.length>0 ? contractStatusList.map(item=>{
                        return <Option key={item.dictValue}>{item.dictLabel}</Option>
                      }) : null}
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
                        // value={startValue}
                        placeholder="开始日期"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                      />
                    )}
                  </Form.Item>
                  <span style={{display:'inline-block',padding:'0 10px',color:'#888',height:'40px'}}><Icon type="minus" /></span>
                  <Form.Item>
                    {form.getFieldDecorator('endTime')(
                      <DatePicker
                        disabledDate={this.disabledEndDate}
                        format="YYYY-MM-DD"
                        // value={endValue}
                        placeholder="结束日期"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                    )}
                  </Form.Item>
                </Form.Item>
              </Col>
              <Col md={4} style={{marginLeft:10}}>
                <Button type='primary' size={'large'} onClick={this.handleSearch}>查询</Button>
              </Col>
            </Row>
          </div>
          <Table  rowKey={record => record.contractId} columns={this.columns} dataSource={contractList} />
        </div>
      </Spin>
    
    )
  }
}

export default Form.create()(connect()(MyContract));