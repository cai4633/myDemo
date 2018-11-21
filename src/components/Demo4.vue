<template>
	<div>
		<el-row :gutter='10'>
			<el-col :span="6" v-for='image of images' :key='image.key' ><img :src='image.src' @mousemove.self='showDetails' @mouseout='show=false' ></el-col>
		</el-row>
		<div id="details" v-if='show' :style='{top:top,left:left}'>
			<img :src="src" :width='imgWidth' ref='detailsImg'>
		</div>
	</div>
</template>

<script>
export default {
  name:'Demo4',
  data(){
    return {
    	images:[
    		{
    			key:1,
    			src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542819064680&di=3101c979b3e4343c358a2b2ff569d733&imgtype=0&src=http%3A%2F%2Fp0.ifengimg.com%2Fpmop%2F2018%2F1012%2FA2D317ECE34F008B2362E5E0BA47FC521B93C5C7_size93_w1000_h587.jpeg'
    		},
    		{
    			key:2,
    			src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542819064680&di=77501557a4da4214516ffed97d5ac8e6&imgtype=0&src=http%3A%2F%2F00imgmini.eastday.com%2Fmobile%2F20181018%2F20181018020857_b0483443db9ba177b4ad36915f35deb9_2.jpeg'
    		},
    		{
    			key:3,
    			src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542819343138&di=4a45fbeb450146e3c303e7f1113d3c08&imgtype=0&src=http%3A%2F%2Fpic2.orsoon.com%2F2017%2F0726%2F20170726090559939.png'
    		},
    		{
    			key:4,
    			src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542819343134&di=61a5888567afe9280c2a5cb97df5feb4&imgtype=0&src=http%3A%2F%2Ftc.sinaimg.cn%2Fmaxwidth.2048%2Ftc.service.weibo.com%2Fp1_pstatp_com%2F95eaefe91f2c75e196c78033c623588b.jpg'
    		}
    	],
    	show:false,
    	top:0,
    	left:0,
    	src:'',
    	imgWidth:0
    };
  },
  methods:{
  	showDetails:function(evt){
  		let oleft=this.$el.offsetLeft;
  		let otop=this.$el.offsetTop;	//获取当前窗口相对于浏览器可视区域的left和top；
  		let owidth=this.$el.offsetWidth;
  		this.show=true;
  		this.top=evt.clientY-otop+15+'px';
  		this.left=evt.clientX-oleft+15+'px';
  		this.src=evt.target.src;
  		this.imgWidth=0.6*owidth;	//详情图片的宽度设为main窗口宽度的60%；
  	}
  }
};
</script>
<style lang="less" scoped>
	div{
		position: relative;

		.el-col img{
			width:100%;
			height: 150px;
			&:hover{
				cursor: pointer;
			}
		}

		#details{
			position: absolute;
		}
		
	}
</style>
