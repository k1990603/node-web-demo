/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\router\updaterecord.js
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // console.log( 'app.controller--',jwt,app.controller);

  app.router.get("/api/updaterecord/read", jwt, app.controller.updaterecord.findAll);
  app.router.post("/api/updaterecord/create", jwt, app.controller.updaterecord.create);
  app.router.post("/api/updaterecord/update", jwt, app.controller.updaterecord.update);
  app.router.get("/api/updaterecord/info", jwt, app.controller.updaterecord.show);

  // app.router.post("/api/updaterecord/delete",jwt,app.controller.updaterecord.destroy);
};
