<template>
<el-col :span="17">
  <el-col :span="8" v-for="prod in rproducts" :key="prod.id">
    <el-card :body-style="{ padding: '5px'}" style="margin-bottom:15px;">
      <img src="../../assets/products/example.png" width="100%">
      <div style="padding: 15px;">
        <span>{{prod.name }}</span>
			  <span>{{prod.description }}</span>
			  <p><el-button type="text" class="button">操作按钮</el-button></p>
      </div>
    </el-card>
  </el-col>
</el-col>
</template>

<script>
export default {
  data: function () {
    return {
      rproducts: []
    }
  },
  beforeCreate: function () {
    var self = this
    this.axios({
      method: 'get',
      url: 'http://localhost:8080/ShiroTest/product/recommended'
    })
    .then(function (response) {
      self.rproducts = response.data
    })
    .catch(function (error) {
      console.error(error)
    })
  }
}
</script>

<style>

</style>
