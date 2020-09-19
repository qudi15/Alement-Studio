const Mock = require('mockjs')

const urlMap = {
  '/api/authority-role/search': () => {
    return Mock.mock({
      code: 'success',
      msg: 'success',
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'data|10': [{
        code: () => Mock.Random.id(),
        name: () => Mock.Random.title(1),
        status: () => Mock.Random.natural(1, 3) + '',
        createTime: () => Mock.Random.datetime(),
        modifyTime: () => Mock.Random.datetime()
      }]
    })
  },

  '/api/authority-role/count': () => {
    return {
      code: 'success',
      msg: 'success',
      data: Mock.Random.natural(10, 1000)
    }
  }
}

export const http = {
  post (url) {
    return Promise.resolve(urlMap[url] ? urlMap[url]() : { code: 'success', msg: 'success' })
  }
}
