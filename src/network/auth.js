import request from './request'

import qs from 'qs'


//用户注册
export function userRegister(formData) {
  return request({
    url: "user/registered",
    method: "post",
    // headers: {
    // "Content-Type": "multipart/form-data"},
    // withCredentials:true,
    // data:formData
    params: {
      checkPass: formData.checkpass,
      email: formData.useremail,
      userSex: formData.usersex,
      userContact: formData.usercontact,
      userEmail: formData.useremail,
      userName: formData.username,
      userPassword: formData.password,
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

//忘记密码
export function forget1(meth, type) {
  let type2 = parseInt(type);
  return request({
    url: 'user/sendForgetEmail',
    method: 'post',
    params: {
      info: meth,
      type: type2
    }
  })
}

//重置密码
export function resetpassword(usercode, type, info, newpassword) {
  return request({
    url: '/user/RsetUserPassword',
    method: 'post',
    params: {
      usercode,
      type,
      info,
      newpassword
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

export function forget2(meth, type) {
  let data = qs.stringify({
    meth: meth,
    type: type
  })
  return request({
    url: 'user/sendForgetEmail',
    method: 'post',
    params: {
      data
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

// 获取用户主页信息
export function getInfo(targetuserId) {
  return request({
    url: '/user/toAnyPersonalInfo',
    method: 'post',
    params: {
      targetuserId
    }
  })
}



// 用户修改信息
export function updata(message, contact, sex) {
  let data = qs.stringify({
    userContact: contact,
    userSex: sex,
    userStatement: message
  })
  return request({
    url: '/user/updateInfo',
    method: 'post',
    data: data
  })
}
