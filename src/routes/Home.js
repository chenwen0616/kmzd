import React from 'react';
import {connect} from "react-redux";
import { ControlLabel, FormGroup, FormControl,  Col } from 'react-bootstrap';
import { Icon, Spin, Form, Select, Pagination, Button, Input, Radio} from 'antd';

import {goodsList, goodsTypeList} from '../api/home';
import {addCart} from '../api/cart';

import '../assets/css/home.less';

const {Option} = Select;

class Home extends React.Component{
  constructor(props){
    super(props);

    this.state={
      loading: false,
      reagentTypeList: [], // 试剂类型
      instrumentTypeList: [], // 仪器类型
      goodsNum: 1, // 购物车数量
      goodsList: [],
      pageNum: 1,
      pageSize: 15,
      total: 0,
      hospitalRadioVal: 'lp',
    }
  }

  componentDidMount(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.getGoodsList();
    this.getgoodsTypeList(uInfo);
  }
  
  // 获取数据
  getGoodsList = (pNum,param)=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({ loading: true })
    goodsList({
      // agentId: Number(uInfo.userId),
      agentId: 16,
      pageSize: 15,
      pageNum: pNum ? pNum : 1,
      instrumentTypeId: 1,
      productSeries:'01',
      testItemId: 4
    }).then(res=>{
      this.setState({ loading: false })
      console.log(res, 'res 商品列表')
      if(res&&res.data&&res.data.goodsList){
        this.setState({
          goodsList: res.data.goodsList,
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          total: res.data.total
        })
      }
    }).catch((err)=>{
      this.setState({ loading: false })
    })
  }
  getgoodsTypeList = (uInfo)=>{
    goodsTypeList({
      // agentId: Number(uInfo.userId)
      agentId: 16
    }).then(res=>{
      if(res&&res.data&&res.result.code===200){
        this.setState({
          instrumentTypeList: res.data.instrumentTypeList,
          reagentTypeList: res.data.reagentTypeList
        })
      }
    }).catch(err=>{
      console.log(err, 'err')
    })
  }

  // 减数量
  handleClickMinus = ()=>{
    if(this.state.goodsNum <=1){
      return;
    }
    this.setState({goodsNum: this.state.goodsNum - 1})
  }

  handleClickPlus =()=>{
    this.setState({
      goodsNum: this.state.goodsNum + 1
    })
  }
  // 选择医院
  onChangeRadioHospital = (e)=>{
    console.log(e, 'eeee')
    // this.setState({
    //   hospitalRadioVal: e.target.value,
    // });
  }

  // 页数改变
  onChangePage = (pageNumber)=>{
    this.setState({pageNum: pageNumber})
    this.getGoodsList(pageNumber)
  }

  handleField = ()=>{
    const {form} = this.props;
    const { pageNum } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        const objectVo = {
          instrumentTypeId: values.instrumentTypeId,
          productSeries: values.productSeries,
          testItemId: values.testItemId,
        }
        this.getGoodsList(pageNum, objectVo);
      }
    })
  }

  handleAddCart=(param)=>{
    const {form} = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const requestVo = {
          agentId: 8,
          type: '9',
          payType: values.payType,
          num: String(values.num),
          hospitalId: Number(values.hospitalId),
          instrumentTypeId: values.instrumentTypeId,
          ...param,
        }
        addCart(requestVo).then(res=>{
          console.log(res, 'res 添加购物车结果')
        })
        console.log(requestVo, 'form.values')
      }
    })
    // {
    //   "agentId": 0,
    //   "farePrice": 0,
    //   "goodsId": 0,
    //   "hospitalId": 0,
    //   "instrumentTypeId": 0,
    //   "lpPrice": 0,
    //   "num": "string",
    //   "payType": "string",
    //   "type": "string"
    // }

    // agentId: 8
    // farePrice: 15
    // goodsId: 4
    // hospitalId: 1
    // instrumentTypeId: 1
    // lpPrice: 10
    // num: "3"
    // payType: "lp"
    // type: "9"
  }

  render(){
    const {loading, instrumentTypeList, goodsNum, reagentTypeList, goodsList} = this.state;
    const { form:{getFieldDecorator} } = this.props;
    return <Spin spinning={loading}><div className='homeBox'>
      <div className='mainHome'>
        <div className='col-md-3'>
          <p className='selectFont'>
            <img src={process.env.PUBLIC_URL + '/img/shaixuan.png'} style={{width:'24px'}} alt='筛选' />
            筛选
          </p>
          <div className='selectBox'>
            <Form.Item className='for-form' label="产品系列" required={false}>
              {getFieldDecorator('productSeries')(
                <Select size={"large"} style={{width:'100%'}} placeholder="请选择">
                  <Option key={1}>{1}</Option>
                  <Option key={2}>{2}</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item className='for-form' label="试剂类型" required={false}>
              {getFieldDecorator('testItemId')(
                <Select size={"large"} style={{width:'100%'}} placeholder="请选择">
                  {
                    reagentTypeList.length>0 ? reagentTypeList.map(item=>{
                      return <Option key={item.testItemId}>{item.testItemName}</Option>
                    }) : null
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item className='for-form' label="仪器型号" required={false}>
              {getFieldDecorator('instrumentTypeId')(
                <Select size={"large"} style={{width:'100%'}} placeholder="请选择">
                  {
                    instrumentTypeList.length>0 ? instrumentTypeList.map(item=>{
                      return <Option key={item.instrumentTypeId}>{item.instrumentTypeName}</Option>
                    }) : null
                  }
                </Select>
              )}
            </Form.Item>

            <div className="cart_btn">
              <Button type="primary" onClick={this.handleField}>确定</Button>
            </div>
          </div>
        </div>

        <div className='col-md-9 row rightBox'>
          <div className="r_box">
            {goodsList.length>0 ? goodsList.map((item, index)=>{
              return (
                <div className="col-sm-6 col-md-4">
                  <div className="thumbnail goods_list" key={index}>
                    <img src={process.env.PUBLIC_URL + '/img/cp1.png'} alt={'产品'} />
                    <div className="caption">
                        <Form.Item>
                          {getFieldDecorator('name',{
                            initialValue: item.name
                          })(<h3 className="proTitle">{item.name ? item.name : ''}</h3>)}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator('instrumentTypeId',{
                            initialValue: item.instrumentTypeId
                          })(<p className="proType">{item.instrumentTypeId ? item.instrumentTypeId : ''}</p>)}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator('payType',{
                            initialValue: item.payType
                          })(
                            <Radio.Group onChange={this.onChangeRadioHospital} value={this.state.hospitalRadioVal}>
                              <Radio value={'lp'}>开票价：<span className="price">￥{item.fare?item.fare:0}</span></Radio>
                              <Radio value={'kp'}>LP价：<span className="price">￥{item.lp ? item.lp : 0}</span></Radio>
                            </Radio.Group>
                          )}
                        </Form.Item>
                        
                        <Form.Item className='for-form' label="医院名称:" required={false}>
                          {getFieldDecorator('hospitalId',{
                            initialValue: item.hospitalId
                          })(
                            <Select size={"normal"} style={{width:'100%'}} placeholder="请选择">
                              {
                                (item.hospitalList && item.hospitalList.length>0) ? item.hospitalList.map(hItem=>{
                                  return <Option key={hItem.hospitalId}>{hItem.hospitalName}</Option>
                                }) : null
                              }
                            </Select>
                          )}
                        </Form.Item>
                        <div className="cart_btn" style={{display:'flex'}}>
                          <Col md={6} style={{paddingLeft:0,paddingRight:0}}>
                            <Form.Item>
                              {getFieldDecorator('num',{
                                initialValue: this.state.goodsNum
                              })(
                                <div style={{display:'flex'}}>
                                  <Button type='default' className="cartNumBg" onClick={()=>this.handleClickMinus()}>
                                    <Icon type="minus" style={{fontSize:16}} />
                                  </Button>
                                  <div className="cartBg">
                                    <Input placeholder="" defaultValue={1} value={goodsNum} />
                                  </div>
                                  <Button type='default' className="cartNumBg" onClick={()=>this.handleClickPlus()}>
                                    <Icon type="plus" style={{fontSize:16}} /> 
                                  </Button>
                                </div>
                              )}
                            </Form.Item>
                            
                          </Col>
                          <Col md={6} style={{paddingRight:0,textAlign:'right'}}>
                            <Button type='primary' size="large" onClick={()=>this.handleAddCart({goodsId:item.goodsId,farePrice:item.fare,lpPrice:item.lp})}>加入购物车</Button>
                          </Col>
                        </div>
                    </div>
                  </div>
                </div>
              )
            }) : null}
            <div>
            {/* <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img src={process.env.PUBLIC_URL + '/img/cp1.png'} alt={'产品'} />
                <div className="caption">
                    <h3 className="proTitle">诊断产品 LICA系列 series</h3>
                    <p className="proType">LiCA® 500</p>
                    <FormGroup className="radioStyle">
                      <Radio name="radioGroup" inline>开票价：<span className="price">￥5789</span></Radio>
                      <Radio name="radioGroup" inline>IP价：<span className="price">￥4500</span></Radio>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                      <ControlLabel>医院名称：</ControlLabel>
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">北京市同仁医院</option>
                        <option value="other">...</option>
                      </FormControl>
                    </FormGroup>
                    <div className="cart_btn" style={{display:'flex'}}>
                      <Col md={6} style={{paddingLeft:0,paddingRight:0,display:'flex'}}>
                        <div className="cartNumBg"><Icon type="minus" style={{fontSize:14}} /></div>
                        <div className="cartBg">
                          <FormGroup><FormControl type="text" placeholder="" /></FormGroup>
                        </div>
                        <div className="cartNumBg"><Icon type="plus" /> </div>
                      </Col>
                      <Col md={6} style={{paddingRight:0,textAlign:'right'}}>
                        <a href="#" className="btn btn-primary" role="button">加入购物车</a> 
                      </Col>
                    </div>
                </div>
              </div>
            </div> */}
          </div>
          </div>

          <div className="pageBox">
            <Pagination 
              defaultCurrent={1} 
              current={this.state.pageNum} 
              pageSize={this.state.pageSize} 
              total={70} 
              onChange={this.onChangePage}
            />
          </div>
        </div>

      </div>
    </div>
    </Spin>
  }
}
export default Form.create()(connect()(Home))
