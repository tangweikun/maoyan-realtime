const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/mockapi', {
      target: 'http://127.0.0.1:8001'
    })
  );
  app.use(
    proxy('/api', {
      target: 'http://piaofang.maoyan.com', //dev
      changeOrigin: true,
      // target: 'http://172.17.12.8:8089',//test
      // target: 'http://172.17.12.9:8089',//prod

      pathRewrite: {
        '^/api': ''
      }
    })
  );
};
