<template>
	<view class="base">
		<view class="content">
			<view class="item">
				<text class="tittle">旧密码 : </text>
				<input type="text" value="" placeholder="请输入旧密码" password="true" v-model="oldPassword"/>
			</view>
			<view class="line"></view>
			<view class="item">
				<text class="tittle">新密码 : </text>
				<input type="text" value="" placeholder="输入6-16位数字或字母" password="true" v-model="password"/>
			</view>
			<view class="line"></view>
			<view class="item">
				<text class="tittle">再确认 : </text>
				<input type="text" value="" placeholder="请再输入一次新密码" password="true" v-model="password2"/>
			</view>
		</view>
		<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="show6">修 改</view>
		<hFormAlert title="提示" v-if="modal6"  name="cancel_desc" placeholder="您确定修改密码吗" @confirm="confirm" @cancel="cancel" confirmColor="#E6CEAC" ></hFormAlert>		
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
				modal6: false,
				oldPassword:"",
				password:"",
				password2:"",
				uid:""
			}
		},
		methods: {
			confirm(e){
				this.hide6()
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
					url: _this.serverUrl + '/modify',
					method: "POST",
					data:{
						uid: _this.uid,
						password: _this.password,
					},
					success: (res) => {
						if(res.statusCode==200){
							 uni.showToast({
								icon:"none",
								title:"修改成功"
							 })
							 _this.oldPassword = ''
							 _this.password = ''
							 _this.password2 = ''
						}else{
							uni.showToast({
								icon:"none",
								title:"修改失败，请联系管理员"
							})
						}
						console.log(res.data)
					}
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
				if(this.oldPassword==''){
					uni.showToast({
						icon:"none",
						title:"请输入旧密码"
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
				this.modal6 = true
			},
			hide6() {
				this.modal6 = false
			}
		}
	}
</script>

<style>
	.base{
		display: flex;
		flex-direction: column;
		background: rgba(244,244,244,0.6);
		color: #333;
		height: 100vh;
	}
	.content{
		background: #FFFFFF;
		margin-top: 25rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		font-size: 16px;
	}
	.item{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.tittle{
		margin-right: 30rpx;
	}
	.line{
		background: #d9d9d9;
		height: 3rpx;
		width: 100%;
		margin: 25rpx 0;
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
