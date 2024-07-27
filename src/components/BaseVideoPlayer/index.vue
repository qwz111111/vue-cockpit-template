<template>
  <div class="base-video-player">
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
    ></video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  name: 'BaseVideoPlayer',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      player: null
    }
  },
  beforeDestroy() {
    this.playerDispose()
  },
  activated() {
    this.playerPlay()
  },
  deactivated() {
    this.playerPause()
  },
  mounted() {
    this.playerInit()
  },
  watch: {
    src(newSrc) {
      if (this.player) {
        this.player.src({ src: newSrc, type: 'application/x-mpegURL' });
      }
    },
  },
  methods: {
    playerInit() {
      this.$nextTick(() => {
        this.player = videojs(this.$refs.videoPlayer, {
          autoplay: true, // 设置自动播放
          muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音 （Chrome66及以上版本，禁止音视频的自动播放）
          preload: 'auto', // 预加载
          controls: false, // 显示播放的控件
          sources: [
            {
              src: this.src,
              type: 'application/x-mpegURL'
            }
          ]
        })
      })
    },
    playerPause() {
      if (this.player) {
        this.player.pause()
      }
    },
    playerPlay() {
      if (this.player) {
        this.player.play()
      }
    },
    playerDispose() {
      if (this.player) {
        this.player.dispose() // Removing Players,该方法会重置videojs的内部状态并移除dom
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.vjs_video_3-dimensions) {
  width: initial;
  height: initial;
}
:deep(.video-js .vjs-tech),
.base-video-player {
  position: initial;
  top: initial;
  left: initial;
  width: 100%;
  height: 100%;
  > video {
    width: 100%;
    height: 100%;
  }
}
</style>
