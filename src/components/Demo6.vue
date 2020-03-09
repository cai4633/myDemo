<template>
    <div id='demo6'>
    	<el-row :gutter="0" id='header'>
    		<h1>音乐可视化</h1>
    		<div id="controler">
    			<div id="visualStyle">
    				<button @click="switchStyle" id='dot' :class='{check:isDot}' data-type='dot'>DOT</button><button @click="switchStyle" id="column" :class='{check:!isDot}' data-type='column'>Column</button>
    			</div>
    			<div id="volume">
    				<i :class='playButtonClassName' @click='playButton'></i><i :class="volumeClassName" ref='vol' @click='switchMute'></i><el-slider v-model="value" :step="1" show-stops @change='changeVolume' :max='max'></el-slider>
    			</div>
    		</div>
    	</el-row>
    	<el-row :gutter="0" id='main'>
    	    <el-col :span="4" id='list'><li class="title">歌曲列表</li><li v-for='(item,index) of list' :key='index' @click='listToPlay' :title='item' :data-index='index'>{{item}}</li></el-col>
    	    <el-col :span="20" ref='canvasWrap'>
    	    	<canvas id="canvas" ref='canvas'>你的浏览器不支持canvas!</canvas>
    	    </el-col>
    	</el-row>
    </div>
</template>

