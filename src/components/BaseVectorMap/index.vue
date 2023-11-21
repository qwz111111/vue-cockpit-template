<template>
  <div
    ref="BaseVectorMap"
    class="main-box base-vector-map horizontally-center"
  ></div>
</template>

<script>
import { nowSize } from '@/utils/common.js'
import { debounce } from '@/utils/util.js'
import axios from '@/api/axios.js'

export default {
  name: 'BaseVectorMap',
  props: {
    options: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      curMapName: '象山县',
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
  created() {
    axios.get('/json/330225.json').then(res => {
      this.filterMap = res.features[0].geometry.coordinates[0][0]
    })
  },
  mounted() {
    window.addEventListener('resize', () => this.resizeCharts())
  },
  methods: {
    async getMapData() {
      if (!this.mapData) {
        const res = await axios.get('/json/330225_full.json')
        this.mapData = res
      }
      this.drawMapChart(this.curMapName, this.mapData)
    },

    drawMapChart(mapName, mapJSON) {
      if (this.mapVector) this.mapVector.dispose()
      this.mapVector = this.$echarts.init(this.$refs.BaseVectorMap)
      this.monitor()
      this.$echarts.registerMap(mapName, mapJSON)
      this.mapVector.setOption(this.filter(mapName, mapJSON))
    },

    filter(mapName) {
      const geo = [
        {
          show: true,
          map: mapName,
          roam: true,
          left: '32%',
          label: {
            show: true,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: nowSize(16)
          },
          itemStyle: {
            areaColor: this.options?.inRange || '#148cea',
            borderColor: '#fff'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#d8cc50'
            }
          },
          aspectScale: 1, //长宽比
          zoom: 0.9,
          regions: this.mapData.features.map((el, index) => {
            const color = [
              '#26a0e1',
              '#3db6ed',
              '#48c0f2',
              '#5cd0f9',
              '#26a0e1',
              '#61d2fa',
              '#79e2ff',
              '#6ddbfe',
              '#93ebff'
            ]
            return {
              name: el.properties.name,
              itemStyle: {
                areaColor: color[index % color.length]
              }
            }
          })
        }
      ]
      const seriesData =
        this.filterPoint(this.options.series, this.mapData) || []
      const series = seriesData.map(item => {
        return {
          type: 'scatter', // scatter  effectScatter
          coordinateSystem: 'geo', // 设置坐标系类型
          data: item.data, // 设置散点位置和数据
          symbolSize: item.symbolSize || nowSize(17), // 设置散点大小
          showEffectOn: this.options?.showEffectOn ? 'render' : 'emphasis',
          rippleEffect: { brushType: 'stroke' }, //样式
          symbol: item.symbol || 'circle',
          label: {
            show: true, // 显示地区名称
            formatter: val => val.data.label || ' ',
            position: 'top', // 显示位置
            color: '#fff',
            fontWeight: 'bold',
            fontSize: nowSize(14)
          },
          itemStyle: {
            color: item.color || '#f9c43f'
          }
        }
      })
      return { geo: geo, series: series }
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
    }),
    filterPoint(optionsSeries, mapJSON) {
      if (!optionsSeries || optionsSeries.length === 0) return optionsSeries
      const arr = []
      for (let i = 0; i < optionsSeries.length; i++) {
        const { data, ...res } = optionsSeries[i]
        const array = { ...res, data: [] }
        if (!this.level) {
          for (let j = 0; j < data.length; j++) {
            if (
              data[j].value &&
              this.isInPolygon(data[j].value, this.filterMap)
            ) {
              array.data.push(data[j])
            }
          }
          this.mapJSONFilter = mapJSON
        } else {
          let polygon = ''
          const mjf = this.mapJSONFilter.features
          for (let j = 0; j < mjf.length; j++) {
            if (mjf[j].properties.name == this.nameFilter) {
              if (mjf[j].geometry.coordinates.length === 1) {
                polygon = mjf[j].geometry.coordinates[0]
              } else {
                polygon = mjf[j].geometry.coordinates[0][0]
              }
              break
            }
          }

          for (let j = 0; j < data.length; j++) {
            if (data[j].value && this.isInPolygon(data[j].value, polygon)) {
              array.data.push(data[j])
            }
          }

          this.mapJSONFilter = mapJSON
        }
        arr.push(array)
      }
      return arr
    },

    isInPolygon(checkPoint, polygonPoints) {
      let counter = 0
      let i
      let xinters
      let p1, p2
      let pointCount = polygonPoints.length
      p1 = polygonPoints[0]

      for (i = 1; i <= pointCount; i++) {
        p2 = polygonPoints[i % pointCount]
        if (
          checkPoint[0] > Math.min(p1[0], p2[0]) &&
          checkPoint[0] <= Math.max(p1[0], p2[0])
        ) {
          if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
            if (p1[0] != p2[0]) {
              xinters =
                ((checkPoint[0] - p1[0]) * (p2[1] - p1[1])) / (p2[0] - p1[0]) +
                p1[1]
              if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
                counter++
              }
            }
          }
        }
        p1 = p2
      }
      if (counter % 2 == 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
