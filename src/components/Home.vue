<template>
	<div class="home">
		<img src='../assets/home.jpg'>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data(){  
		return{
			list: [],
			xhr: new XMLHttpRequest(),
			url: '../assets/home.jpg',
			song: {}
		};
	},
    methods: {
    	
    }
};
</script>

<style lang="less" scoped>
 div{
 	padding: 0px;
 	margin:0px;
 }
img{
	width: 100%;
}
li{
	list-style: none;
	text-align: left;
	margin-top: 5px;
	width: 20em;
	background: #939393;
	&:hover{
		background: #EAF27C;
	}
}

</style>
