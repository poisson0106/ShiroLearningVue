<template>
  <div id="app01">
    <!-- <img src="./assets/logo.png">
    <router-link to="/HelloFirst">To HEllO</router-link> -->
    <!-- <router-view name="header"/>
    <div class="container-fluid">
      <div class="row">
        <router-view name="navi" />
        <router-view name="content"/>
      </div>
    </div> -->
    <el-container>
      <el-header class="header"><router-view name="header"/></el-header>
      <el-main>
        <el-row :gutter="20">
          <router-view name="navi" />
          <router-view name="content"/>
          <router-view name="history" />
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style>
.header{
  margin-left: -8px;
  margin-right: -8px;
  padding-left: 0;
  padding-right: 0;
}

.el-loading-parent--hidden {
    overflow: inherit !important;
}
</style>


<script>
export default {
  name: 'app'
}
</script>
