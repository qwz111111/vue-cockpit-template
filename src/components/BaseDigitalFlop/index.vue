<template>
  <span>{{ animatedNumber }}</span>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'BaseDigitalFlop',
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: '0'
    },
    duration: {
      type: Number,
      required: false,
      default: 1
    },
    cycle: {
      type: Number,
      required: false,
      default: 6000
    }
  },
  data() {
    return {
      number: 0,
      tweenedNumber: 0
    }
  },
  mounted() {
    this.number = this.value
    let flag = true
    this.time = setInterval(() => {
      if (!flag) {
        this.number = this.value
      } else {
        this.number = (0.0).toFixed(this.getBit())
        setTimeout(() => {
          this.number = this.value
        }, 1100)
      }
      flag = !flag
    }, Math.round(Math.random() * this.cycle + 3000))
  },
  beforeDestroy() {
    clearInterval(this.time)
  },
  computed: {
    animatedNumber: function () {
      return this.tweenedNumber.toFixed(this.getBit())
    }
  },
  watch: {
    number: function (newValue) {
      gsap.to(this.$data, {
        duration: this.duration,
        tweenedNumber: newValue || 0
      })
    },
    value: function (newValue) {
      this.number = newValue
    }
  },
  methods: {
    getBit() {
      if (('' + this.number).indexOf('.') == -1) return 0
      return ('' + this.number).split('.')[1].length
    }
  }
}
</script>
