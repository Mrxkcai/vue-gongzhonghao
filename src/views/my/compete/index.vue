<template>
	<div class="compete">
		<div class="fixTab">
			<tab :line-width="2" active-color="#575D6F" default-color="#CBCED5" custom-bar-width="50px">
				<tab-item selected @on-item-click="getItem">拍卖中</tab-item>
				<tab-item @on-item-click="getItem">待支付</tab-item>
				<tab-item @on-item-click="getItem">已完成</tab-item>
			</tab>
		</div>
		<p style="height: 44px;"></p>

		<div v-show="tab1">
			<div class="item" v-for=" i,index in getData " :key="index">
				<p class="inTime">预计结拍时间：<span v-text="i.endTime?i.endTime:''"></span></p>
				<div class="clear">
					<span class="brage" v-if="i.top">领先</span>
					<span class="brage" v-else> </span>
					<span class="tiemPower">{{i.numberInfo.matchName?i.numberInfo.matchName:''}} {{i.number}} 的使用权</span>
					<p style="clear: both;"></p>
				</div>

				<div class="clear nowMoney">
					<span>当前价：</span>
					<span>¥ </span>
					<span>{{i.price.toFixed(2)}}</span>
					<span>查看</span>
					<span @click="getIndex(index)">
						<x-switch title="" style="width:70px"></x-switch>
					</span>

				</div>
			</div>



			<div v-transfer-dom>
				<popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
					<div class="popup0">
						<div>
							<span class="brage">领先</span>
							<span class="tiemPower">2019年 西安国际马拉松 <span class="numberTip">A99999</span> 的使用权</span>
							<p style="clear: both;"></p>

							<div class="infoItem">
								<p><span>姓名</span><span>王某某</span></p>
								<p><span>证件号</span><span>610302199107202062</span></p>
								<p><span>成交价</span><span><span>¥ </span><span style="font-weight: 600;">3000</span></span></p>
							</div>
						</div>
					</div>
				</popup>
			</div>


		</div>



		<!-- 带支付    S -->
		<div v-show="tab2" class="willPay">
			<div class="item" v-for=" i,index in getData ">
				<p class="inTime">预计结拍时间：<span v-text="i.endTime?i.endTime:''"></span></p>
				<div class="clear">
					<span class="brage" style="padding:0 2px;">竞拍成功</span>
					<span class="tiemPower">{{i.numberInfo.matchName?i.numberInfo.matchName:''}} {{i.number}} 的使用权</span>
					<p style="clear: both;"></p>
				</div>

				<div class="clear nowMoney tapePayment">
					<span>结拍价：</span>
					<span>¥ </span>
					<span>{{i.price.toFixed(2)}}</span>
					<span>支付</span>
					<span @click="getIndex(index)">
						<x-switch title="" v-model="show2" style="width:70px"></x-switch>
					</span>

				</div>
			</div>



			<!-- 蒙版 S -->

			<div v-transfer-dom>
				<popup v-model="show2" @on-hide="log('hide')" @on-show="log('show')">
					<div class="popup0">
						<div>
							<span class="tiemPower tiemPower2" style="width: 100%;text-align: center;margin: 17px 0 0 0;">{{getDataInfo.numberInfo.matchName}}
								<span class="numberTip">{{getDataInfo.number}}</span> 的使用权</span>
							<p style="clear: both;"></p>

							<div class="infoItem">
								<p><span>姓名</span><span>{{userInfo.nickName}} </span></p>
								<p><span>证件号</span><span>{{userInfo.idCard}} </span></p>
								<p><span>结拍价</span><span><span>¥ </span><span style="font-weight: 600;">{{getDataInfo.price}} </span></span></p>
								<p><span>保证金</span><span><span style="color: #F17F1A;">-¥ </span><span style="font-weight: 600;color: #F17F1A;">{{userInfo.auctionBondAmount}}</span></span></p>
							</div>

							<div class="confirmPay">
								<span>总计：</span>
								<span>¥</span>
								<span>{{getDataInfo.price - userInfo.auctionBondAmount}}</span>
								<button @click="confirmPay(getDataInfo.price - userInfo.auctionBondAmount)">确认支付</button>
							</div>
						</div>
					</div>
				</popup>
			</div>

			<!-- 蒙版 E -->


		</div>
		<!-- 带支付    E -->



		<!-- 已完成    S -->
		<div v-show="tab3" class="finishedPay">
			<div class="item" v-for=" i,index in getData ">
				<div class="clear" style="margin: 10px 0 0 0;">
					<span class="brage" v-if="i.paySuccess">已成交</span>
					<span class="brage" v-else> </span>
					<span class="tiemPower">{{i.numberInfo.matchName?i.numberInfo.matchName:''}} {{i.number}} 的使用权</span>
					<p style="clear: both;"></p>
				</div>

				<div class="clear nowMoney">
					<span>成交价：</span>
					<span>¥ </span>
					<span>{{i.price.toFixed(2)}}</span>
					<span>查看</span>
					<span @click="getIndex(index)">
						<x-switch title="" v-model="show3" style="width:70px"></x-switch>
					</span>

				</div>
			</div>


			<div v-transfer-dom>
				<popup v-model="show3" @on-hide="log('hide')" @on-show="log('show')">
					<div class="popup0">
						<div>
							<span class="brage brage3" v-if="getDataInfo.paySuccess">已成交</span>
							<span class="brage brage3" v-else> </span>
							<span class="tiemPower">{{getDataInfo.numberInfo.matchName}} <span class="numberTip">{{getDataInfo.number}}</span> 的使用权</span>
							<p style="clear: both;"></p>

							<div class="infoItem">
								<p><span>姓名</span><span>{{userInfo.nickName}}</span></p>
								<p><span>证件号</span><span>{{userInfo.idCard}}</span></p>
								<p><span>成交价</span><span><span>¥ </span><span style="font-weight: 600;">{{getDataInfo.price}}</span></span></p>
							</div>
						</div>
					</div>
				</popup>
			</div>
		</div>
		<!-- 已完成    E -->

		<p v-show="isData" style="text-align:center;font-size:14px;color:#999;line-height:50px;">未查询到数据</p>
	</div>
