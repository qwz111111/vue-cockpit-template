<template>
  <div ref="BaseTianDiTuMap" class="main-box"></div>
</template>

<script>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import patchLeafletMarker from '@/utils/patchLeafletMarker'
patchLeafletMarker(L)

export default {
  name: 'BaseTianDiTuMap',
  props: {
    // 默认位置
    center: {
      type: Array,
      required: false,
      default: () => [29.350289, 121.8474685]
    },
    // 默认缩放
    zoom: { type: Number, required: false, default: 11 },
    // 是否开启聚合
    markerClusterGroup: { type: Boolean, required: false, default: true }
  },
  data() {
    return {
      mapUrl: 'http://yfb.zjtoprs.com:8082',
      geoServerUrl: '/api_map/geoserver/ows',
      geoParams: {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        outputFormat: 'application/json',
        srsName: 'EPSG:4326'
      },
      labelLayer: '' //街道村社标签集合
    }
  },
  mounted() {
    this.initMap()
    this.addMapLayer()
  },
  methods: {
    initMap() {
      this.mapDraw = L.map(this.$refs.BaseTianDiTuMap, {
        center: this.center,
        zoomControl: false,
        zoom: this.zoom,
        maxZoom: 18,
        minZoom: 9,
        preferCanvas: true,
        attributionControl: false
      })
    },

    addMapLayer() {
      const image = L.tileLayer(
        'http://t0.tianditu.gov.cn/img_w/wmts?tk=f1735f97460a4a732c1286703350d72b&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}'
      )
      const tiandiMap = L.layerGroup([image])
      tiandiMap.setZIndex(0)
      this.mapDraw.addLayer(tiandiMap)
      this.labelLayer = L.layerGroup()
      this.mapDraw.addLayer(this.labelLayer)
    },

    handlePolygon(obj) {
      const layerPolygon = L.geoJSON(obj.res, { style: () => obj.option })
      layerPolygon.eachLayer(layer => {
        obj.handleLayer && obj.handleLayer(layer, obj)
        layer.on('click', layer => {
          obj.click && obj.click(layer, obj)
        })
        layer.on('dblclick', layer => {
          obj.dblclick && obj.dblclick(layer, obj)
        })
      })
      return layerPolygon
    },

    handlePoint(obj) {
      const clusterMarkers = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 80
      })
      const layerPoint = L.geoJSON(obj.res, {
        pointToLayer: (feature, latlng) => {
          return (
            obj.handlePointToLayer &&
            obj.handlePointToLayer(clusterMarkers, feature, latlng, obj)
          )
        }
      })
      layerPoint.eachLayer(layer => {
        layer.on('click', () => {
          obj.click && obj.click(layer, obj)
        })
        layer.on('dblclick', () => {
          obj.dblclick && obj.dblclick(layer, obj)
        })
      })
      return this.markerClusterGroup ? clusterMarkers : layerPoint
    },

    getFaceCenter(layer) {
      const lat1 = layer._bounds._northEast.lat
      const lat2 = layer._bounds._southWest.lat
      const lng1 = layer._bounds._northEast.lng
      const lng2 = layer._bounds._southWest.lng
      return [(lat1 + lat2) / 2, (lng1 + lng2) / 2]
    },

    searchZoom(pointList, type) {
      if (pointList.length > 1) {
        let shortestDistance = 0
        let maximumDistance = ''
        for (let x = 0; x < pointList.length; x++) {
          let latlon
          if (type == 'point') {
            latlon = pointList[x].geometry.coordinates
          } else if (type == 'polygon') {
            latlon = pointList[x].geometry.coordinates[0][0]
          }
          const XLat = latlon[1]
          const XLng = latlon[0]
          if (XLat == XLng) continue
          for (let y = x + 1; y < pointList.length; y++) {
            let latlon
            if (type == 'point') {
              latlon = pointList[y].geometry.coordinates
            } else if (type == 'polygon') {
              latlon = pointList[y].geometry.coordinates[0][0]
            }
            const YLat = latlon[1]
            const YLng = latlon[0]
            if (YLat == YLng) continue
            // 两点的距离
            const distance = Math.abs(
              Math.sqrt(Math.pow(XLat - YLat, 2) + Math.pow(XLng - YLng, 2))
            )
            if (distance > shortestDistance) {
              maximumDistance = {}
              shortestDistance = distance
              maximumDistance.x = [XLat, XLng]
              maximumDistance.y = [YLat, YLng]
            }
          }
        }
        const x =
          (Number(maximumDistance.x[0]) + Number(maximumDistance.y[0])) / 2
        const y =
          (Number(maximumDistance.x[1]) + Number(maximumDistance.y[1])) / 2
        let zoom = 11
        if (shortestDistance >= 1) return
        zoom = -2.16 * shortestDistance + 12.18
        this.flyTo([x, y], zoom)
      } else if (pointList.length == 1) {
        let latlon
        if (type == 'point') {
          latlon = pointList[0].geometry.coordinates
        } else if (type == 'polygon') {
          latlon = pointList[0].geometry.coordinates[0][0]
        }
        this.flyTo([latlon[1], latlon[0]], 14)
      }
    },

    flyTo(center, zoom) {
      this.mapDraw.flyTo(center, zoom)
    },

    panTo(center) {
      this.mapDraw.panTo(center)
    },

    getZoom() {
      return this.mapDraw.getZoom()
    },

    removeLayer(layer) {
      if (!layer) return
      this.mapDraw.removeLayer(layer)
    },

    addLayer(layer) {
      if (!layer) return
      this.mapDraw.addLayer(layer)
    },

    mapGetCenter(pointArray) {
      var sortedLongitudeArray = pointArray.map(item => item[1]).sort() //首先对经度进行排序，红色部分是array中经度的名称
      var sortedLatitudeArray = pointArray.map(item => item[0]).sort() //对纬度进行排序，红色部分是array中纬度的名称
      var centerLongitude =
        (parseFloat(sortedLongitudeArray[0]) +
          parseFloat(sortedLongitudeArray[sortedLongitudeArray.length - 1])) /
        2
      const centerLatitude =
        (parseFloat(sortedLatitudeArray[0]) +
          parseFloat(sortedLatitudeArray[sortedLatitudeArray.length - 1])) /
        2
      return [centerLatitude, centerLongitude]
    },

    getPolygonCenter(pointArray) {
      var total = pointArray.length
      var X = 0,
        Y = 0,
        Z = 0
      pointArray.forEach(function (lnglat) {
        var lng = (lnglat[0] * Math.PI) / 180
        var lat = (lnglat[1] * Math.PI) / 180
        var x, y, z
        x = Math.cos(lat) * Math.cos(lng)
        y = Math.cos(lat) * Math.sin(lng)
        z = Math.sin(lat)
        X += x
        Y += y
        Z += z
      })
      X = X / total
      Y = Y / total
      Z = Z / total

      var Lng = Math.atan2(Y, X)
      var Hyp = Math.sqrt(X * X + Y * Y)
      var Lat = Math.atan2(Z, Hyp)
      return [(Lng * 180) / Math.PI, (Lat * 180) / Math.PI]
    },

    filterPoint(pointArray, polygonPoints) {
      // console.log(polygonPoints);
      // return pointArray
      if (pointArray.length === 0 || polygonPoints.length === 0) return
      return pointArray.filter(el => {
        return this.isInPolygon(el.geometry.coordinates, polygonPoints)
      })
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
