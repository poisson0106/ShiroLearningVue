<template>
<el-col :span="14" :offset="5">
  <h1>Profile settings</h1>
  <el-card>
    <el-form label-position = "top" :model = "profile">
      <el-form-item label="User Name:">
        <el-input v-model="profile.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="Password:">
        <el-input type = 'password' v-model="profile.password" suffix-icon="el-icon-view"></el-input>
      </el-form-item>
      <el-form-item label="Re-enter Password:">
        <el-input type = 'password' v-model="profile.repassword" suffix-icon="el-icon-view"></el-input>
      </el-form-item>
      <el-form-item label="Roles">
         <el-checkbox v-for="(roleObj, index) in profile.rolesMap" :label="roleObj.role" :key="index" :checked="roleObj.isChecked">{{roleObj.role}}</el-checkbox>
      </el-form-item>
    </el-form>
  </el-card>
</el-col>
</template>

<script>
export default {
  data () {
    return {
      profile: {
        username: '',
        password: '',
        repassword: '',
        rolesMap: []
      }
    }
  },
  beforeCreate: function () {
    var params = new URLSearchParams()
    var usr = this.$store.state.token.username
    params.append('username', usr)
    var self = this
    this.axios({
      method: 'post',
      url: 'http://localhost:8080/ShiroTest/index/profile',
      data: params
    })
    .then(function (response) {
      self.profile.rolesMap = response.data
      self.profile.username = self.$store.state.token.username
    })
    .catch(function (error) {
      console.error(error)
    })
  }
}
</script>

<style scoped>
body {
  background-color: #eee
}
</style>
