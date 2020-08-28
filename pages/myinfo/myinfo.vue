<template>
	<view class="base">
		<!-- 企业信息 -->
		<view class="tittle">
			<image src="../../static/qiye.png" class="tittle-img"></image>
			<text class="tittle-word">企业信息</text>
		</view>
		<view class="content">
			<!-- <view class="item">
				<text class="item-tittle">企业头像</text>
				<view class="item-right">
					<image src="../../static/dianxin.png" class="com-icon"></image>
				</view>
			</view> -->
			<view class="item">
				<text class="item-tittle">企业名称</text>
				<input id="cname" class="item-value" v-model="oldData.cname"  :disabled="isModify" @input="inputInfo"></input>
			</view>
			<view class="item">
				<text class="item-tittle">企业地址</text>
				<textarea id="cplace" class="item-value-more" v-model="oldData.cplace" :disabled="isModify" maxlength="50" @input="inputInfo"></textarea>
			</view>
			<view class="item">
				<text class="item-tittle">企业电话</text>
				<input id="cphone" class="item-value" v-model="oldData.cphone"  :disabled="isModify" @input="inputInfo"></input>
			</view>
			<view class="item">
				<text class="item-tittle">企业邮箱</text>
				<input id="cemail" class="item-value" v-model="oldData.cemail" :disabled="isModify" @input="inputInfo"></input>
			</view>
			<view class="item">
				<text class="item-tittle">所示行业</text>
				<input id="ctype" class="item-value" v-model="oldData.ctype" :disabled="isModify" @input="inputInfo"></input>
			</view>
			<view class="item">
				<text class="item-tittle">公司简介</text>
				<textarea  v-if="modal6R&&modalR"  id="cinfo" @input="inputInfo" class="item-value-more2" v-model="oldData.cinfo" :disabled="isModify" maxlength="500"></textarea>
				<text v-if="modal6||modal" class="item-value-more2">{{oldData.cinfo}}</text>
			</view>
		</view>
		<!-- 负责人信息 -->
		<view class="tittle">
			<image src="../../static/ren.png" class="tittle-img"></image>
			<text class="tittle-word">负责人信息</text>
		</view>
		<view class="content">
			<view class="item">
				<text class="item-tittle">负责人姓名</text>
				<input id="pname" class="item-value" :disabled="isModify" @input="inputInfo" v-model="oldData.pname"></input>
			</view>
			<!-- <view class="item">
				<text class="item-tittle">负责人性别</text>
				<input id="psex" class="item-value" v-model="oldData.psex" :disabled="isModify" @input="inputInfo" maxlength="1"></input>
			</view> -->
			<view class="item">
				<text class="item-tittle">负责人电话</text>
				<input id="pphone" class="item-value"  :disabled="isModify" @input="inputInfo" maxlength="11" v-model="oldData.pphone"></input>
			</view>
		</view>
		<view class="cbutton" hover-class="buuton-click" hover-stay-time="100" @click="modify" v-if="isModify">修 改</view>
		<view class="vbutton" hover-class="vbuuton-click" hover-stay-time="100" @click="verify" v-if="isModify">{{LoadData}}</view>
		<view class="button-group" v-if="!isModify">
			<view class="button2" hover-class="buuton-click2" hover-stay-time="100" @click="exit">退出修改</view>
			<view class="button" hover-class="buuton-click" hover-stay-time="100" @click="sure">保存修改</view>
		</view>
		<hFormAlert title="提示" v-if="modal6"  name="exit" placeholder="您确定退出修改吗" @confirm="confirm6" @cancel="cancel6" confirmColor="#E6CEAC" ></hFormAlert>
		<hFormAlert title="提示" v-if="modal"  disabled="true" name="save" placeholder="您确定保存修改吗" @confirm="confirm" @cancel="cancel" confirmColor="#E6CEAC" ></hFormAlert>
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
				LoadData:"",
				isLoadData: false,
				modal6R:true,
				modalR:true,
				isModify: true,
				haveModify: false,
				modal6: false,
				modal:false,
				oldData:{
					cname:"暂无",
					cplace:"暂无",
					cphone:"暂无",
					cemail:"暂无",
					ctype:"暂无",
					cinfo:"暂无",
					pname:"暂无",
					pphone:"暂无"
				},
				temData:{
					cname:"中国移动-广西总公司",
					cplace:"南宁青秀区广西壮族自治区建信路1号金湖广场",
					cphone:"0771-5584523",
					cemail:"gang_bb@163.com",
					ctype:"IT/互联网/网络",
					cinfo:"中国电信集团有限公司（简称“中国电信”）是国有特大型通信骨干企业，注册资本2131亿元人民币，资产规模超过8000亿元人民币，年收入规模超过4300亿元人民币，连续多年位列《财富》杂志全球500强。",
					pname:"梁艺翔",
					pphone:"13978223101"
				},
				uid:""
			}
		},
		// onBackPress(e) {
		// 	if(this.haveModify||!this.isModify){
		// 		this.modal6 = true
		// 		this.modal6R = false
		// 		return true;
		// 	}
		// },
		onLoad() {
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
			// 获取公司信息，并赋值
			uni.request({
				url: serverUrl + '/company',
				method: "GET",
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:{
					id: _this.uid
				},
				success: (res) => {
					if(res.data.code==20002){
						var data = res.data.data
						for(let key in data){
							if(!data[key]){
								data[key]='暂无'
							}
						  }
						_this.oldData = data;
						_this.temData = JSON.parse(JSON.stringify(_this.oldData));
					}
					
			
				}
			});
			// 判断用户是否申请过以及状态
			uni.request({
				url: serverUrl + '/company/sign_status',
				method: "GET",
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				data:{
					id: _this.uid
				},
				success: (res) => {
					if(res.data.code==100){
						_this.isLoadData = true
						_this.LoadData = "资料审核中..."
					}
					if(res.data.code==101){
						_this.isLoadData = true
						_this.LoadData = "已经通过申请"
					}
					if(res.data.code==102){
						_this.isLoadData = true
						_this.LoadData = "不通过审核，请联系管理员"
					}
					if(res.data.code==103){
						_this.isLoadData = false
						_this.LoadData = "申请审核"
					}
				}
			});
		},
		methods: {
			verify(){
				var _this = this
				var serverUrl = _this.serverUrl;
				console.log( _this.oldData)
				if(!_this.isLoadData){
					for(let key in _this.oldData){
						if(_this.oldData[key]==""){
							uni.showToast({
								icon:"none",
								title:"请填写全部信息后再申请"
							})
							return
						}
					  }
					uni.showModal({
					    title: '提示',
					    content: '确定要申请审核吗',
						confirmColor:"#D1BA74",
					    success: function (res) {
					        if (res.confirm) {
								// 提交资料审核
					            uni.request({
					            	url: serverUrl + '/company/com_sign',
					            	method: "POST",
					            	data:{
					            		id: _this.uid,
					            	},
					            	success: (res) => {
					            		uni.showToast({
					            			icon:"none",
					            			title:"申请发送成功"
					            		})
										_this.isLoadData = true
										_this.LoadData = "资料审核中..."
					            	}
					            });
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				
			},
			confirm(e){
				var _this = this
				var serverUrl = _this.serverUrl;
				this.isModify=true
				this.haveModify=false
				this.hide()
				//写上传修改资料到服务器，如果成功回调返回的数据分别给temdata和olddata赋值，失败提示失败。
				uni.request({
					url: serverUrl + '/company',
					method: "POST",
					data:{
						id: _this.uid,
						data: _this.oldData
					},
					success: (res) => {
						uni.showToast({
							icon:"none",
							title:"修改成功"
						})
						if(res.statusCode==200){
							_this.oldData = res.data.data
							_this.temData = JSON.parse(JSON.stringify(_this.oldData))
						}
					}
				});
			},
			cancel(e){
				this.hide()
				// uni.showToast({
				// 	icon:"none",
				// 	title:"你点击了取消"
				// })
			},
			confirm6(e){
				this.oldData = JSON.parse(JSON.stringify(this.temData));
				this.hide6()
				this.haveModify=false
				this.isModify=true
			},
			cancel6(e){
				this.hide6()
				// uni.showToast({
				// 	icon:"none",
				// 	title:"你点击了取消"
				// })
			},
			hide6() {
				this.modal6 = false
				this.modal6R = true
			},
			hide(){
				this.modal = false
				this.modalR = true
			},
			inputInfo(e){
				this.haveModify=true
			},
			modify(e){
				this.isModify=false
			},
			exit(e){
				this.modal6 = true
				this.modal6R = false
			},
			sure(e){
				this.modal = true
				this.modalR = false
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
		padding: 0 25rpx 90rpx 25rpx;
		font-size: 14px;
	}
	.tittle{
		display: flex;
		flex-direction: row;
		align-self: center;
		font-size: 16px;
		align-items: center;
		margin-top: 25rpx;
	}
	.tittle-img{
		height: 45rpx;
		width: 45rpx;
		margin-right: 10rpx;
	}
	.content{
		display: flex;
		flex-direction: column;
		border: 3rpx solid #D9D9D9;
		margin-top: 10rpx;
	}
	.item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10rpx;
		margin: 10rpx;
		align-items: center;
		border-bottom: 3rpx dashed #D9D9D9;
	}
	.item-tittle{
		color: #999999;
	}
	.item-value{
		width: 70%;
		text-align: justify;
		word-break: break-all;
		font-size: 14px;
	}
	.item-value-more{
		width: 70%;
		text-align: justify;
		word-break: break-all;
		font-size: 14px;
		height: 90rpx;
	}
	.item-value-more2{
		width: 70%;
		text-align: justify;
		word-break: break-all;
		font-size: 14px;
		height: 220rpx;
	}
	.item-right{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.com-icon{
		height: 90rpx;
		width: 90rpx;
		border-radius: 50%;
	}
	.cbutton{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 580rpx;
		height: 82rpx;
		color: #BDB76B;
		background: #ffffff;
	    border-radius: 10rpx;
		margin: 50rpx 0;
		align-self: center;
		font-size: 16px;
		border: 3rpx solid #BDB76B;
	}
	.buuton-click{
		opacity: 0.9;
		background: rgba(230,206,172,0.1);
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
	.buuton-click2{
		opacity: 0.9;
		background: rgba(244,244,244,0.3);
	}
	.vbutton{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 580rpx;
		height: 82rpx;
		color: #20B2AA;
		background: #ffffff;
	    border-radius: 10rpx;
		align-self: center;
		font-size: 16px;
		border: 3rpx solid #20B2AA;
	}
	.vbuuton-click{
		opacity: 0.9;
		background: rgba(32,178,170,0.1);
	}
</style>
