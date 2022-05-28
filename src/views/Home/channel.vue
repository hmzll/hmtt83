<template>
  <div>
    <!-- 我的频道 -->
    <div class="my-box">
      <div class="title">
        <span>我的频道</span>
        <van-button style="float: right" plain type="danger" size="small"
          >编辑</van-button
        >
      </div>
      <van-grid>
        <van-grid-item
          v-for="item in ownList"
          :key="item.id"
          :text="item.name"
        />
      </van-grid>
    </div>

    <!-- 可选频道 -->
    <div class="my-box">
      <div class="title">
        <span>可选频道</span>
      </div>
      <van-grid>
        <van-grid-item
          v-for="item in optionalList"
          :key="item.id"
          :text="item.name"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 父组件传递过来的我的频道
    ownList: {
      type: Array,
      required: true,
    },

    // 接收父组件传递过来的所有频道
    allList: {
      type: Array,
      required: true,
    },
  },

  computed: {
    // 可选频道
    // optionalList() {
    //   // 要遍历所有频道，过滤出哪些数据呢？
    //   // 要过滤出 `不在` `我的频道` 里的数据
    //   let list = this.allList.filter((v) => {
    //     // 这里的v就是所有频道里的每个元素
    //     let idx = this.ownList.findIndex((val) => {
    //       // 这里的val就是我的频道里的每个元素
    //       return val.id == v.id;
    //     });

    //     // 不在我的频道里才过滤出来，那换句话说就是下标为-1才过滤出来
    //     return idx == -1;
    //   });

    //   return list
    // },

    // 一行写完
    optionalList() {
      return this.allList.filter(
        (v) => this.ownList.findIndex((val) => val.id == v.id) == -1
      );
    },

    // // 不用ES6的方法
    // optionalList() {
    //   let list = [];
    //   // 过滤思路：遍历所有频道，然后判断每个在不在我的频道里，不在就过滤出来
    //   for (let i = 0; i < this.allList.length; i++) {
    //     // 判断每一项在不在我的频道里面
    //     // 先假设不在
    //     let flag = true;
    //     for (let j = 0; j < this.ownList.length; j++) {
    //       if (this.ownList[j].id == this.allList[i].id) {
    //         // 代表在，改成false，就加不到数组里
    //         flag = false;
    //         break;
    //       }
    //     }

    //     if (flag) {
    //       list.push(this.allList[i]);
    //     }
    //   }

    //   return list;
    // },
  },
};
</script>

<style lang="less" scoped>
.my-box {
  padding: 0 20px;
  .title {
    margin: 20px 0;

    span {
      font-size: 14px;
    }
  }
}
</style>