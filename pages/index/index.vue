<template>
	<view class="indexbase">
		<!-- 待办事项 -->
		<view class="todo">
			<!-- 待办事项标题 -->
			<view class="tittle">
				<image src="../../static/daiban2.png" class="tittle-icon"></image>
				<view class="tittle-word">待办事项</view>
			</view>
			<view class="tittle-line"></view>
			<!-- 待办事项内容 -->
			<view class="todo-content">
				<view class="todo-content-item">
					<view class="todo-content-icon"></view>
					<text class="todo-content-word">有新的同学申请了您的招聘，请尽快审核！</text>
				</view>	
				<view class="todo-content-item">
					<view class="todo-content-icon"></view>
					<text class="todo-content-word">您的新的反馈回复，请及时查看！</text>
				</view>
				<view class="todo-content-item">
					<view class="todo-content-icon"></view>
					<text class="todo-content-word">您的招聘信息有了新进展，请及时查看！</text>
				</view>
				<text class="todo-content-tips">请尽快完成上面任务哦~</text>
			</view>		
		</view>
		<!-- 主要功能 -->
		<view class="funlist">
			<!-- 主要功能标题 -->
			<view class="funlist-tittle">
			<image src="../../static/gn.png" class="tittle-icon"></image>
			<view class="tittle-word">主要功能</view>
			</view>
			<!-- 功能列表 -->
			<view class="funlist-content">
				<view class="funlist-item" v-for="(fun,index) in funlist" :key="fun.word" @click="funclick(index)">
					<view class="funlist-item-iconbg">
						<image  class="funlist-item-icon" :src="fun.img"></image>
					</view>
					<text class="funlist-item-word">{{fun.word}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mydata:{
						id: 32,
						tittle: 2222299911},
				funlist:[
					{
						img:"../../static/yonghu.png",
						word:"人员审核",
						color:"color:#f37b1d",
						background: "background:#FFEBE0"
					},
					{
						img:"../../static/shenqing2.png",
						word:"我的资料",
						color:"color:#19CAAD",
						background: "background:rgba(25,202,173,0.3)"
					},
					{
						img:"../../static/fabu.png",
						word:"发布招聘",
						color:"color:#F4606C",
						background: "background:rgba(244,96,108,0.3)"
					},
					{
						img:"../../static/liebiao2.png",
						word:"我的招聘",
						color:"color:#5E35B1",
						background: "background:rgba(94,53,177,0.3)"
					},
					{
						img:"../../static/yijian.png",
						word:"我的反馈",
						color:"color:#03A9F4",
						background: "background:rgba(3,169,244,0.3)"
					}
				]
			}
		},
		methods: {
			funclick(index){
				if(index==0){
					uni.navigateTo({
						url:"../stu-verify/stu-verify"
					})
				}
				if(index==1){
					uni.navigateTo({
						url:"../myinfo/myinfo"
					})
				}
				if(index==2){
					uni.navigateTo({
						url:"../job-release/job-release"
					})
				}
				if(index==3){
					uni.navigateTo({
						url:"../myjob/myjob"
					})
				}
				if(index==4){
					var _this = this
					var serverUrl = _this.serverUrl;
					uni.request({
						url: serverUrl + '/base',
						method: "DELETE",
						data:{
							data:_this.mydata
							// id: 30,
							// tittle: 98921221898
						},
						success: (res) => {
							console.log(res.data)
						}
					});
				}
				
			}
		}
	}
</script>

<style>
	.indexbase{
		display: flex;
		flex-direction: column;
		padding: 30rpx 20rpx;
		background: rgba(244,244,244,0.3);
		color: #333;
	}
	.todo{
		background: #FFFFFF;
		padding: 15rpx;
		box-shadow:0 0rpx 5rpx rgba(0,0,0,0.1);
	}
	.tittle{
		display: flex;
		flex-direction: row;
		margin-bottom: 15rpx;
	}
	.tittle-icon{
		width: 45rpx;
		height: 45rpx;
	}
	.tittle-word{
		margin-left: 15rpx;
		font-size: 16px;
		font-weight: bold;
	}
	.tittle-line{
		height: 3rpx;
		width: 100%;
		background: #C0C0C0;
	}
	.todo-content{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.todo-content-item{
		margin-top: 20rpx;
		border: 3rpx solid #C0C0C0;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10rpx;
	}
	.todo-content-icon{
		border: 6rpx solid #E6CEAC;
		border-radius: 50%;
		font-weight: bold;
		font-size: 13px;
		padding: 2rpx;
		height: 10rpx;
		width: 10rpx;
	}
	.todo-content-word{
		margin-left: 7rpx;
		font-size: 14px;
	}
	.todo-content-tips{
		margin-top: 30rpx;
		font-size: 12px;
		text-align: center;
		width: 100%;
		color: #E6CEAC;
	}
	.funlist{
		display: flex;
		flex-direction: column;
		padding: 15rpx;
		margin-top: 20rpx;
		box-shadow:0 0rpx 5rpx rgba(0,0,0,0.1);
		background: #FFFFFF;
	}
	.funlist-tittle{
		display: flex;
		flex-direction: row;
		margin-bottom: 15rpx;
		align-self: center;
	}
	.funlist-content{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		
	}
	.funlist-item{
		
		background: #FFFFFF;
		padding: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 35rpx;
		margin-top: 10rpx;
	}
	.funlist-item-iconbg{
		border-radius: 50%;
		height: 100rpx;
		width: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(230,206,172,0.3);
	}
	.funlist-item-icon{
		height: 45rpx;
		width: 45rpx;
	}
	.funlist-item-word{
		font-size: 12px;
		font-weight: bold;
		margin-top: 10rpx;
		color: #333;
	}
</style>
