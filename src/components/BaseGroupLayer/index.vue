<template>
  <div class="base-group-layer" :style="{ '--content-height': contentHeight }">
    <div class="layer-search" v-if="search">
      <BaseSearch v-model="value" @search="$emit('search', value)" />
    </div>
    <div class="layer-content">
      <div v-for="(item, index) in options" :key="item.label" class="l-c-box">
        <div
          :class="[
            'l-c-box-title',
            'flex-start-center',
            { 'title-active': active.includes(index) }
          ]"
          @click="onClickTitle(item, index)"
        >
          <img :src="item.icon" class="img-icon" />
          <div>{{ item.label }}</div>
          <img src="./images/up.png" class="img-arrow" />
        </div>
        <transition name="content">
          <div v-show="active.includes(index)" class="l-c-box-content">
            <div
              v-for="(el, i) in item.children"
              :key="el.label"
              :class="['flex-start-center', { 'checked-active': el.checked }]"
            >
              <el-checkbox
                :value="el.checked"
                @change="val => onChange(val, item, index, el, i)"
                >{{ el.label }}</el-checkbox
              >
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSearch from '@/components/BaseSearch/index.vue'

export default {
  name: 'BaseGroupLayer',
  components: { BaseSearch },
  props: {
    search: {
      type: Boolean,
      required: false,
      default: true
    },
    accordion: {
      type: Boolean,
      required: false,
      default: false
    },
    'default-active': {
      type: [Number, String],
      required: false,
      default: -1
    },
    multiple: {
      type: Boolean,
      required: false,
      default: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: '',
      active: [],
      contentHeight: 0
    }
  },
  watch: {
    defaultActive: {
      handler(val) {
        this.active = [+val]
      },
      immediate: true
    }
  },
  computed: {
    option: {
      get() {
        return this.options
      },
      set(val) {
        this.$emit('update:options', val)
      }
    }
  },
  methods: {
    getContentHeight(index) {
      const len = this.options[index].children.length
      this.contentHeight = `${len * 30 + (len - 1) * 6}px`
    },

    onClickTitle(_item, index) {
      this.getContentHeight(index)
      if (this.accordion) {
        if (this.active.includes(index)) {
          this.active = this.active.filter(item => item !== index)
        } else {
          this.active.push(index)
        }
      } else {
        if (this.active.includes(index)) {
          this.active = []
        } else {
          this.active = [index]
        }
      }
    },
    radio() {
      this.option.forEach(item => {
        item.children.forEach(el => {
          el.checked = false
        })
      })
    },
    onChange(val, item, index, el, i) {
      !this.multiple && this.radio()
      this.option[index].children[i].checked = val
      this.$emit('change', {
        parentItem: item,
        parentIndex: index,
        item: el,
        index: i,
        value: val
      })
    }
  }
}
</script>
<style></style>

<style scoped lang="less">
.base-group-layer {
  position: relative;
  width: 232px;
  min-height: 200px;
  background-image: url(./images/layer-pingpu.png);
  background-repeat: repeat-y;
  &::before {
    content: '';
    position: absolute;
    top: -18px;
    width: 100%;
    height: 18px;
    background-image: url(./images/layer-top.png);
    background-size: 100%;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -18px;
    width: 100%;
    height: 18px;
    background-image: url(./images/layer-bottom.png);
    background-size: 100%;
  }
  .layer-search {
    padding: 16px 20px 0;
  }
  .layer-content {
    margin: 0 20px;
    max-height: 460px;
    padding: 16px 2px 16px 0;
    overflow: auto;
    .l-c-box {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .title-active {
        > div {
          filter: drop-shadow(0 0 4px #1689cc);
        }
        .img-arrow {
          transform: rotate(180deg);
        }
      }

      .l-c-box-title {
        border: 1px solid #0c6edc;
        border-radius: 4px;
        background-color: #113868;
        box-sizing: border-box;
        padding: 0 10px 0 2px;
        height: 35px;
        overflow: hidden;
        cursor: pointer;
        > div {
          width: calc(100% - 60px);
          font-size: 15px;
          color: #fff;
        }
        .img-icon {
          width: 40px;
          height: 40px;
          object-fit: cover;
        }
        .img-arrow {
          width: 20px;
          height: 20px;
          object-fit: cover;
          transition: all 0.3s;
        }
      }
      .l-c-box-content {
        > div {
          border: 1px solid rgba(12, 110, 220, 0.5);
          border-radius: 2px;
          background-color: rgba(17, 56, 104, 0.5);
          box-sizing: border-box;
          padding: 0 14px;
          height: 30px;
          margin: 6px 0;
        }
      }
      .el-checkbox {
        color: #fff;
      }
    }
  }
}
.content-enter-active {
  animation: content-show 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.content-leave-active {
  animation: content-hide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes content-show {
  0% {
    height: 0;
    overflow: hidden;
  }
  100% {
    height: var(--content-height);
    overflow: hidden;
  }
}

@keyframes content-hide {
  0% {
    height: var(--content-height);
    overflow: hidden;
  }
  100% {
    height: 0;
    overflow: hidden;
  }
}
</style>
