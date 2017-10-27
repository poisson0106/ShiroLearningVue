<template>
  <div>
    <nav class="navbar navbar-default" role="navigation">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class="navbar-brand">System</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
    	    <a class="dropdown-toggle infoList" role="button" id="loginname">
            {{username}} <span class="caret"></span>
            <ul class="dropdown-menu" style="display:block">
    	        <li><a href="/ShiroTest/index/editRole">Profile Setting</a></li>
          	  <li><a id="backend" href="/ShiroTest/druid">Backend</a></li>
          	  <li><a id="uploadInit" href="/ShiroTest/admin/uploadInit">Import Products</a></li>
    	        <li><a href="#">Something else here</a></li>
    	        <li role="separator" class="divider"></li>
    	        <li><a href="/ShiroTest/auth/logout">Logout</a></li>
    	      </ul>
          </a>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </nav>
    <input type="hidden" id = "usernameh" :value="username"/>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    username: function () {
      return sessionStorage.getItem('username')
    }
  }
}
</script>

<style scoped>

.dropdown-menu{
  visibility: visible;
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.dropdown-toggle:hover ul{
  visibility: visible;
  opacity: 1;
}

.dropdown:hover{
  color: #bbbbbb
}
</style>
