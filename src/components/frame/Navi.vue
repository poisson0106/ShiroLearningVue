<template>
<el-col :span="5">
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo" 
    v-loading="loadMenu" 
    :unique-opened="true" 
    @open="handleOpen"
    v-if = "(topMenus !== undefined && topMenus !== null) || !loadMenu">
    <el-submenu v-for="menu in topMenus" :key = "menu.id" :index="menu.id.toString()">
      <template slot="title">
        <span>{{menu.name}}</span>
      </template>
      <el-menu-item v-for="item in items" :key="item.id" :index="item.id.toString()">{{item.name}}</el-menu-item>
    </el-submenu>
  </el-menu>
  </el-col>
</template>

<script>
export default {
  data: function () {
    return {
      topMenus: [],
      items: [],
      loadMenu: false
    }
  },
  beforeCreate: function () {
    var self = this
    this.loadMenu = true
    this.axios({
      method: 'get',
      url: 'http://localhost:8080/ShiroTest/index/getMainMenu'
    })
    .then(function (response) {
      console.log(response.data)
      self.topMenus = response.data
      self.loadMenu = false
    })
    .catch(function (error) {
      console.error(error)
      self.loadMenu = false
    })
  },
  methods: {
    handleOpen: function (key) {
      var subName = ['ary1', 'ary2', 'ary3', 'ary4']
      var subMenus = sessionStorage.getItem(subName[key - 1])
      var self = this
      var params = new URLSearchParams()
      params.append('mainMenu', key)
      if (subMenus === null || subMenus === '') {
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/ShiroTest/index/getSubMenu',
          data: params
        })
        .then(function (response) {
          var sub = response.data
          if (sub !== null && sub.length > 0) {
            self.items = sub
            sessionStorage.setItem(subName[key - 1], JSON.stringify(sub))
          } else {
            sessionStorage.setItem(subName[key - 1], [null])
            self.items = []
          }
        })
        .catch(function (error) {
          console.error(error)
        })
      } else {
        if (subMenus !== null && subMenus !== '') this.items = JSON.parse(subMenus)
        else this.items = []
      }
    }
  }
}
</script>

<style>

</style>
