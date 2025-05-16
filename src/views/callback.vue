<template>
    <div>正在授权...</div>
  </template>
  
  <script>
  export default {
    mounted() {
      // 从URL解析授权码
      const code = new URLSearchParams(window.location.search).get('code')
  
      if (code) {
        // 发送授权码到后端换取Token
        this.$axios.post('/api/auth/token', { code })
          .then(response => {
            const { access_token, expires_in } = response.data
            // 存储Token（建议使用Vuex或sessionStorage）
            sessionStorage.setItem('access_token', access_token)
            this.$router.push('/homeView')
          })
          .catch(error => {
            console.error('Token获取失败:', error)
            this.$router.push('/?error=auth_failed')
          })
      } else {
        this.$router.push('/?error=missing_code')
      }
    }
  }
  </script>