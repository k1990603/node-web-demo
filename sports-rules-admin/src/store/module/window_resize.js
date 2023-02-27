/*
 * @Author         : your name
 * @Date           : 2022-03-13 20:18:22
 * @LastEditTime   : 2022-03-13 20:18:23
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \client-api-doc-admin\src\store\module\window_resize.js
 */

export default {
    // namespaced: true,
    state: {
        window_size_change:0,
        window_size: {},
    },
    getters: {
        get_window_size(state) {
            return state.window_size;
        },
        get_window_size_change(state) {
            return state.window_size_change;
        },
        
    },
    actions: {
        set_window_size({ commit }, window_size) {
            commit("set_window_size", window_size)
        }

    },
    mutations: {
        set_window_size(state, window_size) {
            state.window_size = window_size
            state.window_size_change =new Date().getTime()
        }


    }
}