<script>
    export default {
        name: 'Demo6',
        data(){
            return{
            	tst: 0,
            	played: false,
            	muted: false,
            	// playButtonClassName:'el-icon-pause',
            	list: [],	//歌曲列表；
            	aID: 0,		//requestAnimationFrame返回的标识符；
            	value: 60,	//default volume
            	max: 100,	//the max of volume
            	size: 64,	//时域个数；
            	dots: [],	//圆点信息；
            	arr: [],		//uint8arr
            	isDot: true,	//button选中
            	audioCtx: null,	//AudioContext
            	source: null,	//bufferSource
            	gainNode: null,	
            	analyser: null,
            	count: 0,			//计数使用，去除播放缓冲BUG
            	previousRequest: null,	//上一个缓冲
            	canvasCtx: null,		//canvas context
            	previousVolume: 0, 	//静音前音量
				index: 0,		//list列表序号；
				casWid: 0,		//canvas的宽度
				casHei: 0		// canvas height
            };
        },

        computed: {
        	playButtonClassName: function(){	//让播放键样式和播放状态保持一致；
        		return'el-icon-' + (this.played ? 'pause' : 'play');
        	},
        	volumeClassName: function(){
        		return'el-icon-' + (this.muted ? 'mute' : 'volume');
        	}
        },

        mounted: function(){
			let _this = this;
			let canvas = this.$refs.canvas;	//获取canvas元素；
			updateCanvasSize();
        	this.canvasCtx = canvas.getContext('2d');
        	this.audioCtx = new window.AudioContext();
        	this.gainNode = this.audioCtx.createGain();
        	this.analyser = this.audioCtx.createAnalyser();
        	this.analyser.fftSize = this.size * 2;
        	this.gainNode.gain.value = 0.6;
        	this.analyser.connect(this.gainNode);
        	this.gainNode.connect(this.audioCtx.destination);
        	this.$http.get('http://localhost:5000/getList.json').then(function(result){
        	    if(result.body.code === 0){
        	   	  _this.list = result.body.list;
        	    }
        	},(err) => {
				throw err;
			});
        	window.onresize = () => {	//当浏览器size变化时，实时更新canvas大小；
				updateCanvasSize();
			};

			window.addEventListener('unhandledrejection', (event) => {
				if(event.reason && event.reason.ignoreUnhandledRejection){
					event.preventDefault();
				}
			});			

			function updateCanvasSize(){
				let canvas = _this.$refs.canvas;	//获取canvas元素；
				let canvasWrap = _this.$refs.canvasWrap.$el;//获取canvas父元素；
				canvas.width = canvasWrap.clientWidth - 40;
				canvas.height = canvasWrap.clientHeight - 40;
				_this.casWid = canvas.width;
				_this.casHei = canvas.height;
			}
        },

        beforeDestroy: function(){	//页面销毁前事件；
        	this.audioCtx.close();
        },

        methods: {
        	listToPlay: function(event){	//list点击事件；
        		let tgt = event.target;
        		this.index = tgt.dataset.index;
				this.buffer(tgt.title);
				// TODO: 增加选取本地音乐歌曲的功能
				// this.fileRead(tgt.title);	
				if(this.isDot){
					this.dots = this.getdots(this.casWid,this.casHei);
				}
				let cancelFrame = window.canceltAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
				cancelFrame(this.aID);	//cancel previous animation,solve the bug in mode of 'dot': the velocity is too high
        		this.visualizer();	//执行可视化；
        	},

        	buffer: function(name){	//请求并解码buffer;
        		let num = ++this.count;
				this.source && this.source.stop();
				// TODO: 解决 uncaught (in promise)
        		this.$http.get('http://localhost:5000/media/' + name,{'responseType': 'arraybuffer',
        		    //use before callback;
        		    before(request){
        		    	if(this.previousRequest){
        		    		this.previousRequest.abort();
        		    	}
						this.previousRequest = request;
        		    }
        		}).then((rst) => {
						if(num !== this.count)return;	//在上首歌曲未缓冲播放时，点击后会中断上次请求处理；

        				let cancelFrame = window.canceltAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
        				let source = this.audioCtx.createBufferSource();
     					this.audioCtx.decodeAudioData(rst.data,(buffer) => {
     						if(num !== this.count)return;
	 	    				source.buffer = buffer;
	 	    				source.connect(this.analyser);
	 	    				source.start(0);
	 	    				this.played = true;
	 	    				this.source = source;
	 	    				source.onended = () => {
	 	    					console.log('this source has ended');
	 	    					cancelFrame(this.aID);		//音乐结束时，取消animation，优化性能；
	 	    					this.canvasCtx.clearRect(0,0,10000,10000);	//清屏
	 	    					this.buffer(this.list[++this.index]);
	 	    					this.visualizer();	//执行可视化；
	 	    				};
     					});
					});
			},
			
			fileRead(src){
				let fileReader = new FileReader();
				fileReader.readAsArrayBuffer(src);
				fileReader.onload = function(e){
					console.log(e.target);
				};
			},
        	playButton: function(evt){
        		let cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFramei;
        		if(this.played){
        			this.audioCtx.suspend();	//audio挂起；
        			cancelAnimationFrame(this.aID);
        		}else{
        			this.audioCtx.resume();
        			this.visualizer();
        		}
        		this.played = !this.played;
        	},

        	switchMute: function(evt){	//音量键mute切换；
        		let gain =	this.gainNode.gain;
        		if(this.muted === true){
        			gain.value = this.previousVolume;	//'gain.value' is the volume of web audio;
        			this.value = gain.value * this.max;		// 'this.value' is the value of el-slider;
        		}else{
        			//'this.previousVolume' is the volume before it become mute
        			this.previousVolume = gain.value;	
        			gain.value = 0;
        			this.value = 0;
        		}
        		this.muted = !this.muted;
        	},

        	//    
        	changeVolume: function(){	
        		// let cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFramei;
        		this.gainNode.gain.value = this.value / this.max;
        		if(this.value === 0){ //通过className的改变来调整mute；
        			this.muted = true;
        		}else{
        			this.muted = false;
        		}
        	},

        	visualizer(){
        		let size = this.size;
        		let arr = new Uint8Array(this.analyser.frequencyBinCount);
        		let requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        		let wid = this.$refs.canvas.width / size;
        		let hei = this.$refs.canvas.height;
    			//创建渐变线；
    			let line = this.canvasCtx.createLinearGradient(0,hei,0,0);
    			line.addColorStop(0,'red');
    			line.addColorStop(0.3,'#2CE756');
    			line.addColorStop(0.8,'#1B11AE');
    			line.addColorStop(1,'#A2F319');
        		let visual = () => {
        			this.tst++;
        			let cas = this.$refs.canvas;
        			wid = cas.width / size;
        			hei = cas.height;
        			this.analyser.getByteFrequencyData(arr);
        			this.canvasCtx.clearRect(0,0,wid * size,hei);	//清屏，让canvas产生动画效果；
        			if(!this.isDot){
				    	for(let i = 0; i < size; i++){
							this.canvasCtx.fillStyle = line;
				    		this.canvasCtx.fillRect(wid * i,hei,0.5 * wid,-arr[i] / 256 * hei * 0.95);
				    	}
        			}else if(this.isDot){
        				for(let i = 0; i < size; i++){
        					let x = this.dots[i].x;	//dot绘制原点x；
        					this.dots[i].x += this.dots[i].dx;	//让dot移动；
        					if(this.dots[i].x > wid * size){
        						this.dots[i].x = 0;	
        					}
        					let y = this.dots[i].y;	//dot绘制原点y；
        					let r = 10 + arr[i] / 256 * 30;	//dot绘制半径；
        					//创建环形渐变色；
        					let radial = this.canvasCtx.createRadialGradient(x,y,5,x,y,r);
        					radial.addColorStop(0,'#fff');
        					radial.addColorStop(1,this.dots[i].color);
        					this.canvasCtx.beginPath();
	    					this.canvasCtx.fillStyle = radial;
        					this.canvasCtx.arc(x,y,r,0,2 * Math.PI,false);
        					this.canvasCtx.fill();
        				}
        			}
        			this.aID = requestAnimationFrame(visual);
        		};
        		this.aID = requestAnimationFrame(visual);
        	},

        	switchStyle(evt){
        		let target = evt.target;
        		// 点击改变DOT和Column的样式；
        		if(!target.classList.contains('check')){	//当点击的按钮class中不带check；
					this.isDot = !this.isDot;
        			if(this.isDot){
        				this.dots = this.getdots(this.casWid,this.casHei);
        			}
        		}
        	},

        	cRandom(m,n){
        		return Math.random() * (n - m) + m;
        	},

        	getdots(wid,hei){	//获取随机dot位置与颜色；
        		let dots = [];
        		let dot;
        		for(let i = 0; i < this.size; i++){
        			dot = {
        				x: this.cRandom(0,wid),
        				y: this.cRandom(0,hei),
        				dx: this.cRandom(0,1),
        				color: 'rgb(' + this.cRandom(0,255) + ',' + this.cRandom(0,255) + ',' + this.cRandom(0,255) + ',0.3)'
        			};
        			dots.push(dot);
        		}
        		return dots;
        	}
        }
    };
