const path = require('path')

const resolvePath = (url) => path.resolve(__dirname, url)

module.exports = {
  pages: {
    index: {
      entry: resolvePath('./src/main.ts'),
      template: resolvePath('./public/index.html'),
      filename: 'index.html',
      title: '自动图形拖拽-lowcode平台'
    }
  }
}
