<template>
	<view class="container999" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
		<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
		<view class='nav'>
			<!-- #ifdef H5 -->
				<view style="height: 44px;width: 100%;">边距盒子</view>
			<!-- #endif -->
			<!-- 搜索 -->
			<view class='searchInput999'>
				<view class='searchBox999'>
					<image src='../../static/sousuo.png' class='search999'></image>
				</view>
				<input class='input999' placeholder="输入关键词"></input>
				<view class="sousuo" hover-class="sousuo-click" hover-stay-time="100">
					搜索
				</view>
			</view>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in myList" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
				<view :id="'top'+listIndex" style="width: 100%;height: 180upx;">边距盒子</view>
				<view class='content'>
					<view class="item" v-for="(item,index) in listItem" :key="index" @click="itemClick(item.uid, item.jid, item.creatTime, item.status)">
						<!-- 头像 名字栏 -->
						<view class="item-one">
							<view class="item-one-left">
								<image src="../../static/touxiang.jpg" class="item-one-img"></image>
								<text class="item-one-tittle">{{item.sname}}</text>
							</view>
							<view class="item-one-sign" v-if="item.status==1">待审核</view>
							<view class="item-one-sign" v-else>已审核</view>
						</view>
						<!-- 其他信息 -->
						<view class="item-other">
							报名工作：{{item.tittle}}
						</view>
						<view class="item-other">
							工作开始时间：{{item.startTime}}
						</view>
						<view class="item-other">
							工作结束时间：{{item.endTime}}
						</view>
						<view class="item-other">
							工作时段：08:00~18:00
						</view>
						<view class="item-other">
							提交时间：{{item.creatTime}}
						</view>
					</view>
				</view>
				<view class='noCard' v-if="listItem.length===0">
					暂无信息
				</view>
				<!-- <view style="width: 100%;height: 40upx;opacity:0;">底部占位盒子</view> -->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
const util = require('../../util/util.js');
import refresh from '../../components/refresh.vue';
import navTab from '../../components/navTab.vue';
export default {
	components: {refresh,navTab},
	data() {
		return {
			currentPage:'index',
			toView:'',//回到顶部id
			tabTitle:['全部','待审批','已审批'], //导航栏格式 --导航栏组件
			currentTab: 0, //sweiper所在页
			pages:[1,1,1,1], //第几个swiper的第几页
			list: [[1, 2, 3, 4, 5, 6],['a', 'b', 'c', 'd', 'e', 'f'],[],['2233','4234','13144','324244']] ,//数据格式
			myList:[
				[
					{
						stuName: "梁艺翔",
						status: 1,
						tittle: "传单派发员",
						startTime: "2020-03-15",
						endTime: "2020-03-15",
						workBetween: "08:00~18:00",
						signTime: "2020-03-13 13:33"
					},
					{
						stuName: "梁艺翔",
						status: 2,
						tittle: "传单派发员",
						startTime: "2020-03-15",
						endTime: "2020-03-15",
						workBetween: "08:00~18:00",
						signTime: "2020-03-13 13:33"
					}
				],
				[
					{
						stuName: "梁艺翔",
						status: 1,
						tittle: "传单派发员",
						startTime: "2020-03-15",
						endTime: "2020-03-15",
						workBetween: "08:00~18:00",
						signTime: "2020-03-13 13:33"
					}
				],
				[
					{
						stuName: "梁艺翔",
						status: 2,
						tittle: "传单派发员",
						startTime: "2020-03-15",
						endTime: "2020-03-15",
						workBetween: "08:00~18:00",
						signTime: "2020-03-13 13:33"
					}
				]
			],
			uid:""
		};
	},
	onLoad(e) {
		
	},
	onShow() {
		var _this = this
		var serverUrl = _this.serverUrl;
		try {
		    const value = uni.getStorageSync('uid');
		    if (value) {
		        _this.uid = value
		    }
		} catch (e) {
		    // error
		}
		uni.request({
			url: serverUrl + '/job/mysign-com',
			method: "GET",
			data:{
				useId: _this.uid
			},
			success: (res) => {
				_this.myList = res.data
				console.log(res.data);
			}
		});
	},
	onHide() {},
	methods: {
		// 点击每项申请
		itemClick(uid, jid, time, status){
			uni.navigateTo({
				url:"stu-detail?uid="+ uid + '&jid=' + jid + '&time=' + time + '&status=' + status
			})
		},
		toTop(){
			this.toView = ''
			setTimeout(()=>{
				this.toView = 'top' + this.currentTab
			},10)
		},
		changeTab(index){
			this.currentTab = index;
		},
		// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
		isRequest() {
			return new Promise((resolve, reject) => {
				this.pages[this.currentTab]++
				var that = this
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: `请求第${that.currentTab + 1 }个导航栏的第${that.pages[that.currentTab]}页数据成功`
					})
					let newData = ['新数据1','新数据2','新数据3']
					resolve(newData)
				}, 1000)
			})
		},
		// swiper 滑动
		swiperTab: function(e) {
			var index = e.detail.current //获取索引
			this.$refs.navTab.longClick(index); // 导航栏点击
		},
		// 加载更多 util.throttle为防抖函数
		lower1: util.throttle(function(e) {
		console.log(`加载${this.currentTab}`)//currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
		uni.showLoading({
			title: '123加载中',
			mask:true
		})
			this.isRequest().then((res)=>{
				let tempList = this.list
				tempList[this.currentTab] = tempList[this.currentTab].concat(res)
				console.log(tempList)
				this.list = tempList
				this.$forceUpdate() //二维数组，开启强制渲染
			})
		}, 300),
		// 刷新touch监听
		refreshStart(e) {
			this.$refs.refresh.refreshStart(e);
		},
		refreshMove(e){
			this.$refs.refresh.refreshMove(e);
		},
		refreshEnd(e) {
			this.$refs.refresh.refreshEnd(e);
		},
		isRefresh(){
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '小翔刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
		}
	}
};
</script>

