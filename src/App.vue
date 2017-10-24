<template>
  <div id="app01">
    <!-- <img src="./assets/logo.png">
    <router-link to="/HelloFirst">To HEllO</router-link> -->
    <router-view name="header"/>
    <div class="container-fluid">
      <div class="row">
        <router-view name="navi" />
        <router-view name="content"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
