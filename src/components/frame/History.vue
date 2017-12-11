<template>
<el-col :span="5">
  <el-card 
    class="box-card"
    v-if="isShow">
    <el-table
    :data="history"
    height="250"
    empty-text="Not Available"
    style="width: 100%"
    @row-click="handleRowClick">
      <el-table-column
        prop="name"
        label="Recent History"
        width="200"
        style="cursor:pointer">
      </el-table-column>
    </el-table>
  </el-card>
</el-col>
</template>

<script>
export default {
  computed: {
    history: function () {
      return this.$store.state.history
    },
    isShow: function () {
      return this.$store.state.history !== undefined
    }
  },
  methods: {
    handleRowClick: function (row) {
      console.log('In method')
      var id = row.id
      this.$router.push({name: 'Product', params: {id}})
    }
  }
}
</script>

<style>

</style>
