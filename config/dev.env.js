'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
    // BASE_API: '"http://106.15.57.98:8090/wbapi/"'
  BASE_API: '"/gp/wbapi/"' //index.js 中 proxyTable作了代理
})
