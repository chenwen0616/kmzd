import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Tabs, Tab} from 'react-bootstrap'
import { Button, Modal, Form, Input, message, Spin, Popconfirm } from 'antd';

import {getRegion, getDict} from '../../api/common';
import {agentAddrList, agentAddrAdd, agentAddrDel, agentAddrUpdate} from '../../api/person';

class AddressManage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data: [],
      addrType: '2',
      addrVisible: false,
      regionOptions:[],
      listLoading: false,
      regionLoading: false,
      addressList: [],
      addressInvoiceList: [], // 收发票地址
      addressReceiveList: [], // 收货地址
      addressContractList: [], // 收合同地址
      addressConfirmList: [], // 收函证地址
      addrTitle: '新增地址',
      addrItem: {},
      curAddrId: '',
      addrTypeArr:[],
    }
  }
  componentDidMount(){
    const {location} = this.props;
    this.getRegionList();
    this.getAddressTypeArr();
    if(location&&location.query&&location.query.placeType){
      this.setState({addrType: '1'},()=>{
        this.getAddrList()
      })
    }else{
      this.getAddrList();
    }
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
    console.log(this.state.addrType, '重新加载')
    agentAddrList({
      agentId: uInfo.roleId,
      type: this.state.addrType
    }).then(res=>{
      this.setState({listLoading: false})
      if(res&&res.data&&res.data.addressList&&res.data.addressList.length>0){
        const invoiceList = res.data.addressList.filter(item=>item.type === '2')
        const ReceiveList = res.data.addressList.filter(item=>item.type === '1');
        const contractList = res.data.addressList.filter(item=>item.type === '3');
        const confirmList = res.data.addressList.filter(item=>item.type === '4');
        this.setState({
          addressList: res.data.addressList,
          addressInvoiceList: invoiceList, // 收发票地址
          addressReceiveList: ReceiveList, // 收货地址
          addressContractList: contractList, // 收合同地址
          addressConfirmList: confirmList, // 收函证地址
        })
      }
    })
  }

  // 获取地址type
  getAddressTypeArr(){
    const newArr=[];
    getDict({dictType:'crm_agent_address_type'}).then(res=>{
      if(res&&res.data&&res.data.dictList&&res.data.dictList.length>0){
        res.data.dictList.forEach(item=>{
          newArr.push({addrLabel:item.dictLabel,addrValue:item.dictValue})
        })
      }
      console.log(res, 'res 地址type')
    })
    this.setState({
      addrTypeArr:newArr
    })
  }

  handleSelAddrType=ev=>{
    this.setState({addrType: ev},()=>{
      this.getAddrList();
    })
    
  }

  handleAddModalVisible =(flag, tag, addrId)=>{
    let addrItem;
    if(addrId){
      const {addressList} = this.state;
      addrItem = addressList.find(item=> item.addressId === addrId);
      this.setState({curAddrId: addrId})
    }
    const title= tag==='add' ? '新增地址':'编辑地址'
    this.setState({
      addrVisible:!!flag,
      addrTitle: title,
      addrItem
    })
  }
  handleCancelAddr = ()=>{
    this.setState({addrVisible: false})
  }

  // 新增&编辑地址
  handleAdd = ()=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    const {form} = this.props;
    const { addrTitle } = this.state;
    form.validateFields((err, values) => {
      if(err) return;
      const requestVo = {};
      Object.assign(requestVo, values);
      requestVo.type = this.state.addrType;
      // requestVo.address = values.area.length>0 ? values.area[0]+values.area[1]+values.area[2]+values.detailAddr : '';
      requestVo.address = values.detailAddr;
      requestVo.agentId = uInfo.roleId;
      if(addrTitle === '新增地址'){
        agentAddrAdd(requestVo).then(res=>{
          if(res&&res.result&&res.result.code ===200){
            message.success('成功！');
            this.handleCancelAddr();
            this.getAddrList();
          }
        })
      }else{
        requestVo.addressId = this.state.curAddrId;
        agentAddrUpdate(requestVo).then(res=>{
          console.log(res, '编辑地址 结果');
          if(res&&res.result&&res.result.code===200){
            message.success('成功！');
            this.handleCancelAddr();
            this.getAddrList();
          }
        })
      }
      
    })
  }

  // 设为默认
  setDefaultAddr = (item)=>{
    const requestVo = {...item};
    requestVo.def = '1';
    agentAddrUpdate(requestVo).then(res=>{
      console.log(res, '设为默认结果');
      if(res&&res.result&&res.result.code===200){
        message.success('成功！');
        this.getAddrList();
      }
    })
  }

  // 删除地址
  handleDel=(addrId)=>{
    agentAddrDel({addressId:addrId}).then(res=>{
      if(res&&res.result&&res.result.code===200){
        message.success('成功！');
        this.getAddrList();
      }
    })
  }

  render(){
    const {addrVisible, addressInvoiceList, addressReceiveList, addressContractList, addressConfirmList, addrItem, listLoading, regionLoading,addrType} = this.state;
    const { form, location } = this.props;
    return (
    <Spin spinning={listLoading||regionLoading}>
      <div className='personBread'>
        <a href='/#/home'>首页</a>
        <span> / 地址管理</span>
      </div>
      <div className="discountStyle" style={{marginBottom:'50px'}}>
        <Row>
          <Col md={12}>
            <Tabs defaultActiveKey={(location.query&&location.query.placeType) ? '1':'2'} onSelect={this.handleSelAddrType} id="uncontrolled-tab-example" className="tabStyle">
              <Tab eventKey={'2'} title="收发票" bsClass='b-radius'>
                <div>
                  {addressInvoiceList.length>0 ? addressInvoiceList.map((item,index)=>{
                    return (
                    <div className={item.def==='1' ? "well-box default-bg" : "well-box normal-bg"} key={item.addressId}>
                      <h3>发票地址</h3>
                      <div>
                        <p>收货人：{item.consignee? item.consignee : ''}</p>
                        {/* <p>所在地区：{item.address ? item.address : ''}</p> */}
                        <p>地址：{item.address?item.address:''}</p>
                        <p>合同地址：{item.address ? item.address : ''}</p>
                        <p>手机号：{item.phone?item.phone:''}</p>
                        <p>固定电话：{item.telephone?item.telephone:''}</p>
                        <p>电子邮箱：{item.email?item.email:''}</p>
                      </div>
                      <div className="del-box">
                        <Popconfirm
                          title="是否确认删除该地址?"
                          onConfirm={()=>this.handleDel(item.addressId)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                        </Popconfirm>
                      </div>
                      <div className="edit-box">
                        {/* {item.def==='1' ? null : <span className="edit-txt" onClick={()=>this.setDefaultAddr(item)}>设为默认</span>} */}
                        <span className="edit-txt" onClick={()=>this.handleAddModalVisible(true,'edit',item.addressId)}>编辑</span>
                      </div>
                    </div>
                    )
                  }) : <div className='noneMsgBox'>暂无地址信息</div>}
                </div>
              </Tab>
              <Tab eventKey={'1'} title="收货">
                <div>
                  {addressReceiveList.length>0 ? addressReceiveList.map((item,index)=>{
                    return (
                      <div className={item.def==='1' ? "well-box default-bg" : "well-box normal-bg"} key={item.addressId}>
                        <h3>收货地址</h3>
                        <div>
                          <p>收货人：{item.consignee? item.consignee : ''}</p>
                          <p>所在地区：{}</p>
                          <p>地址：{item.address ? item.address : ''}</p>
                          <p>合同地址：{item.address ? item.address : ''}</p>
                          <p>手机号：{item.phone?item.phone:''}</p>
                          <p>固定电话：{item.telephone?item.telephone:''}</p>
                          <p>电子邮箱：{item.email?item.email:''}</p>
                        </div>
                        <div className="del-box">
                          <Popconfirm
                            title="是否确认删除该地址?"
                            onConfirm={()=>this.handleDel(item.addressId)}
                            okText="确定"
                            cancelText="取消"
                          >
                            <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                          </Popconfirm>
                        </div>
                        <div className="edit-box">
                          {item.def==='1' ? null : <span className="edit-txt" onClick={()=>this.setDefaultAddr(item)}>设为默认</span>}
                          <span className="edit-txt" onClick={()=>this.handleAddModalVisible(true,'edit',item.addressId)}>编辑</span>
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
                  {addressContractList.length>0 ? addressContractList.map((item,index)=>{
                    return (
                      <div className={item.def==='1' ? "well-box default-bg" : "well-box normal-bg"} key={item.addressId}>
                        <h3>收合同地址</h3>
                        <div>
                          <p>收货人：{item.consignee? item.consignee : ''}</p>
                          {/* <p>所在地区：{}</p> */}
                          <p>地址：{item.address ? item.address : ''}</p>
                          <p>合同地址：{item.address ? item.address : ''}</p>
                          <p>手机号：{item.phone?item.phone:''}</p>
                          <p>固定电话：{item.telephone?item.telephone:''}</p>
                          <p>电子邮箱：{item.email?item.email:''}</p>
                        </div>
                        <div className="del-box">
                          <Popconfirm
                            title="是否确认删除该地址?"
                            onConfirm={()=>this.handleDel(item.addressId)}
                            okText="确定"
                            cancelText="取消"
                          >
                            <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                          </Popconfirm>
                        </div>
                        <div className="edit-box">
                          {/* {item.def==='1' ? null : <span className="edit-txt" onClick={()=>this.setDefaultAddr(item)}>设为默认</span>} */}
                          <span className="edit-txt" onClick={()=>this.handleAddModalVisible(true,'edit',item.addressId)}>编辑</span>
                        </div>
                      </div>
                    )
                  }) : <div className='noneMsgBox'>暂无地址信息</div>}
                  
                </div>
              </Tab>
              <Tab eventKey={'4'} title="收函证">
                <div>
                  {addressConfirmList.length>0 ? addressConfirmList.map((item,index)=>{
                    return (
                      <div key={item.addressId} className={item.def==='1' ? "well-box default-bg" : "well-box normal-bg"}>
                        <h3>收函证地址</h3>
                        <div>
                          <p>收货人：{item.consignee? item.consignee : ''}</p>
                          {/* <p>所在地区：{item.address ? item.address : ''}</p> */}
                          <p>地址：{item.address?item.address:''}</p>
                          <p>合同地址：{item.address ? item.address : ''}</p>
                          <p>手机号：{item.phone?item.phone:''}</p>
                          <p>固定电话：{item.telephone?item.telephone:''}</p>
                          <p>电子邮箱：{item.email?item.email:''}</p>
                        </div>
                        <div className="del-box">
                          <Popconfirm
                            title="是否确认删除该地址?"
                            onConfirm={()=>this.handleDel(item.addressId)}
                            okText="确定"
                            cancelText="取消"
                          >
                            <img src={process.env.PUBLIC_URL + '/img/icon_shanchu.png'} alt={'删除'} />
                          </Popconfirm>
                        </div>
                        <div className="edit-box">
                          {/* {item.def==='1' ? null : <span className="edit-txt" onClick={()=>this.setDefaultAddr(item)}>设为默认</span>} */}
                          <span className="edit-txt" onClick={()=>this.handleAddModalVisible(true,'edit',item.addressId)}>编辑</span>
                        </div>
                      </div>
                    )
                  }) : <div className='noneMsgBox'>暂无地址信息</div>}
                </div>
              </Tab>
            </Tabs>
            {((addressInvoiceList.length===0&&addrType==='2') || (addressReceiveList.length>=0&&addrType==='1') || (addressContractList.length===0&&addrType==='3')||(addressConfirmList.length===0&&addrType==='4')) ? 
              <div className="addBtnBox">
                <Button 
                  type='primary' 
                  onClick={()=>this.handleAddModalVisible(true,'add')}
                >新增地址</Button>
              </div>
            : null}
          </Col>
        </Row>
        {addrVisible? 
        <Modal
            title={this.state.addrTitle}
            className='addrBox'
            visible={addrVisible}
            onOk={this.handleAdd}
            onCancel={this.handleCancelAddr}
          >
            <Form.Item label={'收货人'}>
              {form.getFieldDecorator('consignee',{
                rules: [
                  { required: true, message: '请输入收货人!' },
                ],
                initialValue: addrItem&&addrItem.consignee ? addrItem.consignee : '',
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            {/* <Form.Item label={'所在地区'}>
              {form.getFieldDecorator('area',{
                rules: [
                  { required: true, message: '请选择所在地区!' },
                ],
                initialValue: '',
              })(
                <Cascader options={regionOptions} />
              )}
            </Form.Item> */}
            <Form.Item label={'详细地址'}>
              {form.getFieldDecorator('detailAddr',{
                rules: [
                  { required: true, message: '请输入收货人!' },
                ],
                initialValue: addrItem&&addrItem.address ? addrItem.address : '',
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'手机号码'}>
              {form.getFieldDecorator('phone',{
                rules: [
                  { required: true, message: '请输入手机号码!' },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ],
                initialValue: addrItem&&addrItem.phone ? addrItem.phone : '',
              })(<Input placeholder='请输入' />)}
            </Form.Item>
            <Form.Item label={'固定电话'}>
              {form.getFieldDecorator('telephone',{
                rules: [
                  { required: false, message: '请输入固定电话!' },
                ],
                initialValue: addrItem&&addrItem.telephone ? addrItem.telephone : '',
              })(
                <Input placeholder='请输入' />
              )}
            </Form.Item>
            <Form.Item label={'邮箱编码'}>
              {form.getFieldDecorator('email',{
                rules: [
                  { required: false, message: '请输入邮箱编码!' },
                ],
                initialValue: addrItem&&addrItem.email ? addrItem.email : '',
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