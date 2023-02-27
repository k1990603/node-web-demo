/*
 * @Date           : 2022-03-29 22:13:20
 * @LastEditTime: 2022-08-05 21:02:51
 * @Description    :
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  router.post("/api/file/upload", jwt, controller.fileUpload.save);
  router.post("/api/file/writerfile", jwt, controller.fileUpload.writerfile);
  router.post("/api/file/writeandcreate", jwt, controller.fileUpload.writeandcreate);
};
