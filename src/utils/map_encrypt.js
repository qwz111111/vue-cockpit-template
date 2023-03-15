/*
 * WGS-84：是国际标准，GPS坐标（Google Earth使用、或者GPS模块、天地图）
 * GCJ-02：中国坐标偏移标准，Google Map、高德、腾讯使用
 * BD-09：百度坐标偏移标准，Baidu Map使用
 */

//定义一些常量
const x_PI = (3.14159265358979324 * 3000.0) / 180.0
const PI = 3.1415926535897932384626
const a = 6378245.0
const ee = 0.00669342162296594323

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
  return (
    lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
  )
}

function transformlat(lng, lat) {
  let ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng))
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0
  ret +=
    ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
    3.0
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) *
      2.0) /
    3.0
  return ret
}

function transformlng(lng, lat) {
  let ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng))
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0
  ret +=
    ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
    3.0
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * PI) +
      300.0 * Math.sin((lng / 30.0) * PI)) *
      2.0) /
    3.0
  return ret
}

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param lng 经度
 * @param lat 纬度
 * @returns {lng,lat} 经纬度对象
 */
export function bd09togcj02(lng, lat) {
  const x = lng - 0.0065
  const y = lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI)
  const gg_lng = z * Math.cos(theta)
  const gg_lat = z * Math.sin(theta)
  return { lng: gg_lng, lat: gg_lat }
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即谷歌、高德 转 百度
 * @param lng 经度
 * @param lat 纬度
 * @returns {lng,lat} 经纬度对象
 */
export function gcj02tobd09(lng, lat) {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI)
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI)
  const bd_lng = z * Math.cos(theta) + 0.0065
  const bd_lat = z * Math.sin(theta) + 0.006
  return { lng: bd_lng, lat: bd_lat }
}

/**
 * WGS84 转 GCj02
 * @param lng 经度
 * @param lat 纬度
 * @returns {lng,lat} 经纬度对象
 */
export function wgs84togcj02(lng, lat) {
  if (out_of_china(lng, lat)) {
    return { lng: lng, lat: lat }
  } else {
    let dlat = transformlat(lng - 105.0, lat - 35.0)
    let dlng = transformlng(lng - 105.0, lat - 35.0)
    let radlat = (lat / 180.0) * PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    let sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
    let mglat = Number(lat) + Number(dlat)
    let mglng = Number(lng) + Number(dlng)
    return { lng: mglng, lat: mglat }
  }
}
/**
 * GCJ02 转换为 WGS84
 * @param lng 经度
 * @param lat 纬度
 * @returns {lng,lat} 经纬度对象
 */
export function gcj02towgs84(lng, lat) {
  if (out_of_china(lng, lat)) {
    return { lng: lng, lat: lat }
  } else {
    let dlat = transformlat(lng - 105.0, lat - 35.0)
    let dlng = transformlng(lng - 105.0, lat - 35.0)
    let radlat = (lat / 180.0) * PI
    let magic = Math.sin(radlat)
    magic = 1 - ee * magic * magic
    let sqrtmagic = Math.sqrt(magic)
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
    let mglat = lat + dlat
    let mglng = lng + dlng
    return { lng: lng * 2 - mglng, lat: lat * 2 - mglat }
  }
}
