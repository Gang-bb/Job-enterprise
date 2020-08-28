<template>
	<view class="base">
		<text class="step">3/5 工资福利</text>
		<text class="tittle">工资单位</text>
		<view class="items">
			<view class="items-item" :class="[unit.id==sunit?'selected':'']" v-for="(unit,index) in units" :key="unit.id" @click="itemclick(unit.id)">{{unit.name}}</view>
		</view>
		<view class="tiitle-other2">
			<view class="tiitle-other-left">
				<text class="tittle2">基本工资</text>
				<input type="text" placeholder="请输入工资数额" class="tiitle-other-input" @input="getMoney" maxlength="10" v-model="money"/>
			</view>
			<text class="tittle2">元</text>
		</view>
		<text class="tittle">结算周期</text>
		<view class="items">
			<view class="items-item2" :class="[period.id==speriod?'selected':'']" v-for="(period,index) in periods" :key="period.id" @click="periodClick(period.id, period.name)">{{period.name}}</view>
		</view>
		<text class="tittle">工作福利</text>
		<view class="items">
			<view class="items-item3" :class="[welfare.isSelect?'selected':'']" v-for="(welfare,index) in welfares" :key="welfare.id" @click="welfareClick(index, welfare.name)">{{welfare.name}}</view>
		</view>
		<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="next">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swelfare:{
					isBagEating: 2,
					encase: 2,
					isTrafficSubsidy: 2,
					royalty: 2,
					idFreeEdu: 2,
				},
				speriod:"",
				speriodName:"",
				money:"",
				sunit:"",
				jobData:{},				
				welfares:[
					{
						id:"0",
						name:"包吃",
						isSelect:false
					},
					{
						id:"1",
						name:"包住",
						isSelect:false
					},
					{
						id:"2",
						name:"交通补贴",
						isSelect:false
					},
					{
						id:"3",
						name:"有提成",
						isSelect:false
					},
					{
						id:"4",
						name:"免费培训",
						isSelect:false
					}
				],
				units:[
					{
						id:"0",
						name:"天",
						isSelect:false
					},
					{
						id:"1",
						name:"小时",
						isSelect:false
					},
					{
						id:"2",
						name:"月",
						isSelect:false
					},
					{
						id:"3",
						name:"次",
						isSelect:false
					},
					{
						id:"4",
						name:"单",
						isSelect:false
					}
				],
				periods:[
					{
						id:"3",
						name:"完工结",
						isSelect:false
					},
					{
						id:"1",
						name:"日结",
						isSelect:false
					},
					{
						id:"2",
						name:"周结",
						isSelect:false
					},
					// {
					// 	id:"3",
					// 	name:"月结",
					// 	isSelect:false
					// }
				],
			}
		},
		methods: {
			next(e){
				if(this.sunit == ''){
					uni.showToast({
						icon:"none",
						title:"请选择工资单位"
					})
					return
				}
				if(this.money == ''){
					uni.showToast({
						icon:"none",
						title:"请选择基本工资"
					})
					return
				}
				if(this.speriod == ''){
					uni.showToast({
						icon:"none",
						title:"请选择结算周期"
					})
					return
				}
				var _this = this
				uni.getStorage({
				    key: 'jobData',
				    success: function (res) {
				        console.log(res.data);
						_this.jobData = res.data
						_this.jobData.reward = _this.money + '元/' + _this.speriodName
						_this.jobData.settlement = parseInt(_this.speriod)
						_this.jobData.swelfare = _this.swelfare
						console.log(_this.jobData);
						uni.setStorage({
						    key: 'jobData',
						    data: _this.jobData,
						    success: function () {　　　　　　　　　
						        // 存储成功后跳转第三步
						        uni.navigateTo({
						        	 url:"job-release-four"
						        })
						    }
						}) 
				    }
				});
				
			},
			getMoney(e){
				this.money = e.detail.value;
			},
			welfareClick(index, name){
				this.welfares[index].isSelect = !this.welfares[index].isSelect
				//选中赋值
				if(this.welfares[index].isSelect){
					if(index==0){
						this.swelfare.isBagEating = 1
					}
					if(index==1){
						this.swelfare.encase = 1
					}
					if(index==2){
						this.swelfare.isTrafficSubsidy = 1
					}
					if(index==3){
						this.swelfare.royalty = 1
					}
					if(index==4){
						this.swelfare.idFreeEdu = 1
					}
				}
				//取消选中赋值
				if(!this.welfares[index].isSelect){
					if(index==0){
						this.swelfare.isBagEating = 2
					}
					if(index==1){
						this.swelfare.encase = 2
					}
					if(index==2){
						this.swelfare.isTrafficSubsidy = 2
					}
					if(index==3){
						this.swelfare.royalty = 2
					}
					if(index==4){
						this.swelfare.idFreeEdu = 2
					}
				}
				// console.log(this.swelfare);
			},
			periodClick(index, name){
				if(index==this.speriod){
					this.speriod = '';
					return
				}
				this.speriod = index;
				this.speriodName = name;
			},
			itemclick(index){
				// 多选
				// var item = this.jobitems[index];
				// item.isSelect = !item.isSelect;
				// 单选
				if(index==this.sunit){
					this.sunit = '';
					return
				}
				this.sunit = index;
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
	}
	.tittle{
		font-size: 16px;
		font-weight: bold;
		margin-top: 45rpx;
	}
	.tittle2{
		font-size: 16px;
		font-weight: bold;
	}
	.items{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 25rpx;
	}
	.items-item{
		width: 18%;
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
	.items-item2{
		width: 23%;
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
	.items-item3{
		width: 31%;
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
	.tiitle-other2{
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #D9D9D9;
		padding: 20rpx 0;
		align-items: center;
		justify-content: space-between;
		margin-top: 35rpx;
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
