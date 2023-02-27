/*
 * @Author         : your name
 * @Date           : 2022-03-13 20:17:44
 * @LastEditTime   : 2022-03-13 20:17:44
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \client-api-doc-admin\src\store\templateStore.js
 */
export default {
    // namespaced: true,
    state: {
        template: '',
    },
    getters: {
        get_template(state) {
            return state.template;
        }
    },
    actions: {
        set_template({ commit }, template) {
            commit("set_template", template)
        }

    },
    mutations: {
        set_template(state, template) {
            state.template = template
        }

    }
}