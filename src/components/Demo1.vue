<!-- 星级评分系统 -->
<template>
	<div class="demo1">
		<label>点击星星打分：</label>
		<ul class="clearfix" ref='ul'>
			<li :class="{'checked':arr[0]}"	@click='clickMsg'	@mouseover='hoverMsg' @mouseout='reset'>1</li>
			<li :class="{'checked':arr[1]}"	@click='clickMsg'	@mouseover='hoverMsg' @mouseout='reset'>2</li>
			<li :class="{'checked':arr[2]}"	@click='clickMsg'	@mouseover='hoverMsg' @mouseout='reset'>3</li>
			<li :class="{'checked':arr[3]}"	@click='clickMsg'	@mouseover='hoverMsg' @mouseout='reset'>4</li>
			<li :class="{'checked':arr[4]}"	@click='clickMsg'	@mouseover='hoverMsg' @mouseout='reset'>5</li>
		</ul>
		<span><strong>{{scores}}</strong>{{clickIfo}}</span>
		<p v-if='showP'  :style='{left:leftVal}'><span>{{title}}</span>{{hoverIfo}}</p>
	</div>
</template>

<script>
export default {
  name:'demo1',
  data(){
    return {
    	leftVal:'0px',
    	showP:false,
    	arr:[false,false,false,false,false],
    	storage:[],
    	clickIfo:'',
    	hoverIfo:'',
    	scores:'',
    	title:'',
    	aMsg:[
				'很不满意|差得太离谱，与卖家描述的严重不符，非常不满',
				'不满意|部分有破损，与卖家描述的不符，不满意',
				'一般|质量一般，没有卖家描述的那么好',
				'满意|质量不错，与卖家描述的基本一致，还是挺满意的',
				'非常满意|质量非常好，与卖家描述的完全一致，非常满意'
				]
    };
  },
  methods:{
  	clickMsg:function(evt){	/*click事件*/
  		let index = parseInt(evt.currentTarget.innerHTML);
  		this.arr = [false,false,false,false,false];
  		if (index){
  			this.clickIfo = '(' + this.aMsg[index - 1].match(/\|(.+)/)[1] + ')';
  			this.arr = this.arr.map(function(item,idx){
  				return idx < index;
  			});
	  	this.storage = this.arr;
	  	this.scores = index + '分';
  		}
  	},
  	hoverMsg:function(evt){	/*mouseover事件；*/
  		let tgt = evt.currentTarget;
  		let index = parseInt(tgt.innerHTML);
  		this.storage = this.arr;
  		this.title = index + '分' + ' ' + this.aMsg[index - 1].match(/(.+)\|/)[1];
  		this.hoverIfo = this.aMsg[index - 1].match(/\|(.+)/)[1];
	  	this.arr = [false,false,false,false,false];
  		if (index){
  			index = parseInt(index);
  			this.arr = this.arr.map(function(item,idx){
  				return idx < index;
  			});
  		}
  		this.leftVal = tgt.offsetLeft + tgt.offsetWidth / 2 - 90 + 'px';
  		this.showP = true;
  	},
  	reset:function(){
  		this.arr = this.storage;
  		this.showP = false;
  	}
 }
};
</script>

<style lang="less" scoped>
		.demo1{
			position: relative;
			width: 600px;
			margin:auto;
			// padding: 0px 5px;
			text-align:left;
			line-height:30px;
			label{
				font-size: 15px;
			}
			ul{		/* 星星样式 */
				display: inline-block;
				list-style: none;
				vertical-align: middle;
				line-height:22px;
				.checked{
					background-position:50% -28px;
				}

				li{
					text-indent: -999999px;
					float: left;
					cursor: pointer;
					width: 25px;
					vertical-align: middle;
					background: url(../assets/star.png) 50% 0px no-repeat;
				}
			}
			span{	//click提示样式；
				font-size: 12px;
				strong{
					color:#E6A23C;
					font-weight: normal;
					padding:0 5px;
					margin:0px 0px 0px 10px;
				}
			}
			p{		/* hover悬浮窗样式 */
				// border: none;
				text-align: left;
				box-sizing: border-box;
				position: absolute;
				top:28px;
				width: 180px;
				height: 68px;
				background: url(../assets/icon.gif) no-repeat;
				padding: 5px;
				font-size: 12px;
				line-height:1.5em;
				span{
					display: block;
					padding: 0px;
					color:#E6A23C;
				}
			}

		}
</style>
