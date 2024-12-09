import axios, { AxiosRequestConfig } from 'axios'

const timeout = 30000

const service = axios.create({
  timeout,
  baseURL: process.env.REACT_APP_TWITTER_SERVER_URL,
  withCredentials: false,
})

service.interceptors.request.use(
  (config) => config,
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
        const data: any = res.data
        resolve(data)
      })
      .catch((error) => {
        let e = JSON.stringify(error)
        console.log(`[Network Error]: ${e}`)
        reject(error)
      })
  })
}

const requestTwitter = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('get', url, params, config),
  post: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('post', url, params, config),
  put: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('put', url, params, config),
}

export { requestTwitter }