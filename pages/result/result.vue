<template>
	<view class="base">
		<view class="msg">{{msg}}</view>
		<view class="index" @click="index">回到首页</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				msg:""
			}
		},
		onLoad(options) {
			this.msg = options.msg
		},
		methods: {
			index(){
				uni.switchTab({
					url:"../index/index"
				})
			}
		}
	}
</script>

<style>
	.base{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #333333;
	}
	.msg{
		color: #19cfb1;
		font-size: 28px;
		margin-top: 200rpx;
		font-weight: bold;
	}
	.index{
		border: 3rpx solid #E6CEAC;
		border-radius: 20rpx;
		color: #E6CEAC;
		font-size: 18px;
		margin-top: 200rpx;
		padding: 10rpx 80rpx;
		font-weight: 500;
	}
</style>
