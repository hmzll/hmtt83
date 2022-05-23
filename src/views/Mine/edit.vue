<template>
  <div>
    <!-- $router.back()就是后退 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" />

    <!-- 头像区域 -->
    <div class="avatar-box">
      <van-image round fit="cover" :src="userInfo.photo" />
    </div>

    <!-- 资料区域 -->
    <van-cell-group>
      <van-cell title="名称" :value="userInfo.name" is-link />
      <van-cell title="性别" :value="userInfo.gender ? '女' : '男'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },

  created () {
    this.$store.dispatch('reqUserInfo')
  },
};
</script>

<style lang="less" scoped>
.avatar-box {
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;

  .van-image {
    width: 120px;
    height: 120px;
  }
}
</style>