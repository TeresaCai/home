<template>
  <section>
    <slot></slot>
  </section>
</template>

<script setup>
import {computed, onDeactivated, onMounted, provide, reactive} from "vue";
import {off, on} from "../../utils/dom.js";
import {isMobile} from "../../utils/assist.js";

const props = defineProps({
    config: {
      type: Object,
      default() {
        return {
          mobile: true
        };
      }
    },
    live: {
      type: Boolean,
      default: true
    },
    target: {
      type: Function,
      default: () => window
    }
  })
  const data = reactive({
    conf: Object.assign(
      {},
      {
        mobile: true
      },
      props.config
    ),
    all: [],
    vmArr: [],
    scrolled: false,
    interval: 0
  })

const disabled = computed(() => !data.conf.mobile && isMobile())

function start() {
  if (!disabled) {
    const targetNode = props.target;
    on(targetNode, "scroll", scrollHandler);
    on(window, "resize", scrollHandler);
    data.interval = setInterval(scrollCallback, 50);
  }
}
function setVM(vm) {
  const index = data.all.findIndex(item => item._uid === vm._uid);
  if (index < 0) {
    data.all.push(vm);
    data.vmArr.push(vm);
  }
}
function removeVM(vm) {
  const index = data.vmArr.findIndex(item => item._uid === vm._uid);
  if (index > -1) {
    data.vmArr.splice(index, 1);
  }
}
function scrollHandler() {
  data.scrolled = true;
}
function scrollCallback() {
  if (data.scrolled) {
    data.scrolled = false;
    data.vmArr.map(vm => {
      try {
        const status = vm.start();
        if (!status) {
          removeVM(vm);
        }
      } catch (e) {
        console.error("子组件需start方法");
      }
    });
    if (data.vmArr.length < 1 && !props.config.live) {
      // 停止监听
      stop();
    }
  }
}
function stop() {
  data.stopped = true;
  const targetNode = [props].target();
  off(targetNode, "scroll", scrollHandler);
  off(window, "resize", scrollHandler);
  if (data.interval !== null) {
    clearInterval(data.interval);
  }
}
onMounted(() => {
  start()
})
provide("setVM", setVM)
provide("removeVM", removeVM)
provide("disabled", disabled)
provide("target", props.target)
onDeactivated(() => {stop()})
</script>

<style scoped>
</style>
