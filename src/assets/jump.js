import axios from 'axios'
import qs from 'qs'
import tools from './tools'
import { SetAppData, browser, StringToJson } from './App'
var AppData = { }
const GetData = (obj) => {
  let { url, data = { }, method, load, showMsg = true } = obj
  if (load) {
    tools.loading('open')
  }
  return new Promise((resolve, reject) => {
    axios({
      method: method || `POST`,
      url: url,
      data: qs.stringify(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then((res) => {
      resolve(res.data)
      tools.loading('close')
      if (showMsg) {
        tools.msg({
          text: res.data.ErrorMsg,
          position: 'center',
          time: 1000
        })
      }
    }).catch((res) => {
      resolve(res)
      if (showMsg) {
        console.log(res)
      }
    })
  }
  )
}

const jump = {
  to: (type, value) => {
    switch (type) {
      case 1:
        window.location = value.Url
        break
      case 2:
        break
      case 3:
        alert(111)
        break
      case 4:
        jump.getConpon(type, value)
        break
      case 5:
        jump.AddShopCart(type, value)
        break
    }
  },
  getConpon: (type, value) => {
    let prams = { couponId: value.CouponID, ver: '1.0', couponType: value.CouponType }
    if (browser.versions().IosApp || browser.versions().AndroidApp) {
      tools.loading('open')
      SetAppData({
        title: '领取优惠券',
        dataObj: prams,
        api: 'SysPromotion/LedCoupon',
        noDomain: false
      })
      return false
    }
    GetData({
      url: 'http://m.qipeilong.net/SysPromotion/LedCoupon',
      data: prams,
      method: 'POST',
      load: true,
      showMsg: true
    }).then((value) => {
      console.log(value)
    })
  },
  AddShopCart: (type, value) => {
    let prams = { userProductId: value.UserProductId, ver: '1.0', Count: 1, isGroup: value.ProductType }
    if (browser.versions().IosApp || browser.versions().AndroidApp) {
      tools.loading('open')
      SetAppData({
        title: '加入购物车',
        dataObj: prams,
        api: 'shoppingcart/AddProductToCart',
        noDomain: false
      })
      return false
    }
    GetData({
      url: 'http://m.qipeilong.cn/shoppingcart/AddProductToCart',
      data: prams,
      method: 'POST',
      load: true,
      showMsg: true
    }).then((value) => {
      console.log(value)
    })
  }
}

window.CallBackData = (res) => {
  let promise = new Promise((resolve, reject) => {
    resolve(res)
  })
  promise.then((res) => {
    AppData = StringToJson(res)
    tools.msg({
      text: AppData.ErrorMsg,
      position: 'center',
      time: 1000
    })
  }).catch((e) => {
    console.log(e)
  })
  tools.loading('close')
}

export default jump
