<template>
  <el-col :span="8" :offset="8">
    <el-card class="box-card">
      <div slot="header"><h4>Login</h4></div>
      <div>
        <el-form ref="loginform" :model="loginform" label-width="120px">
          <el-form-item label="User Name:">
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
          <el-form-item label="Password:">
            <el-input type="password" 
              v-model="loginform.password" 
              placeholder="password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Login</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </el-col>
</template>

<script>
export default {
  data: function () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      addr: ['@gmail.com', '@sina.com', '@163.com', '@outlook.com', '@qq.com']
    }
  },
  methods: {
    onSubmit: function () {
      var params = new URLSearchParams()
      params.append('username', this.loginform.username)
      params.append('password', this.loginform.password)
      if (this.username === null || this.username === '') console.error('Username is empty')
      else {
        sessionStorage.username = this.username
        let self = this
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/ShiroTest/auth/login',
          data: params
        })
        .then(function (response) {
          var token = JSON.stringify(response.data)
          sessionStorage.setItem('token', token)
          self.$router.push('/index')
        })
        .catch(function (error) {
          console.log(error)
        })
      }
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
