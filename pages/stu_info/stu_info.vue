<template>
	<!--pages/pre-info/pre-info.wxml-->
	<view class="base">
	  <!-- 顶部 -->
	  <view class="top-container">
	    <image src="../../static/weixin.png" class="top-img"></image>
	    <text class="top-name">{{baseinfo.sname}}</text>
	  </view>
	  <!-- 顶部end-->
	  <!-- 基本信息 -->
	  <view class="baseinfo">
	    <view class="baseinfo-item">
	      <text>年龄：</text>
	      <text style="color:#999999">23</text>
	    </view>
	    <view class="baseinfo-item">
	      <text>身高：</text>
	      <text style="color:#999999">{{baseinfo.height}}cm</text>
	    </view>
	    <view class="baseinfo-item">
	      <text>性别：</text>
	      <!-- <text style="color:#999999">男</text> -->
	      <text style="color:#999999" v-if="baseinfo.sex==1">男</text>
	      <text style="color:#999999" v-if="baseinfo.sex==2">女</text>
	    </view>
	    <view class="baseinfo-item">
	      <text>教育情况：</text>
	      <text style="color:#999999" v-if="baseinfo.eduStatus==1">在读</text>
	      <text style="color:#999999" v-if="baseinfo.eduStatus==2">已毕业</text>
	    </view>
	    <view class="baseinfo-item">
	      <text>所在城市：</text>
	      <text style="color:#999999">{{baseinfo.place}}</text>
	    </view>
	    <view class="baseinfo-item">
	      <text>联系电话：</text>
	      <text style="color:#999999">{{baseinfo.phoneNumber}}</text>
	    </view>
	    <view class="baseinfo-item">
	      <text>联系邮箱：</text>
	      <text style="color:#999999">{{baseinfo.email}}</text>
	    </view>
	    <view class="baseinfo-item">
	      <text>QQ：</text>
	      <text style="color:#999999">{{(baseinfo.qqNum=="")?"暂无":baseinfo.qqNum}}</text>
	    </view>
	  </view>
	  <!-- 基本信息 end-->
	  <!-- 简历各项信息  -->
	  <view class="otherInfo" v-for="(otherInfo,oIdx) in otherInfoList" :key="oIdx">
	    <!-- 单独一项信息 -->
	    <view :class="otherInfo-otherInfo.oClass">
	        <!-- 填写了该项信息 教育经历 工作经历 模块-->
	        <block v-if="otherInfo.oClass=='item'">
	        <!-- 第一行 该项标题-->
	        <view class="otherInfo-item-first">
	              <view class="otherInfo-item-first-left">
	                  <view class="otherInfo-item-first-left-icon"></view>
	                  <text class="otherInfo-item-first-left-word">{{otherInfo.itemTittle}}</text>
	              </view>
	        </view>
	        <!-- 第二行 分割线-->
	        <view class="otherInfo-item-secord"></view>
	        <!-- 教育经历 工作经历 模块 第三行 主要经历信息-->
	        <view class="otherInfo-item-third" v-for="(experience,eIdx) in otherInfo.experienceList" :key="eIdx" v-if="oIdx <= 1">
	          <view class="otherInfo-item-third-left">
	            <!-- 第三行 主要经历信息 左边 组合icon -->
	            <view class="otherInfo-item-third-splicedicon">
	              <view class="otherInfo-item-third-splicedicon-spot"></view>
	              <view class="otherInfo-item-third-splicedicon-line"></view>
	            </view>
	            <!-- 第三行 主要经历信息 左边 文字信息 -->
	            <view class="otherInfo-item-third-message">
	              <!-- 第三行 ...文字信息的 第一行(时间)-->
	              <view class="otherInfo-item-third-message-first">{{experience.startTime}} 至 {{experience.endTime}}</view>
	              <!-- 第三行 ...文字信息的 第二行(学校|学位 or 公司名)-->
	              <view class="otherInfo-item-third-message-secord" v-if="oIdx == 0">{{experience.school}} | {{experience.degree}}</view>
	              <view class="otherInfo-item-third-message-secord" v-if="oIdx == 1">公司名：{{experience.company}}</view>
	              <!-- 第三行 ...文字信息的 第三行(主修专业 or 主要工作内容)-->
	              <view class="otherInfo-item-third-message-third" v-if="oIdx == 0">主修专业：{{experience.major}}</view>
	              <view class="otherInfo-item-third-message-third" v-if="oIdx == 1">主要工作内容：{{experience.experience}}</view>
	              <!-- 第三行 ...文字信息的 第四行(在校经历)-->
	              <text class="otherInfo-item-third-message-fourth" v-if="oIdx == 0">期间经历：{{experience.experience}}</text>
	            </view>
	          </view>         
	        </view>
	        <!-- 工作期望 模块 第三行 期望内容-->
	        <view v-if="oIdx == 2" class="work-expect" v-for="(item,index) in otherInfo.experienceList" :key="index">
	          <text class="work-expect-item">期望的工作类型：{{item.expectedJobType}}</text>
	          <text class="work-expect-item">期望的工作时间：{{item.shortJobTime}}</text>
	          <text class="work-expect-item">可上班时间：{{item.ableWorkDay}}</text>
	          <text v-if="item.isFullTime==1" class="work-expect-item">是否支持全职上班：是</text>
	          <text v-if="item.isFullTime==0" class="work-expect-item">是否支持全职上班：否</text>
	        </view>
	        <!-- 自我评价 模块 第三行 评价内容-->
	        <text class="self-item" v-if="oIdx == 3">{{otherInfo.experienceList}}</text>
	        </block>   
	    </view>
	  </view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				uid:"",
				// 基础信息
				    baseinfo:{
				      name: "梁艺翔",
				      sex: 1,
				      place: "暂无",
				      birthday: "暂无",
				      height: "暂无",
				      eduStatus: 1,
				      phoneNumber: "暂无",
				      email: "暂无",
				      qqNum: "暂无",
				    },
				    otherInfoList: [
				      {
				        oClass: 'item',
				        itemTittle: '教育经历',
				        experienceList: [
				          {
				            startTime: '2012-09',
				            endTime: '2016-06',
				            shcool: '北京大学 |',
				            degree: ' 本科',
				            thirdTittle: '主修专业：',
				            project: '软件工程',
				            fourthTittle: '在校经历：',
				            schoolsExperience: '暂无'
				          },
				          {
				            startTime: '2016-09',
				            endTime: '2019-06',
				            shcool: '清华大学 |',
				            degree: ' 硕士',
				            thirdTittle: '主修专业：',
				            project: '软件工程',
				            fourthTittle: '在校经历：',
				            schoolsExperience: '我在学校表现良好，绩点全班排名前三好唔好前端其后期的以定期维护轻微电话轻微电话青海湖去耦合器好多钱情况文化的切换我的前后端我确定好群殴我等会群殴我好多去哦好的去哦好的群殴电话启动启动群殴电话群殴我好多气得我轻微电话群殴电话去'
				          }
				        ]
				      },
				      {
				        oClass: 'item',
				        itemTittle: '工作经历',
				        experienceList: [
				          {
				            startTime: '2012-09',
				            endTime: '2016-06',
				            company: '字节跳动',
				            thirdTittle: '主要工作内容：',
				            content: '打杂'
				          }
				        ]
				      },
				      {
				        oClass: 'item',
				        itemTittle: '工作期望',
				      },
				      {
				        oClass: 'item',
				        itemTittle: '自我评价',
				      }
				    ]
			}
		},
		onLoad(options) {
			console.log(options)
			this.uid = options.uid
			var _this = this 
			var serverUrl = _this.serverUrl;
			// 获取主要信息
			uni.request({
				url: serverUrl + '/user/',
				method: "GET",
				data:{
					"id": _this.uid
				},
				success: (res) => {
					console.log(res.data)
					var data = _this.baseinfo
					if (res.data.data) {
					  _this.baseinfo = res.data.data
					} else {
					   _this.baseinfo = data
					}
				}
			});
			// 获取其他简历信息
			uni.request({
				url: serverUrl + '/resume/others',
				method: "GET",
				data:{
					"id": _this.uid
				},
				success: (res) => {
					_this.otherInfoList = res.data
				}
			});
		},
		methods: {
			
		}
	}
