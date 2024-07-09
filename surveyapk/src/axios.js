import axios from 'axios';
import router from './routes';

const AxiosClient=axios.create({
  baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`
});

AxiosClient.interceptors.request.use((config)=>{
  config.headers.Authorization=`Bearer ${localStorage.getItem('TOKEN')}`;
  return config;
});
AxiosClient.interceptors.response.use(response=>{
  return response;
},
error=>{
  if(error.response && error.response.status===401){
    router.navigate('/login')
    return error;
  }
  throw error;
}
)
export default AxiosClient;
