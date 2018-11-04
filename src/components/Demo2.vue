<template>
	<div class="calc">
		<el-container>
			<el-header height='80px'>
				<header>by-cai4833</header>
				<el-input v-model='input2' readonly class='el-input-d'></el-input>
				<el-input v-model='input1'  class='el-input-i' :maxlength='8' type='text' readonly></el-input>
			</el-header>
			<el-main>
				<el-row :gutter='10'>
					<el-col :span='18'>
						<el-row :gutter='10'>
							<el-col :span='8'><div class="btn-grey" @click='clear'>c</div></el-col>
							<el-col :span='8'><div class="btn-grey" @click='fn1'>%</div></el-col>
							<el-col :span='8'><div class="btn-grey" @click='fn1'>÷</div></el-col>
						</el-row>
						<el-row :gutter='10'>
							<el-col :span='8'><div class="btn-black" @click='fn1'>7</div></el-col>
							<el-col :span='8'><div class="btn-black" @click='fn1'>8</div></el-col>
							<el-col :span='8'><div class="btn-black" @click='fn1'>9</div></el-col>
						</el-row>
						<el-row :gutter='10'>
							<el-col :span='8'><div class="btn-black" @click='fn1'>4</div></el-col>
							<el-col :span='8'><div class="btn-black" @click='fn1'>5</div></el-col>
							<el-col :span='8'><div class="btn-black" @click='fn1'>8</div></el-col>
						</el-row>
						<el-row :gutter='10'>
							<el-col :span='8'><div class="btn-black" @click='fn1'>1</div></el-col>
							<el-col :span='8'><div class="btn-black" @click='fn1'>2</div></el-col>
							<el-col :span='8'><div class="btn-black" @click='fn1'>3</div></el-col>
						</el-row>
						<el-row :gutter='10'>
							<el-col :span='16'><div class="btn-zero" @click='fn1'>0</div></el-col>
							<el-col :span='8'><div class="btn-black" @click='fn1'>.</div></el-col>
						</el-row>
					</el-col>
					<el-col :span='6' :gutter='10' class='uniqueCol'>
						<el-row>
							<el-col :span='24'	style='padding-bottom:8px;'><div class="btn-grey" @click='fn1'>×</div></el-col>
							<el-col :span='24'	style='padding:8px 0px;'><div class="btn-grey" @click='fn1'>-</div></el-col>
							<el-col :span='24'	style='padding:8px 0px;'><div class="btn-grey" @click='fn1'>+</div></el-col>
							<el-col :span='24'	style='padding:8px 0px;'><div style="line-height:90px; height: 90px" class="btn-yellow" @click='fn1'>=</div></el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
