<template>
  <div class="article-list">

    <!-- 
        load事件绑定的onLoad方法，是专门用来加载数据的方法
            当数据没有铺满一屏时，自动调用
            往上拉，拉到快到底调用

            什么时候不会调用？
                loading为true不会调用
                finished为true也不会调用
            以后用了List后，加载数据就写在load里

        v-model绑定的 loading 用来标记当前是否为加载中的状态
            为false代表没在加载，可以加载新数据（也就是可以调用onLoad方法）
            为true代表正在加载，不会加载新数据（不会调用onLoad方法）

            onLoad调用时会自动把这个值改成true，因为这样才可以出现加载中的状态

            所以如果本次数据加载完了，我们要手动把 loading 改成 false
            这样才能方便下次可以继续加载


        finished绑定的finished是用来标记所有数据是否加载完毕
            如果我们的数据加载完了，也得把finished改成true
            但是默认一定是false，不然一次都不会加载数据
            
     -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
// 导入接口
import { articleListAPI } from '@/api'
export default {
  props: {
    // 要求传入频道id
    channel_id: {
      // 必传
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now()
    };
  },
  methods: {
    async onLoad() {

      let res = await articleListAPI({
        // 频道id
        channel_id: this.channel_id,
        // 传入新闻时间戳，传当前时间戳就代表获取最新的新闻
        // 如果你往上滚了，就应该查以前的新闻，而以前的新闻要传的时间戳
        // 就是上一个时间段的时间戳
        timestamp: this.timestamp
      })

      // 把数据存到list里
      // this.list = res.data.data.results
      // 注意：不能用赋值的，应该用push追加，而且应该是把results里的每个元素取出来追加
      this.list.push(...res.data.data.results)

      // 把上一段新闻的时间戳赋值，赋值后下次来查就是查上一段新闻了
      this.timestamp = res.data.data.pre_timestamp

      // 本次数据加载完了记得要把loading改成false，才能方便下次加载
      this.loading = false

      // 判断新闻是否加载完毕
      if (res.data.data.pre_timestamp == null) {

        this.finished = true
      }
    },
  },
};
</script>

<style lang="less" scoped>

.article-list {

  overflow: auto;
  position: fixed;
  width: 100%;
  top: 90px;
  bottom: 50px;
}
</style>