/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\router\mddocpool.js
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // console.log( 'app.controller--',jwt,app.controller);

  app.router.get("/api/mddocpool/read", jwt, app.controller.mddocpool.findAll);
  app.router.get("/api/client/mddocpool/read", app.controller.mddocpool.findAll);
  app.router.post("/api/mddocpool/create", jwt, app.controller.mddocpool.create);
  app.router.post("/api/mddocpool/update", jwt, app.controller.mddocpool.update);
  app.router.get("/api/mddocpool/info", jwt, app.controller.mddocpool.show);

  // app.router.post("/api/mddocpool/delete", jwt, app.controller.mddocpool.destroy);
};
