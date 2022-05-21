<template>
  <div>
    <button @click="fn">修改num</button>
    <h3>{{ vuexNum }}</h3>
    <h3>本地-{{ localNum }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    vuexNum () {
      return this.$store.state.num
    },

    localNum () {

      return window.localStorage.getItem('num')
    }
  },

  methods: {
    fn () {
      this.$store.commit('changeNum', 20)
      window.localStorage.setItem('num', 20)
    }
  }
};
</script>

<style>
</style>