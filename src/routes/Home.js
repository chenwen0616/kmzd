import React from 'react';
import {connect} from "react-redux";
import { ControlLabel, FormGroup, FormControl,  Col } from 'react-bootstrap';
import { Icon, Spin, Form, Select, Pagination, Button, Input, Radio, message} from 'antd';
import action from '../store/action';

import {goodsList, goodsTypeList} from '../api/home';
import {addCart, cartList} from '../api/cart';
import {getDict} from '../api/common';

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
      hospitalRadioVal: 1,
      productsList: [], // 产品系列
    }
  }

  componentDidMount(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.getGoodsList();
    this.getgoodsTypeList(uInfo);
    this.getProductList();
    // 存入redux
    this.reduxGetCartData(uInfo)
  }

  // 存入redux
  reduxGetCartData=(uInfo)=>{
    cartList({agentId: Number(uInfo.roleId)}).then(response=>{
      if(response&&response.data&&response.data.shoppingCartList){
        this.props.getData(response.data.shoppingCartList)
      }
    })
  }
  
  // 获取货品列表数据
  getGoodsList = (pNum,param)=>{
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.setState({ loading: true })
    goodsList({
      agentId: Number(uInfo.roleId),
      pageSize: 15,
      pageNum: pNum ? pNum : 1,
      ...param,
      // instrumentTypeId: '',  // 1
      // productSeries:'',  //01
      // testItemId: ''  // 4
    }).then(res=>{
      this.setState({ loading: false })
      if(res&&res.data&&res.data.goodsList){
        console.log(res.data.goodsList, 'goodsList')
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
      agentId: Number(uInfo.roleId)
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
  // 获取产品系列
  getProductList = ()=>{
    getDict({dictType:'crm_reagent_product'}).then(res=>{
      if(res&&res.data&&res.data.dictList&&res.data.dictList.length>0){
        console.log(res.data.dictList, 'dictList')
        this.setState({productsList: res.data.dictList})
      }
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
    const {form, orderData} = this.props;
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    form.validateFields((err, values) => {
      if (!err) {
        const requestVo = {
          agentId: Number(uInfo.roleId),
          payType: values.payType,
          num: String(values.num),
          hospitalId: Number(values.hospitalId),
          instrumentTypeId: values.instrumentTypeId,
          name: values.name,
          url: values.url,
          ...param,
        }
        addCart(requestVo).then(res=>{
          if(res&&res.result&&res.result.code===200){
            message.success('添加成功');
            // const newData = []
            // if(orderData.length>0){
            //   orderData.forEach(item=>{
            //     if(item.goodsId===requestVo.goodsId && item.type===requestVo.type){
            //       newData.push({...item, num: Number(item.num)+Number(requestVo.num)})
            //     }else{
            //       newData.push([item,requestVo]);
            //     }
            //   })
            // }
            // this.props.getData(newData)
            this.reduxGetCartData(uInfo)
          }
        })
      }
    })
  }

  render(){
    const {loading, instrumentTypeList, goodsNum, reagentTypeList, goodsList, productsList} = this.state;
    const { form:{getFieldDecorator} } = this.props;
    return <Spin spinning={loading}>
      <div className='navBreadTitle'>
        <div className='bTitle'>
          <a href='/home'>首页</a>
          <span> / 购物车</span>
        </div>
      </div>
      <div className='homeBox'>
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
                  {
                    productsList.length>0 ? productsList.map(item=>{
                      return <Option key={item.dictValue} value={item.dictValue}>{item.dictLabel}</Option>
                    }) : null
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item className='for-form' label="试剂类型" required={false}>
              {getFieldDecorator('testItemId')(
                <Select size={"large"} style={{width:'100%'}} placeholder="请选择">
                  {
                    reagentTypeList.length>0 ? reagentTypeList.map(item=>{
                      return <Option key={item.testItemId} value={item.testItemId}>{item.testItemName}</Option>
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
                      return <Option key={item.instrumentTypeId} value={item.instrumentTypeId}>{item.instrumentTypeName}</Option>
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
                <div className="col-sm-6 col-md-4" key={index}>
                  <div className="thumbnail goods_list">
                    <Form.Item>
                      {getFieldDecorator('url',{
                        initialValue: item.url
                      })(<img src={item.url} alt={'产品'} style={{width:'100%'}} />)}
                    </Form.Item>
                    <div className="caption">
                        <Form.Item>
                          {getFieldDecorator('name',{
                            initialValue: item.name
                          })(<h3 className="proTitle">{item.name ? item.name : ''}</h3>)}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator('instrumentTypeId',{
                            initialValue: item.instrumentTypeId
                          })(<p className="proType">{item.instrumentType ? item.instrumentType : ''}</p>)}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator('payType',{
                            initialValue: this.state.hospitalRadioVal
                          })(
                            <Radio.Group>
                              <Radio value={2}>开票价：<span className="price">￥{item.fare?item.fare:0}</span></Radio>
                              <Radio value={1}>LP价：<span className="price">￥{item.lp ? item.lp : 0}</span></Radio>
                            </Radio.Group>
                          )}
                        </Form.Item>
                        
                        <Form.Item className='for-form' label="医院名称:" required={false}>
                          {getFieldDecorator('hospitalId')(
                            <Select size={"default"} style={{width:'100%'}} placeholder="请选择">
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
                            <Button type='primary' size="large" onClick={()=>this.handleAddCart({goodsId:item.goodsId,farePrice:item.fare,lpPrice:item.lp, type:item.type})}>加入购物车</Button>
                          </Col>
                        </div>
                    </div>
                  </div>
                </div>
              )
            }) : null}
            <div>
          </div>
          </div>

          <div className="pageBox">
            {goodsList.length>0 ? <Pagination 
              defaultCurrent={1} 
              current={this.state.pageNum} 
              pageSize={this.state.pageSize} 
              total={this.state.total} 
              onChange={this.onChangePage}
            /> 
            : null}
          </div>
        </div>

      </div>
    </div>
    </Spin>
  }
}
export default Form.create()(connect(state=>({...state.cart}),action.cart)(Home))
