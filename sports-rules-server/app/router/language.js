/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\router\language.js
 */

module.exports = app => {
  const { router, controller, jwt } = app;
  // console.log( 'app.controller--',jwt,app.controller);

  app.router.get("/api/language/read", jwt, app.controller.language.findAll);
  app.router.get("/api/client/language/read", app.controller.language.findAll);
  app.router.post("/api/language/create", jwt, app.controller.language.create);
  app.router.post("/api/language/update", jwt, app.controller.language.update);
  // app.router.post("/api/language/delete", jwt, app.controller.language.destroy);
};
