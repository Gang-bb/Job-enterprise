<template>
	<view class="base">
		<view class="step">5/5 联系信息</view>
		<view class="tiitle-other">
			<text class="tittle">负责人</text>
			<input type="text" placeholder="请输入负责人姓名" class="tiitle-other-input" maxlength="10" v-model="withPeople"/>
		</view>
		<view class="tiitle-other">
			<text class="tittle">联系电话</text>
			<input type="text" placeholder="请输入联系电话" class="tiitle-other-input" maxlength="11" v-model="phone"/>
		</view>
		<view class="tiitle-other">
			<text class="tittle">联系邮箱</text>
			<input type="text" placeholder="请输入接收简历的邮箱" class="tiitle-other-input" maxlength="100" v-model="email"/>
		</view>
		<view class="button-group">
			<view class="button2" hover-class="buuton-click2" hover-stay-time="100" @click="preview">预览</view>
			<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="release">发布兼职</view>
		</view>
		<hFormAlert title="提示" v-if="modal6"  name="modal" placeholder="您确定发布该兼职吗" @confirm="confirm" @cancel="cancel" confirmColor="#E6CEAC" ></hFormAlert>
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
				withPeople:"",
				phone:"",
				email:"",
				modal6: false,
				jobData:{},
				uid:""
			}
		},
		methods: {
			// 预览或提交前的校验和保存到缓存
			save(){
				if(this.withPeople == ''){
					uni.showToast({
						icon:"none",
						title:"请输入负责人姓名"
					})
					return false
				}
				if(this.phone == ''){
					uni.showToast({
						icon:"none",
						title:"请输入联系电话"
					})
					return false
				}
				if(this.email == ''){
					uni.showToast({
						icon:"none",
						title:"请输入接收简历的邮箱"
					})
					return false
				}
				var _this = this
				uni.getStorage({
				    key: 'jobData',
				    success: function (res) {
						_this.jobData = res.data
						_this.jobData.withPeople = _this.withPeople
						_this.jobData.phone = _this.phone
						_this.jobData.phone = _this.phone
						_this.jobData.email = _this.email
						uni.setStorage({
						    key: 'jobData',
						    data: _this.jobData,
						    success: function () {　　　　　　　　　
						    }
						}) 
				    }
				});
				return true
			},
			confirm(e){
				this.save()
				this.hide6()
				console.log(this.jobData);
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
					url: serverUrl + '/job/release',
					method: "POST",
					data:{
						id: _this.uid,
						data: _this.jobData
					},
					success: (res) => {
						if(res.statusCode==200){
							// uni.reLaunch({
							// 	url:"../../result/result?msg=发布成功"
							// })
						}else{
							uni.showToast({
								icon:"none",
								title:"发布失败，请联系管理员"
							})
						}
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
			release() {
				if(this.save()){
					this.modal6 = true
				}
			},
			hide6() {
				this.modal6 = false
			},
			preview(e){
				if(this.save()){
					uni.navigateTo({
						url:"../../job-preview/job-preview"
					})
				}
			},
		}
	}
</script>

<style>
	.base{
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		color: #333;
		padding: 60rpx 40rpx;
	}
	.step{
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 40rpx;
	}
	.tittle{
		width: 140rpx;
		font-size: 16px;
		font-weight: bold;
	}
	.tiitle-other{
		display: flex;
		flex-direction: row;
		border-bottom: 3rpx solid #D9D9D9;
		padding: 20rpx 0;
		align-items: center;
	}
	.tiitle-other-input{
		font-size: 15px;
		margin-left: 30rpx;
		width: 80%;
	}
	.button-group{
		margin: 50rpx 0;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 390rpx;
		height: 82rpx;
		color: #ffffff;
		background: #E6CEAC;
	    border-radius: 10rpx;
		font-size: 16px;
		margin-left: 10rpx;
	}
	.button2{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 390rpx;
		height: 82rpx;
		color: #E6CEAC;
		background: #FFFFFF;
	    border-radius: 10rpx;
		font-size: 16px;
		border: 3rpx solid #E6CEAC;
	}
	.buuton-click{
		opacity: 0.9;
		background: rgba(230,206,172,0.9);
	}
	.buuton-click2{
		opacity: 0.9;
		background: rgba(244,244,244,0.3);
	}
</style>
