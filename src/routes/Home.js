import React from 'react';
import {connect} from "react-redux";
// import { ControlLabel, FormGroup, FormControl} from 'react-bootstrap';
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
      goodsList: [],
      pageNum: 1,
      pageSize: 15,
      total: 0,
      productsList: [], // 产品系列
    }
  }

  componentDidMount(){
    const userInfo = localStorage.getItem('userInfo');
    const uInfo = JSON.parse(userInfo);
    this.getGoodsList();
    this.getgoodsTypeList(uInfo);
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
      if(res&&res.data){
        const arr =[];
        if(res.data.goodsList&&res.data.goodsList.length>0){
          res.data.goodsList.forEach(item=>{
            arr.push({
              ...item, 
              num:1,
              payType: 2,
            })
          })
        }
        this.setState({
          pageNum: res.data.pageNum,
          pageSize: res.data.pageSize,
          total: res.data.total,
          goodsList: arr,
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
        },()=>{
          this.getProductList();
        })
      }
    }).catch(err=>{
      console.log(err, 'err')
    })
  }
  unique=(arr)=>{
    //Set数据结构，它类似于数组，其成员的值都是唯一的
    return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
  }

  uniqueObject=(arr)=>{
    var result = [];
    var obj = {};
    for(var i =0; i<arr.length; i++){
        if(!obj[arr[i].key]){
          result.push(arr[i]);
          obj[arr[i].key] = true;
        }
    }
    return result;
  }

  // 获取产品系列
  getProductList = ()=>{
    const {reagentTypeList} = this.state;
    const arr = [];
    let newArr = [];
    const proList = [];
    getDict({dictType:'crm_agent_production'}).then(res=>{
      if(res&&res.data&&res.data.dictList&&res.data.dictList.length>0){
        if(reagentTypeList.length>0){
          reagentTypeList.forEach(item=>{
            arr.push(item.productSeries);
            newArr = this.unique(arr);
          })
        }
        newArr.forEach(nItem=>{
          res.data.dictList.forEach(rItem=>{
            if(nItem === rItem.dictValue){
              proList.push(rItem)
            }
          })
        })
        this.setState({productsList: proList})
      }
    })
  }

  // 减数量
  handleClickMinus = (index)=>{
    const list = [...this.state.goodsList];
    list[index].num--;
    list[index].num = list[index].num < 1 ? 1 : list[index].num;
    this.setState({goodsList:list})
  }

  handleClickPlus =(index)=>{
    const list = [...this.state.goodsList];
    list[index].num++;
    this.setState({goodsList:list})
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

  productsSelect = (e)=>{
    this.props.form.resetFields('testItemId')
  }

  render(){
    const {loading, instrumentTypeList, reagentTypeList, goodsList, productsList} = this.state;
    const { form:{getFieldDecorator} } = this.props;
    const proSelId = this.props.form.getFieldValue('productSeries');
    return <Spin spinning={loading}>
      <div className='navBreadTitle'>
        <div className='container'>
          <a href='/#/home'>首页</a>
        </div>
      </div>
      <div className='homeBox'>
      <div className='container mainHome'>
        <div className='col-md-3'>
          <p className='selectFont'>
            <img src={process.env.PUBLIC_URL + '/img/shaixuan.png'} style={{width:'24px'}} alt='筛选' />
            筛选
          </p>
          <div className='selectBox'>
            <Form.Item className='for-form' label="产品系列" required={false}>
              {getFieldDecorator('productSeries')(
                <Select size={"large"} style={{width:'100%'}} placeholder="请选择" onChange={this.productsSelect}>
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
                <Select size={"large"} style={{width:'100%'}} placeholder="请选择" >
                  {
                    (reagentTypeList.length>0&&proSelId) ? this.uniqueObject(reagentTypeList.filter(fItem=>fItem.productSeries===proSelId)).map((item,index)=>{
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
                <div className="col-sm-6 col-md-4" key={item.goodsId}>
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
                          {getFieldDecorator('payType'+item.goodsId,{
                            initialValue: item.payType
                          })(
                            <Radio.Group>
                              <Radio value={2}>开票价：<span className="price">￥{item.fare?item.fare:0}</span></Radio>
                              <Radio value={1}>LP价：<span className="price">￥{item.lp ? item.lp : 0}</span></Radio>
                            </Radio.Group>
                          )}
                        </Form.Item>
                        
                        <Form.Item className='for-form' label="医院名称:" required={false}>
                          {getFieldDecorator('hospitalId'+item.goodsId)(
                            <Select size={"default"} style={{width:'100%'}} placeholder="请选择">
                              {
                                (item.hospitalList && item.hospitalList.length>0) ? item.hospitalList.map(hItem=>{
                                  return <Option key={hItem.hospitalId}>{hItem.hospitalName}</Option>
                                }) : null
                              }
                            </Select>
                          )}
                        </Form.Item>
                        <div className="cart_btn">
                          <div class='cart_hope'>
                            <div style={{paddingLeft:0,paddingRight:0}}>
                              <Form.Item>
                                {getFieldDecorator('num',{
                                  initialValue: item.num
                                })(
                                  <div style={{display:'flex'}}>
                                    <Button type='default' className="cartNumBg" onClick={()=>this.handleClickMinus(index)}>
                                      <Icon type="minus" style={{fontSize:14}} />
                                    </Button>
                                    <div className="cartBg">
                                      <Input placeholder="" defaultValue={1} value={item.num} />
                                    </div>
                                    <Button type='default' className="cartNumBg" onClick={()=>this.handleClickPlus(index)}>
                                      <Icon type="plus" style={{fontSize:14}} /> 
                                    </Button>
                                  </div>
                                )}
                              </Form.Item>
                            </div>
                            <div style={{paddingRight:0,textAlign:'right'}}>
                              <Button type='primary' size="large" onClick={()=>this.handleAddCart({goodsId:item.goodsId,farePrice:item.fare,lpPrice:item.lp, type:item.type})}>加入购物车</Button>
                            </div>
                          </div>
                          
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
