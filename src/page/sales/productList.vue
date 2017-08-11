<!-- 商品组组件 -->
<template>
<div>
	<div class="productList">
		<swiper :options="swiperOption" class="productSwiper" v-if="IData.ContentObj.DataFiltering === 0" ref="mySwiper">
	        <swiper-slide v-for="product in IData.ContentObj.ProductItems" class="item" :key="product.IID">
	        	<div>
	        		<div class="ProductImg">
	        			<img :data-src="product.ProductImages.split(',')[0]" class="swiper-lazy" :src="qplIcon">
	        		</div>
	        		<div class="ProductNum">
	        			<span v-if="product.LimitMin>0">起购:{{product.LimitMin}}</span>
	        			<span v-if="product.LimitMax>0">限购:{{product.LimitMax}}</span>
	        			<span>库存:{{product.CurrentAmount}}</span>
	        		</div>
	        		<div class="ProductTitle">
	        			<span>{{product.ProductName}}</span>
	        		</div>
	        		<div class="ProductPrice">
	        			<span>￥<em>{{product.ListPriceStr}}</em><i v-if="product.CouponID!==null" class="coupons" @click="operation(4,{'CouponID': product.CouponID, 'CouponType': product.CouponType})">券</i></span>
	        		</div>
	        		<div class="ProductBtn">
	        			<button @click="operation(5,{'UserProductId': product.UserProductId, 'ProductType': product.ProductType})">马上抢</button>
	        		</div>
	        	</div>
	        </swiper-slide>
	        <div class="swiper-scrollbar" slot="scrollbar"></div>
	    </swiper>

	    <div class="productCon flex" v-else-if="IData.ContentObj.DataFiltering === 2">
	        <div class="item flex2" v-for="product in IData.ContentObj.ProductItems" :key="product.IID">
					<div class="ProductImg">
	        			<x-img :src="product.ProductImages.split(',')[0]" :webp-src="`${product.ProductImages.split(',')[0]}`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" container="#app"></x-img>
	        		</div>
	        		<div class="ProductNum">
	        			<span v-if="product.LimitMin>0">起购:{{product.LimitMin}}</span>
	        			<span v-if="product.LimitMax>0">限购:{{product.LimitMax}}</span>
	        			<span>库存:{{product.CurrentAmount}}</span>
	        		</div>
	        		<div class="ProductTitle">
	        			<span>{{product.ProductName}}</span>
	        		</div>
	        		<div class="ProductPrice">
	        			<span>￥<em>{{product.ListPriceStr}}</em><i v-if="product.CouponID!==null" class="coupons" @click="operation(4,{CouponID: product.CouponID,CouponType: product.CouponType})">券</i></span>
	        		</div>
	        		<div class="ProductBtn">
	        			<button @click="operation(5,{'UserProductId': product.UserProductId, 'ProductType': product.ProductType})">马上抢</button>
	        		</div>
	        </div>
        </div>
	</div>
</div>	
</template>

<script>
  import { XImg } from 'vux'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import qplIcon from '../../assets/base46ForImg.js'
  import jump from '../../assets/jump.js'
  export default {
    components: {
      swiper,
      swiperSlide,
      XImg
    },
    data () {
      return {
        swiperOption: {
          scrollbar: '.swiper-scrollbar',
          scrollbarHide: true,
          slidesPerView: 'auto',
          centeredSlides: false,
          spaceBetween: 5,
          grabCursor: true,
          lazyLoading: true,
          lazyLoadingInPrevNext: true,
          lazyLoadingInPrevNextAmount: 3,
          notNextTick: true
        },
        qplIcon: qplIcon
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      operation: (type, value) => {
        jump.to(type, value)
      },
      success (src, ele) {
        console.log('success load', src)
      },
      error (src, ele, msg) {
        console.log('error load', msg, src)
      }
    },
    mounted () {
    },
    props: ['IData']
  }
</script>

<style lang="less" scoped>

	.productList{
		margin: 0.3rem 0;
		.productSwiper{
			padding:0 0.14rem;
		}
	}
	.flex{
		display:flex;
		flex-wrap:wrap;
		width:100%;
		height:100%;
		.flex2{
		width:48%;
		
		&:nth-child(odd){
			margin: 0.2rem 0.10rem 0 0.2rem;
		}
		&:nth-child(even){
			margin: 0.2rem 0.2rem 0 0.10rem;
		}
	}
	}
	
	.item{
		width: 6.2298rem;
		height:auto;
		border-radius: 0.25rem;
		background: #fff;
		font-size: 0.5rem;
		position: relative;
		.ProductImg{
			text-align: center;
			padding:0.3rem 0;
			img{
				width:3.754rem;
				height:3.754rem;
				display:inline-block;
			}
		}

		.ProductTitle{
			overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
		    height: 30px;
		    line-height: 15px;
		    word-break:break-all;
		    word-wrap:break-word;
		    margin:0.3rem 0;
		    padding: 0 0.3rem;
		}
		.ProductNum{
			width:100%;
			height:1rem;
			background:rgba(155,183,210,0.83);
			span{
				color:#fff;
				line-height:1rem;
				padding:0 0.2rem;
			}
		}
		.ProductBtn{
			text-align:center;
			padding:0.3rem 0;
			button{
				width:80%;
				height:1.5rem; 
				background:#cc1b23;
				outline: none;
				border:none;
				border-radius:0.3rem;
				color: #fff;
			}
		}
		.ProductPrice{
			padding: 0 0.3rem;
			span{
				color:#cc1b23;
				em{
					font-size:0.7rem;
					font-style: normal;
				}
			}
		}
	}

</style>
