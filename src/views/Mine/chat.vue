<template>
  <div class="container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小智同学"
    ></van-nav-bar>
    <div ref="chatList" class="chat-list">
      <template v-for="(item, index) in list">
        <!-- 左侧是机器人小智 -->
        <div :key="index" v-if="!item.isMe" class="chat-item left">
          <van-image
            fit="cover"
            round
            :src="require('../../assets/yaomeier.png')"
          />
          <div class="chat-pao">{{ item.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div :key="index" v-else class="chat-item right">
          <div class="chat-pao my">{{ item.msg }}</div>
          <van-image
            fit="cover"
            round
            src="https://www.itcast.cn/images/teacher/2019572614571000.jpg"
          />
        </div>
      </template>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field
        v-model.trim="msg"
        @keyup.enter="send"
        placeholder="说点什么..."
      >
        <span @click="send" slot="button" style="font-size: 12px; color: #999">
          提交
        </span>
      </van-field>
    </div>
  </div>
</template>

<script>
// 导入socket.io
import io from "socket.io-client";
export default {
  name: "UserChat",
  created() {
    // 得到请求对象
    this.socket = io("http://geek.itheima.net", {
      query: {
        token: this.$store.state.tokenObj.token,
      },
      transports: ["websocket"],
    });

    // 接收消息
    this.socket.on("message", (data) => {
      // 把服务器返回的机器人消息也加到数组里
      this.list.push({
        msg: data.msg,
        isMe: false,
      });

      // 等下次dom渲染后自动调用
      this.$nextTick(() => {
        // 让滚动条滚到最后
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight;
      });
    });
  },
  data() {
    return {
      // 双向绑定
      msg: "",
      // 请求对象
      socket: null,
      // 保存聊天记录的数组
      list: [],
    };
  },
  methods: {
    send() {
      // 非空判断
      if (this.msg == "") return this.$toast("请输入点内容");

      // 不为空可以给服务器发消息了
      this.socket.emit("message", {
        msg: this.msg,
        timestamp: Date.now(),
      });

      // 添加到数组里
      // 这些代码是同步的，但是dom渲染是异步的
      this.list.push({
        // msg存聊天内容
        msg: this.msg,
        // 用来区分是自己发的还是机器人发的
        // 如果为true就说是自己发的
        isMe: true,
      });

      // 清空输入框内容
      this.msg = "";

      // 等下次dom渲染后自动调用
      this.$nextTick(() => {
        // 让滚动条滚到最后
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
      .chat-pao.my {
        background-color: #9eea6a;
        &::before {
          content: "";
          background: #9eea6a;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>