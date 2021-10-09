import React from 'react';
import { connect } from 'react-redux';
import {ButtonGroup, Button, Row, Col, Tab, Tabs, Table} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

class MyOrder extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div className="discountStyle">
      <Row>
        <Col md={12}>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tabStyle">
            <Tab eventKey={1} title="全部订单" bsClass='b-radius'>
              <Table responsive>
                <thead>
                  <tr>
                    <th>订单编号</th>
                    <th>金额</th>
                    <th>下单时间</th>
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
                    <td>
                      <a>查看详情</a>
                      <a>取消</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={2} title="已订货">
              <Table responsive>
                  <thead>
                    <tr>
                      <th>订单编号</th>
                      <th>金额</th>
                      <th>下单时间</th>
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
                      <td>
                        <a>查看详情</a>
                        <a>取消</a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
            </Tab>
            <Tab eventKey={3} title="已付款">
              <Table responsive>
                <thead>
                  <tr>
                    <th>订单编号</th>
                    <th>金额</th>
                    <th>下单时间</th>
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
                    <td>
                      <a>查看详情</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
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
                    <td>
                      <a>查看详情</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={4} title="已发货">
              <Table responsive>
                <thead>
                  <tr>
                    <th>订单编号</th>
                    <th>金额</th>
                    <th>下单时间</th>
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
                    <td>
                      <a>查看详情</a>
                      <a>签收</a>
                      <a>快递单号</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看详情</a>
                      <a>签收</a>
                      <a>快递单号</a>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>
                      <a>查看详情</a>
                      <a>签收</a>
                      <a>快递单号</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={5} title="已收货">
              <Table responsive>
                <thead>
                  <tr>
                    <th>订单编号</th>
                    <th>金额</th>
                    <th>下单时间</th>
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
                    <td>
                      <a>查看详情</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
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
                    <td>
                      <a>查看详情</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={6} title="已取消">
            <Table responsive>
                <thead>
                  <tr>
                    <th>订单编号</th>
                    <th>金额</th>
                    <th>下单时间</th>
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
                    <td>
                      <a>查看详情</a>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
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
                    <td>
                      <a>查看详情</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
          <div className="dateBox">
            <DatePicker />
          </div>
        </Col>
      </Row>
    </div>)
  }
}

export default connect()(MyOrder);