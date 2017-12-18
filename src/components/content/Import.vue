<template>
  <el-col 
    :span="16" 
    :offset="4">
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://localhost:8080/ShiroTest/admin/uploadToDB"
      :on-change="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      accept="xlsx">
      <el-button 
        slot="trigger" 
        size="small" 
        type="primary">Choose file</el-button>
      <el-button 
        style="margin-left: 10px;" 
        size="small" 
        type="success" 
        @click="submitUpload">Upload</el-button>
      <div 
        slot="tip" 
        class="el-upload__tip">Please attach the Excel file</div>
    </el-upload>
    <div 
      id="previewpart" 
      v-if="preview !== null && preview !== undefined && preview.length>0">
      <h4>Preview</h4>
      <el-table
        :data="preview"
        style="width: 100%">
        <el-table-column 
          prop="Name" 
          label="Name" 
          width="180" />
        <el-table-column
          prop="Price"
          label="Price"
          width="180" />
        <el-table-column
          prop="Category"
          label="Category"
          width="180" />
        <el-table-column
          prop="Amount"
          label="Amount"
          width="180" />
        <el-table-column
          prop="AdminName"
          label="Admin Name" />
      </el-table>
    </div>
  </el-col>
</template>

<script>
import XLSX from 'xlsx'

export default {
  data () {
    return {
      fileList: [],
      preview: []
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handlePreview (file) {
      var rABS = true
      var reader = new FileReader()
      var self = this
      reader.onload = function (e) {
        var data = e.target.result
        if (!rABS) data = new Uint8Array(data)
        var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'})
        /* DO SOMETHING WITH workbook HERE */
        self.preview = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet1'])
      }
      if (rABS) reader.readAsBinaryString(file.raw); else reader.readAsArrayBuffer(file.raw)
    },
    handleRemove () {
      this.preview = []
    }
  }
}
</script>

<style scope>
input[type=file] {
    display: none;
}
</style>
