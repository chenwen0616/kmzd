import React from 'react';
import { connect } from 'react-redux';
import {ButtonGroup, Button, Row, Col, Tab, Tabs, Table, Modal} from 'react-bootstrap';

class MyDiscount extends React.Component{
  constructor(props){
    super(props);

    this.state={
      data:[],
      detailModalVisible: false,
    }
  }
  
  render(){
    return (<div className="discountStyle">
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tabStyle">
            <Tab eventKey={1} title="所有折扣" bsClass='b-radius'>
              <Table responsive>
                <thead>
                  <tr>
                    <th>折扣券编号</th>
                    <th>已使用金券</th>
                    <th>剩余金额</th>
                    <th>期限</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a href="javascript:;" onClick={()=>this.handleCheckDetail(true)}>查看详情</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看详情</a>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看详情</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={2} title="使用中">
            <Table responsive>
              <thead>
                <tr>
                  <th>折扣券编号</th>
                  <th>已使用金券</th>
                  <th>剩余金额</th>
                  <th>期限</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                  </td>
                </tr>
              </tbody>
            </Table>
            </Tab>
            <Tab eventKey={3} title="已使用">
            <Table responsive>
              <thead>
                <tr>
                  <th>折扣券编号</th>
                  <th>已使用金券</th>
                  <th>剩余金额</th>
                  <th>期限</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                  </td>
                </tr>
              </tbody>
            </Table>
            </Tab>
            <Tab eventKey={4} title="已过期">
            <Table responsive>
              <thead>
                <tr>
                  <th>折扣券编号</th>
                  <th>已使用金券</th>
                  <th>剩余金额</th>
                  <th>期限</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                    <a>取消</a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                    <a>取消</a>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>
                    <a>查看详情</a>
                    <a>取消</a>
                  </td>
                </tr>
              </tbody>
            </Table>
            </Tab>
          </Tabs>
          <div>
            日期
          </div>
        </Col>
      </Row>

      <Modal
        show={this.state.detailModalVisible}
        onHide={this.handleHide}
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            折扣详情
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalBox">
            <h2>基础信息</h2>
            <Row>
              <Col md={12} className="colStyle">折扣编号：AKM1232</Col>
              <Col md={6} className="colStyle">使用金额：<span>￥3780</span></Col>
              <Col md={6} className="colStyle">剩余金额：<span>￥3780</span></Col>
            </Row>
            <h2>使用商品</h2>
            <div className="detailTable">
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>订单编号</th>
                    <th>时间</th>
                    <th>使用金额</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看订单</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看订单</a>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看订单</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>
    </div>)
  }

  handleCheckDetail =(flag)=>{
    this.setState({detailModalVisible: !!flag})
  }

  handleHide = ()=>{
    this.setState({detailModalVisible: false})
  }
}

export default connect()(MyDiscount);