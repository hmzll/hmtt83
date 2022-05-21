<template>
  <div>
    <!-- 头像资料区域 -->
    <div class="profile-box">
      <!-- vant提供的组件，一定有一个类，跟组件名一样 -->
      <van-image
        fit="cover"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div class="info">
        <h4>用户名字</h4>
        <span>2022-05-21</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.profile-box {
  // 声明背景颜色变量
  @color: #3296fa;

  height: 140px;
  background-color: @color;
  display: flex;
  align-items: center;

  .van-image {
    width: 90px;
    height: 90px;
    margin-left: 20px;
    margin-right: 10px;
  }

  .info {
    h4 {
      color: #fff;
      font-size: 18px;
    }
    span {
      font-size: 16px;
      color: @color;
      background-color: #fff;
      padding: 1px 3px;
    }
  }
}
</style>