<template>
  <div id="login">
    <div id="bgd">
      <canvas id="myCanvas" :width="width" :height="height"> </canvas>
    </div>
    <div id="loginBox">
      <h4>登录</h4>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
        label-width="0px"
      >
        <el-form-item label="" prop="userName" style="margin-top: 40px">
          <el-row>
            <el-col :span="4">
              <i
                class="el-icon-user-solid"
                style="font-size: 24px; line-height: 40px"
              ></i>
            </el-col>
            <el-col :span="20">
              <el-input
                class="inps"
                placeholder="用户名"
                v-model="loginForm.userName"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="" prop="passWord">
          <el-row>
            <el-col :span="4">
              <i class="el-icon-lock" style="font-size: 24px; line-height: 40px"></i>
            </el-col>
            <el-col :span="20">
              <el-input
                class="inps"
                type="password"
                placeholder="密码"
                v-model="loginForm.passWord"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 55px">
          <el-button type="primary" round class="submitBtn" @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, getCurrentInstance } from "vue";
import { getLoginApi } from "api/api";
import { ElMessage } from "element-plus";
import "styles/login.less";
export default {
  name: "",
  setup() {
    const { ctx } = getCurrentInstance();
    const data = reactive({
      canvas: null,
      context: null,
      stars: [], //星星数组
      shadowColorList: [
        "#39f",
        "#ec5707",
        "#b031d4",
        "#22e6c7",
        "#92d819",
        "#14d7f1",
        "#e23c66",
      ], //阴影颜色列表
      directionList: ["leftTop", "leftBottom", "rightTop", "rightBottom"], //星星运行方向
      speed: 50, //星星运行速度
      last_star_created_time: new Date(), //上次重绘星星时间
      Ball: class Ball {
        constructor(radius) {
          this.x = 0;
          this.y = 0;
          this.radius = radius;
          this.color = "";
          this.shadowColor = "";
          this.direction = "";
        }

        draw(context) {
          context.save();
          context.translate(this.x, this.y);
          context.lineWidth = this.lineWidth;
          var my_gradient = context.createLinearGradient(0, 0, 0, 8);
          my_gradient.addColorStop(0, this.color);
          my_gradient.addColorStop(1, this.shadowColor);
          context.fillStyle = my_gradient;
          context.beginPath();
          context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
          context.closePath();

          context.shadowColor = this.shadowColor;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.shadowBlur = 10;

          context.fill();
          context.restore();
        }
      }, //工厂模式定义Ball类
      width: window.innerWidth,
      height: window.innerHeight,
      loginForm: {
        userName: "",
        passWord: "",
      },
      loginRules: {
        userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    });

    const submitForm = () => {
      ctx.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          getLoginApi(data.loginForm).then((res) => {
            console.log(res.data.pass);
            if (res.data.pass) {
              localStorage.setItem("elementToken", res.data.token);
              localStorage.setItem("userName", data.loginForm.userName);
              localStorage.setItem("passWord", data.loginForm.passWord);
              // this.$router.push({
              //   path: "/",
              //   query: { clientId: this.$route.query.clientId },
              // });
            } else {
              ElMessage.error(res.data.reason + "");
            }
          });
        }
      });
    };
    //重复动画
    const drawFrame = () => {
      let animation = requestAnimationFrame(drawFrame);
      data.context.clearRect(0, 0, data.canvas.width, data.canvas.height);
      createStar(false);
      // data.stars.forEach(data.moveStar);
      data.stars.forEach((v, k) => {
        moveStar(v, k);
      });
    };
    //展示左右星星
    const createStar = (params) => {
      let now = new Date();
      if (params) {
        //初始化星星
        for (var i = 0; i < 50; i++) {
          const radius = Math.random() * 3 + 2;
          let star = new data.Ball(radius);
          star.x = Math.random() * data.canvas.width + 1;
          star.y = Math.random() * data.canvas.height + 1;
          star.color = "#ffffff";
          star.shadowColor =
            data.shadowColorList[Math.floor(Math.random() * data.shadowColorList.length)];
          star.direction =
            data.directionList[Math.floor(Math.random() * data.directionList.length)];
          data.stars.push(star);
        }
      } else if (!params && now - data.last_star_created_time > 3000) {
        //每隔3秒重绘修改颜色其中30个球阴影颜色
        for (var i = 0; i < 30; i++) {
          data.stars[i].shadowColor =
            data.shadowColorList[Math.floor(Math.random() * data.shadowColorList.length)];
        }
        data.last_star_created_time = now;
      }
    };
    //移动
    const moveStar = (star, index) => {
      if (star.y - data.canvas.height > 0) {
        //触底
        if (Math.floor(Math.random() * 2) === 1) {
          star.direction = "leftTop";
        } else {
          star.direction = "rightTop";
        }
      } else if (star.y < 2) {
        //触顶
        if (Math.floor(Math.random() * 2) === 1) {
          star.direction = "rightBottom";
        } else {
          star.direction = "leftBottom";
        }
      } else if (star.x < 2) {
        //左边
        if (Math.floor(Math.random() * 2) === 1) {
          star.direction = "rightTop";
        } else {
          star.direction = "rightBottom";
        }
      } else if (star.x - data.canvas.width > 0) {
        //右边
        if (Math.floor(Math.random() * 2) === 1) {
          star.direction = "leftBottom";
        } else {
          star.direction = "leftTop";
        }
      }
      if (star.direction === "leftTop") {
        star.y -= star.radius / data.speed;
        star.x -= star.radius / data.speed;
      } else if (star.direction === "rightBottom") {
        star.y += star.radius / data.speed;
        star.x += star.radius / data.speed;
      } else if (star.direction === "leftBottom") {
        star.y += star.radius / data.speed;
        star.x -= star.radius / data.speed;
      } else if (star.direction === "rightTop") {
        star.y -= star.radius / data.speed;
        star.x += star.radius / data.speed;
      }
      star.draw(data.context);
    };
    onMounted(() => {
      data.canvas = document.getElementById("myCanvas");
      data.context = data.canvas.getContext("2d");

      createStar(true);
      drawFrame();
      let userName = localStorage.getItem("userName");
      let passWord = localStorage.getItem("passWord");
      data.loginForm.userName = userName;
      data.loginForm.passWord = passWord;
    });
    return {
      ...toRefs(data),
      submitForm,
    };
  },
};
</script>
