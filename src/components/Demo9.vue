<template>
	<div class="dataView">
		<canvas ref='canvas'>您的浏览器不支持canvas画布</canvas>
		<div>
			<el-button type="primary" icon='el-icon-arrow-left' size='small' @click='preYear'></el-button>
			<el-button type="text" ref='year'>{{year}}</el-button>
			<el-button type="primary" icon='el-icon-arrow-right' size='small' @click='nextYear'></el-button>
		</div>
	</div>
</template>

<script>
export default {
  name: 'Demo4',

  data(){
    return{
    	year: 2010,
    	china: {
    		2005: 100,
    		2006: 200,
    		2007: 400,
    		2008: 500,
    		2009: 600,
    		2010: 700,
    		2011: 900,
    		2012: 1100
    	},
    	usa: {
    		2005: 100,
    		2006: 200,
    		2007: 400,
    		2008: 500,
    		2009: 600,
    		2010: 700,
    		2011: 950,
    		2012: 1120
    	}
    };
  },
  methods: {
  	preYear: function(){
  		let minYear = Math.min(...Object.keys(this.usa));
  		if(this.year > minYear){
  			this.year--;
  		}
  	},
  	nextYear: function(){
  		let maxYear = Math.max(...Object.keys(this.usa));
  		if(this.year < maxYear){
  			this.year++;
  			let area = [this.china[this.year],this.usa[this.year]];
  			console.log(area);
  		}
  	},
  	drawRectAnimation: function(canvas,startY,end,color,speed = 10,stratX = 50,height = 30){
  		let wid = 0;
  		function rd(){
	  		if(wid < end){
				wid += speed;
  				canvas.beginPath();
  				canvas.fillStyle = color;
  				//beginPath()一般要搭配路径来使用，而原生的绘制函数fillRect不需要beginPath();
  				canvas.fillRect(stratX,startY,wid,30); 
  				window.requestAnimationFrame(rd);
	  		} 
  		}
  		window.requestAnimationFrame(rd);//window.requestAnimationFrame的频率跟系统屏幕刷新频率一致；
  	}
  },
  mounted(){
  	let canvas = this.$refs.canvas;
  	const WIDTH = 800;
  	const HEIGHT = 400;
  	canvas.height = HEIGHT;
  	canvas.width = WIDTH;
  	let cvs = canvas.getContext('2d');
	//数据变化；
	this.drawRectAnimation(cvs,10,200,'#49DDCA',1);
	this.drawRectAnimation(cvs,50,400,'red',2);
  }
};
</script>

<style lang="less" scoped>
	div{
		text-align: center;
	}
	canvas{
		border: 1px solid #000;
	}

</style>
