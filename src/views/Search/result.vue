<template>
  <div>
    <van-nav-bar :title="$route.query.key + ' 的搜索结果'" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        @click="$router.push({ name: 'article', query: { id: item.art_id } })"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { resultListAPI } from "@/api";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  methods: {
    async onLoad() {
      let res = await resultListAPI({
        page: this.page,
        per_page: 10,
        q: this.$route.query.key,
      });

      // 查下一页就让页码+1
      this.page++;

      this.list.push(...res.data.data.results);
      // 本次请求完毕要设置false
      this.loading = false;

      // 当数组的长度大于等于总数量就代表加载完成
      if (this.list.length >= res.data.data.total_count) {
        this.finished = true;
      }
    },
  },
};
</script>

<style>
</style>