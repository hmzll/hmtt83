"use strict";(self["webpackChunkhmtt83"]=self["webpackChunkhmtt83"]||[]).push([[157],{1157:function(e,t,i){i.r(t),i.d(t,{default:function(){return c}});var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("van-nav-bar",{attrs:{title:"登录"}}),i("van-form",{on:{submit:e.onSubmit}},[i("van-field",{attrs:{label:"手机号",placeholder:"请输入手机号",rules:e.rules.mobile},model:{value:e.info.mobile,callback:function(t){e.$set(e.info,"mobile",t)},expression:"info.mobile"}}),i("van-field",{attrs:{label:"验证码",placeholder:"请输入验证码",rules:e.rules.code},model:{value:e.info.code,callback:function(t){e.$set(e.info,"code",t)},expression:"info.code"}}),i("div",{staticStyle:{margin:"16px"}},[i("van-button",{attrs:{loading:e.isLoading,"loading-text":"登录中...",round:"",block:"",type:"info","native-type":"submit"}},[e._v("登录")])],1)],1)],1)},s=[],a=i(7214),n={data(){return{isLoading:!1,info:{mobile:"13911111111",code:"246810"},rules:{mobile:[{required:!0,message:"请输入手机号"},{pattern:/^1[2-9]\d{9}$/,message:"请输入正确的手机号"}],code:[{required:!0,message:"请填写验证码"},{pattern:/^\d{6}$/,message:"请输入6位数字验证码"}]}}},methods:{async onSubmit(){this.isLoading=!0;try{let e=await(0,a.UO)(this.info);this.$store.commit("changeToken",e.data.data),this.$toast.success("登录成功"),this.$store.commit("changeUserInfo",{}),this.$route.query.back?this.$router.push(this.$route.query.back):this.$router.push("/layout/home")}catch{this.$toast.fail("验证码错误")}this.isLoading=!1}}},l=n,r=i(1001),u=(0,r.Z)(l,o,s,!1,null,null,null),c=u.exports}}]);