(function (window) {
  window.__env = window.__env || {};

  // 在生產環境 (production) 中沒有被納入 /dist 中:
  // 在生產環境 (production) 中沒有被納入 /dist 中:
  // 在生產環境 (production) 中沒有被納入 /dist 中:

  // folk service
  window.__env.FOLK_HOST = 'http://localhost:3000/folk-service/api/v1';
  window.__env.FOLK_URL_REQ_LOGIN = '/user/login';

  // message service
  window.__env.MESSAGE_HOST = 'http://localhost:3004';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.DEBUG_MODE = true;
}(this));
