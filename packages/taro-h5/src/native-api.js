import { onAndSyncApis, noPromiseApis, otherApis, initPxTransform } from '@tarojs/taro'
import { createSelectorQuery } from './api/createSelectorQuery'
import request from './api/request'
import * as storage from './api/storage'
import * as interactive from './api/interactive'
import webSocket from './api/webSocket'

function processApis (taro) {
  const weApis = Object.assign({ }, onAndSyncApis, noPromiseApis, otherApis)
  Object.keys(weApis).forEach(key => {
    taro[key] = () => {
      console.log(`暂时不支持 ${key}`)
    }
  })
}

function pxTransform (size) {
  const { designWidth } = this.config
  return Math.ceil((parseInt(size, 10) / 40 * 640 / designWidth) * 10000) / 10000 + 'rem'
}

export default function initNativeApi (taro) {
  processApis(taro)
  taro.request = request
  taro.createSelectorQuery = createSelectorQuery
  taro.initPxTransform = initPxTransform.bind(taro)
  taro.pxTransform = pxTransform.bind(taro)
  Object.assign(taro, storage, interactive, webSocket)
}
