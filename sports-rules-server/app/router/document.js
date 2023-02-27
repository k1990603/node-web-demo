/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\router\document.js
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // console.log( 'app.controller--',jwt,app.controller);

  app.router.get("/api/document/read", jwt, app.controller.document.findAll);
  app.router.get("/api/client/document/read", app.controller.document.docandmdfindAll);
  app.router.post("/api/document/create", jwt, app.controller.document.create);
  app.router.post("/api/document/update", jwt, app.controller.document.update);
  // app.router.post("/api/document/delete", jwt, app.controller.document.destroy);
  app.router.get("/api/document/info", jwt, app.controller.document.show);
};
