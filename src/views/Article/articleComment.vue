<template>
  <div>
    <!-- 评论列表 -->
    <van-list
      v-model="isLoading"
      :finished="finished"
      @load="onLoad"
      finished-text="没有更多了"
    >
      <van-cell v-for="item in list" :key="item.com_id">
        <template>
          <div class="cell-box">
            <!-- 图片 -->
            <van-image round fit="cover" :src="item.aut_photo" />
            <!-- div -->
            <div class="info-box">
              <div style="color: #466bb5">{{ item.aut_name }}</div>
              <div class="content">{{ item.content }}</div>
              <div>
                <span class="time">{{ item.pubdate | relvTime }}</span>
                <van-button @click="showReply(item)" size="mini" plain
                  >回复({{ item.reply_count }})</van-button
                >
              </div>
            </div>
            <!-- 图标 -->
            <van-icon name="like-o" />
          </div>
        </template>
      </van-cell>
    </van-list>

    <!-- 发表评论框 -->
    <div style="position: fixed; left: 0; bottom: 0; width: 100%">
      <van-field
        v-model="cmt"
        center
        clearable
        placeholder="请输入评论内容"
        @keyup.enter="send"
      >
        <template #button>
          <van-button @click="send" size="small" type="info">发布</van-button>
        </template>
      </van-field>
    </div>

    <!-- 弹出sheet -->
    <van-action-sheet v-model="replyShow" title="发表回复">
      <reply v-if="replyShow" :currentCmt="currentItem" />
    </van-action-sheet>
  </div>
</template>

<script>
import { getCmtListAPI, sendCmtAPI } from "@/api";
import reply from "./reply.vue";
export default {
  components: {
    reply,
  },
  data() {
    return {
      isLoading: false,
      finished: false,
      list: [],
      cmt: "",
      offset: null,
      replyShow: false,
      currentItem: {},
    };
  },

  methods: {
    //  点击回复触发的事件
    showReply(item) {
      // 点谁就传谁的值
      this.currentItem = item;
      // 显示出回复面板
      this.replyShow = true;
    },
    async onLoad() {
      let res = await getCmtListAPI({
        type: "a",
        source: this.$route.query.id,
        offset: this.offset,
      });

      // 保存到数组
      this.list.push(...res.data.data.results);

      // 记录last_id方便查下一页
      this.offset = res.data.data.last_id;

      // 设置本次加载完毕
      this.isLoading = false;

      // 判断本次的最后一条id是否等于所有数据的最后一个id
      // 如果等于了就代表加载完了
      if (res.data.data.end_id === res.data.data.last_id) {
        this.finished = true;
      }
    },

    // 发表评论
    async send() {
      // 非空判断
      if (this.cmt.trim() == "") return this.$toast("请输入点内容");

      // 发请求
      let res = await sendCmtAPI({
        target: this.$route.query.id,
        content: this.cmt,
      });

      // 发请求成功后加到数组最前面
      this.list.unshift(res.data.data.new_obj);
      // 清空文本
      this.cmt = "";
    },
  },
};
</script>

<style lang="less" scoped>
.van-list {
  margin-bottom: 55px;
}
.cell-box {
  display: flex;
  .van-image {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }

  .info-box {
    flex: 1;

    .time {
      color: gray;
      margin-right: 10px;
    }
    .van-button {
      // 文字对齐方式为中线对齐
      vertical-align: middle;
    }
  }
}
</style>