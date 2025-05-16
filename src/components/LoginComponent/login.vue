<template>
    <div class="login-page">
      <h1>欢迎使用阳光云大屏系统</h1>
      <LoginButton /> <!-- 引入登录按钮组件 -->
    </div>
  </template>
  
  <script>
  import LoginButton from '/@/components/LoginComponent/loginButton.vue'
  
  export default {
    components: { LoginButton }
  }
  </script>