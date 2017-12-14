<template>
<div>
  <el-menu 
    class="el-menu-demo" 
    mode="horizontal" 
    background-color="#f8f8f8" >
    <el-menu-item index="/index" @click="handleNaviTarget('/index')">System</el-menu-item>
    <el-submenu index="2" style="float:right">
      <template slot="title">{{username}}</template>
      <el-menu-item index="/admin/profile" @click="handleNaviTarget('/admin/profile')">Profile Setting</el-menu-item>
      <el-menu-item index="/admin/uploadInit" @click="handleNaviTarget('/admin/uploadInit')">Import Products</el-menu-item>
      <el-menu-item index="/logout" @click="handleNaviTarget('/logout')">Logout</el-menu-item>
    </el-submenu>
  </el-menu>

  <el-dialog
    title="Expire"
    :visible.sync="showExpire"
    :close-on-click-modal = "false"
    :close-on-press-escape = "false"
    :show-close = "false"
    width="30%">
    <span>Your session has expired. Please re-login to continue</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="relogin">Accept</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
// import SockJS from 'sockjs-client'

export default {
  data () {
    return {
      activeIndex: '1',
      intervalId: 0,
      showExpire: false
    }
  },
  computed: {
    username: function () {
      return this.$store.state.token.username
    }
  },
  created: function () {
    // var sock = new SockJS('http://localhost:8080/ShiroTest/websocket', '', {
    //   sessionId: function () {
    //     var jsessionid = sessionStorage.getItem('jsessionid')
    //     if (jsessionid !== null && jsessionid !== '') return jsessionid
    //   }
    // })
    // sock.onmessage = function (response) {
    //   var msg = response.data
    //   if (msg === 'session timeout') {
    //     console.error('Timeout!')
    //   }
    // }
    var self = this
    this.intervalId = setInterval(() => {
      var current = new Date()
      var lastTouch = new Date(self.$store.state.lastTouch)
      console.log('Current time: ' + current.getTime())
      console.log('Last touch time: ' + lastTouch.getTime())
      var lasted = parseInt(current.getTime() / 60000) - parseInt(lastTouch.getTime() / 60000)
      console.log('Lasted: ' + lasted)
      if (lasted >= 3 && lasted < 5) {
        self.$notify({
          title: 'Warning!',
          message: 'Your session will be expired soon. If you are no longer to use it. Please log out.',
          type: 'warning',
          duration: 5000
        })
      } else if (lasted >= 5) {
        self.$store.commit('updateToken', {token: []})
        self.showExpire = true
      }
    }, 60000)
  },
  methods: {
    relogin () {
      this.$router.push('/')
    },
    handleNaviTarget (target) {
      var self = this
      if (target !== '/logout') this.$router.push(target)
      else {
        this.axios({
          method: 'get',
          url: 'http://localhost:8080/ShiroTest/auth/logout'
        })
        .then(function () {
          self.$store.state.token = []
          self.$router.push('/')
        })
        .catch(function (error) {
          console.error(error)
        })
      }
    }
  },
  beforeDestroy: function () {
    clearInterval(this.intervalId)
  }
}
</script>

<style>
body{
  background-color: #ffffff;
  margin-top: 0;
}
</style>
