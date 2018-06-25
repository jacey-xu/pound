<template>
  <div class="dashboard-container">
    <button class="dashboard-text" @click="testapi">name: {{name}}</button>
    <div class="dashboard-text">role: <span v-for='role in roles' :key='role'>{{role}}</span></div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
      testapi() {
          //调用store中 index引入的user.js中Login方法
          this.$store.dispatch('GetInfo', '').then((res) => {
              // console.log(res); //user.js 中通过resolve 返回参数
              this.loading = false
              console.log('login success!!');
              this.$router.push({path: '/'})
          }).catch(() => {
              this.loading = false
          })

      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
