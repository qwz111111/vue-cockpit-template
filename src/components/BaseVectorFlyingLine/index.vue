<template>
  <div
    ref="BaseVectorFlyingLine"
    class="main-box base-vector-map-flying-line horizontally-center"
  ></div>
</template>

<script>
import { nowSize } from '@/utils/common.js'
import { debounce } from '@/utils/util.js'
import axios from '@/api/axios.js'

export default {
  name: 'BaseVectorFlyingLine',
  props: {
    options: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      curMapName: '中国',
      geoServerUrl: '/api_server/geoserver/ows',
      geoParams: {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        outputFormat: 'application/json',
        srsName: 'EPSG:4326'
      }
    }
  },
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler() {
        this.getMapData()
      }
    }
  },
  mounted() {
    window.addEventListener('resize', () => this.resizeCharts())
  },
  methods: {
    async getMapData() {
      if (!this.mapData) {
        const res = await axios.get('/json/100000_full.json')
        this.mapData = res
      }
      this.drawMapChart(this.curMapName, this.mapData)
    },

    drawMapChart(mapName, mapJSON) {
      if (this.mapVector) this.mapVector.dispose()
      this.mapVector = this.$echarts.init(this.$refs.BaseVectorFlyingLine)
      this.monitor()
      this.$echarts.registerMap(mapName, mapJSON)
      this.mapVector.setOption(this.filter(mapName, mapJSON))
    },

    filter(mapName, mapJSON) {
      const json = mapJSON.features.slice(1, mapJSON.features.length - 1)
      console.log(json);
      const coord = json.map(el => {
        return {
          name: el.properties.name,
          value: el.properties.center
        }
      })
      const lines_coord = []
      coord.forEach(el => {
        if (this.options.target.includes(el.name)) {
          el.value &&
            lines_coord.push({
              // coords: [coord[0].value, el.value]
              coords: [
                coord.filter(el => el.name == this.options.origin)[0].value,
                el.value
              ]
            })
        }
      })
      return {
        geo: {
          map: mapName,
          zlevel: 10,
          roam: true,
          zoom: 1,
          layoutCenter: ['50%', '60%'],
          layoutSize: '100%',
          label: {
            show: true,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: this.options?.fontSize || nowSize(16)
          },
          itemStyle: {
            color: '#148cea',
            borderColor: this.options?.normalBorderColor || '#a5e6fb',
            borderWidth: 1
            // areaColor: this.options?.emphasisAreaColor || '#cdac34'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#d8cc50'
            }
          }
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 15,
            symbolSize: 8,
            rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 4
            },
            itemStyle: {
              color: '#FFB800',
              opacity: 1
            },
            data: coord.filter(el => this.options.target.includes(el.name))
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 15,
            symbolSize: 12,
            rippleEffect: {
              period: 6,
              brushType: 'stroke',
              scale: 8
            },
            itemStyle: {
              color: '#FF5722',
              opacity: 1
            },
            data: coord.filter(el => el.name == this.options.origin)
          },
          {
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 15,
            effect: {
              show: true,
              period: 5,
              trailLength: 0,
              symbol: 'arrow',
              color: '#ffff01',
              symbolSize: 8
            },
            lineStyle: {
              opacity: 0.6,
              curveness: 0.2,
              color: '#ffff01'
            },
            data: lines_coord
          }
        ]
      }
    },

    monitor() {
      this.mapVector.on('click', e => {
        if (e.componentType === 'geo') {
          this.$emit('click-map-polygon', e)
        } else if (e.componentType === 'series') {
          this.$emit('click-map-point', e)
        }
      })
    },

    resizeCharts: debounce(function () {
      if (this.mapVector) this.mapVector.resize()
    })
  }
}
</script>
