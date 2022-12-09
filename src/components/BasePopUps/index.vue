<template>
  <div class="base-pop-ups" ref="BasePopUps">
    <transition name="fade">
      <div v-if="show" class="pop transition-300" :style="objStyle">
        <dv-border-box-11
          :title="title"
          :titleWidth="titleWidth"
          :backgroundColor="backgroundColor"
          :color="['#7693dc', '#142870']"
        >
          <close-one
            class="close"
            theme="two-tone"
            size="36"
            :fill="['#7693dc', '#142870']"
            @click="$emit('update:show', false)"
          />
          <div class="content">
            <slot></slot>
          </div>
        </dv-border-box-11>
      </div>
    </transition>
    <!-- 遮罩 -->
    <transition name="mask">
      <div v-if="show" class="mask" @click="$emit('update:show', false)"></div>
    </transition>
  </div>
</template>

<script>
import { CloseOne } from '@icon-park/vue'
import { nowSize } from '@/utils/common'

export default {
  name: 'BasePopUps',
  components: { CloseOne },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: '标题'
    },
    titleWidth: {
      type: Number,
      required: false,
      default: nowSize(350)
    },
    width: {
      type: [Number, String],
      required: false,
      default: 50
    },
    height: {
      type: [Number, String],
      required: false,
      default: 60
    },
    size: {
      type: [Number, String],
      required: false,
      default: ''
    },
    backgroundColor: {
      type: String,
      required: false,
      default: 'rgba(20, 40, 112, 0.3)'
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector('#app').appendChild(this.$el)
    })
  },
  destroyed() {
    document.querySelector('#app').removeChild(this.$el)
  },
  computed: {
    objStyle() {
      if (this.size) {
        return {
          width: `${this.size > 95 ? 95 : this.size < 50 ? 50 : this.size}vw`,
          height: `${this.size > 95 ? 95 : this.size < 50 ? 50 : this.size}vh`
        }
      }
      return {
        width:
          (this.width > 95 ? 95 : this.width < 40 ? 40 : this.width) + 'vw',
        height:
          (this.height > 95 ? 95 : this.height < 50 ? 50 : this.height) + 'vh'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.base-pop-ups {
  .pop {
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    z-index: 100000000;
    .close {
      position: absolute;
      right: -1.4vw;
      top: 0.8vh;
      z-index: 99;
    }
    .content {
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      padding: 8vh 1vw 1vh;
      width: 100%;
      height: calc(100% - 2%);
    }
  }
  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99999999;
    background: var(--bg-color-mask);
  }
}

.mask-enter,
.mask-leave-to {
  opacity: 0;
}
.mask-enter-to,
.mask-leave {
  opacity: 1;
}
.mask-enter-active,
.mask-leave-active {
  transition: all 0.5s;
}
/*  */
.fade-enter-active {
  animation: fade-in-bottom 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.fade-leave-active {
  animation: fade-out-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes fade-in-bottom {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes fade-out-top {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  20% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
}
</style>
