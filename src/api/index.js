import axios from 'axios';
import Qs from 'qs';

axios.defaults.baseURL = 'https://crmtest.chemclin.com/';
axios.defaults.withCredentials = true;  // 允许跨域
axios.defaults.transformRequest = (data={})=>Qs.stringify(data);
axios.interceptors.response.use(result =>result.data);
export default axios;