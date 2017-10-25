<template>
<div class="col-sm-3">
  <div class="panel panel-default">
    	<div class="panel-heading">Category</div>
    	<ul class="list-group">
      <li class="list-group-item list-group-item-enhance" v-for="menu in topMenus" :key="menu.id" @mouseover="listOn(menu.id)">
        {{menu.name}}
        <ul class="list-group list-sub-group" v-if="items.length != 0">
  					<li class="list-group-item list-group-item-enhance" v-for="item in items" :key="item.id">{{item.name}}</li>
  				</ul>
      </li>
  		<!-- <c:forEach var="i" items="${mainMenu}">
  			<li class="list-group-item list-group-item-enhance" key="${i.id}" @mouseover="listOn(${i.id})" id="main${i.id}">
  				${i.name}
  				<ul class="list-group list-sub-group" v-if="items.length != 0">
  					<li class="list-group-item list-group-item-enhance" v-for="item in items" id = "{{item.id}}" key="{{item.id}}">{{item.name}}</li>
  				</ul>
  			</li>
  		</c:forEach> -->
  	</ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'Navi',
  data: function () {
    return {
      topMenus: [],
      items: []
    }
  },
  beforeCreate: function () {
    var self = this
    this.axios({
      method: 'get',
      url: 'http://localhost:8080/ShiroTest/index/getMainMenu'
    })
    .then(function (response) {
      console.log(response.data)
      self.topMenus = response.data
    })
    .catch(function (error) {
      console.error(error)
    })
  },
  methods: {
    listOn: function (index) {
      var subName = ['ary1', 'ary2', 'ary3', 'ary4']
      var subMenus = sessionStorage.getItem(subName[index - 1])
      var self = this
      var params = new URLSearchParams()
      params.append('mainMenu', index)
      if (subMenus === null || subMenus === '') {
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/ShiroTest/index/getSubMenu',
          data: params
        })
        .then(function (response) {
          var sub = response.data
          if (sub !== null && sub.length > 0) {
            self.items = sub
            sessionStorage.setItem(subName[index - 1], JSON.stringify(sub))
          } else {
            sessionStorage.setItem(subName[index - 1], [null])
            self.items = []
          }

          // if (response !== '' && response !== '[]') {
          //   self.items = JSON.parse(response)
          //   sessionStorage.setItem(subName[index - 1], response)
          // } else {
          //   sessionStorage.setItem(subName[index - 1], [null])
          //   this.items = []
          // }
        })
        .catch(function (error) {
          console.error(error)
        })
      } else {
        if (subMenus !== null && subMenus !== '') this.items = JSON.parse(subMenus)
        else this.items = []
      }
    }
  }
}
</script>

<style scoped>
.list-sub-group {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  z-index: 10;
  background-color: white;
  left: 100%;
  top: 0%;
  border: 1px solid #ddd;
  min-width: 200px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}
.list-group-item-enhance {
  cursor: pointer;
}

.list-group-item-enhance:hover {
  background-color: #eee;
}

.list-group-item-enhance:hover .list-sub-group {
  visibility: visible;
  opacity: 1;
}
</style>


