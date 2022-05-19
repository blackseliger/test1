import Router from './router/index.js';


const router = Router.instance();

router
  .addRoute(/^$/, 'game')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('error404')
  .listen();
