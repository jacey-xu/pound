<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
    <footer class="main-footer" style="margin-left: 0px">
<!--      <div class="pull-right hidden-xs">
        <b>Version</b> 2.4.0
      </div>-->
      <strong>Copyright &copy; 2017 <a href="#">麦特瑞尔</a>.</strong> All rights
      reserved.
    </footer>
  </section>

</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
