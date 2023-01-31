<template>
  <component :is="el" :style="style" :class="className">
    <slot></slot>
  </component>
</template>

<script setup>
import {reactive, ref, onMounted, inject, getCurrentInstance} from "vue";
import {isVisible, on} from "../../utils/dom";
const props = defineProps({
  offset: {
    type: Number,
    default: 0
  },
  // 是否立即执行
  begin: {
    type: Boolean,
    default: false
  },
  // 禁用滚动计算
  scrollListen: {
    type: Boolean,
    default: true
  },
  el: {
    type: String,
    default: "div"
  },
  duration: {
    type: String,
    default: "1s"
  },
  delay: {
    type: String,
    default: "0s"
  },
  iteration: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    default: ""
  },
  animateClass: {
    type: String,
    default: "animated"
  }
})
let style = ref({
  visibility: "hidden"
})
let className = reactive({
  name: '',
  animateClass: ''
})
let end = ref(false)
let status = ref(false)
const { proxy } = getCurrentInstance()
function animate(callback) {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(callback);
  } else {
    callback();
  }
}
function applyStyle(hidden = false) {
  animate(() => {
    customStyle(hidden);
  });
}

function customStyle(hidden) {
  className = {
    [props.name]: props.name && !hidden,
    [props.animateClass]: props.animateClass && !hidden
  };
  style.value = {
    ...style,
    visibility: hidden ? "hidden" : "visible",
    animationDuration: props.duration,
    animationDelay: props.delay,
    animationIterationCount: props.iteration
  };
}
function resetAnimation(event) {
  try {
    removeVM(proxy);
  } catch (e) {
    console.log(e);
  }
  if (event.type.toLowerCase().indexOf("animationend") >= 0) {
    className = {};
    style = {};
    endCallback();
  }
}
function show() {
  applyStyle();
  const eventArr = [
    "animationend",
    "oanimationend",
    "webkitAnimationEnd",
    "MSAnimationEnd"
  ];
  eventArr.forEach(event => {
    on(proxy.$el, event, resetAnimation);
  });
}
function start() {
  // 执行运动校验
  if (props.begin || myVisible()) {
    if (status || end) return "";
    status = true;
    show();
    return false;
  } else {
    return true;
  }
}
function endCallback() {
  end = true;
  status = false;
}
function myVisible() {
  if (!props.scrollListen) return false;
  return isVisible(proxy.$el, props.offset, target());
}
let setVM = inject("setVM")
let removeVM = inject("removeVM")
let disabled = inject("disabled")
let target = inject("target")

onMounted(() => {
    if (disabled) {
      style.visibility = "visible";
    } else {
      applyStyle(true);
    }
  try {
    setVM(proxy);
  } catch (e) {
    console.log(e);
  }
  start()
})
</script>

<style scoped>
</style>
