import request from './request'

export function userRegister(formData) {
  return request({
    url: "user/registered",
    method: "post",
    // headers: {
    // "Content-Type": "multipart/form-data"},
    // withCredentials:true,
    // data:formData

    params: {
      checkPass: formData.checkPass,
      email: formData.email,
      userSex: formData.userSex,
      userContact: formData.userContact,
      userEmail: formData.userEmail,
      userName: formData.userName,
      userPassword: formData.userPassword,
      usercode: formData.usercode,


    }

  })
}
// 前台用户登录
export function login(username, password) {
  return request({
    url: 'user/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

//校验验证码
export function sendRegEmail(emails) {
  return request({
    url: '/user/sendRegEmail',
    method: 'post',
    params: {
      email: emails
    }

  })
}
// 登录后获取前台用户信息
export function getUserInfo() {
  return request({
    url: '/user/toPersonalInfo',
    method: 'get',
  })
}
// 前台用户注销
export function logout() {
  return request({
    url: '/user/logout'
  })
}

export function forget1(meth, type) {
  return request({
    url: 'user/sendForgetEmail',
    method: 'post',
    params: {
      info: meth,
      type
    }
  })
}

export function forget2(meth, type) {
  return request({
    url: 'user/sendForgetEmail',
    method: 'post',
    params: {
      info: meth,
      type
    }
  })
}

export function sentforget1(usercode, meth, type) {
  return request({
    url: '/user/checkFcode',
    method: 'post',
    params: {
      usercode,
      info: meth,
      type
    }
  })
}

export function sentforget2(usercode, meth, type) {
  return request({
    url: '/user/checkFcode',
    method: 'post',
    params: {
      usercode,
      info: meth,
      type
    }
  })
}