</script>

<style type="text/css" lang="less" >
	#demo6{

		.el-slider{
			width: 100px;
			display: inline-block;
			height: 10px;

			.el-slider__runway{
				margin:0px;
				height:5px;
			}

			.el-slider__button{
				width:12px;
				height:12px;
			}
		}
		.el-col{
			height:100%; 
			border-right: 1px solid #F9F1F1;
			background: rgba(0, 0, 0, 0.7);
		}
		.el-col-20{
			border: none;

		}

		// 自定义滚动条样式；
		::-webkit-scrollbar{
			width:10px;
			// height:10px;
			background-color:#FFF;
		}
		::-webkit-scrollbar-thumb{
			width:10px;
			// height:6px;
			border-radius: 10px;
			background-color:#409EFF;
		}		
	}
</style>

<style lang="less" scoped>
	#demo6{
		height:100%;
		box-sizing: border-box;
		text-align: left;
		
		i{	//音量键；
			margin-right: 15px;
			display: inline-block;
			font-size: 20px;
			color:#fff;
			&:hover{
				color:rgba(255, 255, 255, 0.8)
			}
		}

		#header{
			height: 20%;
			min-height: 100px;
			text-align: center;
			background:rgba(0, 0, 0, 0.7);
			border-bottom: 1px solid #F9F1F1;
			#controler{	//控制条；
				display: inline-block;
				#visualStyle{	
					margin-top: 10px;
				}

				#volume{	//音量条
					margin-top: 20px;
					width: 300px;
					text-align: center;
					line-height: 10px;
					// border: 1px solid #fff;

				}
			}

			h1{
				color: rgb(255, 255, 255);
			}
			button{
				margin-left:0px;
				padding: 4px 8px;
				border: none;
				background:rgba(0, 0, 0, 0.8);
				color:#fff;
				border: 1px solid #fff;
				outline: none;
			}
			#dot{
				border-radius: 4px 0px 0px 4px;
			}
			#column{
				border-radius: 0px 4px 4px 0px;
			}
			.check{
				background: #fff;
				color:#000;
			}
		}
		#main{
			height: 80%;
			.title{
				font-weight: bold;
				font-size: 20px;
			}
		}
		#list{
			overflow: auto;
		}
		li{
			list-style: none;
			text-align: left;
			margin-top: 5px;
			font-size:12px;
			line-height: 1.5em;
			height:1.5em;
			color:#fff;
			overflow: hidden;
			white-space: nowrap;	//文本不换行；
			text-overflow: ellipsis;	//显示省略号
			padding:5px;
			&:hover{
				background: rgba(0, 0, 0, 0.5);
			}
		}
		
		canvas{
			display: block;		//设置canvas为block，防止inline元素受baseline影响导致布局异常；
			width: 100%;
			height: 100%;
		}

	}

</style>
