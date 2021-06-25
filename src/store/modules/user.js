import { login, getUserInfo, logout } from "@/network/auth";
import { getToken, setToken, removeToken } from "@/utils/auth";

const state = {
  token: getToken(), // token
  user: {}, // 用户对象
};

const mutations = {
  SET_TOKEN_STATE: (state, token) => {
    state.token = token;
    // console.log(state.token)
  },
  SET_USER_STATE: (state, user) => {
    state.user = user;
    // console.log(state.user)
  },
};

const actions = {
  // 用户登录
  login({ commit }, ruleForm) {
    // console.log(userInfo)
    const { username, password, remember } = ruleForm;
    return new Promise((resolve, reject) => {
      // login(name, pass)
      //   .then((response) => {
      //     // console.log(response.data)
      //     console.log(response)
      //     commit("SET_TOKEN_STATE", response);
      //     setToken(response);
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
      login(username, password).then(response => {
        if (response.data == "用户不存在") {
          reject(0)

        } else if (response.data == "用户名或密码错误") {

          reject(1)
        } else {
          // this.$message.success("登入成功！", 0.1);

          console.log(response.data)
          commit("SET_TOKEN_STATE", response.data);
          setToken(response.data);
          resolve();

        }
      });
    });


  },
  //获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then((response) => {
          // console.log(response)
          const { data } = response;

          // console.log(data)
          if (!data) {
            commit("SET_TOKEN_STATE", "");
            commit("SET_USER_STATE", "");
            removeToken();
            resolve();
            reject("Verification failed, please Login again.");
          }
          commit("SET_USER_STATE", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 注销
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then((response) => {
          // console.log(response);
          commit("SET_TOKEN_STATE", "");
          commit("SET_USER_STATE", "");
          removeToken();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
