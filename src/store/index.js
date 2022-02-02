//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import axios from "axios";
//应用Vuex插件
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({

    state: {
        token: '',
        RoleList: ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setRoleList(state, roleList) {
            state.RoleList = roleList
        }
    },
    actions: {
        async selectRoleList (context) {
            const { data: res } = await axios.get('/commonAdmin/selectRoleList')
            console.log(res.data)
            context.commit('setRoleList', res.data.roleList.list)
        }
    },
    getters: {
        showRoleList(state) {
            return state.RoleList
        }
    },
    modules: {}
})