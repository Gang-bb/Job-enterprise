<template>
	<view class="base">
		<text class="step">1/5 选择兼职类型</text>
		<text class="tittle">热门类型</text>
		<view class="items">
			<view class="items-item" :class="[item.id==sid?'selected':'']" v-for="(item,index) in hotitems" :key="item.id" @click="itemclick(item.id, item.name)">{{item.name}}</view>
		</view>
		<text class="tittle">更多类型</text>
		<view class="items">
			<view class="items-item" :class="[item.id==sid?'selected':'']" v-for="(item,index) in moreitems" :key="item.id" @click="itemclick(item.id, item.name)">{{item.name}}</view>
		</view>
		<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="next">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sid:"",
				sname:"",
				jobData:{},
				hotitems:[
					{
						id:"0",
						name:"服务员",
						isSelect:false
					},
					{
						id:"1",
						name:"派单",
						isSelect:false
					},
					{
						id:"2",
						name:"安保",
						isSelect:false
					},
					{
						id:"3",
						name:"促销",
						isSelect:false
					},
					{
						id:"4",
						name:"客服",
						isSelect:false
					},
					{
						id:"5",
						name:"快递分拣",
						isSelect:false
					}
				],
				moreitems:[
					{
						id:"6",
						name:"其他",
						isSelect:false
					},
					{
						id:"7",
						name:"校园活动",
						isSelect:false
					},
					{
						id:"8",
						name:"临时工",
						isSelect:false
					},
					{
						id:"9",
						name:"实习",
						isSelect:false
					},
					{
						id:"10",
						name:"调研",
						isSelect:false
					},
					{
						id:"11",
						name:"送餐员",
						isSelect:false
					},
					{
						id:"12",
						name:"导购",
						isSelect:false
					},
					{
						id:"13",
						name:"网络编辑",
						isSelect:false
					},
					{
						id:"14",
						name:"设计",
						isSelect:false
					},
					{
						id:"15",
						name:"文员助理",
						isSelect:false
					},
					{
						id:"16",
						name:"销售",
						isSelect:false
					},
					{
						id:"17",
						name:"礼仪",
						isSelect:false
					},
					{
						id:"18",
						name:"文员助理",
						isSelect:false
					},
					{
						id:"19",
						name:"模特",
						isSelect:false
					}
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			itemclick(index, name){
				// 多选
				// var item = this.jobitems[index];
				// item.isSelect = !item.isSelect;
				// 单选
				if(index==this.sid){
					this.sid = '';
					return
				}
				this.sid = index;
				this.jobData.type = name;
				console.log(name);
			},
			next(e){
				if(this.sid){
					console.log(this.jobData);
					uni.setStorage({
					    key: 'jobData',
					    data: this.jobData,
					    success: function () {　　　　　　　　　
					        // 存储成功后跳转第二步
					        uni.navigateTo({
					             url:"job-release-two"
					        })
					    }
					})  
				}else{
					uni.showToast({
						icon:"none",
						title:"请选择兼职类型"
					})
				}
				
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
	.tittle{
		font-size: 16px;
		font-weight: bold;
		margin-top: 45rpx;
	}
	.items{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 25rpx;
	}
	.items-item{
		width: 31.33%;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 3rpx solid #dadada;
		padding: 10rpx 0rpx;
		margin-top: 16rpx;
		border-radius: 10rpx;
		margin-right: 8rpx;
	}
	.selected{
		background: rgba(230,206,172,0.8);
		border: 3rpx solid #e6ceac;
		color: #FFFFFF;
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
