/*
 * @Date           : 2022-04-08 20:02:05
 * @LastEditTime   : 2022-04-08 20:02:05
 * @Description    :  
 */
import { boot } from 'quasar/wrappers'
 
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

 

export default boot(({ app }) => {
 
    app.use(mavonEditor);
})

 
