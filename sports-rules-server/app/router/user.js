/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\router\user.js
 */

module.exports = app => {
  const { router, controller, jwt } = app;
  // console.log( 'app.controller--',jwt,app.controller);
  app.router.get("/api/user/read", jwt, app.controller.user.findAll);
  app.router.post("/api/user/create", jwt, app.controller.user.create);
  app.router.post("/api/user/update", jwt, app.controller.user.update);
  // app.router.post("/api/user/delete", jwt, app.controller.user.destroy);
  app.router.post("/api/user/login", app.controller.user.login);
};
