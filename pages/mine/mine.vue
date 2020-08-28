<template>
	<view class="minebase">
		<!-- 顶部背景 -->
		<view class="topbg"></view>
		<view class="content">
			<!-- 顶部信息卡 -->
			<view class="idcard">
				<!-- 顶部信息卡 第一行 -->
				<view class="idcard-one">
					<!-- 顶部信息卡 第一行左边 -->
					<view class="idcard-one-left">
						<image class="idcard-one-img" src="../../static/qi.png"></image>
						<view class="idcard-one-name">
							<text style="font-size: 16px; font-weight: bold;">{{data.cname}}</text>
							<text class="idcard-one-name-main">负责人： {{data.pname}}</text>
						</view>
					</view>
					<!-- 顶部信息卡 第一行右边 -->
					<view class="idcard-one-right" @click="verify">
						<image class="idcard-one-right-icon" src="../../static/gou.png" v-if="isVerify==1"></image>
						<!-- <text  class="idcard-one-right-tittle" :class="isVerify==1?'tittle-verify':''">{{isVerify==1?'已认证':'未认证'}}</text> -->
						<!-- <image class="idcard-one-right-icon" src="../../static/you.png" v-if="isVerify==0"></image> -->
					</view>
				</view>
				<!-- 分割线 -->
				<view style="width: 100%; height: 3rpx; background: #F1F1F1;"></view>
				<!-- 顶部信息卡 第二行 -->
				<view class="idcard-two">
					<image src="../../static/dizhi.png" class="idcard-two-icon"></image>
					<text class="idcard-two-word">{{data.cplace}}</text>
				</view>
				<!-- 顶部信息卡 第三行 -->
				<view class="idcard-two">
					<image src="../../static/dianhua.png" class="idcard-two-icon"></image>
					<text class="idcard-two-word">{{data.cphone}}</text>
				</view>
			</view>
			<!-- 我的印象栏 -->
			<view class="myimpression">
				<!-- 印象栏第一行 -->
				<view class="myimpression-one">
					<text class="myimpression-one-title">我的印象</text>
					<text class="myimpression-one-tips">所有印象均由您的招聘人员匿名投出~</text>
				</view>
				<!-- 印象栏内容区 -->
				<view class="myimpression-content">
					<view class="myimpression-content-item">按时下班 + 2</view>
					<view class="myimpression-content-item">按时发工资 + 1</view>
					<view class="myimpression-content-item">友善 + 1</view>
					<view class="myimpression-content-item">工作轻松 + 5</view>
				</view>
			</view>
			<!-- 其他选项 -->
			<view class="otherfun">
				<view class="otherfun-item" @click="modifyPassword">
					<view class="otherfun-item-left">
						<image src="../../static/xiugai.png" class="otherfun-item-icon"></image>
						<text class="otherfun-item-word">修改密码</text>
					</view>
					<image src="../../static/you.png" class="otherfun-item-right"></image>
				</view>
				<view class="otherfun-line"></view>
				<view class="otherfun-item" @click="feedback">
					<view class="otherfun-item-left">
						<image src="../../static/yjfk.png" class="otherfun-item-icon"></image>
						<text class="otherfun-item-word">意见反馈</text>
					</view>
					<image src="../../static/you.png" class="otherfun-item-right"></image>
				</view>
			</view>
			<!-- 退出登录 -->
			<view class="exit" @click="show6">
				退出登录
			</view>
		</view>
		<hFormAlert title="提示" v-if="modal6"  name="modal" placeholder="您确定退出登录吗" @confirm="confirm" @cancel="cancel" confirmColor="#E6CEAC" ></hFormAlert>
	</view>
</template>

<script>
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue'
	export default {
		components: {
			hFormAlert
		},
		data() {
			return {
				isVerify: 0,
				modal6: false,
				uid:"",
				data:{}
			}
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
				url: serverUrl + '/company',
				method: "GET",
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:{
					id: _this.uid
				},
				success: (res) => {
					if(res.data.code==20002){
						var data = res.data.data
						for(let key in data){
							if(!data[key]){
								data[key]='暂无'
							}
						  }
						_this.data = data;
						console.log(_this.data)
					}
					
			
				}
			});
		},
		methods: {
			confirm(e){
				this.hide6()
				uni.reLaunch({
				    url: '../login/login'
				});
			},
			cancel(e){
				this.hide6()
				uni.showToast({
					icon:"none",
					title:"你点击了取消"
				})
			},
			show6() {
				this.modal6 = true
			},
			hide6() {
				this.modal6 = false
			},
			modifyPassword(e){
				uni.navigateTo({
					url:"../modify-paaword/modify-paaword"
				})
			},
			feedback(e){
				uni.navigateTo({
					url:"../feedback/feedback"
				})
			},
			verify(e){
				uni.navigateTo({
					url:"../verify/verify"
				})
			}
		}
	}