</template>

<script>
	import {
		Tab,
		TabItem,
		Popup,
		TransferDom,
		Group,
		XSwitch,
		ViewBox
	} from 'vux'

	import { auctionList } from '../../../service/api'
	import { getUserInfo } from '../../../service/api'
	import axios from 'axios'
	import getData from './data.json'

	export default {
		directives: {
			TransferDom
		},
		components: {
			Tab,
			TabItem,
			Popup,
			TransferDom,
			Group,
			XSwitch,
			ViewBox
		},
		data() {
			return {
				list: [],
				show: false,
				show2: false,
				show3: false,
				showToast: false,
				tab1: true,
				tab2: false,
				tab3: false,
				status:'AUCTION',
				isData:false,
				getData:[],
				// pageSize:5,		//后端说不需要分叶
				// currentPage:1
				getDataInfo:{
					"endTime": "2018-12-18 18:23:53", 
					"number": "A88800",  
					"numberInfo": {  
						"categoryId": "7",  
						"categoryName": "7", 
						"matchId": "1",    
						"matchName": "2019年西安国际马拉松",  
						"matchTypeId": "2",           
						"matchTypeName": "半程马拉松", 
						"numberId": "1"          
					},
					"paySuccess": false,    
					"price": 100,          
					"top": true            
				},
				userInfo:{}
			}
		},
		methods: {
			getItem(index) {
				// console.log(index)
				if (index == 0) {
					this.tab1 = true
					this.tab2 = false
					this.tab3 = false
					this.status = "AUCTION"
				} else if (index == 1) {
					this.tab1 = false
					this.tab2 = true
					this.tab3 = false
					this.status = "PAY"
				} else if (index == 2) {
					this.tab1 = false
					this.tab2 = false
					this.tab3 = true
					this.status = "PAY"
				};

				//查询数据
				this.init();
			},
			getIndex(index) {
				this.getDataInfo = this.getData[index]
				console.log(this.getDataInfo)
			},
			log(str) {
				// console.log(str)
			},

			//-确认支付
			confirmPay() {
				// console.log(22)
			},
			//获取滚动条当前的位置

			getScrollTop() {
				var scrollTop = 0;
				if (document.documentElement && document.documentElement.scrollTop) {
					scrollTop = document.documentElement.scrollTop;
				} else if (document.body) {
					scrollTop = document.body.scrollTop;
				}
				return scrollTop;
			},

			//获取当前可视范围的高度 

			getClientHeight() {
				var clientHeight = 0;
				if (document.body.clientHeight && document.documentElement.clientHeight) {
					clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
				} else {
					clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
				}
				return clientHeight;
			},

			//获取文档完整的高度 

			getScrollHeight() {
				return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
			},

			init(){
				
				var that = this;
				// console.log(that.json)
				var params = {
					status:that.status
				};
				auctionList(params).then(res => {
					console.log(res)
					if(res.status == "success"){
						if(res.code == 404){
							that.isData = true;
						}else if(res.code == 200){
							that.isData = false;
							if(res.data.length){
								that.getData = res.data;
							};
						}

						//本地演示数据
						// that.getData = getData.data;
						// console.log(that.getData)

					}else{
						console.log(res.message)
					}
				});

				
			}

		},
		mounted() {
			// console.log('in')
			//滚动事件触发
			var that = this;
			window.onscroll = function() {
				if (that.getScrollTop() + that.getClientHeight() == that.getScrollHeight()) {
					console.log(333)
				}
			};

			this.init();
			
			getUserInfo().then(res => {
				console.log(2334)
				console.log(res)
				if(res.code == 200){
					this.userInfo = res.data;
				};
			});

		},
		destroyed() {
			// console.log('out')
			// document.title = ""
		}
	}
