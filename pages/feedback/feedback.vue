<template>
	<view class="feedbackbase">
	  <!-- 头部email -->
	  <view class="email">
	    <text class="email-tittle">你的邮箱：</text>
	    <input placeholder="请输入你的邮箱" class="email-input"></input>
	  </view>
	  <!-- 反馈内容框 -->
	  <view class="content">
	    <view class="type">
	      <text class="email-tittle">反馈类型：</text>
	      <text class="choosetype">功能建议</text>
	      <image src="../../static/xiangxia.png" class="xiangxia"></image>
	    </view>
		<!-- 文本域 -->
		<view class="textarea">
		    <textarea  class="textarea-data" placeholder=' 请输入你的反馈信息' 
		    :minlength="min" :maxlength="max" @input="inputs" v-model="currentWordNumber">
		    </textarea>
		    <view class="currentWordNumber">{{currentWordNumber.length}}/500</view>
		</view>
	  </view>
	  <!-- <view class="line"></view> -->
	  <!-- 按钮 -->
	  <view class="button" hover-class="buuton-click" hover-stay-time="100" @click="show6">提 交</view>
	  <hFormAlert title="提示" v-if="modal6"  name="cancel_desc" placeholder="您确定提交意见吗" @confirm="confirm" @cancel="cancel" confirmColor="#E6CEAC" ></hFormAlert>
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
				min: 0,
				max: 500,
				currentWordNumber:"",
				modal6: false,
			}
		},
		methods: {
			confirm(e){
				this.hide6()
				uni.showToast({
					icon:"none",
					title:"你点击了确定"
				})
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
		  inputs(e) {
			console.log(e)  
			this.currentWordNumber = e.detail.value.length;
		    },
		  modify(e){
			uni.showToast({
				icon:"none",
				title:"点击提交"
			})
		  }
	}
	}
</script>

<style>
	.feedbackbase{
	    display: flex;
		flex-direction: column;
		background: rgba(244,244,244,0.6);
		color: #333;
	    height: 100vh;
	}
	.email{
	  background: #ffffff;
	  padding: 20rpx 30rpx;
	  display: flex;
	  flex-direction: row;
	  font-size: 15px;
	}
	.email-input{
	  padding-left: 40rpx;
	  align-self: center;
	  font-size: 15px;
	}
	.content{
	  margin-top: 25rpx;
	  background: #ffffff;
	  padding: 20rpx 30rpx 10rpx 30rpx;
	  font-size: 15px;
	}
	.type{
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	}
	.choosetype{
	  padding-left: 40rpx;
	  font-size: 15px;
	  color: #E6CEAC;
	}
	.xiangxia{
	  height: 30rpx;
	  width: 30rpx;
	  margin-left: 340rpx;
	}
	.line{
	  /* background: gainsboro;
	  height: 3rpx;
	  width: 100%;
	  margin-left: 30rpx;
	  margin-right: 30rpx; */
	}
	.textarea-data{
	  background: #ffffff;
	  height: 300rpx;
	  width: 100%;
	  margin-top: 20rpx;
	}
	.currentWordNumber {
	  font-size: 15px;
	  display: flex;
	  flex-direction: row-reverse;
	  color: #888;
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
