<template>
    <div class='album spin'>
		<img :src="images[1].src" alt="图片无法找到" id="img1" />
		<img :src="images[2].src" alt="图片无法找到" id="img2" />
		<img :src="images[3].src" alt="图片无法找到" id="img3" />
		<img :src="images[4].src" alt="图片无法找到" id="img4" />
		<img :src="images[5].src" alt="图片无法找到" id="img5" />
		<img :src="images[6].src" alt="图片无法找到" id="img6" />
    </div>
</template>

<script>
    export default {
        name: 'Demo5',
        data(){
            return{
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
		    	]
            };
        }
    };
</script>

<style lang="less" scoped>
		.spin {
			animation: my-spin 20s linear infinite;
		}

		@keyframes my-spin {
			0% {
				transform: rotateX(2deg) rotateY(0deg);
			}
			100% {
				transform: rotateX(2deg) rotateY(360deg);
			}
		}
	.album{
		position:relative;
		width: 400px;
		height: 400px;
		// border: 2px solid #000;
		margin:0 auto;
		transform-style: preserve-3d;
		transform: rotateX(2deg);
		perspective: 9999px;
		
		img{
			position: absolute;
			width: 200px;
			height: 200px;
			top:100px;
			left:100px;
			color:blue;
			backface-visibility:visible;

		}
		

	}	

	#img1{
		transform: rotateX(0deg) translateZ(200px);
	}
	#img2{
		transform: rotateY(60deg) translateZ(200px);
	}
	#img3{
		transform: rotateY(120deg) translateZ(200px);
	}
	#img4{
		transform: rotateY(180deg) translateZ(200px);
	}
	#img5{
		transform: rotateY(240deg) translateZ(200px);
	}
	#img6{
		transform: rotateY(300deg) translateZ(200px);
	}
</style>
