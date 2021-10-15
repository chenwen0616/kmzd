import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Tabs, Tab} from 'react-bootstrap'

class AddressManage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data: [],
    }
  }
  render(){
    return (<div className="discountStyle">
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tabStyle">
            <Tab eventKey={1} title="收发票" bsClass='b-radius'>
              <div className="well-box normal-bg">
                <h3>发票地址</h3>
                <div>
                  <p>收货人：张某某</p>
                  <p>所在地区：北京市朝阳区SOHO现代城C座大望路1230</p>
                  <p>地址：山水元东园路13号楼901</p>
                  <p>合同地址：山水元东园路13号楼901</p>
                  <p>手机号：13312221222</p>
                  <p>固定电话:400-1000-100</p>
                  <p>电子邮箱：xx@163.com</p>
                </div>
                <div className="del-box">
                  <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                </div>
                <div className="edit-box">
                  <span className="edit-txt">编辑</span>
                </div>
              </div>
            </Tab>
            <Tab eventKey={2} title="收货">
              <div className="well-box default-bg">
                <h3>收货地址</h3>
                <div>
                  <p>收货人：张某某</p>
                  <p>所在地区：北京市朝阳区SOHO现代城C座大望路1230</p>
                  <p>地址：山水元东园路13号楼901</p>
                  <p>合同地址：山水元东园路13号楼901</p>
                  <p>手机号：13312221222</p>
                  <p>固定电话:400-1000-100</p>
                  <p>电子邮箱：xx@163.com</p>
                </div>
                <div className="del-box">
                  <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                </div>
                <div className="edit-box">
                  <span className="edit-txt">编辑</span>
                </div>
              </div>
              <div className="well-box normal-bg">
                <h3>收货地址</h3>
                <div>
                  <p>收货人：张某某</p>
                  <p>所在地区：北京市朝阳区SOHO现代城C座大望路1230</p>
                  <p>地址：山水元东园路13号楼901</p>
                  <p>合同地址：山水元东园路13号楼901</p>
                  <p>手机号：13312221222</p>
                  <p>固定电话:400-1000-100</p>
                  <p>电子邮箱：xx@163.com</p>
                </div>
                <div className="del-box">
                  <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                </div>
                <div className="edit-box">
                  <span className="edit-txt">设为默认</span>
                  <span className="edit-txt">编辑</span>
                </div>
              </div>
            </Tab>
            <Tab eventKey={3} title="收合同">
              <div className="well-box normal-bg">
                <h3>收合同地址</h3>
                <div>
                  <p>收货人：张某某</p>
                  <p>所在地区：北京市朝阳区SOHO现代城C座大望路1230</p>
                  <p>地址：山水元东园路13号楼901</p>
                  <p>合同地址：山水元东园路13号楼901</p>
                  <p>手机号：13312221222</p>
                  <p>固定电话:400-1000-100</p>
                  <p>电子邮箱：xx@163.com</p>
                </div>
                <div className="del-box">
                  <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                </div>
                <div className="edit-box">
                  <span className="edit-txt">编辑</span>
                </div>
              </div>
            </Tab>
            <Tab eventKey={4} title="收函证">
              <div className="well-box normal-bg">
                <h3>收函证地址</h3>
                <div>
                  <p>收货人：张某某</p>
                  <p>所在地区：北京市朝阳区SOHO现代城C座大望路1230</p>
                  <p>地址：山水元东园路13号楼901</p>
                  <p>合同地址：山水元东园路13号楼901</p>
                  <p>手机号：13312221222</p>
                  <p>固定电话:400-1000-100</p>
                  <p>电子邮箱：xx@163.com</p>
                </div>
                <div className="del-box">
                  <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                </div>
                <div className="edit-box">
                  <span className="edit-txt">编辑</span>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </div>)
  }
}

export default connect()(AddressManage);