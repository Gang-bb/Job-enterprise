<template>
	<view class="base">
		<view class="top">
			<text class="tittle">{{jobData.tittle}}</text>
			<view class="tittle-right" v-if="jobData.status==1">待审核</view>
			<view class="tittle-right2" v-if="jobData.status==2">进行中</view>
			<view class="tittle-right3" v-if="jobData.status==3">已结束</view>
		</view>
		<view class="place">
			<image src="../../static/dw.png" class="dw"></image>
			<text class="place-word">{{jobData.place}}</text>
		</view>
		<view class="line"></view>
		<view class="item">
			<text class="item-tittle">兼职类型：</text>
			<text class="item-value">{{jobData.type}}</text>
		</view>
		<view class="item">
			<text class="item-tittle">招聘人数：</text>
			<text class="item-value">{{jobData.recruitNum}}人</text>
		</view>
		<view class="item">
			<text class="item-tittle">工资待遇：</text>
			<text class="item-value">{{jobData.reward}}</text>
		</view>
		<view class="item">
			<text class="item-tittle">性别要求：</text>
			<text class="item-value" v-if="jobData.sex==1">男</text>
			<text class="item-value" v-if="jobData.sex==2">女</text>
			<text class="item-value" v-if="jobData.sex==3">男女不限</text>
		</view>
		<view class="item">
			<text class="item-tittle">工作时间：</text>
			<text class="item-value">{{jobData.startTime}}~{{jobData.endTime}}</text>
		</view>
		<view class="item">
			<text class="item-tittle">工作时段：</text>
			<text class="item-value">08:00-18:00</text>
		</view>
		<view class="item">
			<text class="item-tittle">详细地址：</text>
			<text class="item-value">{{jobData.detailPlace}}</text>
		</view>
		<!-- 工作内容 -->
		<view class="job-content">
			<view class="job-content-icon"></view>
			<text class="job-content-tittle">工作内容：</text>
		</view>
		<text class="job-content-value" space="nbsp" decode="true">{{jobData.content}}</text>
		<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="daogang" v-if="jobData.status==2">人员到岗登记</view>
		<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="show6" v-if="jobData.status==2">结束工作</view>
		<hFormAlert title="提示" v-if="modal6"  name="modal" placeholder="您确定结束该工作吗" @confirm="confirm" @cancel="cancel" confirmColor="#E6CEAC" ></hFormAlert>
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
				content:"",
				status: 2,
				modal6: false,
				jobData:{}
			}
		},
		onLoad(options) {
			var _this = this
			var serverUrl = _this.serverUrl;
			uni.request({
				url: serverUrl + '/job/',
				method: "GET",
				data:{
					id: options.id
				},
				success: (res) => {
					_this.jobData = res.data.data
					console.log(res.data.data);
				}
			});
		},
		methods: {
			daogang(){
				var _this = this
				var serverUrl = _this.serverUrl;
				uni.showModal({
				    title: '提示',
				    content: '您确定要登记吗',
					confirmColor:"#E6CEAC",
				    success: function (res) {
				        if (res.confirm) {
				            //拒绝
				            uni.request({
				            	url: serverUrl + '/job/end',
				            	method: "POST",
				            	data:{
				            		id: _this.jobData.id,
									type: 1
				            	},
				            	success: (res) => {
									if(res.statusCode==404){
										uni.showToast({
											icon:"none",
											title:"还没有学生报名哦"
										})
									}
									if(res.data.code==111){
										uni.showToast({
											icon:"none",
											title:"您已经登记过了哦~"
										})
									}
									if(res.data.code==120){
										uni.showToast({
											icon:"none",
											title:"登记成功~"
										})
									}
				            	}
				            });
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			confirm(e){
				this.hide6()
				var _this = this
				var serverUrl = _this.serverUrl;
				uni.request({
					url: serverUrl + '/job/end',
					method: "POST",
					data:{
						id: _this.jobData.id
					},
					success: (res) => {
						_this.jobData.status = 3
						console.log(res.data);
					}
				});
			},
			cancel(e){
				this.hide6()
				
			},
			show6() {
				this.modal6 = true
			},
			hide6() {
				this.modal6 = false
			},
			close(e){
				uni.showToast({
					icon:"none",
					title:"点击提前结束"
				})
			}
		}
	}
</script>

<style>
	.base{
		color: #333333;
		background: #FFFFFF;
		padding: 30rpx 25rpx;
		display: flex;
		flex-direction: column;
	}
	.top{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.tittle{
		color: #DAA520;
		font-size: 17px;
	}
	.tittle-right{
		font-size: 14px;
		padding: 5rpx 15rpx;
		position: relative;
		top: 20rpx;
		border: 3rpx solid #c3c2a7;
		background: rgba(195,194,167,0.2);
		color: #c3c2a7;
	}
	.tittle-right2{
		font-size: 14px;
		padding: 5rpx 15rpx;
		position: relative;
		top: 20rpx;
		border: 3rpx solid #19CAAD;
		background: rgba(25,202,173,0.2);
		color: #19CAAD;
	}
	.tittle-right3{
		font-size: 14px;
		padding: 5rpx 15rpx;
		position: relative;
		top: 20rpx;
		border: 3rpx solid #F4606C;
		background: rgba(244,96,108,0.2);
		color: #F4606C;
	}
	.place{
		display: flex;
		flex-direction: row;
		margin-top: 25rpx;
		align-items: center;
	}
	.dw{
		height: 25rpx;
		width: 25rpx;
	}
	.place-word{
		margin-left: 10rpx;
		color: #999999;
		font-size: 12px;
	}
	.line{
		height: 3rpx;
		width: 100%;
		background: #D9D9D9;
		margin: 15rpx 0 0 0;
	}
	.item{
		margin-top: 15rpx;
		font-size: 15px;
	}
	.item-tittle{
		color: #999999;
	}
	.item-value{
		margin-left: 8rpx;
		text-align: justify;
		word-break: break-all;
	}
	.job-content{
		display: flex;
		flex-direction: row;
		margin-top: 25rpx;
		/* border: 3rpx solid #D9D9D9; */
	}
	.job-content-icon{
		width: 15rpx;
		height: 15rpx;
		border-radius: 50%;
		background: #DAA520;
		align-self: center;
	}
	.job-content-tittle{
		color: #999999;
		font-size: 16px;
		margin-left: 8rpx;
	}
	.job-content-value{
		font-size: 14px;
		text-align: justify;
		word-break: break-all;
		margin-top: 15rpx;
	}
	.button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 580rpx;
		height: 82rpx;
		color: #ffffff;
		background: #E6CEAC;
	    border-radius: 10rpx;
		margin: 50rpx 0;
		align-self: center;
	}
	.buuton-click{
		opacity: 0.9;
		background: rgba(230,206,172,0.9);
	}
</style>
