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
        <van-button @click="$router.push('/search')" round icon="search" type="primary">搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 频道栏 -->
    <van-tabs v-model="tabIndex">
      <van-tab v-for="item in ownChannels" :key="item.id" :title="item.name">
        <!-- 新闻列表 -->
        <article-list :channel_id="item.id" />
      </van-tab>
      <div class="icon-box">
        <van-icon @click="showChannel = true" name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 频道管理的sheet -->
    <van-action-sheet v-model="showChannel" title="频道管理">
      <!-- <channel
        :ownList="ownChannels"
        :allList="allChannels"
        :value="tabIndex"
        @input="tabIndex = $event"
        @close="showChannel = false"
      /> -->

      <!-- 
        v-model是一个语法糖
          你写 v-model="tabIndex"
          它相当于帮你生成
            :value="tabIndex"
            @input="tabIndex = $event"
       -->
      <channel
        :ownList="ownChannels"
        :allList="allChannels"
        v-model="tabIndex"
        @close="showChannel = false"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { ownChannelsAPI, allChannelsAPI, resetChannelAPI } from "@/api";
import articleList from "./articleList.vue";
import channel from "./channel";
export default {
  name: "home",
  components: {
    articleList,
    channel,
  },
  data() {
    return {
      // 自己的频道
      ownChannels: [],
      // 所有的频道
      allChannels: [],
      showChannel: false,
      tabIndex: 0,
      LOCAL_KEY: "channels",
    };
  },
  async created() {
    /*
    if (this.$store.state.tokenObj.token) {
      // 获取用户自己的频道
      let res1 = await ownChannelsAPI();
      this.ownChannels = res1.data.data.channels;

    } else {
      // 没有登录
      const channels = JSON.parse(window.localStorage.getItem(this.LOCAL_KEY));

      if (channels) {
        // 本地存储有数据直接赋值给我的频道数组
        this.ownChannels = channels;
      } else {
        // 没有数据，要给默认频道（要发请求）
        // 获取用户自己的频道
        let res1 = await ownChannelsAPI();
        this.ownChannels = res1.data.data.channels;
      }
    }
    */

    // 获取本地存储
    const channels = JSON.parse(window.localStorage.getItem(this.LOCAL_KEY));
    // 要么登录了，要么就是没登录但是本地存储没值，就发请求
    if (this.$store.state.tokenObj.token || !channels) {
      
      // 获取用户自己的频道
      let res1 = await ownChannelsAPI();
      this.ownChannels = res1.data.data.channels;

    } else {

      // 能来到这肯定是既没登录，而且本地存储有值
      // 所以直接取到本地存储的值赋值即可
      this.ownChannels = channels;
    }

    // 获取所有频道
    let res2 = await allChannelsAPI();
    this.allChannels = res2.data.data.channels;
  },

  watch: {
    async ownChannels() {
      // 页面一打开会调用一次
      // 因为页面一打开从没数据到有数据，这次是没必要发请求给服务器的
      // console.log('数组改变了')

      if (this.showChannel) {
        // 判断有没有登录
        if (this.$store.state.tokenObj.token) {
          // 拿到修改后的我的频道数组，提取出一个新数组
          // 新数组长度要跟它一致，只是提取一个有id有seq的数组
          const channels = this.ownChannels.map((v, index) => {
            return {
              id: v.id,
              seq: index + 1, // 当前频道的排序（序号）
            };
          });
          // 发请求
          let res = await resetChannelAPI({
            channels,
          });
        } else {
          // 存本地
          window.localStorage.setItem(
            this.LOCAL_KEY,
            JSON.stringify(this.ownChannels)
          );
        }
      }
    },
  },
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