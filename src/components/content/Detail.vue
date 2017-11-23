<template>
  <el-col :span="16" :offset="2">
    <div v-if="product.name !='' && product.name != null">
      <el-col :span="24" class="bottom-enhance">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">Index</el-breadcrumb-item>
          <el-breadcrumb-item>Product</el-breadcrumb-item>
          <el-breadcrumb-item>{{product.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    
      <el-col :span="10"><img src="../../assets/products/example.png" width="100%"></el-col>
      <el-col :span="14">
        <h2>{{product.name}}<small>({{readcount}} readed)</small></h2>
        <el-col :span="24" style="padding-left:0px">
          <el-tag size="mini" v-for="tag in tags" :key="tag">{{tag}}</el-tag>
          <!-- <span class="bg-info" v-for="tag in tags" :key="tag" style="margin-right:5px">{{tag}}</span> -->
        </el-col>
        <hr></hr>
        <p>Price : <span class="text-danger">{{product.price}}</span></p>
        <p>Amount: <el-input-number size="small" v-model="count"></el-input-number></p>
        <el-col :span="24" style="padding-left:0px">
          <el-button type="primary">Buy it</el-button>
          <el-button>Add to cart</el-button>
        </el-col>
      </el-col>
      <el-col :span="24" style="margin-top:20px">
        <el-tabs v-model="activeTab" type="card" @tab-click="handleTabClick">
          <el-tab-pane label="Detail" name="detail">Detail</el-tab-pane>
          <el-tab-pane label="Comments" name="comments">
            <el-table
              :data="comments"
              style="width: 100%" 
              :show-header = "false">
              <el-table-column
                prop="username"
                width="180">
              </el-table-column>
              <el-table-column
                prop="comments">
              </el-table-column>
              <el-table-column
                prop="commentDate"
                width="180">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
    <div v-else>
      <el-alert
        title="Can't find product"
        type="error"
        description="Sorry we can't find this product temporary. Please try it later"
        show-icon>
      </el-alert>
    </div>
  </el-col>
</template>

<script>
export default {
  data: function () {
    return {
      product: [],
      readcount: '',
      tags: [],
      count: 0,
      activeTab: 'detail',
      pagenum: 1,
      comments: []
    }
  },
  beforeCreate: function () {
    var self = this
    console.log(self.$route.params.id)
    this.axios({
      method: 'get',
      url: 'http://localhost:8080/ShiroTest/product/' + self.$route.params.id
    })
    .then(function (response) {
      var data = response.data
      self.product = data.pdct
      self.tags = data.pdct.tags.split(',')
      self.readcount = data.browseTimes
    })
    .catch(function (error) {
      console.error(error)
    })
  },
  methods: {
    handleTabClick: function (tab) {
      if (tab.name === 'comments') {
        var params = new URLSearchParams()
        params.append('productId', this.product.id)
        params.append('pageNum', this.pagenum)
        var self = this
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/ShiroTest/comment/byProduct',
          data: params
        })
        .then(function (response) {
          var comments = response.data
          comments.forEach(element => {
            element.commentDate = new Date(element.commentDate).toDateString()
          })
          self.comments = comments
        })
        .catch(function (error) {
          console.error(error)
        })
      }
    }
  }
}
</script>

<style scoped>
.bottom-enhance{
  margin-bottom: 10px;
}
</style>
