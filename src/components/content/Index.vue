<template>
  
</template>

<script>
export default {
  name: 'Index',
  data: function () {
    return {
      rproducts : []
    }
  },
  beforeCreate: function () {
    var self = this
    this.axios({
      method: "get",
      url: 'http://localhost:8080/product/recommended'
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

