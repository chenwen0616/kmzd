import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, HelpBlock, FormControl, Row, Col } from 'react-bootstrap';
import {Upload, Icon, Form, Input} from 'antd';

import {agentDetail} from '../../api/person';

class BaseInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      agentDetail: {},
    }
  }

  componentDidMount(){
    this.getUserDetail();
  }

  getUserDetail =()=>{
    agentDetail({agentId:16}).then(res=>{
      if(res&&res.data&&res.data.agent){
        this.setState({agentDetail:res.data.agent})
      }
    })
  }
  
  render(){
    const {agentDetail} = this.state;
    console.log(agentDetail, '代理商详情')
    return (<div className="discountStyle m-left m-bottom baseInfoBox">
      <form>
        <Row className="baseRow">
          <h2>公司信息</h2>
          <Row>
            <Col md={5}>
              <Form.Item label="公司名称">
                <Input value={agentDetail&&agentDetail.company ? agentDetail.company : '-'} />
              </Form.Item>
            </Col>
            <Col md={5}>
            <Form.Item label="注册地址">
                <Input value={agentDetail&&agentDetail.registerAddress ? agentDetail.registerAddress : '-'} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Form.Item label="信用编码">
                <Input value={agentDetail&&agentDetail.company ? agentDetail.company : '-'} />
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item label="法人">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Form.Item label="实际控制人">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item label="联系人">
                <Input value={agentDetail&&agentDetail.contactName ? agentDetail.contactName : '-'} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Form.Item label="联系方式">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item label="注册资金">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Form.Item label="成立日期">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item label="营业期限">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
          </Row>
        </Row>
        
        <Row className="uploadBox">
          <p>许可证</p>
          <Upload listType="picture-card" >
          <div>
            <Icon type="plus" style={{fontSize:'28px',color:'#999'}} />
          </div>
          </Upload>
        </Row>
        <Row className="uploadBox">
          <p>三方资质</p>
          <Upload listType="picture-card" >
          <div>
            <Icon type="plus" style={{fontSize:'28px',color:'#999'}} />
          </div>
          </Upload>
        </Row>
        <Row className="baseRow m-top">
          <h2>开票信息</h2>
          <Row className="m-top">
            <Col md={5}>
              <Form.Item label="公司名称">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item label="税号">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Form.Item label="公司地址">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
            <Col md={5}>
              <Form.Item label="开户行">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <Form.Item label="账号">
                <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : '-'} />
              </Form.Item>
            </Col>
          </Row>
        </Row>
        
      </form>
      
        
    </div>)
  }

  
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default Form.create()(connect()(BaseInfo))