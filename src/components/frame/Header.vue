<template>
  <el-menu 
    class="el-menu-demo" 
    mode="horizontal" 
    @select="handleSelect"
    background-color="#f8f8f8" 
    :router="true">
    <el-menu-item index="1">System</el-menu-item>
    <el-submenu index="2" style="float:right">
      <template slot="title">{{username}}</template>
      <el-menu-item index="admin/profile">Profile Setting</el-menu-item>
      <el-menu-item index="admin/uploadInit">Import Products</el-menu-item>
      <el-menu-item index="logout">Logout</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
// import SockJS from 'sockjs-client'

export default {
  data () {
    return {
      activeIndex: '1',
      intervalId: 0
    }
  },
  computed: {
    username: function () {
      var session = JSON.parse(sessionStorage.getItem('token'))
      return session.username
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
      var lastTouch = new Date(sessionStorage.getItem('lastTouch'))
      console.log('Current time: ' + current.getTime())
      console.log('Last touch time: ' + lastTouch.getTime())
      var lasted = parseInt(current.getTime() / 60000) - parseInt(lastTouch.getTime() / 60000)
      console.log('Lasted: ' + lasted)
      if (lasted === 3) {
        self.$notify({
          title: 'Warning!',
          message: 'Your session will be expired soon. If you are no longer to use it. Please log out.',
          type: 'warning',
          duration: 0
        })
      } else console.log('On checking')
    }, 60000)
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log('Key: ' + key)
      console.log('Key path: ' + keyPath)
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
