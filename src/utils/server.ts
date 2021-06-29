// 这个时axios的配置
import axios from 'axios';
import { ElMessage } from 'element-plus'
import {router} from '../route'

// import { config } from 'vue/types/umd';
if (import.meta.env.MODE == 'development'||import.meta.env.MODE == 'test') {//开发环境
  axios.defaults.baseURL = '/api';
} else if (import.meta.env.MODE == 'production') {//生产环境
  axios.defaults.baseURL = '/';
}
axios.defaults.withCredentials = true;

// 错误信息处理
const  errorHandle = (status:any, other:any) => {
  switch (status) {
    case 400:
      ElMessage.error({
        message:'信息验证失败',
        type:'error'
      })
      // console.log('信息验证失败');
      break;
    case 401:
      ElMessage.error({
        message:'认证失败',
        type:'error'
      })
      localStorage.removeItem("token");
      // location.href='/login'
      // router.push({path:'/login'})
      // console.log('认证失败');
      break;
    case 403:
      ElMessage.error({
        message:'token校验失败',
        type:'error'
      })
      localStorage.removeItem("token");
      console.log('token校验失败');
      break;
    case 404:
      ElMessage.error({
        message:'404,请求资源不存在',
        type:'error'
      })
      console.log('请求资源不存在');
      break;
    default :
      console.log(other);
      break;
  }
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config);
  if(localStorage.elementToken){
    config.headers.token=localStorage.elementToken;
  }
  // console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log();
  // console.log(response.data.token);
  // response.headers['Authorization'] = response.data.token;
  return response.status=== 200 ? Promise.resolve(response): Promise.reject(response);
}, function (error) {
  // 对响应错误做点什么
  const {response}=error;
  if(response){
    errorHandle(response.status,response.data.message)
    return Promise.reject(response.data);
  }else{
    console.log('断了');
  }
});
export default axios;