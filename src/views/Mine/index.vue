<template>
  <div>
    <!-- 头像资料区域 -->
    <div class="profile-box">
      <!-- vant提供的组件，一定有一个类，跟组件名一样 -->
      <van-image fit="cover" round :src="userInfo.photo" />
      <div class="info">
        <h4>{{ userInfo.name }}</h4>
        <span>{{ userInfo.birthday }}</span>
      </div>
    </div>

    <!-- 中间摆设区域 -->
    <van-row>
      <van-col span="8">
        <van-icon color="#91adff" name="newspaper-o" />
        <div>我的作品</div>
      </van-col>
      <van-col span="8">
        <van-icon color="red" name="star-o" />
        <div>我的收藏</div>
      </van-col>
      <van-col span="8">
        <van-icon color="orange" name="tosend" />
        <div>阅读历史</div>
      </van-col>
    </van-row>

    <!-- 底部cell区域 -->
    <van-cell-group>
      <van-cell to="/mine/edit" icon="edit" title="编辑资料" is-link />
      <van-cell to="/mine/chat" icon="chat-o" title="小智同学" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <van-cell @click="$store.commit('removeToken')" icon="info-o" title="退出登录" is-link />
    </van-cell-group>
  </div>
</template>

<script>
// 导入接口
import { userInfoAPI } from "@/api";
// 导入辅助函数
import { mapState } from "vuex";
export default {
  computed: {
    // userInfo () {

    //   return this.$store.state.userInfo
    // }
    // 用下面的辅助函数相当于生成上面的计算属性
    ...mapState(["userInfo"]),
  },

  created () {
    this.$store.dispatch('reqUserInfo')
  },
};
</script>

<style scoped lang="less">
// 头像与资料区域
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

// 中间摆设区域
.van-row {
  .van-col {
    padding: 20px 0;
    text-align: center;

    .van-icon {
      font-size: 30px;
    }

    div {
      font-size: 14px;
    }
  }
}
</style>