<template>
	<view class="base">
		<view class="step">4/5 工作时间</view>
		<view class="tiitle-other">
			<text class="tittle">开始日期</text>
			<text class="tiitle-other-value" @click="show(1)">{{start}}</text>
		</view>
		<view class="tiitle-other">
			<text class="tittle">结束日期</text>
			<text class="tiitle-other-value" @click="show(2)">{{end}}</text>
		</view>
		<!-- <view class="tiitle-other">
			<text class="tittle">工作时段</text>
			<text class="tiitle-other-value" @click="onShowDatePicker('rangetime')">{{end}}</text>
		</view> -->
		<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="next">下一步</view>
		<tui-datetime ref="dateTime" :type="type" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor" :color="color"
		 :setDateTime="setDateTime" @confirm="change"></tui-datetime>
		<!-- <mx-date-picker :show="showPicker" :type="1" :value="value" :show-tips="true" :begin-text="'开始'" :end-text="'结束'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" /> -->
	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import tuiDatetime from "@/components/dateTime/dateTime";
	export default {
		components: {
			MxDatePicker,tuiDatetime
		},
		data() {
			return {
				start:"2020-04-23",
				end:"2020-04-23",
				jobData:{},
				
				// 时间选择器
				// showPicker: false,
				// date: '2020/01/01',
				// time: '15:00:12',
				// datetime: '2019/01/01 15:00:12',
				// range: ['2020/04/23','2020/04/23'],
				// rangetime: ['2020/04/23 08:00','2020/04/23 18:00'],
				// type: 'rangetime',
				// value: '',
				
				// tui时间选择器
				cpick: 1,
				type: 2,
				startYear: 2020,
				endYear: 2020,
				cancelColor: "#888",
				color: "#E6CEAC",
				setDateTime: "",
				result: ""
			}
		},
		methods: {
			//tui 时间选择
			change: function(e) {
				console.log(this.cpick)
				if(this.cpick == 1){
					this.start = e.result
				}
				if(this.cpick == 2){
					this.end = e.result
				}
				// this.result = e.result
			},
			show: function(num) {
				this.cpick = num
				this.cancelColor = "#888";
				this.color = "#E6CEAC";
				this.setDateTime = "";
				this.startYear = 2020;
				this.endYear = 2020;
				this.type = 2;
				this.$refs.dateTime.show()
			},
			// 时间选择器
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
				
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value; 
					// this.start = e.value.replace(/\//g,'-');
					//选择的值
					console.log('value => '+ e.value);
					//原始的Date对象
					console.log('date => ' + e.date.toString());
				}
			},
			// 下一步
			next(e){
				var _this = this
				uni.getStorage({
				    key: 'jobData',
				    success: function (res) {
				        console.log(res.data);
						_this.jobData = res.data
						_this.jobData.startTime = _this.start
						_this.jobData.endTime = _this.end
						console.log(_this.jobData);
						uni.setStorage({
						    key: 'jobData',
						    data: _this.jobData,
						    success: function () {　　　　　　　　　
						        // 存储成功后跳转第三步
						        uni.navigateTo({
						        	 url:"job-release-five/job-release-five"
						        })
						    }
						}) 
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
		min-width: 140rpx;
	}
	.tiitle-other{
		display: flex;
		flex-direction: row;
		border-bottom: 3rpx solid #D9D9D9;
		padding: 20rpx 0;
		align-items: center;
		margin-top: 40rpx;
	}
	.tiitle-other-value{
		font-size: 15px;
		color: #D1BA74;
		width: 100%;
		text-align: center;
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
		margin: 150rpx 0;
		align-self: center;
	}
	.buuton-click{
		opacity: 0.9;
		background: rgba(230,206,172,0.9);
	}
</style>