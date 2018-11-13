<template>
	<div>
		<canvas id="clock"  ref='clock'  @click='play'>您的浏览器不支持canvas</canvas>
		<audio src="../static/tick.mp3" preload="preload" loop="loop" ref='audio'></audio>
		<input type="text" id="date" ref='date' readonly />
	</div>
</template>

<script>
	export default {
		name:'Demo3',
		  data(){
		    return {
		    	lastTime:0
		    };
		  },
		  methods:{
		  	play:function(){
		  		let audio=this.$refs.audio;
		  		audio.paused ? audio.play() : audio.pause();
		  	},

		  	//function定义一个获取当前时间的函数
		  	getCurrentTime:function(){
		  			let today=new Date();
		  			let time={
		  				second:today.getSeconds(),
		  				minute:today.getMinutes(),
		  				hour:today.getHours(),
		  				month:today.getMonth()+1,
		  				year:today.getFullYear(),
		  				day:today.getDay(),
		  				date:today.getDate()

		  			};
		  			return time;
		  		},
		  			  	// function 定义一个更新函数；
		  	update:function(){
		  			let curTime=this.getCurrentTime();
		  			this.lastTime=curTime;
		  		},

		  	// 画上时针；
		    drawHourPointer(cxt,time,x,y,R){
		  			if (time.hour>12){
		  				time.hour=time.hour-12;
		  			}
		  			cxt.lineWidth=8;
		  			cxt.strokeStyle='black';
		  			cxt.beginPath();
		  			cxt.moveTo(0.50*R*Math.cos((90-30*time.hour-0.5*time.minute-0.5/60*time.second)/180*Math.PI)+x,y-0.50*R*Math.sin((90-30*time.hour-0.5*time.minute-0.5/60*time.second)/180*Math.PI));
		  			cxt.lineTo(-0.15*R*Math.cos((90-30*time.hour-0.5*time.minute-0.5/60*time.second)/180*Math.PI)+x,y+0.15*R*Math.sin((90-30*time.hour-0.5*time.minute-0.5/60*time.second)/180*Math.PI));
		  			cxt.save();
		  			cxt.stroke();
		  			cxt.restore();
		  		},

		  	 // function 定义一个render函数；
		  	 render(cxt,time,x,y,R){
		  	 		// cxt.globalAlpha=1;
		  	 		let img=new Image();
		  	 		img.src='../static/time1.jpg';
		  	 		img.onload=function(){
		  	 		let pattern=cxt.createPattern(img,'repeat');
		  	 		cxt.fillStyle=pattern;
		  	 		};
		  	 		cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);
		  	 		cxt.beginPath();
		  			cxt.arc(x,y,R,0,2*Math.PI);
		  			cxt.fill();
		  			cxt.stroke();
		  			cxt.save();
		  			this.drawTick(cxt, x,y,R);
		  			this.drawHourPointer(cxt, time, x, y, R);
		  			this.drawMinutePointer(cxt, time, x, y, R);
		  	 		this.drawSecondPointer(cxt, time, x, y, R);
		  			cxt.restore();

		  	// 画上时钟的中心点；
		  			cxt.save();
		  			cxt.beginPath();
		  			cxt.arc(x,y,6,0,2*Math.PI);
		  			cxt.fillStyle='#F03082';
		  			cxt.fill();
		  			cxt.restore();
		  	 	},
		  	// function定义刻度线和数字的绘制；
		  	 drawTick(cxt,x,y,R){
		  	   			cxt.lineWidth=6;
		  	   			for (let i = 0; i < 4; i++){
		  	   				cxt.beginPath();
		  	   				cxt.moveTo(R*Math.cos(90*i/180*Math.PI)+x,y-R*Math.sin(90*i/180*Math.PI));
		  	   				cxt.lineTo(0.95*R*Math.cos(90*i/180*Math.PI)+x,y-0.95*R*Math.sin(90*i/180*Math.PI));
		  	   				cxt.lineWidth=6;
		  	   				cxt.stroke();
		  	   				}
		  	   			for (let i = 0; i <12; i++){
		  	   				if (i%3!==0){
		  	   				cxt.beginPath();
		  	   				cxt.moveTo(R*Math.cos(30*i/180*Math.PI)+x,y-R*Math.sin(30*i/180*Math.PI));
		  	   				cxt.lineTo(0.975*R*Math.cos(30*i/180*Math.PI)+x,y-0.975*R*Math.sin(30*i/180*Math.PI));
		  	   				cxt.lineWidth=4;
		  	   				cxt.stroke(); 
		  	 				}
		  	   			}
		  	   			for (let i = 0; i <60; i++){
		  	   				if (i%5!==0){
		  	   				cxt.beginPath();
		  	   				cxt.moveTo(R*Math.cos(6*i/180*Math.PI)+x,y-R*Math.sin(6*i/180*Math.PI));
		  	   				cxt.lineTo(0.985*R*Math.cos(6*i/180*Math.PI)+x,y-0.985*R*Math.sin(6*i/180*Math.PI));
		  	   				cxt.lineWidth=1;
		  	   				cxt.stroke(); 
		  	 				}
		  	   			}

		  	   	// 写上数字
		  	   			cxt.globalAlpha=1;
		  	   			cxt.font='20px microsoft yahei';
		  	   			cxt.textAlign='center';
		  	   			cxt.textBaseline='middle';
		  	   			cxt.fillStyle='#000';
		  	   			for (let i = 0; i <12; i++){ cxt.fillText(i+1,0.85*R*Math.cos((60-30*i)/180*Math.PI)+x,y-0.85*R*Math.sin((60-30*i)/180*Math.PI)); }
		  	   	},

				drawSecondPointer(cxt,time,x,y,R){
			  	   	cxt.lineWidth=3;
			  	   	cxt.strokeStyle='red';
			  	   	cxt.beginPath();
			  	   	cxt.moveTo(0.90*R*Math.cos((90-6*time.second)/180*Math.PI)+x,y-0.90*R*Math.sin((90-6*time.second)/180*Math.PI));
			  	   	cxt.lineTo(-0.1*R*Math.cos((90-6*time.second)/180*Math.PI)+x,y+0.1*R*Math.sin((90-6*time.second)/180*Math.PI));
			  	   	cxt.save();
			  	   	cxt.stroke();
			  	   	cxt.restore();
		  	   },
		  	   // function画上分针；
		  	 	drawMinutePointer(cxt,time,x,y,R){
		  	   		cxt.lineWidth=6;
		  	   		cxt.strokeStyle='#000';
		  	   		cxt.beginPath();
		  	   		cxt.moveTo(0.7*R*Math.cos((90-6*time.minute-0.1*time.second)/180*Math.PI)+x,y-0.7*R*Math.sin((90-6*time.minute-0.1*time.second)/180*Math.PI));
		  	   		cxt.lineTo(-0.2*R*Math.cos((90-6*time.minute-0.1*time.second)/180*Math.PI)+x,y+0.2*R*Math.sin((90-6*time.minute-0.1*time.second)/180*Math.PI));
		  	   		cxt.save();
		  	   		cxt.stroke();
		  	   		cxt.restore();
		  	   	}
		  },
		  
		  mounted:function(){
		  	let WIDTH=this.$el.offsetWidth;
		  	let HEIGHT=Math.max(500,document.documentElement.clientHeight ||document.body.clientHeight);
  			let dt=this.$refs.date;
		  	//获取当前时间；
  			let week=['周日','周一','周二','周三','周四','周五','周六'];
  			let canvas=this.$refs.clock;
  			let context=canvas.getContext('2d');
		  	this.lastTime=this.getCurrentTime();
  			//获取日期文本框；
  			dt.value=this.lastTime.month+'月'+this.lastTime.date+'日'+' '+week[this.lastTime.day];
  			canvas.width=0.8*WIDTH; 	 //1092
  			canvas.height=0.9*HEIGHT;  
		  	// 实时画指针；
		  			setInterval(() => {
		  				this.update();
		  				this.render(context, this.lastTime, 0.4*WIDTH,0.45*HEIGHT,0.44*HEIGHT);
		  			},100);
		  }
	};
</script>

<style lang="css" scoped>
   	*{
		padding:0px;
		margin:0px;
		font:14px normal "microsoft yahei";}

    div{
    	position: relative;
    	min-width:960px;
    	min-height:350px;
    }
	canvas{
		/*border:1px dashed #BFB4B4; */
		width: 60%;
		height:60%; 
		margin: 1% 10%;
	}	
    #date{
      	position: absolute;
      	border:none;
      	top:50%;
      	transform: translateY(-50%);
      	right:36%; 
      	width:90px;
      	background:rgba(161,98,80,0.1);
      	font-size:12px;
      	line-height: 1.5em;
      	font-weight:750;
      	font-family: 'Arial',' sans-serif';
      	color:#000;}
</style>
