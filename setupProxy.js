const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  // app.use(
  //   '/epochReward',
  //   createProxyMiddleware('',{
  //     target: 'http://192.168.0.118:8092',
  //     changeOrigin: true,
  //     pathRewrite: { '^/epochReward': '/epochReward' },
  //   })
  // );
  // app.use(
  //   '/reward',
  //   createProxyMiddleware('',{
  //     target: 'http://192.168.0.118:8092',
  //     changeOrigin: true,
  //     pathRewrite: { '^/reward': '/reward' },
  //   })
  // );
};
