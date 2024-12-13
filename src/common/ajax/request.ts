import axios, { AxiosRequestConfig } from 'axios'

const timeout = 30000

const service = axios.create({
  timeout,
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: false,
})

service.interceptors.request.use(
  (config) => {
    const lang =  window.localStorage.getItem('i18nextLng') || 'en'
    config.headers.lang = lang === 'cn' ? 'zh-cn' : 'en';
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

interface axiosTypes<T> {
  data: T
  status: number
  statusText: string
}

interface responseTypes<T> {
  code: number
  msg: string
  data: T
}

const requestHandler = <T>(
  method: 'get' | 'post' | 'put',
  url: string,
  params: object = {},
  config: AxiosRequestConfig = {}
): Promise<T> => {
  let response: Promise<axiosTypes<responseTypes<T>>>
  switch (method) {
    case 'get':
      response = service.get(url, { params: { ...params }, ...config })
      break
    case 'post':
      response = service.post(url, { ...params }, { ...config })
      break
    case 'put':
      response = service.put(url, { ...params }, { ...config })
      break
  }

  return new Promise<T>((resolve, reject) => {
    response
      .then((res: any) => {
        // if (res.request.responseURL === 'https://dev-app-api.tabi.com/biz/benefit/exchange') {
        //   res = {
        //     data: {
        //       code: 400,
        //       message: 'XP不足',
        //       data: null,
        //       success: false
        //     }
        //   }
        // }
        const data: any = res.data
        if (data.code !== 200) {
          let e = JSON.stringify(data)
          console.log(`[Request Error]: ${e}`)
          reject(data)
        } else {
          resolve(data)
        }
      })
      .catch((error) => {
        let e = JSON.stringify(error)
        console.log(`[Network Error]: ${e}`)
        reject(error)
      })
  })
}

const request = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('get', url, params, config),
  post: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('post', url, params, config),
  put: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('put', url, params, config),
}

export { request }