<template>
	<view>
		<view class="base">
			<view class="item">
				<text class="word">登录名</text>
				<input class="input"  placeholder="登录名/学号" v-model="loginName"/>
			</view>
			<view class="item">
				<text  class="word">密 码 </text>
				<input class="input"  placeholder="密码" password="true" v-model="password"/>
			</view>
			<view class="item">
				<text  class="word">确认密码 </text>
				<input class="input"  placeholder="密码" password="true" v-model="password2"/>
			</view>
			<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="register">注 册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginName:"",
				password:"",
				password2:""
			}
		},
		methods: {
			register(){
				if(this.loginName==''){
					uni.showToast({
						icon:"none",
						title:"请输入用户名"
					})
					return
				}
				if(this.password=='' || this.password2==''){
					uni.showToast({
						icon:"none",
						title:"请输入密码"
					})
					return
				}
				if(this.password != this.password2){
					uni.showToast({
						icon:"none",
						title:"两次输入的密码不一样"
					})
					return
				}
				var _this = this
				uni.request({
					url: _this.serverUrl + '/register',
					method: "POST",
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						loginName: _this.loginName,
						password: _this.password,
						type: 2
					},
					success: (res) => {
						if(res.data.code==40006){
							uni.showToast({
								icon:"none",
								title:"该用户已经注册"
							})
							return
						}
						if(res.statusCode==200){
							 uni.showToast({
								icon:"none",
								title:"注册成功"
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
		border-radius: 50rpx;
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
		width: 150rpx;
		color: #94856f;
		font-weight: 700;
	}
</style>
