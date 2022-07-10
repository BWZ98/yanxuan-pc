import request from '@/utils/request.js'

export const findAllCategory = () => {
  return request({
    url: '/home/category/head',
    method: 'GET'
  })
}
