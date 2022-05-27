<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar left-arrow title="文章详情" @click-left="$router.back()" />

    <div class="detail-wrap">
      <!-- 标题 -->
      <h3>我是标题</h3>

      <!-- 作者信息 -->
      <div class="aut-box">
        <van-image
          round
          fit="cover"
          src="http://geek.itheima.net/images/user_head.jpg"
        />
        <div class="info">
          <div>作者名字</div>
          <span style="color: gray">相对时间</span>
        </div>
        <van-button icon="plus" round type="info">关注</van-button>
      </div>

      <!-- 文章内容 -->
      <div>文章内容</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.detail-wrap {
  padding: 10px 20px;

  .aut-box {
    display: flex;
    margin: 20px 0;
    align-items: center;

    .van-image {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }

    .info {
      font-size: 14px;
      // 设置它在主轴方向上剩余空间的占比
      flex: 1;
    }
  }
}
</style>