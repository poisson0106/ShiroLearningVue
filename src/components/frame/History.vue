<template>
<el-col :span="5">
  <el-card 
    class="box-card"
    v-loading="historyloading">
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
import bus from '@/router/bus.js'

export default {
  data: function () {
    return {
      history: [],
      historyloading: true
    }
  },
  mounted: function () {
    bus.$on('historyupdate', (recent) => {
      this.history = recent
      this.historyloading = false
    })
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
