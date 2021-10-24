import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Tabs, Tab} from 'react-bootstrap'
import { Button, Modal, Form, Input, Cascader } from 'antd';

import {getRegion} from '../../api/common';
import {agentAddrList, agentAddrAdd} from '../../api/person';

class AddressManage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data: [],
      addrType: '1',
      addrVisible: false,
    }
  }
  componentDidMount(){
    this.getAddrList();
    this.getRegionList();
  }

  getRegionList = ()=>{
    getRegion().then(res=>{
      if(res&&res.data&&res.data.regionList){
        const regionList = res.data.regionList;
        const provinceRegion = regionList.filter(item=> item.regionLevel === 3);
        const regionOptions = [];
        regionOptions.push(provinceRegion);
        regionOptions.forEach(item=>{
          item.children = [];
          regionList.forEach(oItem=>{
            if(item.regionCode === oItem.parentCode && oItem.regionLevel ===4){
              item.children.push(oItem)
            }
          })
        })
        const nextRegion = regionList.filter(item=>item.regionLevel === 4);
        console.log(nextRegion, 'nextRegion')
        // console.log(provinceRegion, 'provinceRegionprovinceRegion')
      }
    })
  }
  getAddrList(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    agentAddrList({
      agentId: uInfo.roleId,
      type: this.state.addrType
    }).then(res=>{
      console.log(res, '地址列表')
    })
  }

  handleSelAddrType=ev=>{
    console.log(ev, 'evvvv选择地址类型')
    this.setState({addrType: ev},()=>{
      this.getAddrList()
    })
  }
  handleAddModalVisible =(flag)=>{
    this.setState({addrVisible:!!flag})
  }
  handleCancelAddr = ()=>{
    this.setState({addrVisible: false})
  }
  render(){
    const {addrVisible} = this.state;
    const { form } = this.props;
    return (<div className="discountStyle">
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey={'1'} onSelect={this.handleSelAddrType} id="uncontrolled-tab-example" className="tabStyle">
            <Tab eventKey={'1'} title="收发票" bsClass='b-radius'>
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
            <Tab eventKey={'2'} title="收货">
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
            <Tab eventKey={'3'} title="收合同">
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
            <Tab eventKey={'4'} title="收函证">
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
          <Button type='primary' onClick={()=>this.handleAddModalVisible(true)}>新增地址</Button>
        </Col>
      </Row>
      {addrVisible? <Modal
          title="新增收货地址"
          visible={addrVisible}
          onOk={this.handleAddModalVisible}
          onCancel={this.handleCancelAddr}
        >
          <Form.Item label={'收货人'}>
            {form.getFieldDecorator('consignee',{
              rules: [
                { required: true, message: '请输入收货人!' },
              ]
            })(
              <Input placeholder='请输入' />
            )}
          </Form.Item>
          <Form.Item label={'所在地区'}>
            {form.getFieldDecorator('area',{
              rules: [
                { required: true, message: '请输入收货人!' },
              ]
            })(
              <Cascader
                defaultValue={[]}
                options={[]}
                onChange={this.handleChangeArea}
              />
            )}
          </Form.Item>
          <Form.Item label={'详细地址'}>
            {form.getFieldDecorator('detailAddr',{
              rules: [
                { required: true, message: '请输入收货人!' },
              ]
            })(
              <Input placeholder='请输入' />
            )}
          </Form.Item>
        </Modal> : null}
    </div>)
  }
}

export default Form.create()(connect()(AddressManage));