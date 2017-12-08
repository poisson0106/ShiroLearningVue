<template>
  <el-col :span="8" :offset="8">
    <el-card class="box-card">
      <div slot="header"><h4>Login</h4></div>
      <div>
        <el-form ref="loginform" :model="loginform" label-width="120px" :rules="rules" status-icon>
          <el-form-item label="User Name:" prop="username">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="loginform.username"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              placeholder="User Name"
              @select="handleSelect"
              style="width:100%">
              <template slot-scope="props">
                <div class="name">{{ props.item }}</div>
                <!-- <span class="addr">{{ props.item.address }}</span> -->
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="Password:" prop="password">
            <el-input type="password" 
              v-model="loginform.password" 
              placeholder="password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              @click="onSubmit('loginform')"
              v-loading.fullscreen.lock="isLoading">Login</el-button>
            <!-- <el-button @click="resetForm('loginform')">Cancel</el-button> -->
            <el-button @click="dialogFormVisible = true">Register</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- Registation part -->
    <el-dialog title="Registation" :visible.sync="dialogFormVisible">
      <el-form :model="regform" ref="regform" :rules="rules" status-icon>
        <el-form-item label="User Name:" :label-width="formLabelWidth" prop="rusername">
          <el-autocomplete
              popper-class="my-autocomplete"
              v-model="regform.rusername"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              placeholder="User Name"
              @select="handleRegSelect"
              style="width:100%">
              <template slot-scope="props">
                <div class="name">{{ props.item }}</div>
                <!-- <span class="addr">{{ props.item.address }}</span> -->
              </template>
            </el-autocomplete>
        </el-form-item>
        <el-form-item label="Password:" :label-width="formLabelWidth" prop="rpassword">
          <el-input 
            type="password" 
            v-model="regform.rpassword" 
            auto-complete="off" 
            placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item label="Repeat Password:" :label-width="formLabelWidth" prop="cpassword">
          <el-input 
            type="password" 
            v-model="regform.cpassword" 
            auto-complete="off"
            placeholder="Repeat password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="regSubmit('regform')">Submit</el-button>
        <el-button @click="resetForm('regform')">Reset</el-button>
      </div>
    </el-dialog>

  </el-col>
</template>

<script>
export default {
  data: function () {
    var passwordCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.regform.rpassword) {
        callback(new Error('The two passwords are not same!'))
      } else {
        callback()
      }
    }

    return {
      loginform: {
        username: '',
        password: ''
      },
      regform: {
        rusername: '',
        rpassword: '',
        cpassword: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please input user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' }
        ],
        rusername: [
          { type: 'email', required: true, message: 'Please input email address', trigger: 'blur' }
        ],
        rpassword: [
          { required: true, message: 'Please input password', trigger: 'blur' }
        ],
        cpassword: [
          { validator: passwordCheck, trigger: 'blur' }
        ]

      },
      addr: ['@gmail.com', '@sina.com', '@163.com', '@outlook.com', '@qq.com'],
      isLoading: false,
      dialogFormVisible: false,
      formLabelWidth: '160px'
    }
  },
  methods: {
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = new URLSearchParams()
          params.append('username', this.loginform.username)
          params.append('password', this.loginform.password)
          if (this.username === null || this.username === '') console.error('Username is empty')
          else {
            sessionStorage.username = this.username
            let self = this
            this.isLoading = true
            this.axios({
              method: 'post',
              url: 'http://localhost:8080/ShiroTest/auth/login',
              data: params
            })
            .then(function (response) {
              self.isLoading = false
              var tokenraw = response.data.token
              tokenraw.password = ''
              var token = JSON.stringify(tokenraw)
              sessionStorage.setItem('token', token)
              // sessionStorage.setItem('jsessionid', response.data.jSessionId)
              sessionStorage.setItem('lastTouch', new Date())
              self.$router.push('/index')
            })
            .catch(function (error) {
              self.isLoading = false
              self.$message.error(error.message)
            })
          }
        } else {
          this.$message.error('submit error')
          return false
        }
      })
    },
    querySearch: function (queryString, cb) {
      var addr = this.addr
      var result = []
      if (queryString.indexOf('@') < 0) {
        result = addr.map(function (val) {
          return queryString + val
        })
      } else {
        var tail = queryString.substring(queryString.indexOf('@'))
        if (tail.length > 1) {
          addr = addr.filter((address) => {
            var pattern = new RegExp('^' + tail)
            return pattern.exec(address)
          })
        }
        result = addr.map(function (val) {
          return queryString.substring(0, queryString.indexOf('@')) + val
        })
      }
      cb(result)
    },
    handleSelect: function (item) {
      this.loginform.username = item
    },
    handleRegSelect: function (item) {
      this.regform.rusername = item
    },
    regSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = new URLSearchParams()
          params.append('username', this.regform.rusername)
          params.append('password', this.regform.rpassword)
        } else {
          this.$message.error('submit error')
          return false
        }
      })
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields()
    }

  }
}
</script>

<style>
body{
  background-color: #eee
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    width: 500px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
