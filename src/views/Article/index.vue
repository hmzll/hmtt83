<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar fixed placeholder safe-area-inset-top left-arrow title="文章详情" @click-left="$router.back()" />

    <div class="detail-wrap">
      <!-- 标题 -->
      <h3>{{ info.title }}</h3>

      <!-- 作者信息 -->
      <div class="aut-box">
        <van-image round fit="cover" :src="info.aut_photo" />
        <div class="info">
          <div>{{ info.aut_name }}</div>
          <span style="color: gray">{{ info.pubdate | relvTime }}</span>
        </div>
        <van-button icon="plus" round type="info">关注</van-button>
      </div>

      <!-- 文章内容 -->
      <div class="content" v-html="info.content">文章内容</div>

      <!-- 分割线 -->

      <!-- 两个按钮 -->

      <!-- 评论区域 -->
      <article-comment />
    </div>
  </div>
</template>

<script>
// 导入接口
import { articleDetailAPI } from "@/api";
import ArticleComment from './articleComment.vue'
export default {
  components: {
    ArticleComment
  },
  data() {
    return {
      info: {},
    };
  },
  async created() {
    // 根据id查出数据
    let res = await articleDetailAPI(this.$route.query.id);
    this.info = res.data.data;
  },
};
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

  .content {

    ::v-deep {
      pre {
        width: 100%;
        overflow: auto;
        background-color: #000;
        color: lightblue;
      }
      img {
        width: 100%;
      }

      p {
        word-break: break-all;
      }
    }
  }
}
</style>