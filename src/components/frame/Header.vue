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
      <el-menu-item index="/admin/uploadInit" @click="handleNaviTarget('/admin/import')">Import Products</el-menu-item>
      <el-menu-item index="/logout" @click="handleNaviTarget('/logout')">Logout</el-menu-item>
    </el-submenu>
  </el-menu>

  <el-dialog
    title="Authenication timeout. Please relogin"
    :visible.sync="showReLogin"
    :close-on-click-modal = "false"
    :close-on-press-escape = "false"
    :show-close = "false"
    width="30%">
    <el-form :model="reloginForm">
      <el-form-item label="User name:" :label-width="formLabelWidth">
        <el-input v-model="reloginForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Password" :label-width="formLabelWidth">
        <el-input type="password" v-model="reloginForm.password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible = false">Submit</el-button>
    </div>
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
      showExpire: false,
      reloginForm: {
        username: this.$store.state.username,
        password: ''
      },
      formLabelWidth: 300
    }
  },
  computed: {
    username: function () {
      return this.$store.state.username
    },
    showReLogin: function () {
      return this.$store.state.showReLogin
    }
  },
  created: function () {
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
          message: 'Your token will be expired soon. If you are no longer to use it. Please log out.',
          type: 'warning',
          duration: 5000
        })
      }
    }, 60000)
  },
  methods: {
    relogin () {
      // TODO complete relogin method
    },
    handleNaviTarget (target) {
      var self = this
      if (target !== '/logout') this.$router.push(target)
      else {
        this.axios({
          method: 'get',
          url: 'http://localhost:8080/ShiroTest/auth/logout',
          headers: {'Authorization': this.$store.state.token}
        })
        .then(function () {
          self.$store.state.token = ''
          self.$router.push('/')
        })
        .catch(function (error) {
          console.error(error)
          if (error.response.status === 401) { self.$store.commit('updateShowReLogin', {showReLogin: true}) }
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
