webpackJsonp([1],{"+lpX":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("/5sW"),i={navi:[{index:"demo1",title:"星级评分系统"},{index:"demo2",title:"在线计算器"},{index:"demo3",title:""}]},n={name:"App",data:function(){return{activeIndex:"demo1",navi:i.navi}},components:{}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("el-container",{staticStyle:{height:"100%"}},[s("el-header",[t._v("小鬼头的小练习")]),t._v(" "),s("el-container",{staticStyle:{flex:"1 1 auto",padding:"0px 20px"}},[s("el-aside",[s("el-menu",{attrs:{"default-active":t.activeIndex,"active-text-color":"#409EFF",router:""}},[s("h1",[t._v("小demo")]),t._v(" "),t._l(t.navi,function(e){return s("el-menu-item",{key:e.index,attrs:{index:e.index}},[t._v(t._s(e.title))])})],2)],1),t._v(" "),s("el-main",[s("router-view")],1)],1),t._v(" "),s("el-footer")],1)],1)},staticRenderFns:[]};var r=s("VU/8")(n,l,!1,function(t){s("WM3u"),s("nQOR")},"data-v-a02b19b6",null).exports,c=s("/ocq"),o={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"home"},[e("img",{attrs:{src:s("qGrb")}})])}]};var p=s("VU/8")({name:"Home",data:function(){return{}}},o,!1,function(t){s("kXdv")},"data-v-4f71c0ba",null).exports,h={name:"demo1",data:function(){return{leftVal:"0px",showP:!1,arr:[!1,!1,!1,!1,!1],storage:[],clickIfo:"",hoverIfo:"",scores:"",title:"",aMsg:["很不满意|差得太离谱，与卖家描述的严重不符，非常不满","不满意|部分有破损，与卖家描述的不符，不满意","一般|质量一般，没有卖家描述的那么好","满意|质量不错，与卖家描述的基本一致，还是挺满意的","非常满意|质量非常好，与卖家描述的完全一致，非常满意"]}},methods:{clickMsg:function(t){var e=parseInt(t.currentTarget.innerHTML);this.arr=[!1,!1,!1,!1,!1],e&&(this.clickIfo="("+this.aMsg[e-1].match(/\|(.+)/)[1]+")",this.arr=this.arr.map(function(t,s){return s<e}),this.storage=this.arr,this.scores=e+"分")},hoverMsg:function(t){var e=t.currentTarget,s=parseInt(e.innerHTML);this.storage=this.arr,this.title=s+"分 "+this.aMsg[s-1].match(/(.+)\|/)[1],this.hoverIfo=this.aMsg[s-1].match(/\|(.+)/)[1],this.arr=[!1,!1,!1,!1,!1],s&&(s=parseInt(s),this.arr=this.arr.map(function(t,e){return e<s})),this.leftVal=e.offsetLeft+e.offsetWidth/2-90+"px",this.showP=!0},reset:function(){this.arr=this.storage,this.showP=!1}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"demo1"},[s("label",[t._v("点击星星打分：")]),t._v(" "),s("ul",{ref:"ul",staticClass:"clearfix"},[s("li",{class:{checked:t.arr[0]},on:{click:t.clickMsg,mouseover:t.hoverMsg,mouseout:t.reset}},[t._v("1")]),t._v(" "),s("li",{class:{checked:t.arr[1]},on:{click:t.clickMsg,mouseover:t.hoverMsg,mouseout:t.reset}},[t._v("2")]),t._v(" "),s("li",{class:{checked:t.arr[2]},on:{click:t.clickMsg,mouseover:t.hoverMsg,mouseout:t.reset}},[t._v("3")]),t._v(" "),s("li",{class:{checked:t.arr[3]},on:{click:t.clickMsg,mouseover:t.hoverMsg,mouseout:t.reset}},[t._v("4")]),t._v(" "),s("li",{class:{checked:t.arr[4]},on:{click:t.clickMsg,mouseover:t.hoverMsg,mouseout:t.reset}},[t._v("5")])]),t._v(" "),s("span",[s("strong",[t._v(t._s(t.scores))]),t._v(t._s(t.clickIfo))]),t._v(" "),t.showP?s("p",{style:{left:t.leftVal}},[s("span",[t._v(t._s(t.title))]),t._v(t._s(t.hoverIfo))]):t._e()])},staticRenderFns:[]};var v=s("VU/8")(h,u,!1,function(t){s("hmRP")},"data-v-a0642f90",null).exports,d={name:"Demo2",data:function(){return{input1:"0",input2:"",NUM:/^[0-9.]+$/,OPERATOR:/[+\-÷×%=]/,optStack:["#"],temp:[],eqlForbid:!1}},methods:{fn1:function(t){var e=t.target.innerText;if(this.NUM.test(e)&&this.input1.length<8)this.input1=parseFloat(this.input1)?parseFloat(this.input1)+e:e;else if(this.OPERATOR.test(e))if(this.OPERATOR.test(this.input1))alert("运算符输入错误！");else if("="!==e){for(this.eqlForbid||this.temp.push(this.input1);!this.comparison(e,this.optStack[this.optStack.length-1]);){var s=this.optStack.pop();this.computer(s)}this.optStack.push(e),this.input2+=this.input1+e,this.input1=e,this.eqlForbid=!1}else if(!this.eqlForbid){for(this.temp.push(this.input1),this.input2+=this.input1+e;this.optStack.length>1;){var a=this.optStack.pop();this.computer(a)}this.input1=/\d+\.\d{7,}/.test(this.temp[0])?this.temp[0].toFixed(7):this.temp[0],this.eqlForbid=!0}},equalOp:function(){},comparison:function(t,e){var s={"#":0,"+":1,"-":1,"*":1,"/":2,"×":2,"÷":2,"%":2};return s[t]>s[e]},clear:function(){this.input1="0",this.input2="",this.optStack=["#"],this.temp=[],this.eqlForbid=!1},computer:function(t){var e=void 0,s=this.temp;switch(t){case"+":e=parseFloat(s[s.length-2])+parseFloat(s[s.length-1]),this.temp.splice(s.length-2,2,e);break;case"-":e=parseFloat(s[s.length-2])-parseFloat(s[s.length-1]),this.temp.splice(s.length-2,2,e);break;case"×":e=parseFloat(s[s.length-2])*parseFloat(s[s.length-1]),this.temp.splice(s.length-2,2,e);break;case"÷":e=parseFloat(s[s.length-2])/parseFloat(s[s.length-1]),this.temp.splice(s.length-2,2,e);break;case"%":e=parseFloat(s[s.length-2])%parseFloat(s[s.length-1]),this.temp.splice(s.length-2,2,e)}}}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"calc"},[s("el-container",[s("el-header",{attrs:{height:"80px"}},[s("header",[t._v("by-cai4833")]),t._v(" "),s("el-input",{staticClass:"el-input-d",attrs:{readonly:""},model:{value:t.input2,callback:function(e){t.input2=e},expression:"input2"}}),t._v(" "),s("el-input",{staticClass:"el-input-i",attrs:{maxlength:8,type:"text",readonly:""},model:{value:t.input1,callback:function(e){t.input1=e},expression:"input1"}})],1),t._v(" "),s("el-main",[s("el-row",{attrs:{gutter:10}},[s("el-col",{attrs:{span:18}},[s("el-row",{attrs:{gutter:10}},[s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-grey",on:{click:t.clear}},[t._v("c")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-grey",on:{click:t.fn1}},[t._v("%")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-grey",on:{click:t.fn1}},[t._v("÷")])])],1),t._v(" "),s("el-row",{attrs:{gutter:10}},[s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("7")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("8")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("9")])])],1),t._v(" "),s("el-row",{attrs:{gutter:10}},[s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("4")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("5")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("8")])])],1),t._v(" "),s("el-row",{attrs:{gutter:10}},[s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("1")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("2")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v("3")])])],1),t._v(" "),s("el-row",{attrs:{gutter:10}},[s("el-col",{attrs:{span:16}},[s("div",{staticClass:"btn-zero",on:{click:t.fn1}},[t._v("0")])]),t._v(" "),s("el-col",{attrs:{span:8}},[s("div",{staticClass:"btn-black",on:{click:t.fn1}},[t._v(".")])])],1)],1),t._v(" "),s("el-col",{staticClass:"uniqueCol",attrs:{span:6,gutter:10}},[s("el-row",[s("el-col",{staticStyle:{"padding-bottom":"8px"},attrs:{span:24}},[s("div",{staticClass:"btn-grey",on:{click:t.fn1}},[t._v("×")])]),t._v(" "),s("el-col",{staticStyle:{padding:"8px 0px"},attrs:{span:24}},[s("div",{staticClass:"btn-grey",on:{click:t.fn1}},[t._v("-")])]),t._v(" "),s("el-col",{staticStyle:{padding:"8px 0px"},attrs:{span:24}},[s("div",{staticClass:"btn-grey",on:{click:t.fn1}},[t._v("+")])]),t._v(" "),s("el-col",{staticStyle:{padding:"8px 0px"},attrs:{span:24}},[s("div",{staticClass:"btn-yellow",staticStyle:{"line-height":"90px",height:"90px"},on:{click:t.fn1}},[t._v("=")])])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var _=s("VU/8")(d,f,!1,function(t){s("tWrq"),s("+lpX")},"data-v-6cfe2939",null).exports,m=s("zL8q"),g=s.n(m);s("tvR6");a.default.use(c.a),a.default.use(g.a);var k=new c.a({routes:[{path:"/",name:"Home",component:p},{path:"/demo1",name:"demo1",component:v},{path:"/demo2",name:"demo2",component:_}]});a.default.config.productionTip=!1,new a.default({el:"#app",router:k,render:function(t){return t(r)}})},WM3u:function(t,e){},hmRP:function(t,e){},kXdv:function(t,e){},nQOR:function(t,e){},qGrb:function(t,e,s){t.exports=s.p+"static/img/home.eab8195.jpg"},tWrq:function(t,e){},tvR6:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.61bfd1acddc76d482cfc.js.map