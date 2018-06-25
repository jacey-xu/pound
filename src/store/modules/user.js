/* eslint-disable */
import { login, logout, getInfo, getInfo2 } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
/**    actions: {
//actions里面全是方法，与mutations区别只有这儿的方法可以使用异步操作，mutations方法使用异步，调试会混乱。
//n为组件传过来的参数。
//{{commit,state}}写法是es6语法，简写，state是默认传参，就是上面的state，就算写aaa也是指向state。  　　 　　　　　　
      fn({ commit, state }, n) {
        new Promise((resolve, reject) => {
          //这儿模拟延迟，不模拟写 state.a += n; commit('add')代替
          setTimeout(() => resolve(state.a += n), 1000)
        }).then(commit('add'))
      },
//fn执行结束后，再执行mutations 中的add(){}。必须如此，否则，组件使用时收不到数据。
      msgFn({ commit, state }, msg) {
        state.b = msg
        commit('add')
      }
    },*/
    actions: { //actions里面通过{ commit, state } 调用mutations中的方法, 获取state中的值
    // 登录 用法见上
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
/*          //演示
          setToken('token');
          commit('SET_TOKEN','token') //存状态
          commit('SET_NAME', 'admin')
          commit('SET_ROLES', ['管理员 ',' 财务员 ',' 现场环境'])

          resolve('token');*/

        login(username, userInfo.password).then(response => {
          const data = response.data
            console.log(response);
          setToken(data.access_token)  //存cookie
          commit('SET_TOKEN', data.access_token) //存状态
          // commit('SET_NAME', 'admin')
          // commit('SET_ROLES', ['管理员 ',' 财务员 ',' 现场环境'])
          resolve(data);
            console.log(getToken());
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息 permission.js中调用
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
              // getInfo(state.token).then(response => {
        getInfo2(state.token).then(response => { //
          const data = response.data
            // commit('SET_ROLES', data.role.)
          commit('SET_NAME', data.user.nickname)
            // commit('SET_NAME', 'admin')
            commit('SET_ROLES', ['管理员 ',' 财务员 ',' 现场环境'])
          commit('SET_AVATAR', data.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出 permission.js中获取用户信息失败 调用
    LogOut({ commit, state }) {

        removeToken(); //直接移动

        // 请求接口退出,有接口再做
/*      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '11')
          commit('SET_NAME', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })*/
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
