<template>
  <div id="app">
    <el-container style='height: 100%;'>
      <el-header>小鬼头的小练习</el-header>
      <el-container style=' flex: 1 1 auto; padding: 0px 20px;'>
        <el-aside width='220px'>
          <el-menu :default-active='activeIndex' active-text-color='#409EFF'  router>
            <h1>小demo</h1>
            <el-menu-item v-for='item of navi' :index='item.index' :key='item.index' :title='item.tip'>{{item.title}}</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import Data from'./data.js';
export default {
	name: 'App',
  data(){
    return{
      activeIndex: 'demo1',
      navi: Data.navi
    };
  }
};
</script>

<style lang='less'>
  *{
    padding:0px;
    margin:0px;
  }
  html,body{
      height: 100%;
      margin:0px;
      padding: 0px;
  }
  .clearfix::after{
      content:'';
      display: block;
      width: 0px;
      height: 0px;
      clear: both;
    }
  .clearfix{
        *zoom:1;
      }
</style>

<style lang='less' scoped>
  #app {
    font-family: 'Avenir', 'Helvetica', 'Arial',' sans-serif';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    font-size:18px;

    .el-header{
      background:#909399;
      color: #303133;
      font-size: 30px;
      font-weight: bold;
      line-height:60px;
    }
    .el-aside{
      border:1px solid #E8E5E5;
      // border:3px solid #D8181 8;
    }
    .el-footer{
      background:#909399;
    }
    .el-menu{
      text-align: left;
      text-indent: 1em;
      border: 0px;
      h1{
        font-size:20px;
        line-height:40px;

      }
      .el-menu-item{
        line-height:40px;
        height: 40px;
      }

    }
    .el-main{
      padding: 5px;
      overflow: visible;
    }
  }
</style>