<style lang="scss">
		.container999 {
	  width: 100vw;
	  font-size: 28upx;
	  min-height: 100vh;
	  overflow: hidden;
	  color: #6B8082;
	  position: relative;
	  background-color: #f6f6f6;
	}
	.content {
		width: 100%;
	}
	
	.card {
		width: 90%;
		height: 368upx;
		background-color: white;
		margin: 0 auto 42upx auto;
		background: #FFFFFF;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		position: relative;
	}
	
	.noCard {
		width: 90%;
		height: 200upx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
	}
	
	
	.nav {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #E6CEAC;
		z-index: 996;
	}
	.item{
		display: flex;
		flex-direction: column;
		margin:20rpx 25rpx;
		background: #FFFFFF;
		padding: 25rpx 20rpx;
		border-radius: 15rpx;
	}
	.item-one{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.item-one-left{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.item-one-img{
		height: 85rpx;
		width: 85rpx;
		border-radius: 50%;
	}
	.item-one-tittle{
		margin-left: 20rpx;
		font-size: 16px;
	}
	.item-one-sign{
		border-radius: 25rpx;
		background: #fffeef;
		font-size: 13px;
		padding: 10rpx 15rpx;
		color: #999999;
	}
	.item-other{
		margin-top: 25rpx;
		display: flex;
		flex-direction: row;
		font-size: 14px;
		color: #999999;
	}
	.searchInput999 {
		width: 90%;
		margin: 0 auto;
		background: white;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56upx;
	}
	.search999 {
		width: 40upx;
		height: 40upx;
	}
	
	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.input999 {
		color: #999;
		width: 80%;
	}
	.sousuo{
		padding: 10rpx 10rpx;
		background: rgba(230,206,172,0.3);
		border-radius: 25rpx;
	}
	.sousuo-click{
		opacity: 0.9;
		background: rgba(230,206,172,0.2);
	}
</style>
