<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()" />

    <!-- 搜索栏 -->
    <van-search
      v-model="key"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @input="onInput"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 历史记录 -->
    <!-- 当key为空字符串(也就是搜索框为空)显示历史记录 -->
    <!-- 可以简写为: !key -->
    <van-cell-group v-if="key == ''">
      <van-cell title="历史记录" />
      <van-cell v-for="item in historyList" :key="item" :title="item" />
    </van-cell-group>

    <!-- 联想词汇区域 -->
    <van-cell-group v-else>
      <van-cell v-for="(item, index) in colorList" :key="index" icon="search">
        <div v-html="item"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { suggestAPI } from "@/api";
export default {
  data() {
    return {
      // 跟搜索框双向绑定,获取输入的搜索关键字
      key: "",
      // 保存联想词汇的数组
      suggestList: [],
      // 保存历史记录的数组
      historyList: JSON.parse(window.localStorage.getItem("history")) || [],
    };
  },

  methods: {
    // 一边输入一边触发的方法
    async onInput() {
      // 不为空才发请求
      if (this.key) {
        let res = await suggestAPI({
          q: this.key,
        });

        if (res.data.data.options[0]) {
          // 保存到数组
          this.suggestList = res.data.data.options;
        } else {
          this.suggestList = [];
        }
      }
    },
    // 点击搜索的方法
    onSearch() {
      // 非空判断
      if (this.key == "") return this.$toast("请输入点内容");

      // 能来到这不为空,把搜索的关键字存到本地存储
      // 如果搜索内容不在数组里,才加到数组
      if (!this.historyList.includes(this.key)) {
        // 把搜索内容加到数组里
        this.historyList.unshift(this.key);
        window.localStorage.setItem(
          "history",
          JSON.stringify(this.historyList)
        );
      }

      // 跳转到搜索结果页面
      this.$router.push({
        name: "result",
        query: {
          key: this.key,
        },
      });
    },
  },

  computed: {
    // 用来高亮联想词汇的数组
    colorList() {
      return this.suggestList.map((v) => {
        return v.replaceAll(
          this.key,
          `<span style="color:red">${this.key}</span>`
        );
      });
    },
  },
};
</script>

<style>
</style>