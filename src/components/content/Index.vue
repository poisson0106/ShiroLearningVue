<template>
  <div class="col-sm-8">
    <div class="col-sm-3" v-for="prod in rproducts" :key="prod.id">
      <div class="thumbnail">
			  <img src="../../assets/products/example.png" width="100%">
			  <div class="caption">
			    <h3>{{prod.name }}</h3>
			    <p>{{prod.description }}</p>
			    <p><a href="http://localhost:8080/ShiroTest/product/prod.id" class="btn btn-primary" role="button">Button</a></p>
		  	</div>
		  </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
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

  }
}
</script>

<style scoped>

</style>

