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
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    username: function () {
      var session = JSON.parse(sessionStorage.getItem('token'))
      return session.username
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log('Key: ' + key)
      console.log('Key path: ' + keyPath)
    }
  }
}
</script>

<style>
body{
  background-color: #ffffff;
  margin-top: 0;
}
</style>
