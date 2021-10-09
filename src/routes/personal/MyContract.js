import React from 'react';
import { connect } from 'react-redux';
import {Table} from 'react-bootstrap';

class MyContract extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<div className="discountStyle">
      <Table responsive bordered>
        <thead>
          <tr>
            <th>序号</th>
            <th>类型</th>
            <th>编号</th>
            <th>有效期</th>
            <th>状态</th>
            <th>文件</th>
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
            <td>Table cell</td>
            <td>
              <a>下载</a>
              <a>查看</a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <a>下载</a>
              <a>查看</a>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>
              <a>下载</a>
              <a>查看</a>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>)
  }
}

export default connect()(MyContract);