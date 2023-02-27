/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\router\packingrecords.js
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  app.router.get("/api/packingrecords/read", jwt, app.controller.packingrecords.findAll);
  app.router.get("/api/client/packingrecords/read", app.controller.packingrecords.findAll_object);
  app.router.post("/api/packingrecords/create", jwt, app.controller.packingrecords.create);
  app.router.get("/api/packingrecords/info", jwt, app.controller.packingrecords.show);

  // app.router.post("/api/packingrecords/delete", jwt, app.controller.packingrecords.destroy);
};
