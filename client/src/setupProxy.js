const { createProxyMiddleware } = require('http-proxy-middleware');

//setting proxy so our fetch calls go through

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1234',
      changeOrigin: true,
    })
  );
};