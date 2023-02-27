import { boot } from 'quasar/wrappers'
 


import lodash from "lodash"

export default boot(({ app }) => {

  // for use inside Vue files (Options API) through this.$lodash   

  app.config.globalProperties.$lodash = lodash

 
})

export { lodash   }