export default {
	name:'Demo2',

	data(){
		return {
			input1:'0',
			input2:'',
			NUM:/^[0-9.]+$/,
			OPERATOR:/[+\-÷×%=]/,
			optStack:['#'],
			temp:[],
			eqlForbid:false
		};
	},

	methods:{
		// vue组件@___目前只接收自定义事件，接受原生事件时需要加上.native；
		// 采用逆波兰表达式原理实现；
	  	fn1:function(event){
	  		let trgt = event.target.innerText;

	  		if (this.NUM.test(trgt) && this.input1.length < 8){	
	  			//trgt的是数字且input1中字符不大于8；
	  			this.input1 = (parseFloat(this.input1) ? (parseFloat(this.input1) + trgt) : trgt);
	  		} else if (this.OPERATOR.test(trgt)){	//点击运算符
	  			if (!this.OPERATOR.test(this.input1)){
					if (trgt !== '='){
						this.eqlForbid || this.temp.push(this.input1);	//input1中是数字直接push到temp；
		  				//比较运算符优先级；当输入运算符等级较低时，将opStack中的运算符弹出，压入temp中；
						while (!this.comparison(trgt,this.optStack[this.optStack.length-1])){
							let ops=this.optStack.pop();
							this.computer(ops);		//实时计算；
						}
						this.optStack.push(trgt);
			  			this.input2+=this.input1+trgt;
						this.input1 = trgt;
						this.eqlForbid=false;
					} else {	
						//点击‘=’
						if (!this.eqlForbid){
							this.temp.push(this.input1);	//input1中是数字直接push到temp；
							this.input2+=this.input1+trgt;
							while (this.optStack.length>1){
								let ops=this.optStack.pop();
								this.computer(ops);		//实时计算；
							}
							// 固定小数点位数为7;
							this.input1 = /\d+\.\d{7,}/.test(this.temp[0]) ? this.temp[0].toFixed(7) : this.temp[0];
							this.eqlForbid=true;
						}
			  		}
	  			} else {
	  				alert('运算符输入错误！');
	  				// throw new Error('运算符输入错误！');
	  			}
	  		}
	  	},

	  	equalOp:function(){

	  	},
	  	comparison:function(op1,op2){
	  		let degrees={	//定义运算符优先级；
	  			'#':0,
	  			'+':1,
	  			'-':1,
	  			'*':1,
	  			'/':2,
	  			'×':2,
	  			'÷':2,
	  			'%':2
	  		};
	  		return degrees[op1]>degrees[op2];
	  	},

	  	clear:function(){	//清空计算器；
	  		this.input1='0';
	  		this.input2='';
	  		this.optStack=['#'];
	  		this.temp=[];
	  		this.eqlForbid=false;
	  	},

	  	computer:function(op){
	  		let rlt;
	  		let thisTemp=this.temp;
	  		switch (op){
	  			case '+':
	  				rlt=parseFloat(thisTemp[thisTemp.length-2])+parseFloat(thisTemp[thisTemp.length-1]);
	  				this.temp.splice(thisTemp.length-2,2,rlt);
	  				break;
	  			case '-':
	  				rlt=parseFloat(thisTemp[thisTemp.length-2])-parseFloat(thisTemp[thisTemp.length-1]);
	  				this.temp.splice(thisTemp.length-2,2,rlt);
	  				break;
	  			case '×':
	  				rlt=parseFloat(thisTemp[thisTemp.length-2])*parseFloat(thisTemp[thisTemp.length-1]);
	  				this.temp.splice(thisTemp.length-2,2,rlt);
	  				break;
	  			case '÷':
	  				rlt=parseFloat(thisTemp[thisTemp.length-2])/parseFloat(thisTemp[thisTemp.length-1]);
	  				this.temp.splice(thisTemp.length-2,2,rlt);
	  				break;
	  			case '%':
	  				rlt=parseFloat(thisTemp[thisTemp.length-2])%parseFloat(thisTemp[thisTemp.length-1]);
	  				this.temp.splice(thisTemp.length-2,2,rlt);
	  				break;
	  		}
	    }
	}
};
</script>
<style lang="less">
	.calc{
		.el-input{
			.el-input__inner{
				color: #000;
				border-radius:0px;
				border: none;
				background:#dde1c8;
				text-align: right;
				padding: 0px 5px;
				height:1.1em;
				line-height:1.1em;
				font-family:'Arial';
				font-weight:700;
			}
		}
		.el-input-d{
			.el-input__inner{
				padding-right: 12px;
			}
		}
	}
</style>

<style lang="less" scoped>
	.calc{
		max-width: 300px;
		min-width: 250px;
		margin:10px auto;
		.el-container{
			.el-header{
				padding:0 0px;
				header{
					text-align: right;
					line-height:1.5em;
					font-size:12px;
					font-weight:bold;
					background: #000;
					color:#fff;
				}
				.el-input-i{
					background:#dde1c8;
					font-size: 45px;
					font-weight:bold;
				}
				.el-input-d{
					background:#dde1c8;
					font-size:12px;
					height:1.5em;
					line-height:1.5em;
					display: block;
				}

			}
			.el-main{
				background: url(../assets/bg.jpg);
				padding: 0px 7.5px;
				.el-row{
					padding:8px 0px;
					.el-col{
						.el-row{
							.el-col{
								div{
									// background:url(../assets/home.jpg);
									border-radius:5px;
									max-width:61px;
									height:37px;
									line-height:37px;
									color: #fff;
								}
							}
						}
					}
				}
			}
			.btn-grey{
				background: url(../assets/btn.png) -1px -43px;
				&:hover{
					background-position:-64px -43px;
				}

			}
			.btn-black{
				background: url(../assets/btn.png) -1px -2px;
				&:hover{
					background-position:-63px -2px;
				}
			}
			.btn-yellow{
				background: url(../assets/btn.png) -1px -166px;
				&:hover{
					background-position:-64px -166px;
				}

			}
			.btn-zero{
				background: url(../assets/btn.png) -1px -82px;
				max-width:135px !important;
				&:hover{
					background-position:-1px -124px;
				}

			}
		}
	}

</style>
