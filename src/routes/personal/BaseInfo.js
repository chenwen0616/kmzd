import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, HelpBlock, FormControl, Row, Col } from 'react-bootstrap';
import {Upload, Icon} from 'antd';

class BaseInfo extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (<div className="discountStyle m-left m-bottom">
      <form>
        <Row className="baseRow">
          <h2>公司信息</h2>
          <Row>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="公司名称"
                placeholder="请输入"
              />
            </Col>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="注册地址"
                placeholder="请输入"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="信用编码"
                placeholder="请输入"
              />
            </Col>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="法人"
                placeholder="请输入"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="实际控制人"
                placeholder="请输入"
              />
            </Col>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="联系人"
                placeholder="请输入"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="练习方式"
                placeholder="请输入"
              />
            </Col>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="注册资金"
                placeholder="请输入"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="成立日期"
                placeholder="请输入"
              />
            </Col>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="法人"
                placeholder="营业期限"
              />
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
              <FieldGroup
                id="formControlsText"
                type="text"
                label="公司名称"
                placeholder="请输入"
              />
            </Col>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="税号"
                placeholder="请输入"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="公司地址"
                placeholder="请输入"
              />
            </Col>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="开户行"
                placeholder="请输入"
              />
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FieldGroup
                id="formControlsText"
                type="text"
                label="账号"
                placeholder="请输入"
              />
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

export default connect()(BaseInfo);