<template>
<el-col :span="17">
  <el-col :span="8" v-for="prod in rproducts" :key="prod.id">
    <el-card :body-style="{ padding: '10px'}" style="margin-bottom:15px;">
      <img src="../../assets/products/example.png" width="100%">
      <el-row type="flex">
        <el-col :span="24">{{prod.name }}</el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">{{prod.description }}</el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-button plain @click="handleDetail(prod.id)">Detail</el-button>
      </el-row>
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
  },
  methods: {
    handleDetail: function (id) {
      this.$router.push('product/' + id)
    }
  }
}
</script>

<style scoped>
.bottom {
  float: right;
  padding-top: 13px;
  padding-bottom: 13px;
  line-height: 12px;
}
</style>
