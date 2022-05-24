<template>
  <div>
    <!-- $router.back()就是后退 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" />

    <!-- 头像区域 -->
    <div class="avatar-box">
      <van-image round fit="cover" :src="userInfo.photo" />
      <van-uploader :after-read="afterRead" />
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
      <van-cell
        @click="clickBirthday"
        title="生日"
        :value="userInfo.birthday"
        is-link
      />
    </van-cell-group>

    <!-- 修改名字的弹出框 -->
    <!-- v-model用来控制显示和隐藏 -->
    <van-dialog
      @confirm="doEditName"
      v-model="nameDialogShow"
      title="修改名字"
      show-cancel-button
    >
      <van-field ref="inpName" v-model="name" placeholder="请输入名字" />
    </van-dialog>

    <!-- 修改生日的弹出层 -->
    <!-- v-model用来控制显示和隐藏 -->
    <van-popup v-model="birthShow" position="bottom" :style="{ height: '30%' }">
      <!-- 
        v-model：获取选中的时间，也可以设置当前显示的时间
        min-date：能选择的最早日期
        max-date：能选择的最大日期
      -->
      <van-datetime-picker
        @cancel="birthShow = false"
        @confirm="editBirthday"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

    <!-- 裁剪容器div -->
    <div v-show="cropShow" class="crop-box">
      <!-- 
        img属性：用来设置被裁剪的图片
        autoCrop: 生成截图框
        autoCropWidth：设置截图框的宽度
        autoCropHeight：设置截图框的高度
       -->
      <vueCropper
        ref="cropper"
        :img="cropImg"
        autoCrop
        autoCropWidth="200"
        autoCropHeight="200"
      ></vueCropper>

      <van-button @click="doCrop" type="primary">裁剪</van-button>
      <van-button @click="cropShow = false" type="primary">取消</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { editUserInfoAPI, editPhotoAPI } from "@/api";
import dayjs from "dayjs";
import { VueCropper } from "vue-cropper";

export default {
  components: {
    VueCropper,
  },
  computed: {
    ...mapState(["userInfo"]),
  },

  data() {
    return {
      nameDialogShow: false,
      name: "",
      birthShow: false,
      minDate: new Date(1949, 9, 1),
      maxDate: new Date(),
      currentDate: new Date(1984, 5, 19),
      // 裁剪插件的图片
      cropImg: "",
      cropShow: false,
    };
  },

  methods: {
    // 点击裁剪触发的方法
    doCrop() {
      this.$refs.cropper.getCropBlob(async (data) => {

        // data就是获取到的截图后的file对象
        // 拿到对象后要上传到服务器
        // ajax要上传文件该怎么办？使用FormData才能上传
        let fm = new FormData()
        fm.append('photo', data)
        let res = await editPhotoAPI(fm)
        
        // 把图片上传后的地址存到vuex里
        this.$store.commit('changeUserInfo', {
          ...this.userInfo,
          photo: res.data.data.photo
        })

        // 隐藏裁剪容器
        this.cropShow = false
      })
    },
    // 本方法是当你选择完图片会触发的方法
    // file.content里面有你选择图片的base64格式
    // file.file里面有你选择图片的图片对象格式（可以用来做上传）
    afterRead(file) {
      // 显示出裁剪区域
      this.cropShow = true;
      // 把选择的图片交给裁剪插件
      this.cropImg = file.content;
    },
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

      await this.$nextTick();
      // 下面的代码一定是等dom更新后调用的
      this.$refs.inpName.focus();
    },

    // 点击确认修改名字的方法
    async doEditName() {
      // 发请求
      await editUserInfoAPI({
        name: this.name,
      });

      // 发请求成功后要把新的名字修改到vuex里
      this.$store.commit("changeUserInfo", {
        ...this.userInfo,
        name: this.name,
      });
    },

    // 点击生日cell的事件
    clickBirthday() {
      // 显示出生日的弹出层
      this.birthShow = true;
      // 把生日给日期选择显示(要给日期对象)
      this.currentDate = new Date(this.userInfo.birthday);
    },

    // 修改生日的确认事件
    async editBirthday() {
      // 把日期对象转成字符串
      const birthday = dayjs(this.currentDate).format("YYYY-MM-DD");

      // 发请求
      await editUserInfoAPI({
        birthday,
      });

      // 修改到vuex
      this.$store.commit("changeUserInfo", {
        ...this.userInfo,
        birthday,
      });

      // 隐藏弹出层
      this.birthShow = false;
    },
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
// 头像区域的div
.avatar-box {
  @height: 140px;
  height: @height;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .van-image {
    width: 120px;
    height: 120px;
  }

  // 上传组件
  .van-uploader {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;

    ::v-deep .van-uploader__upload {
      width: 100vw;
      height: @height;
      opacity: 0;
    }
  }
}

.van-field {
  border: 1px solid #ddd;
}

// 裁剪容器
.crop-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f00;

  .van-button {
    position: absolute;
    bottom: 0;

    // 找到最后个van-button
    &:last-child {
      right: 0;
    }
  }
}
</style>