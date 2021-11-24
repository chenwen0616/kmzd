import axios from 'axios';
// import Qs from 'qs';
const token = localStorage.getItem('token') || '';

axios.defaults.baseURL = 'https://crmtest.chemclin.com/';
// axios.defaults.withCredentials = true; 
//  声明传给服务器的数据，通过请求传给服务器的数据application/x-www-form-urlencoded格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if(token){axios.defaults.headers.common["token"] = token||'' } //  携带token请求头
// axios.defaults.transformRequest = (data={})=>Qs.stringify(data);
axios.interceptors.response.use(result =>result.data,e=>{
    if(e&&e.response&&e.response.status&&e.response.status===401){
        console.log(e.response.status, 'e.response.status')
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.location.href = '/#/login'
        window.location.reload();
    }
    return Promise.reject(e)
});

export default axios;