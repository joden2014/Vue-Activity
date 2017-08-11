<template>
    <div v-if="!show" v-bind:class="{hasBottom:hasBottom}">
      <MyHeader :MyTitle='res.Data.PromotionName'></MyHeader>

      <div v-for="item in res.Data.StructItems" class="floor" :class="'floor'+item.IID" :key="item.IID" ref="myFloor">


        <!-- 轮播类型 -->
        <div v-if="item.ContentType==='1'">
          <swiperHtml :IData="item.Items"></swiperHtml>
        </div>

        <!-- 图片类型 -->
        <div v-else-if="item.ContentType==='2'">
          <Images :ImgData="item.Items"></Images>
        </div>

        <!-- 商品列表类型 -->
        <div v-else-if="item.ContentType==='3'">
          <productList :IData="item.Items[0]"></productList>
        </div>

        <!-- 商品单品类型 -->
        <div v-else-if="item.ContentType==='4'">
          <product :IData="item"></product>
        </div>

        <!-- 锚点导航 -->
        <div v-else-if="item.ContentType==='6'" ref="nav">
          <swiperNav :IData="item" style="background:#fff"></swiperNav>
        </div>

        <!-- tab切换 -->
        <div v-else-if="item.ContentType==='7'" ref="tab">
          <Tab :IData="item"></Tab>
        </div>

        <!-- 底部导航 -->
        <div v-else-if="item.ContentType==='5'">
          <bottomNav :IData="item"></bottomNav>
        </div>

        <!-- 引用模板 -->
        <div v-else-if="item.ContentType==='8'" class="MyModule">
          <div class="ModuleCon" v-for="(modules,index) in moduleLsit">
            <div v-for="modulesItem in modules.Data" class="Module" :class="'Module'+modulesItem.IID" :key="modulesItem.IID" ref="myModule">
                <!-- 轮播类型 -->
                <div v-if="modulesItem.ContentType==='1'">
                  <swiperHtml :IData="modulesItem.Items"></swiperHtml>
                </div>

                <!-- 图片类型 -->
                <div v-else-if="modulesItem.ContentType==='2'">
                  <Images :ImgData="modulesItem.Items"></Images>
                </div>

                <!-- 商品列表类型 -->
                <div v-else-if="modulesItem.ContentType==='3'">
                  <productList :IData="modulesItem.Items[0]"></productList>
                </div>

                <!-- 商品单品类型 -->
                <div v-else-if="modulesItem.ContentType==='4'">
                  <product :IData="modulesItem"></product>
                </div>

                <!-- 锚点导航 -->
                <div v-else-if="modulesItem.ContentType==='6'" ref="nav">
                  <swiperNav :IData="modulesItem"></swiperNav>
                </div>

                <!-- tab切换 -->
                <div v-else-if="modulesItem.ContentType==='7'" ref="tab">
                  <Tab :IData="modulesItem"></Tab>
                </div>
            </div>
          </div>

        </div>

      </div>
    </div>
</template>

<script>
import header from '../../components/header'
import { Group, Cell } from 'vux'
import swiperHtml from './swiper.vue'
import Images from './images.vue'
import productList from './productList.vue'
import product from './product.vue'
import swiperNav from './swiperNav.vue'
import bottomNav from './bottomNav.vue'
import Tab from './Tab.vue'
import tools from '../../assets/tools'
import { SetAppData, browser, StringToJson } from '../../assets/App'
export default {
  data: () => {
    return {
      res: { },
      show: true,
      url: 'http://m.qipeilong.net/Promotion/GetPromotionModelInfoByID',
      hasBottom: false,
      moduleLsit: []
    }
  },
  components: {
    Group,
    Cell,
    swiperHtml,
    MyHeader: header,
    Images,
    productList,
    product,
    swiperNav,
    bottomNav,
    Tab
  },
  mounted () {
    let that = this
    let parms = { id: this.$route.query.id, ver: '1.0', platform: 1 }
    if (browser.versions().IosApp || browser.versions().AndroidApp) {
      tools.loading('open')
      SetAppData({
        title: '获取活动框架',
        dataObj: parms,
        api: 'Promotion/GetPromotionModelInfoByID',
        noDomain: false
      })
      return false
    }
    this.$ajax({
      url: 'http://m.qipeilong.net/Promotion/GetPromotionModelInfoByID',
      data: parms,
      method: 'POST',
      load: false,
      showMsg: true
    }).then((value) => {
      if (value.Success) {
        that.res = value
        that.show = false
        for (let i = 0; i < value.Data.StructItems.length; i++) {
          if (value.Data.StructItems[i].ContentType === '5') {
            that.hasBottom = true
          } else if (value.Data.StructItems[i].ContentType === '8') {
            that.GetModule(value.Data.StructItems[i].Items[0].ContentData)
          }
        }
      } else {
        that.$vux.alert.show({
          title: '请求错误',
          content: value.ErrorMsg,
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding now')
          }
        })
      }
    })
  },
  methods: {
    GetModule (id) {
      let that = this
      this.$ajax({
        url: 'http://m.qipeilong.net/Promotion/GetPromotionStructModelListByPromotionID',
        data: { id: id, ver: '1.0', platform: 1, userId: 'b11dfe19ef4d4f60860dda673dfa7863' },
        method: 'POST',
        load: false,
        showMsg: true
      }).then((value) => {
        if (value.Success) {
          that.moduleLsit.push(value)
        }
      })
    }
  },
  beforeCreate () {
    let that = this
    window.CallBackData = (res) => {
      let promise = new Promise((resolve, reject) => {
        resolve(res)
      })
      promise.then((res) => {
        that.res = StringToJson(res)
        tools.msg({
          text: res.ErrorMsg,
          position: 'center',
          time: 1000
        })
      }).catch((e) => {
        console.log(e)
      })
      tools.loading('close')
    }
  }
}
</script>

<style lang="less" scoped>
  .item{
    width: 100%;
  }
  .floor{
    overflow: hidden;
  }
  .hasBottom{
    margin-bottom: 60px;
  }
  .fixed{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    z-index: 1990;
  }
</style>
