<template>
  <div>
    <van-nav-bar title="编辑资料" left-arrow />

    <!-- 头像区域 -->
    <div class="avatar-box">
      <van-image round fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    </div>

    <!-- 资料区域 -->
    <van-cell-group>
      <van-cell title="名称" value="用户名字" is-link/>
      <van-cell title="性别" value="男" is-link/>
      <van-cell title="生日" value="2000-03-11" is-link/>
    </van-cell-group>
  </div>
</template>

<script>
export default {};
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