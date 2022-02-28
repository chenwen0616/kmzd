import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Form, Input, Spin, Modal} from 'antd';

import {agentDetail, getLicenceList, getThirdLicenceList} from '../../api/person';

class BaseInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      agentDetail: {},
      licenceListData:[], // 许可证列表
      thirdLicenceData: [],// 第三方资质
      loading: false,
      imgVisible: false,
      curImgUrl:'',
    }
  }

  componentDidMount(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.getUserDetail(uInfo);
    this.licenceList(uInfo);
    this.thirdLicenceList(uInfo);
  }
  // 经销商基础信息
  getUserDetail =(uInfo)=>{
    this.setState({loading: true})
    agentDetail({agentId:uInfo.roleId}).then(res=>{
      this.setState({loading: false})
      if(res&&res.data&&res.data.agent){
        this.setState({agentDetail:res.data.agent})
      }
    })
  }
  // 许可证列表
  licenceList=(uInfo)=>{
    getLicenceList(uInfo.roleId).then(res=>{
      if(res&&res.data&&res.data.licenceList&&res.data.licenceList.length>0){
        this.setState({licenceListData: res.data.licenceList})
      }
    })
  }
  // 第三方资质
  thirdLicenceList=(uInfo)=>{
    getThirdLicenceList(uInfo.roleId).then(res=>{
      if(res&&res.data&&res.data.licenceList&&res.data.licenceList.length>0){
        this.setState({thirdLicenceData: res.data.licenceList})
      }
    })
  }

  handleClickImgVisible=(flag, imgurl)=>{
    this.setState({
      imgVisible: !!flag,
      curImgUrl:imgurl
    })
  }

  handleCancel = ()=>{
    this.handleClickImgVisible(false, '')
  }
  
  render(){
    const {agentDetail, loading, licenceListData, thirdLicenceData, imgVisible} = this.state;
    return (
      <Spin spinning={loading}>
        <div className='personBread'>
          <a href='/#/home'>首页</a>
          <span> / 基本信息</span>
        </div>
        <div className="discountStyle m-left m-bottom baseInfoBox">
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
                    <Input value={agentDetail&&agentDetail.creditCode ? agentDetail.creditCode : '-'} />
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
                    <Input value={agentDetail&&agentDetail.realControllerName ? agentDetail.realControllerName : '-'} />
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
                    <Input value={agentDetail&&agentDetail.phone ? agentDetail.phone : '-'} />
                  </Form.Item>
                </Col>
                <Col md={5}>
                  <Form.Item label="注册资金">
                    <Input value={agentDetail&&agentDetail.registrationCapital ? agentDetail.registrationCapital+'万元' : '-'} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Form.Item label="成立日期">
                    <Input value={agentDetail&&agentDetail.foundDate ? agentDetail.foundDate : '-'} />
                  </Form.Item>
                </Col>
                <Col md={5}>
                  <Form.Item label="营业期限">
                    <Input value={agentDetail&&agentDetail.businessTerm ? agentDetail.businessTerm+'年' : '-'} />
                  </Form.Item>
                </Col>
              </Row>
            </Row>
            
            <Row className="uploadBox">
              <p>许可证</p>
              <div style={{height:'70px'}}>
                {licenceListData&&licenceListData.length ? licenceListData.map((item,index)=>{
                  return (<span key={index} onClick={()=>this.handleClickImgVisible(true,item.picUrl)} style={{width:'102px',height:'102px', display:'inline-block',marginRight:5,overflow:'hidden'}}>
                    <img src={item.picUrl} alt='' style={{height:'100px',cursor:'pointer'}} />
                  </span>)
                }) : null}
                {/* <Upload listType="picture-card" >
                  <div>
                    <Icon type="plus" style={{fontSize:'28px',color:'#999'}} />
                  </div>
                </Upload> */}
              </div>
            </Row>

            <Row className="uploadBox" style={{marginTop:'60px'}}>
              <p>三方资质</p>
              <div>
                {thirdLicenceData&&thirdLicenceData.length ? thirdLicenceData.map((item,index)=>{
                  return (<span key={index} onClick={()=>this.handleClickImgVisible(true,item.picUrl)} style={{width:'102px',height:'102px', display:'inline-block',marginRight:5,overflow:'hidden'}}>
                    <img src={item.picUrl} alt='' style={{height:'100px'}} />
                  </span>)
                }) : null}
                {/* <Upload listType="picture-card" >
                  <div>
                    <Icon type="plus" style={{fontSize:'28px',color:'#999'}} />
                  </div>
                </Upload> */}
              </div>
              
            </Row>
            <Row className="baseRow m-top">
              <h2>开票信息</h2>
              <Row className="m-top">
                <Col md={5}>
                  <Form.Item label="公司名称">
                    <Input value={agentDetail&&agentDetail.corporation ? agentDetail.corporation : ''} />
                  </Form.Item>
                </Col>
                <Col md={5}>
                  <Form.Item label="税号">
                    <Input value={(agentDetail&&agentDetail.bill&&agentDetail.bill.taxCode) ? agentDetail.bill.taxCode : ''} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Form.Item label="公司地址">
                    <Input value={(agentDetail&&agentDetail.bill&&agentDetail.bill.address) ? agentDetail.bill.address : ''} />
                  </Form.Item>
                </Col>
                <Col md={5}>
                  <Form.Item label="开户行">
                    <Input value={(agentDetail&&agentDetail.bill&&agentDetail.bill.bank) ? agentDetail.bill.bank : ''} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Form.Item label="账号">
                    <Input value={(agentDetail&&agentDetail.bill&&agentDetail.bill.account) ? agentDetail.bill.account : ''} />
                  </Form.Item>
                </Col>
              </Row>
            </Row>
          </form>
        </div>

        {imgVisible ? <Modal
          title=""
          visible={imgVisible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <div style={{marginTop:'15px'}}>
            <img src={this.state.curImgUrl} alt='' style={{width:"100%"}}  />
          </div>
        </Modal> : null}
      </Spin>
    )
  }

  
}


export default Form.create()(connect()(BaseInfo))