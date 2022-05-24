<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar>
      <!-- 自定义左侧 -->
      <template #left>
        <div class="logo"></div>
      </template>
      <!-- 自定义右侧 -->
      <template #right>
        <van-button round icon="search" type="primary">搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 频道栏 -->
    <van-tabs>
      <van-tab v-for="item in ownChannels" :key="item.id" :title="item.name">
        <!-- 新闻列表 -->
        内容 
      </van-tab>

      <div class="icon-box">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { ownChannelsAPI } from '@/api'
export default {

  data () {

    return {
      // 自己的频道
      ownChannels: []
    }
  },
  async created () {
    // 获取用户自己的频道
    let res1 = await ownChannelsAPI()
    this.ownChannels = res1.data.data.channels
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  .logo {
    width: 120px;
    height: 100%;
    // vue_cli4里面，@符号在css中不能直接代表src目录
    // 要在前面加一个 ~ 号也就是写 ~@ 才代表src
    background: url(~@/assets/logo.png) no-repeat center / contain;
  }

  .van-button {
    width: 100px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    .van-icon-search {
      color: #fff;
    }
  }
}

// 频道栏的布局
.van-tabs {
  ::v-deep .van-tabs__wrap {
    width: 345px;
  }

  .icon-box {
    position: absolute;
    right: 0;
    top: 5px;
    background-color: #fff;

    .van-icon {
      font-size: 30px;
    }
  }
}
</style>