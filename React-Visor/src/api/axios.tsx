import axios from 'axios';
import { URL_API } from '../env';

const instance = axios.create({
  baseURL: URL_API,
});

export default instance;
