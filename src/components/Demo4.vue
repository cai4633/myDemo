<template>
  <div class="demo4">
    <el-row :gutter="10">
      <el-col :span="6" v-for="image of images" :key="image.key">
        <img :alt="image.key" :src="image.src" @mousemove.self="showDetails" @mouseout="show=false" :style="{cursor:cursor}" />
      </el-col>
    </el-row>
    <transition name="move">
      <div v-if="show" :style="{top:top,left:left}" id="details">
        <img :src="src" :width="imgWidth" ref="detailsImg" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Demo4',
  data(){
    return{
      cursor: 'pointer',
      pointer: true,
      images: [
        {
          key: 1,
          src: '/static/images/lyf1.jpg'
        },
        {
          key: 2,
          src: '/static/images/lyf2.jpg'
        },
        {
          key: 3,
          src: '/static/images/lyf3.jpg'
        },
        {
          key: 4,
          src: '/static/images/lyf4.jpg'
        },
        {
          key: 5,
          src: '/static/images/lyf5.jpg'
        },
        {
          key: 6,
          src: '/static/images/lyf6.jpg'
        },
        {
          key: 7,
          src: '/static/images/lyf7.jpg'
        },
        {
          key: 8,
          src: '/static/images/lyf8.jpg'
        }
      ],
      show: false,
      top: '0px',
      left: '0px',
      src: '',
      imgWidth: 0
    };
  },
  methods: {
    showDetails: function(evt){
      let oleft = this.$el.offsetLeft;
      let otop = this.$el.offsetTop; //获取当前窗口相对于浏览器可视区域的left和top；
      let owidth = this.$el.offsetWidth;
      let oheight = document.body.clientHeight; // 获取浏览器可视窗口高度
      let imgHeight;
      this.src = evt.target.src;
      this.show = true;
      this.imgWidth = 0.5 * owidth;
      //当鼠标位于页面左半部分，让图片显示在鼠标右侧，否则让图片显示在鼠标左侧
      this.left = evt.clientX - oleft < 0.5 * owidth ? evt.clientX - oleft + 15 + 'px' : evt.clientX - oleft - this.imgWidth - 5 + 'px';
      this.$nextTick(() => {
        imgHeight = this.$refs.detailsImg.height;
        //当鼠标位于页面上半部分，让图片显示在鼠标下侧，否则让图片显示在鼠标上侧
        //this.$parent.$el.scrollTop 获取el-main滚动条的高度；
        this.top = oheight - 30 - evt.clientY > imgHeight ? evt.pageY - otop + 15 + this.$parent.$el.scrollTop + 'px' : evt.pageY - otop + this.$parent.$el.scrollTop - 5 - imgHeight + 'px'; 
		});
    }
  }
};
</script>
<style lang="less" scoped>
.demo4 {
  position: relative;
  overflow: visible;
  height: 100%;
  box-sizing: border-box;
  .el-col img {
    width: 100%;
    height: 150px;
  }

  #details {
    position: absolute;
    z-index: 100;
  }
  .move-enter,.move-leave-to {
    opacity: 0;
  }
  .move-enter-to,.move-leave {
    opacity: 1;
  }
  .move-enter-active,.move-leave-active {
    transition: all 0.2s linear;
  }
}
</style>
