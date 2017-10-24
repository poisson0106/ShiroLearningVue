<template>
  <div>
    <form id="login" class="form-signin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Username</label>
      <input id="inputEmail" type="text" placeholder="Username" required="" autofocus="" name="username" class="form-control" v-model="username">
      <!-- Auto complete part -->
      <ul class="list-group" style="z-index:10;position:fixed" v-if="doShowList">
        <li class="list-group-item" v-for="(option,index) in options" v-bind:key="option" @click="handleNameChoose(username+option)">
          {{username}}{{option}}
        </li>
      </ul>
      <label for="inputPassword" class="sr-only">Password</label>
      <input id="inputPassword" type="password" placeholder="Password" required="" name="password" class="form-control" v-model="password">
      <div class="checkbox">
        <label>
          <input type="checkbox" name="rememberMe" id="rememberMe"> Remember me
        </label>
      </div>
      <button id="sbmt" type="button" class="btn btn-lg btn-primary col-sm-6" @click="submitForm">Sign in</button>
      <button id="rgst" type="button" data-toggle="modal" data-target="#reg" class="btn btn-lg btn-default col-sm-6" @click="toHello">Register</button>
    </form>
    <div id="reg" role="dialog" aria-labelledby="gridSystemModalLabel" class="modal fade">
      <div role="document" class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 id="gridSystemModalLabel" class="modal-title">Please Input information</h4>
          </div>
          <div class="modal-body">
            <form id="register" method="post" action="/ShiroTest/auth/register" class="form-group">
              <div class="form-group">
                <label for="regName">Username</label>
                <input id="regName" type="text" placeholder="Username" required="" autofocus="" name="username" class="form-control">
              </div>
              <div class="form-group">
                <label for="regPassword">Password</label>
                <input id="regPassword" type="password" placeholder="Password" required="" name="password" class="form-control">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
            <button id="rgstsbmt" type="button" class="btn btn-primary">Submit</button>
          </div>
        </div>
        <!-- /.modal-content-->
      </div>
      <!-- /.modal-dialog-->
    </div>
    <!-- /.modal-->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      password: '',
      showList: false
    }
  },
  computed: {
    usernameCount: function () {
      if (this.username.length > 6) {
        return true
      } else {
        return false
      }
    },
    doShowList: function () {
      if (this.username === '' && !this.showList) {
        this.showList = true
        return false
      } else if (
        (this.username !== '' && !this.showList) ||
        (this.username === '' && this.showList)
      ) return false
      else return true
    },
    options: function () {
      var tails = ['gmail.com', 'sina.com', '163.com', 'outlook.com', 'qq.com']
      var tailsWithoutAt = [
        '@gmail.com',
        '@sina.com',
        '@163.com',
        '@outlook.com',
        '@qq.com'
      ]
      var address = this.username
      if (address === null || address === '') return tailsWithoutAt
      else {
        if (address.indexOf('@') === -1) return tailsWithoutAt
        else {
          if (address.substring(address.indexOf('@') + 1) === '') return tails
          else {
            return []
          }
        }
      }
    }
  },
  methods: {
    toHello: function () {
      this.$router.push('/HelloFirst')
    },
    handleNameChoose: function (address) {
      this.username = address
      this.showList = false
    },
    submitForm: function (event) {
      console.log(this.username)
      console.log(this.password)
      var params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', this.password)
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
          self.$router.push('/index')
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>

body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #eee !important;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>


