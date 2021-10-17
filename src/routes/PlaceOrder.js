import React from 'react';
import { connect } from 'react-redux';
import {Button, Checkbox, Table} from 'antd';

import '../assets/css/cart.less';

class PlaceOrder extends React.Component{
  columns = [
    {
      title: '序号',
      dataIndex: 'seq',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '编号',
      dataIndex: 'orderId',
    },
    {
      title: '剩余金额',
      dataIndex: 'remainMoney',
    },
    {
      title: '使用金额',
      dataIndex: 'usedMoney',
    }
  ];
  constructor(props){
    super(props)
  }

  render(){
    const orderList = [
      {
        orderId: 'ADD123',
        remainMoney:'￥7900',
        usedMoney: '￥378'
      },
      {
        orderId: 'ADD123',
        remainMoney:'￥7900',
        usedMoney: '-'
      },
    ];
    return(
      <div className="cartBox">
        <div className="mainCart">
          <div className="addressInfo">
            <h3>地址信息</h3>
            <p className="selP">请选择配送地址</p>
            <p className="tip">您想使用的是下方显示的地址吗？如果是，点击相应的“配送到这个地址”按钮，或者您可以输入一个新的送货地址：<a>添加新地址</a></p>
            <div className="addrMsg">
              <h3>收货地址</h3>
              <div>
                <p>所在地区：北京市朝阳区SOHO现代城C座大望路1230</p>
                <p>地址：山水元东园路13号楼901</p>
                <p>手机号：13312221222</p>
              </div>
            </div>
            <div className="addrMsg">
              <h3>发票地址</h3>
              <div>
                <p>所在地区：北京市朝阳区SOHO现代城C座大望路1230</p>
                <p>地址：山水元东园路13号楼901</p>
                <p>手机号：13312221222</p>
              </div>
            </div>
          </div>
          <ul className="row cartUl pOul">
            <li className="proList">
              <div className="proDiv">
                <div className="col-md-9 cartLeft">
                  <div className="imgBox"></div>
                  <div className="proParameter">
                    <div>
                      <p className="proTitle">诊断产品 LICA系列 series</p>
                      <p className="proType">LICA 500</p>
                      <p className="proPrice">开票价：<span>￥5390</span></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-1">
                  X10
                </div>
                <div className="col-md-2">
                  总价：￥5800
                </div>
              </div>
            </li>
            <li className="proList">
              <div className="proDiv">
                <div className="col-md-9 cartLeft">
                  <div className="imgBox"></div>
                  <div className="proParameter">
                    <div>
                      <p className="proTitle">诊断产品 LICA系列 series</p>
                      <p className="proType">LICA 500</p>
                      <p className="proPrice">开票价：<span>￥5390</span></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-1">
                  X10
                </div>
                <div className="col-md-2">
                  总价：￥5800
                </div>
              </div>
            </li>
          </ul>
          <div className="orderTable">
            <Table 
              columns={this.columns} 
              dataSource={orderList} 
              pagination={false}
              bordered={true}
            />
          </div>

          <div className="totalBox">
            <p>
              <span>使用优惠券，一共优惠100元，</span>
              <span className="totalNum">共3件商品，一共￥15700元</span>
            </p>
            <Button type="primary">提交</Button>
          </div>
          
        </div>
      </div>
    )
  }
}

export default connect()(PlaceOrder)