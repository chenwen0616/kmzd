import axios from 'axios';
import Qs from 'qs';

axios.defaults.baseURL = 'https://crmtest.chemclin.com/';
axios.defaults.withCredentials = true;  // 允许跨域
//  声明传给服务器的数据，通过请求传给服务器的数据application/x-www-form-urlencoded格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common["token"] = token; //  携带token请求头
axios.defaults.transformRequest = (data={})=>Qs.stringify(data);
axios.interceptors.response.use(result =>result.data);
export default axios;