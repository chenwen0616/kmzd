import React from 'react';
import {connect} from "react-redux";
import {Route,Switch,Redirect} from 'react-router-dom'
import { ButtonToolbar, DropdownButton, MenuItem, Dropdown, ControlLabel, Radio, FormGroup, FormControl, Pagination } from 'react-bootstrap';

import '../assets/css/home.less';

class Home extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className='homeBox'>
      <div className='mainHome'>

        <div className='col-md-3'>
          <p className='selectFont'>筛选</p>
          <div className='selectBox'>
            <div>
              <p className='selP'>产品系列</p>
              <DropdownButton
                bsStyle="default"
                title="全部"
                noCaret
                id="dropdown-no-caret"
                className="selBtn"
              >
                  <span>ss</span>
                  <MenuItem eventKey="1">Action</MenuItem>
                  <MenuItem eventKey="2">Another action</MenuItem>
                  <MenuItem eventKey="3">Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="4">Separated link</MenuItem>
              </DropdownButton>
            </div>
            <div>
                <p className='selP'>试剂类型</p>
                <DropdownButton
                    bsStyle="default"
                    title="全部"
                    noCaret
                    id="dropdown-no-caret"
                    className="selBtn"
                >
                    <span>ss</span>
                    <MenuItem eventKey="1">Action</MenuItem>
                    <MenuItem eventKey="2">Another action</MenuItem>
                    <MenuItem eventKey="3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4">Separated link</MenuItem>
                </DropdownButton>
            </div>
            <div>
                <p className='selP'>仪器型号</p>
                <DropdownButton
                    bsStyle="default"
                    title="全部"
                    noCaret
                    id="dropdown-no-caret"
                    className="selBtn"
                >
                    <span>ss</span>
                    <MenuItem eventKey="1">Action</MenuItem>
                    <MenuItem eventKey="2">Another action</MenuItem>
                    <MenuItem eventKey="3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4">Separated link</MenuItem>
                </DropdownButton>
            </div>

            <div className="cart_btn">
              <a href="#" className="btn btn-primary btnW" role="button">确定</a> 
            </div>
          </div>
        </div>

        <div className='col-md-9 row rightBox'>
          <div className="r_box">
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                  <img src={process.env.PUBLIC_URL + '/img/cp1.png'} />
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
                      <div className="cart_btn">
                        <a href="#" className="btn btn-primary" role="button">加入购物车</a> 
                      </div>
                  </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img src={process.env.PUBLIC_URL + '/img/cp1.png'} />
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
                    <div className="cart_btn">
                      <a href="#" className="btn btn-primary" role="button">加入购物车</a> 
                    </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                <img src={process.env.PUBLIC_URL + '/img/cp1.png'} />
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
                    <div className="cart_btn">
                      <a href="#" className="btn btn-primary" role="button">加入购物车</a> 
                    </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="thumbnail">
                  <img src={process.env.PUBLIC_URL + '/img/cp1.png'} />
                  <div className="caption">
                      <h3>Thumbnail label</h3>
                      <p>...</p>
                      <p>
                          <a href="#" className="btn btn-primary" role="button">Button</a> 
                          <a href="#" className="btn btn-default" role="button">Button</a>
                      </p>
                  </div>
              </div>
            </div>
          </div>

          <div className="pageBox">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
          
        </div>

      </div>
    </div>
  }
}
export default Home
