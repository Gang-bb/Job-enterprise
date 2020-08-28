<template>
	<view class="base">
		<!-- 申请人员信息 -->
		<view class="tittle">申请人员基本信息</view>
		<view class="item">
			<view class="content">
				<!-- 内容左边 -->
				<view class="content-left">
					<view class="group">
						<text class="groupA">申请人：</text>
						<text class="groupB">{{sdata.sname}}</text>
					</view>
					<view class="group">
						<text class="groupA">性别：</text>
						<text class="groupB">{{sdata.sex==1?'男':'女'}}</text>
					</view>
					<view class="group">
						<text class="groupA">手机号：</text>
						<text class="groupB">{{sdata.phoneNumber}}</text>
					</view>
					<view class="group">
						<text class="groupA">申请时间：</text>
						<text class="groupB">{{stime}}</text>
					</view>
				</view>
				<!-- 内容右边 -->
				<view class="content-right">
					<view class="info-detail" @click="stuInfo">查看简历</view>
				</view>
			</view>
		</view>
		<!-- 兼职信息 -->
		<view class="tittle">申请工作基本信息</view>
		<view class="item">
			<view class="content">
				<!-- 内容左边 -->
				<view class="content-left">
					<view class="group">
						<text class="groupA">工作名：</text>
						<text class="groupB">{{jdata.tittle}}</text>
					</view>
					<view class="group">
						<text class="groupA">地点：</text>
						<text class="groupB">{{jdata.detailPlace}}</text>
					</view>
					<view class="group">
						<text class="groupA">发布时间：</text>
						<text class="groupB">{{jdata.creatTime}}</text>
					</view>
				</view>
				<!-- 内容右边 -->
				<view class="content-right">
					<view class="info-detail" @click="jobdetail">详细信息</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="button-group" v-if="status==1">
			<view class="button2" hover-class="buuton-click2" hover-stay-time="100" @click="refuse">拒绝</view>
			<view class="button" hover-class="buuton-click2" hover-stay-time="100" @click="approve">通过</view>
		</view>
		<!-- 是否通过标识 -->
		<view class="logo" v-if="status==2 || status==3">已通过</view>
		<view class="logo2" v-if="status==4">未通过</view>
		<hFormAlert title="提示" v-if="modal6"  name="modal" :placeholder="modalValue" @confirm="confirm" @cancel="cancel" confirmColor="#E6CEAC" ></hFormAlert>
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
				modalValue:"",
				modal6: false,
				uid:"",
				jid:"",
				sdata:{},
				jdata:{},
				stime:"",
				logoInfo:"已通过",
				status:1
			}
		},
		onLoad(options) {
			console.log(options)
			this.uid = options.uid;
			this.jid = options.jid;
			this.stime = options.time;
			this.status = options.status;
			var _this = this
			var serverUrl = _this.serverUrl;
			// 获取学生信息
			uni.request({
				url: serverUrl + '/user/',
				method: "GET",
				data:{
					id: _this.uid
				},
				success: (res) => {
					_this.sdata = res.data.data
					console.log(res.data);
				}
			});
			//获取工作信息
			uni.request({
				url: serverUrl + '/job/',
				method: "GET",
				data:{
					id: _this.jid
				},
				success: (res) => {
					_this.jdata = res.data.data
					console.log(res.data);
				}
			});
		},
		onShow() {
			
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
			hide6() {
				this.modal6 = false
			},
			refuse(e){
				var _this = this
				var serverUrl = _this.serverUrl;
				uni.showModal({
				    title: '提示',
				    content: '您确定要拒绝吗',
					confirmColor:"#E6CEAC",
				    success: function (res) {
				        if (res.confirm) {
				            //拒绝
				            uni.request({
				            	url: serverUrl + '/job/vstu',
				            	method: "POST",
				            	data:{
				            		uid: _this.uid,
									jid: _this.jid,
									status: 4
				            	},
				            	success: (res) => {
									_this.status = 4;
				            		console.log(res.data);
				            	}
				            });
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			approve(e){
				// this.modalValue="您确定通过该学生吗？"
				// this.modal6 = true
				var _this = this
				var serverUrl = _this.serverUrl;
				uni.showModal({
				    title: '提示',
				    content: '您确定要通过吗',
					confirmColor:"#E6CEAC",
				    success: function (res) {
				        if (res.confirm) {
				            //通过
				            uni.request({
				            	url: serverUrl + '/job/vstu',
				            	method: "POST",
				            	data:{
				            		uid: _this.uid,
									jid: _this.jid,
									status: 2
				            	},
				            	success: (res) => {
									_this.status = 2;
				            		console.log(res.data);
				            	}
				            });
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			jobdetail(e){
				var _this = this
				uni.navigateTo({
					url:"../job-detail/job-detail?id=" + _this.jid
				})
			},
			stuInfo(){
				var _this = this
				uni.navigateTo({
					url:"../stu_info/stu_info?uid=" + _this.uid
				})
			}
		}
	}
</script>

<style>
	.base{
		display: flex;
		flex-direction: column;
		background: rgba(244,244,244,0.5);
		color: #333;
		height: 100vh;
	}
	.item{
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding: 10rpx 50rpx 30rpx 20rpx;
	}
	.tittle{
		font-size: 15px;
		font-weight: bold;
		margin: 10rpx;
	}
	.content{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.content-left{
		display: flex;
		flex-direction: column;
	}
	.group{
		display: flex;
		flex-direction: row;
		font-size: 15px;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.groupA{
		color: #999999;
		width: 150rpx;
		text-align: right;
	}
	.content-right{
		align-self: center;
	}
	.info-detail{
		font-size: 12px;
		font-weight: 500;
		border: 2rpx solid #E6CEAC;
		padding: 10rpx 20rpx;
		background: rgba(230,206,172,0.3);
		color: #D1BA74;
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
		width: 340rpx;
		height: 82rpx;
		color: #19CAAD;
	    border-radius: 10rpx;
		font-size: 16px;
		margin-left: 10rpx;
		border: 3rpx solid #19CAAD;
		background: #FFFFFF;
	}
	.button2{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 340rpx;
		height: 82rpx;
		color: #F4606C;
		background: #FFFFFF;
	    border-radius: 10rpx;
		font-size: 16px;
		border: 3rpx solid #F4606C;
	}
	.buuton-click{
		opacity: 0.9;
		background: rgba(190,237,199,0.9);
	}
	.buuton-click2{
		opacity: 0.9;
		background: rgba(244,244,244,0.3);
	}
	.logo{
		display: flex;
		justify-content: center;
		align-items: center;
		border: 3rpx solid #1fffda;
		height: 270rpx;
		width: 270rpx;
		border-radius: 50%;
		font-size: 19px;
		font-weight: 800;
		color: #1fffda;
		align-self: center;
		position: relative;
		bottom: 350rpx;
	}
	.logo2{
		display: flex;
		justify-content: center;
		align-items: center;
		border: 3rpx solid #ff6471;
		height: 270rpx;
		width: 270rpx;
		border-radius: 50%;
		font-size: 19px;
		font-weight: 800;
		color: #ff6471;
		align-self: center;
		position: relative;
		bottom: 350rpx;
	}
</style>
