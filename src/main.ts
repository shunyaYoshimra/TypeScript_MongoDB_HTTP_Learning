import App from './app';
import HTTPController from './controllers/http.controller';
import CookieController from './controllers/cookie.controller';
import SessionController from './controllers/session.contoller';

const app = new App(
  [
    new HTTPController(),
    new CookieController(),
    new SessionController()
  ]
);

app.listen();