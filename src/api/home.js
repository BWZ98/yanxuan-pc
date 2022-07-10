import request from '@/utils/request'
export const findBrand = (limit) => {
  return request({
    url: '/home/brand',
    method: 'GET',
    params: {
      limit: limit
    }
  })
}
