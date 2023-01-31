<script setup>
import { ref } from 'vue'
import Animate from "./animate/index.vue";
import AnimateContainer from "./animate/container.vue";

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <AnimateContainer class="dowebok" :target="getTarget">
    <h1>vue-wow.js - 让页面滚动更有趣</h1>
    <p class="txt">vue-wow.js 能让页面滚动时显示动画，使页面更有趣。</p>
    <div class="dowebok">
      <div class="row">
        <Animate name="rollIn" class="wow bg-blue"></Animate>
        <Animate name="bounceInDown" class="wow bg-green"
        >vue-wow.js</Animate
        >
        <Animate name="lightSpeedIn" class="wow bg-purple"></Animate>
      </div>

      <div class="row">
        <Animate name="rollIn" class="wow bg-yellow" delay="0.5s"
        >简单易用</Animate
        >
        <Animate
            name="pulse"
            class="wow bg-red"
            :iteration="5"
            duration="0.15s"
        ></Animate>
        <Animate name="bounceInRight" class="wow bg-blue">轻量级</Animate>
      </div>

      <div class="row">
        <Animate name="bounceInLeft" class="wow bg-green"></Animate>
        <Animate name="flipInX" class="wow bg-purple">vue-wow.js</Animate>
        <Animate name="bounceInRight" class="wow bg-yellow"></Animate>
      </div>

      <div class="row">
        <Animate name="rollIn" class="wow bg-blue">无需 第三方组件</Animate>
        <Animate
            name="shake"
            class="wow bg-red"
            :iteration="5"
            duration="0.15s"
        ></Animate>
        <Animate name="swing" class="wow bg-purple" :iteration="2"
        >纯vue组件</Animate
        >
      </div>

      <div class="row">
        <Animate name="rollIn" class="wow bg-red"></Animate>
        <Animate name="bounceInU" class="wow bg-yellow" delay="0.5s"
        >vue-wow.js</Animate
        >
        <Animate
            name="lightSpeedIn"
            class="wow bg-green"
            delay="0.5s"
            duration="0.15s"
        ></Animate>
      </div>

      <div class="row">
        <Animate name="bounceInLeft" class="wow bg-purple"
        >推荐使用</Animate
        >
        <Animate
            name="pulse"
            class="wow bg-blue"
            :iteration="5"
            duration="0.25s"
        >animate.css</Animate
        >
        <Animate name="lightSpeedIn" class="wow bg-yellow"
        >多种动画</Animate
        >
      </div>

      <div class="row">
        <Animate
            name="bounce"
            class="wow bg-green"
            :iteration="5"
            duration="0.15s"
        ></Animate>
        <Animate name="bounceInUp" class="wow bg-red">vue-wow.js</Animate>
        <Animate name="bounceInRight" class="wow bg-purple"></Animate>
      </div>

      <div class="row">
        <Animate name="rollIn" class="wow bg-red" delay="0.5s"
        >无需 第三方组件！？</Animate
        >
        <Animate
            name="bounceInDown"
            class="wow bg-green"
            delay="1s"
        ></Animate>
        <Animate name="bounceInRight" class="wow bg-yellow" delay="1.5s"
        >谢谢</Animate
        >
      </div>
    </div>
  </AnimateContainer>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
