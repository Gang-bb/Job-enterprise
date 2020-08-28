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
					<text class="todo-content-word">有新的公司提交了申请，请尽快审核！</text>
				</view>	
				<view class="todo-content-item">
					<view class="todo-content-icon"></view>
					<text class="todo-content-word">有未读的反馈建议，请及时回复！</text>
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
				<view class="funlist-item" v-for="(fun, aIndex) in funlist">
					<view class="funlist-item-iconbg" :style="fun.background">
						<image  class="funlist-item-icon" :src="fun.img"></image>
					</view>
					<text class="funlist-item-word" :style="fun.color">{{fun.word}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				funlist:[
					{
						img:"../../static/yonghu.png",
						word:"用户管理",
						color:"color:#f37b1d",
						background: "background:#FFEBE0"
					},
					{
						img:"../../static/shenhe.png",
						word:"资料管理",
						color:"color:#19CAAD",
						background: "background:rgba(25,202,173,0.3)"
					},
					{
						img:"../../static/zpsh.png",
						word:"招聘管理",
						color:"color:#F4606C",
						background: "background:rgba(244,96,108,0.3)"
					},
					{
						img:"../../static/tubiao.png",
						word:"图表分析",
						color:"color:#5E35B1",
						background: "background:rgba(94,53,177,0.3)"
					},
					{
						img:"../../static/yijian.png",
						word:"查看反馈",
						color:"color:#03A9F4",
						background: "background:rgba(3,169,244,0.3)"
					},
					{
						img:"../../static/quanxian.png",
						word:"权限管理",
						color:"color:#d9a7c7",
						background: "background:rgba(217,167,199,0.3)"
					},
					{
						img:"../../static/hezuo.png",
						word:"合作管理",
						color:"color:#795548",
						background: "background:rgba(121,85,72,0.3)"
					}
				]
			}
		},
		methods: {
			
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
		height: 100vh;
	}
	.todo{
		background: #FFFFFF;
		padding: 15rpx;
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
		border: 6rpx solid #f37b1d;
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
		margin-right: 5rpx;
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
	}
	.funlist-item-icon{
		height: 45rpx;
		width: 45rpx;
	}
	.funlist-item-word{
		font-size: 12px;
		font-weight: bold;
		margin-top: 10rpx;
	}
</style>
