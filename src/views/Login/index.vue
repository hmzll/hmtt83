<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />

    <!-- 表单部分 -->
    <!-- submit事件：当提交表单时触发（就是要点登录） -->
    <!-- 提交表单的时机是什么时候？ -->
    <!-- 1. 要满足点击了提交（登录按钮） 2. 还要满足整个表单验证通过 -->
    <van-form @submit="onSubmit">
      <!-- vant提供的输入框 -->
      <van-field
        v-model="info.mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="info.code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="rules.code"
      />
      <div style="margin: 16px">
        <van-button
          :loading="isLoading"
          loading-text="登录中..."
          round
          block
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from "@/api";
export default {
  data() {
    return {
      // 控制加载状态
      isLoading: false,
      // 双向绑定输入框
      info: {
        mobile: "13911111111",
        code: "246810",
      },

      rules: {
        // 手机号的规则
        mobile: [
          // required：代表是否必填
          // message: 如果没满足规则，弹出的提示
          { required: true, message: "请输入手机号" },
          // 用来验证输入的是不是手机号
          { pattern: /^1[2-9]\d{9}$/, message: "请输入正确的手机号" },
        ],
        // 验证码的规则
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "请输入6位数字验证码" },
        ],
      },
    };
  },

  methods: {
    async onSubmit() {
      // 一点击就要显示加载状态
      this.isLoading = true;
      try {
        // 当这个方法一旦触发就意味着点了登录并且验证通过
        // 那我们可以发请求做登录
        // this.info是不是对象？是！
        // this.info有没有mobile属性，有没有code属性？有！
        // 而接口要的就是要给对象，对象里要的就是mobile和code
        // 所以我这里可以直接传this.info
        let res = await loginAPI(this.info);

        // 调用下面的代码，既存到vuex，也存到本地存储了
        this.$store.commit("changeToken", res.data.data);
        this.$toast.success("登录成功");
        
        // 判断有没有参数
        if (this.$route.query.back) {
          // 跳转到这个参数对应的值的路径上
          this.$router.push(this.$route.query.back)

        }else {

          // 跳转到首页
          this.$router.push('/layout/home')
        }

      } catch {
        this.$toast.fail("验证码错误");
      }

      // 不管登录成功还是失败，最后都把加载状态改为false
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>