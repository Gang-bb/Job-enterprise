<template>
	<view class="base">
		<view class="item">
			<text class="word">登录名</text>
			<input class="input"  placeholder="登录名" v-model="loginName"/>
		</view>
		<view class="item">
			<text  class="word">密 码 </text>
			<input class="input"  placeholder="密码" password="true" v-model="password"/>
		</view>
		<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="login">登 录</view>
		<view class="register" @click="register">注册账号</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginName:"",
				password:""
			}
		},
		methods: {
			register(){
				uni.navigateTo({
					url:"register"
				})
			},
			login(){
				if(this.loginName==''){
					uni.showToast({
						icon:"none",
						title:"请输入用户名"
					})
					return
				}
				if(this.password==''){
					uni.showToast({
						icon:"none",
						title:"请输入密码"
					})
					return
				}
				var _this = this
				uni.request({
					url: _this.serverUrl + '/login',
					method: "POST",
					data:{
						loginName: _this.loginName,
						password: _this.password
					},
					success: (res) => {
						if(res.data.code==40001){
							uni.showToast({
								icon:"none",
								title:"未找到该用户名"
							})
							return
						}
						if(res.data.code==40005){
							uni.showToast({
								icon:"none",
								title:"密码不正确"
							})
							return
						}
						if(res.statusCode==200){
							uni.setStorage({
							    key: 'uid',
							    data: res.data.uid,
							    success: function () {　　　　　　　　　
							        // 存储成功后跳转第二步
							        uni.switchTab({
							        	url:"../index/index"
							        })
							    }
							})  
						}
						console.log(res.data)
					}
				});
			}
		}
	}
</script>

<style>
	.base{
		display: flex;
		flex-direction: column;
		color: #333;
		padding: 260rpx 60rpx 0rpx 60rpx;
		align-items: center;
	}
	.input{
		border: 3rpx solid #E6CEAC;
		padding: 15rpx 30rpx;
		border-radius: 20rpx;
		height: 50rpx;
		margin-left: 15rpx;
	}
	.button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 460rpx;
		height: 82rpx;
		color: #E6CEAC;
		border: 3rpx solid #E6CEAC;
	    border-radius: 20rpx;
		margin: 50rpx 0;
		align-self: center;
		background: rgba(255,229,191, 0.2);
	}
	.buuton-click{
		opacity: 0.9;
		background: #FAFBFC;
	}
	.item{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20rpx;
	}
	.word{
		font-size: 16px;
		width: 100rpx;
		color: #94856f;
		font-weight: 700;
	}
	.register{
		
		font-size: 14px;
		padding: 10rpx 30rpx;
		background: rgba(255,229,191, 0.2);
		border-radius: 20rpx;
		border: 3rpx solid #E6CEAC;
		color: #E6CEAC;
	}
</style>