</script>

<style>
	.minebase{
		display: flex;
		flex-direction: column;
		/* padding: 30rpx 20rpx; */
		background: rgba(244,244,244,0.3);
		color: #333;
		height: 100vh;
	}
	.topbg{
		width: 100%;
		height: 250rpx;
		background: #E6CEAC;
	}
	.content{
		display: flex;
		flex-direction: column;
		position: absolute;
		padding-bottom: 100rpx;
		/* bottom: 230rpx; */
	}
	.idcard{
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		background: #FFFFFF;
		height: 300rpx;
		margin:30rpx 20rpx;
		/* border: 3rpx solid #CCC; */
		padding: 30rpx 25rpx;
		box-shadow:0 0rpx 20rpx rgba(0,0,0,0.1);
		
	}
	.idcard-one{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}
	.idcard-one-left{
		display: flex;
		flex-direction: row;
	}
	.idcard-one-img{
		/* border-radius: 50%; */
		height: 120rpx;
		width: 120rpx;
		box-shadow:0 0 15rpx rgba(0,0,0,0.1);
	}
	.idcard-one-name{
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
	}
	.idcard-one-name-main{
		margin-top: 30rpx;
		color: #999999;
		font-size: 15px;
	}
	.idcard-one-right-tittle{
		font-size: 13px; 
		margin-right: 5rpx;
		color: #D1BA74;
	}
	.tittle-verify{
		color: #19CAAD;
	}
	.idcard-one-right-icon{
		width: 30rpx;
		height: 30rpx;
		position: relative;
		top: 6rpx;
	}
	.idcard-two{
		display: flex;
		flex-direction: row;
		margin-top: 25rpx;
	}
	.idcard-two-icon{
		height: 50rpx;
		width: 50rpx;
	}
	.idcard-two-word{
		margin-left: 15rpx;
		font-size: 15px;
		align-self: center;
		color: #999999;
	}
	.myimpression{
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		background: #FFFFFF;
		margin:30rpx 20rpx;
		/* border: 3rpx solid #CCC; */
		padding: 30rpx 25rpx;
		box-shadow:0 0rpx 5rpx rgba(0,0,0,0.1);
	}   
	.myimpression-one{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.myimpression-one-title{
		font-weight: bold;
		font-size: 16px;
	}
	.myimpression-one-tips{
		color: #999999;
		font-size: 13px;
		margin-left: 40rpx;
	}
	.myimpression-content{
		margin-top: 25rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.myimpression-content-item{
		padding: 15rpx 25rpx;
		border-radius: 50rpx;
		background: rgba(230,206,172,0.3);
		font-size: 14px;
		color: #D1BA74;
		margin-right: 15rpx;
		margin-top: 25rpx;
		font-weight: bold;
	}
	.otherfun{
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		background: #FFFFFF;
		margin:0 20rpx 30rpx 20rpx;
		padding: 30rpx 25rpx;
		box-shadow:0 0rpx 5rpx rgba(0,0,0,0.1);
	}
	.otherfun-item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.otherfun-item-left{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.otherfun-item-icon{
		height: 50rpx;
		width: 50rpx;
	}
	.otherfun-item-word{
		margin-left: 10rpx;
		color: #999999;
		font-size: 16px;
	}
	.otherfun-item-right{
		height: 40rpx;
		width: 40rpx;
		align-self: center;
	}
	.otherfun-line{
		width: 100%; 
		height: 3rpx; 
		background: #F1F1F1;
		margin: 20rpx 0;
	}
	.exit{
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		height: 90rpx;
		width: 560rpx;
		background: rgba(230,206,172,0.5);
		margin:150rpx 20rpx 30rpx 20rpx;
		box-shadow:0 0rpx 5rpx rgba(0,0,0,0.1);
		align-self: center;
		text-align: center;
		justify-content: center;
		color: #808080;
	}
</style>
