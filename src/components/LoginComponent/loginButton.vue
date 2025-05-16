<template>
    <div class="login-btn">
      <button @click="handleLogin"> 
        <!-- <img src="@/assets/solar-logo.png"> -->
        使用阳光云账号登录
      </button>
    </div>
</template>
  
  <script>
  export default {
    methods: {
      handleLogin() {
        // 构建授权URL并跳转到登录页面
        const redirectUri = encodeURIComponent(import.meta.env.VITE_APP_REDIRECT_URI)
        alert(redirectUri)
        const authUrl = `https://web3.isolarcloud.com.cn/#/authorized-app?cloudId=1&applicationId=63&redirectUrl=${redirectUri}`
        window.location.href = authUrl
      }
    }
  }
  </script>
  <style scoped>

  .login-btn button {
    padding: 12px 24px;
    background: #007bff;
    color: white;
    border-radius: 4px;
  }
  </style>