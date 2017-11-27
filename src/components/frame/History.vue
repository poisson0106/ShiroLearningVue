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
    cell-click="handleCellClick">
      <el-table-column
        prop="name"
        label="Recent History"
        width="200">
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
    handleCellClick: function () {
      console.log('aaa')
      console.log('bbb')
    }
  }
}
</script>

<style>

</style>