</script>
<style lang="less" scoped>
	@d: {
		display: inline-block
	}

	;

	a,
	img,
	button,
	input,
	textarea,
	div {
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		user-select: none;
	}

	.compete {
		background-color: rgba(222, 222, 222, 0);
	}

	.fixTab {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
	}

	.item {
		width: 341px;
		min-height: 127px;
		background: #fff;
		margin: 18px auto 0;
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}

	.inTime {
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(241, 127, 26, 1);
		line-height: 17px;
		margin: 14px 0 0 20px;
	}

	.brage {
		@d();
		min-width: 37px;
		height: 15px;
		background: rgba(240, 168, 0, 1);
		border-radius: 3px;
		color: #fff;
		line-height: 16px;
		text-align: center;
		margin: 17px 0 0 20px;
		float: left;
	}

	.tiemPower {
		@d();
		color: #192137;
		width: 258px;
		height: 15px;
		line-height: 16px;
		font-size: 13px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		float: left;
		margin: 17px 0 0 4px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		.numberTip {
			font-size: 24px;
			font-family: DINAlternate-Bold;
			font-weight: bold;
			color: rgba(240, 168, 0, 1);
		}
	}

	.clear {
		clear: both;
	}

	.nowMoney {
		margin: 24px 0 0 20px;
	}

	.nowMoney>span:nth-child(1) {
		font-size: 13px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(87, 93, 111, 1);
	}

	.nowMoney>span:nth-child(3) {
		font-size: 15px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(25, 33, 55, 1);
	}

	.nowMoney>span:nth-child(4) {
		@d();
		width: 75px;
		height: 30px;
		background: rgba(255, 255, 255, 1);
		border-radius: 16px;
		border: 1px solid rgba(87, 93, 111, 1);
		font-size: 13px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(87, 93, 111, 1);
		line-height: 30px;
		text-align: center;
		float: right;
		margin: 0 20px 0 0;
	}

	.nowMoney>span:nth-child(5) {
		@d();
		width: 75px;
		height: 30px;
		background: #eee;
		border-radius: 16px;
		overflow: hidden;
		position: absolute;
		right: 20px;
		opacity: 0;
	}

	.nowMoney>span:nth-child(5) /deep/ .weui-switch:before {
		width: 77px;
	}

	.nowMoney>span:nth-child(5) /deep/ .weui-switch:after {
		width: 77px;
	}

	.nowMoney>span:nth-child(5) /deep/ .weui-switch {
		width: 77px;
	}

	.nowMoney>span:nth-child(5)>div {
		width: 100%;
		height: 100%;
		float: left;
		margin-top: -5px;
		// padding-left: 15px;
		overflow: hidden;
	}

	.nowMoney>span:nth-child(5)>div>div {
		float: left;
		margin: 0;
		line-height: 0;
	}

	.v-transfer-dom {
		background: #F9F9FC;
	}

	.popup0 .brage {
		margin: 25px 2px 0 20px;
	}

	.popup0 .tiemPower {
		height: 100%;
		line-height: 25px;
	}

	.infoItem {
		width: 340px;
		margin: 26px auto 20px;
		background: #fff;
		overflow: hidden;
		border-radius: 10px;
	}

	.infoItem>p {
		height: 30px;
		padding: 0 20px;
		margin: 15px 0 0 0;
	}

	.infoItem>p>span:nth-child(1) {
		@d();
		float: left;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(87, 93, 111, 1);
		line-height: 20px;
	}

	.infoItem>p>span:nth-child(2) {
		@d();
		float: right;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(25, 33, 55, 1);
		line-height: 20px;
	}


	.willPay {

		// 带支付
		.tapePayment>span:nth-child(4) {
			background: rgba(240, 168, 0, 1);
			color: #FFFFFF;
			border: none;
		}

		;

		.infoItem>p:nth-child(4)>span:nth-child(2) {
			@d();
			float: right;
			font-size: 14px;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #F17F1A;
			line-height: 20px;
		}

		;

	}

	.confirmPay {
		width: 100%;
		height: 68px;
		background: #fff;
		overflow: hidden;
	}

	;

	.confirmPay>span:nth-child(1) {
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(25, 33, 55, 1);
		line-height: 68px;
		margin: 0 0 0 17px;
	}

	.confirmPay>span:nth-child(2) {
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 500;
		color: rgba(25, 33, 55, 1);
		line-height: 68px;
		margin: 0 0 0 10px;
	}

	.confirmPay>span:nth-child(3) {
		font-size: 21px;
		font-family: PingFangSC-Regular;
		font-weight: 500;
		color: rgba(25, 33, 55, 1);
		line-height: 68px;
		margin: 0 0 0 10px;
	}

	.confirmPay>button {
		width: 171px;
		height: 46px;
		background: rgba(240, 168, 0, 1);
		border-radius: 25px;
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 46px;
		float: right;
		margin: 11px 17px 0 0;
	}


	// 已完成
	.finishedPay .brage {
		background: #002F7B;
		color: #fff;
		padding: 0 5px;
	}

	.brage3 {
		background: #002F7B;
		color: #fff;
		padding: 0 5px;
	}

	.finishedPay .item {
		min-height: 120px;
	}
</style>