</script>

<style>
	.base{
	  display: flex;
	  flex-direction: column;
	  color: #333;
	  font-size: 14px;
	  padding-bottom: 60rpx;
	}
	.top-container{
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  height: 280rpx;
	  background: #E6CEAC;
	  
	}
	.top-img{
	  height: 120rpx;
	  width: 120rpx;
	  border-radius: 50%;
	}
	.top-name{
	  font-size: 17px;
	  margin-top: 15rpx;
	  color: #ffffff;
	  font-weight: 500;
	}
	.baseinfo{
	  display: flex;
	  flex-direction: column;
	  margin-top: 22rpx;
	  padding: 20rpx 25rpx;
	  border-top: 3rpx solid gainsboro;
	  border-bottom: 3rpx solid gainsboro;
	}
	.baseinfo-item{
	  display: flex;
	  flex-direction: row;
	}
	
	/* 简历其他各项信息 */
	.otherInfo{
	  margin-top: 22rpx;
	  padding: 25rpx 10rpx;
	  background: #FFFFFF;
	  color: #E6CEAC;
	  border: 3rpx solid #CCC;
	}
	
	/* 简历其他各项信息 没有填写的样式 */
	.otherInfo-none{
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	
	/* 简历每项 教育经历 工作经历 模块*/
	.otherInfo-item{
	  display: flex;
	  flex-direction: column;
	  padding: 0 25rpx;
	}
	/* 教育经历 工作经历第一排 */
	.otherInfo-item-first{
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  font-size: 28rpx;
	}
	.otherInfo-item-first-left{
	  display: flex;
	  flex-direction: row;
	}
	.otherInfo-item-first-left-icon{
	  width: 6rpx;
	  background: #E6CEAC;
	  margin: 7rpx 0 5rpx 0;
	}
	.otherInfo-item-first-left-word{
	  margin-left: 10rpx;
	}
	/* 教育经历 工作经历第二排 */
	.otherInfo-item-secord{
	  width: 100%;
	  height: 3rpx;
	  margin-top: 13rpx;
	  background: gainsboro;
	  margin-bottom: 20rpx;
	}
	/* 教育经历 工作经历第三排 */
	.otherInfo-item-third{
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	}
	/* 教育经历 工作经历第三排左边 */
	.otherInfo-item-third-left{
	  display: flex;
	  flex-direction: row;
	}
	/* 教育经历 工作经历第三排第一列 */
	.otherInfo-item-third-splicedicon{
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	.otherInfo-item-third-splicedicon-spot{
	  width: 13rpx;
	  height: 13rpx;
	  background: #E6CEAC;
	  border-radius: 50%;
	}
	.otherInfo-item-third-splicedicon-line{
	  width: 2rpx;
	  height: 100%;
	  background: #D3D3D3;
	}
	
	/* 教育经历 工作经历第三排第二列 */
	.otherInfo-item-third-message{
	  display: flex;
	  flex-direction: column;
	  font-size: 27rpx;
	  color: #333;
	  margin-left: 10rpx;
	  position: relative;
	  bottom: 13rpx;
	  width: 550rpx;
	}
	.otherInfo-item-third-message-third{
	  margin-top: 2rpx;
	  font-size: 26rpx;
	  color: gainsboro;
	}
	.otherInfo-item-third-message-fourth{
	  font-size: 26rpx;
	  color: gainsboro;
	  word-break:break-all;
	  display: -webkit-box;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  word-wrap: break-word;
	  white-space: normal !important;
	  -webkit-line-clamp: 3;
	  -webkit-box-orient: vertical;
	}
	.otherInfo-item-third-right{
	  width: 50rpx;
	  height: 50rpx;
	  align-self: center;
	}
	/* 简历每项 工作经历模块 */
	.otherInfo-item-work{
	  display: flex;
	  flex-direction: column;
	  padding: 0 25rpx;
	}
	/* 填写了工作期望 */
	.work-expect{
	  display: flex;
	  flex-direction: column;
	  font-size: 27rpx;
	}
	.work-expect-item{
	  display: flex;
	  flex-direction: row;
	  color: #333 !important;
	}
	.self-item{
	  color: #333 !important;
	}
</style>
