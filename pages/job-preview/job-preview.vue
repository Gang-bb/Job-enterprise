<template>
	<view class="base">
		<!-- <view class="top">
			<text class="tittle">传单派发员</text>
			<view class="tittle-right" :class="status==1?'ing':'end'">
				{{status==1?"进行中":"已结束"}}
			</view>
		</view> -->
		<text class="tittle">{{jobData.tittle}}</text>
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
			<text class="item-value" v-if="jobData.sex == 1">男</text>
			<text class="item-value" v-if="jobData.sex == 2">女</text>
			<text class="item-value" v-if="jobData.sex == 3">男女不限</text>
		</view>
		<view class="item">
			<text class="item-tittle">工作时间：</text>
			<text class="item-value">{{jobData.startTime}}~{{jobData.endTime}}</text>
		</view>
		<view class="item">
			<text class="item-tittle">工作时段：</text>
			<text class="item-value">8:00~18:00</text>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:"",
				status: 1,
				jobData:{}
			}
		},
		onShow() {
			var _this = this
			uni.getStorage({
				key: 'jobData',
				success: function (res) {
				    console.log(res.data);
					_this.jobData = res.data
				}
			})
		},
		methods: {
			
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
	}
	.ing{
		border: 3rpx solid #19CAAD;
		background: rgba(25,202,173,0.2);
		color: #19CAAD;
	}
	.end{
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
</style>
