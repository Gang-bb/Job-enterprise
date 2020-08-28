<template>
	<view class="base">
		<view class="step">2/5 完善基本信息</view>
		<view class="tiitle-count">
			<text class="tittle">兼职标题</text>
			<text class="count">{{tittleCount}}/20</text>
		</view>
		<input type="text" :value="tittle" placeholder="请输入兼职标题" class="tiitle-count-input" @input="getTittleCount" maxlength="20"/>
		<view class="tiitle-count">
			<text class="tittle">职位描述</text>
			<text class="count">{{jobInfo}}/500</text>
		</view>
		<textarea  class="textarea" placeholder=' 请输入职位的工作内容/岗位要求等,20-500字'
		:minlength="20" :maxlength="500" @input="getJobInfo" :value="content">
		</textarea>
		<view class="tiitle-other2">
			<text class="tittle">招聘人数</text>
			<tui-numberbox :value="people" @change="change" :iconSize="20"></tui-numberbox>
			<!-- <input type="text" :value="people" placeholder="请输入招聘人数" class="tiitle-other-input" @input="getPeople" maxlength="20"/> -->
		</view>
		<view class="tiitle-other2">
			<text class="tittle">性别要求</text>
			<view class="tiitle-other-left">
				<text class="tiitle-other-value" v-if="sex==1"  @click="show4">男</text>
				<text class="tiitle-other-value" v-if="sex==2"  @click="show4">女</text>
				<text class="tiitle-other-value" v-if="sex==3"  @click="show4">男女不限</text>
				<image src="../../static/you.png" class="img"  @click="show4"></image>
				
			</view>
			
		</view>
		<!-- <view class="tiitle-other2">
			<view class="tiitle-other-left">
				<text class="tittle">工作地点</text>
				<text class="tiitle-other-value">{{place}}</text>
			</view>
			<image src="../../static/you.png" class="img"></image>
		</view> -->
		<view class="tiitle-other">
			<text class="tittle">详细地址</text>
			<input type="text" :value="placeDetail" placeholder="请输入详细地址" class="tiitle-other-input" @input="getPlaceDetail" maxlength="20"/>
		</view>
		<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="next">下一步</view>
		<tui-modal :show="modal4" @click="handleClick4" @cancel="hide4" content="请选择性别要求" :button="button4" :maskClosable="false"></tui-modal>
	</view>
	
</template>

<script>
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import tuiModal from "@/components/modal/modal"
	export default {
		components:{
			tuiNumberbox,tuiModal
		},
		data() {
			return {
				button4: [{
					text: "男",
					type: 'gray',
					plain: true
				}, {
					text: "女",
					type: 'gray',
					plain: true
				}, {
					text: "男女不限",
					type: 'gray',
					plain: true
				}],
				modal4: false,
				tittleCount:"0",
				jobInfo:"0",
				sex: 3,
				place:"西乡塘",
				tittle:"",
				content:"",
				placeDetail:"",
				people: 1,
				jobData:{},
				type:""
			}
		},
		methods: {
			show4() {
				this.modal4 = true
			},
			hide4() {
				this.modal4 = false
			},
			// 选择性别
			handleClick4(e) {
				let index = e.index + 1;
				this.sex = index
				uni.showToast({
					icon:"none",
					title:"你点击的按钮index：" + index
				})
				this.hide4()
			},
			getPlaceDetail(e){
				this.placeDetail = e.detail.value;
			},
			// 选择招聘人数
			change: function(e) {
				this.people = e.value
			},
			getTittleCount(e){
				this.tittleCount = e.detail.value.length;
				this.tittle = e.detail.value;
			},
			getJobInfo(e){
				this.jobInfo = e.detail.value.length;
				this.content = e.detail.value;
			},
			next(e){
				if(this.tittle==""){
					uni.showToast({
						icon:"none",
						title:"请输入兼职标题"
					})
					return
				}
				if(this.content==""){
					uni.showToast({
						icon:"none",
						title:"请输入职位描述"
					})
					return
				}
				if(this.jobInfo<20){
					uni.showToast({
						icon:"none",
						title:"职位描述需填写20~500字"
					})
					return
				}
				if(this.people==""){
					uni.showToast({
						icon:"none",
						title:"请输入招聘人数"
					})
					return
				}
				if(this.placeDetail==""){
					uni.showToast({
						icon:"none",
						title:"请输入南宁市内详细地址"
					})
					return
				}
				if(this.place=="请选择"){
					uni.showToast({
						icon:"none",
						title:"请选择工作地点"
					})
					return
				}
				var _this = this
				uni.getStorage({
				    key: 'jobData',
				    success: function (res) {
				        console.log(res.data);
						_this.jobData = res.data
						_this.jobData.sex = _this.sex
						_this.jobData.tittle = _this.tittle
						_this.jobData.content = _this.content
						_this.jobData.recruitNum = parseInt(_this.people)
						_this.jobData.detailPlace = _this.placeDetail
						_this.jobData.place = _this.place
						console.log(_this.jobData);
						uni.setStorage({
						    key: 'jobData',
						    data: _this.jobData,
						    success: function () {　　　　　　　　　
						        // 存储成功后跳转第三步
						        uni.navigateTo({
						             url:"./job-release-three"
						        })
						    }
						})  
				    }
				});
				// console.log(this.jobData);		
				
			}
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
	}
	.tiitle-count{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 45rpx;
	}
	.tittle{
		font-size: 16px;
		font-weight: bold;
	}
	.count{
		font-size: 13px;
		color: #999999;
	}
	.tiitle-count-input{
		font-size: 15px;
		margin: 20rpx 0;
		padding: 5rpx 0 10rpx 0;
		border-bottom: 3rpx solid #D9D9D9;
	}
	.textarea{
	  background: #ffffff;
	  height: 300rpx;
	  width: 100%;
	  margin-top: 20rpx;
	  border: 3rpx solid #D9D9D9;
	  margin-bottom: 35rpx;
	  word-break:break-all;
	}
	.tiitle-other{
		display: flex;
		flex-direction: row;
		border-bottom: 3rpx solid #D9D9D9;
		padding: 20rpx 0;
		align-items: center;
	}
	.tiitle-other2{
		display: flex;
		flex-direction: row;
		border-bottom: 3rpx solid #D9D9D9;
		padding: 20rpx 0;
		align-items: center;
		justify-content: space-between;
	}
	.tiitle-other-left{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.tiitle-other-input{
		font-size: 15px;
		margin-left: 30rpx;
	}
	.tiitle-other-value{
		font-size: 15px;
		margin-right: 10rpx;
		color: #6f6f6f;
	}
	.img{
		height: 35rpx;
		width: 35rpx;
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
