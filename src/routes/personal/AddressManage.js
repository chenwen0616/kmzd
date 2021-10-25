import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Tabs, Tab} from 'react-bootstrap'
import { Button, Modal, Form, Input, Cascader, message, Spin } from 'antd';

import {getRegion} from '../../api/common';
import {agentAddrList, agentAddrAdd} from '../../api/person';

class AddressManage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data: [],
      addrType: '1',
      addrVisible: false,
      regionOptions:[],
      listLoading: false,
      regionLoading: false,
      addressInvoiceList: [], // 收发票地址
      addressReceiveList: [], // 收货地址
      addressContractList: [], // 收合同地址
      addressConfirmList: [], // 收函证地址
    }
  }
  componentDidMount(){
    this.getAddrList();
    this.getRegionList();
  }

  getRegionList = ()=>{
    this.setState({regionLoading: true})
    getRegion().then(res=>{
      this.setState({regionLoading:false})
      if(res&&res.data&&res.data.regionList){
        const regionList = res.data.regionList;
        const provinceRegion = regionList.filter(item=> item.regionLevel === 3);
        const regionOptions = [];
        provinceRegion.forEach(pItem=>{
          regionOptions.push({label: pItem.name, value: pItem.name,regionCode:pItem.regionCode, parentCode: pItem.parentCode})
        })
        const nextRegion = regionList.filter(item=>item.regionLevel === 4);
        nextRegion.forEach(nItem=>{
          nItem.children =[];
          regionList.forEach(rItem=>{
            if(nItem.regionCode === rItem.parentCode && rItem.regionLevel === 5){
              nItem.children.push({label:rItem.name, value:rItem.name, regionCode:rItem.regionCode, parentCode: rItem.parentCode});
            }
          })
        })
        // console.log(nextRegion, 'nextRegion')
        regionOptions.forEach(item=>{
          item.children = []
          nextRegion.forEach(oItem=>{
            if(item.regionCode === oItem.parentCode && oItem.regionLevel ===4){
              item.children.push({label:oItem.name, value: oItem.name,regionCode:oItem.regionCode, children: oItem.children})
            }
          })
        })
        this.setState({regionOptions})
      }
    })
  }
  
  getAddrList(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({listLoading: true})
    agentAddrList({
      agentId: uInfo.roleId,
      type: this.state.addrType
    }).then(res=>{
      this.setState({listLoading: false})
      if(res&&res.data&&res.data.addressList&&res.data.addressList.length>0){
        const invoiceList = res.data.addressList.filter(item=>item.type === '1')
        const ReceiveList = res.data.addressList.filter(item=>item.type === '2');
        const contractList = res.data.addressList.filter(item=>item.type === '3');
        const confirmList = res.data.addressList.filter(item=>item.type === '4');
        this.setState({
          addressInvoiceList: invoiceList, // 收发票地址
          addressReceiveList: ReceiveList, // 收货地址
          addressContractList: contractList, // 收合同地址
          addressConfirmList: confirmList, // 收函证地址
        })
      }
    })
  }

  handleSelAddrType=ev=>{
    this.setState({addrType: ev})
  }
  handleAddModalVisible =(flag)=>{
    this.setState({addrVisible:!!flag})
  }
  handleCancelAddr = ()=>{
    this.setState({addrVisible: false})
  }

  // 新增地址
  handleAdd = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    const {form} = this.props;
    form.validateFields((err, values) => {
      if(err) return;
      const requestVo = {};
      Object.assign(requestVo, values);
      requestVo.type = this.state.addrType;
      requestVo.address = values.area.length>0 ? values.area[0]+values.area[1]+values.area[2]+values.detailAddr : '';
      requestVo.agentId = uInfo.roleId;
      agentAddrAdd(requestVo).then(res=>{
        if(res&&res.result&&res.result.code ===200){
          message.success('成功！');
          this.handleCancelAddr();
        }
        console.log(res, 'res 添加结果')
      })
    })
  }

  render(){
    const {addrVisible, regionOptions, addressInvoiceList, addressReceiveList, addressContractList, addressConfirmList} = this.state;
    console.log(addressInvoiceList, 'addressInvoiceList')
    const { form } = this.props;
    return (
    <Spin spinning={false}>
      <div className="discountStyle">
        <Row>
          <Col md={12}>
            <Tabs defaultActiveKey={'1'} onSelect={this.handleSelAddrType} id="uncontrolled-tab-example" className="tabStyle">
              <Tab eventKey={'1'} title="收发票" bsClass='b-radius'>
                <div>
                  {addressInvoiceList.length>0 ? addressInvoiceList.map(item=>{
                    console.log(item, 'item')
                    return (
                    <div className="well-box normal-bg">
                      <h3>发票地址</h3>
                      <div>
                        <p>收货人：{item.consignee? item.consignee : ''}</p>
                        <p>所在地区：{item.address ? item.address : ''}</p>
                        <p>地址：{item.address?item.address:''}</p>
                        <p>合同地址：{}</p>
                        <p>手机号：{item.phone?item.phone:''}</p>
                        <p>固定电话:{item.telephone?item.telephone:''}</p>
                        <p>电子邮箱：{item.email?item.email:''}</p>
                      </div>
                      <div className="del-box">
                        <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                      </div>
                      <div className="edit-box">
                        <span className="edit-txt">设为默认</span>
                        <span className="edit-txt">编辑</span>
                      </div>
                    </div>
                    )
                  }) : <div className='noneMsgBox'>暂无地址信息</div>}
                </div>
              </Tab>
              <Tab eventKey={'2'} title="收货">
                <div>
                  {addressReceiveList.length>0 ? addressReceiveList.map(item=>{
                    return (
                      <div className="well-box default-bg">
                        <h3>收货地址</h3>
                        <div>
                          <p>收货人：{item.consignee? item.consignee : ''}</p>
                          <p>所在地区：{}</p>
                          <p>地址：{item.address ? item.address : ''}</p>
                          <p>合同地址：{}</p>
                          <p>手机号：{item.phone?item.phone:''}</p>
                          <p>固定电话:{item.telephone?item.telephone:''}</p>
                          <p>电子邮箱：{item.email?item.email:''}</p>
                        </div>
                        <div className="del-box">
                          <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                        </div>
                        <div className="edit-box">
                          <span className="edit-txt">设为默认</span>
                          <span className="edit-txt">编辑</span>
                        </div>
                      </div>
                    )
                  }) : <div className='noneMsgBox'>暂无地址信息</div>}
                  
                  {/* <div className="well-box normal-bg">
                  </div> */}
                </div>
              </Tab>
              <Tab eventKey={'3'} title="收合同">
                <div>
                  {addressContractList.length>0 ? addressContractList.map(item=>{
                    return (
                      <div className="well-box normal-bg">
                        <h3>收合同地址</h3>
                        <div>
                          <p>收货人：{item.consignee? item.consignee : ''}</p>
                          <p>所在地区：{}</p>
                          <p>地址：{item.address ? item.address : ''}</p>
                          <p>合同地址：{}</p>
                          <p>手机号：{item.phone?item.phone:''}</p>
                          <p>固定电话:{item.telephone?item.telephone:''}</p>
                          <p>电子邮箱：{item.email?item.email:''}</p>
                        </div>
                        <div className="del-box">
                          <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                        </div>
                        <div className="edit-box">
                          <span className="edit-txt">编辑</span>
                        </div>
                      </div>
                    )
                  }) : <div className='noneMsgBox'>暂无地址信息</div>}
                  
                </div>
              </Tab>
              <Tab eventKey={'4'} title="收函证">
                <div>
                  {addressConfirmList.length>0 ? addressConfirmList.map(item=>{
                    return (
                      <div className="well-box normal-bg">
                        <h3>收函证地址</h3>
                        <div>
                          <p>收货人：{item.consignee? item.consignee : ''}</p>
                          <p>所在地区：{item.address ? item.address : ''}</p>
                          <p>地址：{item.address?item.address:''}</p>
                          <p>合同地址：山水元东园路13号楼901</p>
                          <p>手机号：{item.phone?item.phone:''}</p>
                          <p>固定电话:{item.telephone?item.telephone:''}</p>
                          <p>电子邮箱：{item.email?item.email:''}</p>
                        </div>
                        <div className="del-box">
                          <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                        </div>
                        <div className="edit-box">
                          <span className="edit-txt">编辑</span>
                        </div>
                      </div>
                    )
                  }) : <div className='noneMsgBox'>暂无地址信息</div>}
                </div>
              </Tab>
            </Tabs>
            <div className="addBtnBox">
              <Button 
                type='primary' 
                onClick={()=>this.handleAddModalVisible(true)}
              >新增地址</Button>
            </div>
          </Col>
        </Row>
        {addrVisible? <Modal
            title="新增收货地址"
            className='addrBox'
            visible={addrVisible}
            onOk={this.handleAdd}
            onCancel={this.handleCancelAddr}
          >
            <Form.Item label={'收货人'}>
              {form.getFieldDecorator('consignee',{
                rules: [
                  { required: true, message: '请输入收货人!' },
                ]
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'所在地区'}>
              {form.getFieldDecorator('area',{
                rules: [
                  { required: true, message: '请输入收货人!' },
                ]
              })(
                <Cascader options={regionOptions} />
              )}
            </Form.Item>
            <Form.Item label={'详细地址'}>
              {form.getFieldDecorator('detailAddr',{
                rules: [
                  { required: true, message: '请输入收货人!' },
                ]
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'手机号码'}>
              {form.getFieldDecorator('phone',{
                rules: [
                  { required: true, message: '请输入手机号码!' },
                ]
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'固定电话'}>
              {form.getFieldDecorator('telephone',{
                rules: [
                  { required: false, message: '请输入固定电话!' },
                ]
              })(
                <Input placeholder='请输入' />
              )}
            </Form.Item>
            <Form.Item label={'邮箱编码'}>
              {form.getFieldDecorator('email',{
                rules: [
                  { required: false, message: '请输入邮箱编码!' },
                ]
              })(
                <Input placeholder='请输入' />
              )}
            </Form.Item>
          </Modal> : null}
      </div>
    </Spin>
    )
  }
}

export default Form.create()(connect()(AddressManage));