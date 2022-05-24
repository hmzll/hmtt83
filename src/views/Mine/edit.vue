<template>
  <div>
    <!-- $router.back()就是后退 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" />

    <!-- 头像区域 -->
    <div class="avatar-box">
      <van-image round fit="cover" :src="userInfo.photo" />
    </div>

    <!-- 资料区域 -->
    <van-cell-group>
      <van-cell
        @click="clickName"
        title="名称"
        :value="userInfo.name"
        is-link
      />
      <van-cell title="性别" :value="userInfo.gender ? '女' : '男'" is-link />
      <van-cell title="生日" :value="userInfo.birthday" is-link />
    </van-cell-group>

    <!-- 修改名字的弹出框 -->
    <!-- v-model用来控制显示和隐藏 -->
    <van-dialog @confirm="doEditName" v-model="nameDialogShow" title="修改名字" show-cancel-button>
      <van-field ref="inpName" v-model="name" placeholder="请输入名字" />
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { editUserInfoAPI } from '@/api'

export default {
  computed: {
    ...mapState(["userInfo"]),
  },

  data() {
    return {
      nameDialogShow: false,
      name: "",
    };
  },

  methods: {
    // 点击名字cell的事件
    async clickName() {
      // 显示对话框
      // 这句话仅仅只是修改了数据，但是dom还没有渲染
      // dom会在当前同步代码执行完后才去渲染
      this.nameDialogShow = true;
      // 把自己的昵称显示到对话框里的输入框
      this.name = this.userInfo.name;

      // // 不符合语义，延迟时间不好写
      // setTimeout(() => {
      //   // 让输入框获得焦点
      //   // console.log(this.$refs.inpName);
      //   this.$refs.inpName.focus()
      // }, 600);

      // vue提供了一个代码叫 $nextTick
      // 它也是一个类似于setTimeout的异步回调函数
      // 但是不用给延迟时间，它会自动调用
      // 自动调用的时机就是：下次dom更新完毕调用
      // this.$nextTick( () => {
      //   this.$refs.inpName.focus()
      // })

      await this.$nextTick()
      // 下面的代码一定是等dom更新后调用的
      this.$refs.inpName.focus()
    },

    // 点击确认修改名字的方法
    async doEditName () {
      // 发请求
      await editUserInfoAPI({
        name: this.name
      })

      // 发请求成功后要把新的名字修改到vuex里
      this.$store.commit('changeUserInfo', {
        ...this.userInfo,
        name: this.name
      })
    }
  },
  // // 页面中所有数据发生改变，都会来调用
  // updated () {
  //   console.log(1)
  //   this.$refs.inpName.focus()
  // },

  created() {
    this.$store.dispatch("reqUserInfo");
  },
};
</script>

<style lang="less" scoped>
.avatar-box {
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;

  .van-image {
    width: 120px;
    height: 120px;
  }
}

.van-field {
  border: 1px solid #ddd;
}
</style>