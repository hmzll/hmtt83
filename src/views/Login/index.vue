<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />

    <!-- 表单部分 -->
    <!-- submit事件：当提交表单时触发（就是要点登录） -->
    <van-form @submit="onSubmit">
      <!-- vant提供的输入框 -->
      <van-field
        v-model="info.mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="info.code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {

    data () {
        return {
            info: {
                mobile: '',
                code: ''
            }
        }
    },

    methods: {
        onSubmit () {}
    }
};
</script>

<style>
</style>