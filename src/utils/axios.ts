import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from "axios";
import config from "@/config/index.ts";
export interface ResponseData {
  status: string;
  msg: string;
  data: any;
}
const {
  api: { devApiBaseUrl, proApiBaseUrl }
} = config;
const appBaseUrl =
  process.env.NODE_ENV === "development" ? devApiBaseUrl : proApiBaseUrl;
class Request {
  constructor(public baseURL: string) {}
  public http(options: AxiosRequestConfig): AxiosPromise<ResponseData> {
    const instance = axios.create();
    options = Object.assign({ baseURL: this.baseURL }, options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
  private interceptors(instance: AxiosInstance, url?: string) {
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      err => {
        return Promise.reject(err);
      }
    );
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data } = res;
        const { status, msg } = data;
        if (parseInt(status, 10) !== 0) {
          throw new Error(`${msg}`);
        }
        return res;
      },
      err => {
        console.log("axios error:", err);
        return Promise.reject(err);
      }
    );
  }
}

export default new Request(appBaseUrl);
