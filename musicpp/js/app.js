(function(){
	document.querySelector('html').style.fontSize=screen.width/12+'px';
	var imagesIndex=0;
	var points=document.querySelectorAll('.point div');
	var imgs=document.querySelectorAll('.ad img');
	var songList=document.querySelector('#songs');
	var singerList=document.querySelector('#singers');
	var loadImg=document.querySelector('.loadNow');
	var indexAct=document.querySelector('.page-nav');
	var change=document.querySelectorAll('.page-nav>div');
	var pageChange=document.querySelectorAll('.page-main>div')
	var homeBtn=document.querySelector('#homeBtn');
	var paradeBtn=document.querySelector('#paradeBtn');
	var singerBtn=document.querySelector('#singerBtn');
	var listSongImg=document.querySelector('#listSongImg');

	
	
	//加载首页
	loadHome();
	function loadHome(){
		//轮播图
		loadAd();
		//加载新歌速递
		loadNewSong();
		//加载热门歌手
		loadHotSonger();
	}

	//轮播图左移	
	function loadAd(){
		for(var i=0;i<points.length;i++){
			pointsChange(i);
		}
	}
	function leftMove(){
		points[imagesIndex].className='';
		
		imgs[imagesIndex].className='left-out';
		imagesIndex++;
		if(imagesIndex>=imgs.length){
			imagesIndex=0;
		}
		imgs[imagesIndex].className='right-in';
		points[imagesIndex].className='actived';
	}

	var time=setInterval(leftMove,3000);
	//切换导航点
	function pointsChange(count){
		points[count].onclick=function(e){
			var index=-1;
			for(var j=0;j<points.length;j++){
				if(points[j]==this){
					index=j;
					break;
				}
			}
			if(imagesIndex==index){
				return;
			}
			points[imagesIndex].className='';
			this.className='actived';

			if(index>imagesIndex){
				imgs[imagesIndex].className = 'left-out';
				imgs[index].className = 'right-in';

			}
			else{
				imgs[imagesIndex].className = 'right-out';
				imgs[index].className = 'left-in';
			}
			if(time){
				clearInterval(time);
			}
			imagesIndex=index;
			time=setInterval(leftMove,3000);
		}
	}

	//加载新歌速递
	function loadNewSong(){
		ajax.get({
			url:'http://101.200.58.3/htmlprojectwebapi/song/new',
			success:function(response){
				if(response.Code == 100){
					var newSongs = response.Data;
					loadNewSongList(newSongs);
				}
			},
	 		startup:function(e){
	 			loadImg.style.display = 'block';
	 		},
	 		completed:function(e){
	 			setTimeout(function(){
	 				loadImg.style.display = 'none';
	 			} , 1000);
	 		}

		});
	}
	//显示新歌速递数据
	function loadNewSongList(list){
		for(var i = 0 ;i < list.length-1; i++){
			var item = createNewSongItem(list[i]);
			songList.appendChild(item);
		}
	}
	//创建新歌速递数据
	function createNewSongItem(songData){
		var songLi = document.createElement('div');

		var songImg=document.createElement('img');
		songImg.src=songData.Image;
		songLi.appendChild(songImg);
		
		var songName=document.createElement('h4');
		songName.innerText=songData.Name;
		songLi.appendChild(songName);

		return songLi;
	}
	//加载热门歌手
	function loadHotSonger(){
		ajax.get({
			url:'http://101.200.58.3/htmlprojectwebapi/singer/recommend',
			success:function(response){
				if(response.Code == 100){
					var hotsingers = response.Data;
					loadSingerList(hotsingers);
				}
			}
		});
	}
	//显示热门歌手数据
	function loadSingerList(list){
		for(var i = 0 ;i < list.length-1; i++){
			var item = createSingerItem(list[i]);
			singerList.appendChild(item);
		}
	}
	//创建热门歌手数据
	function createSingerItem(singerData){
		var singerLi = document.createElement('div');

		var singerImg=document.createElement('img');
		singerImg.src=singerData.Header;
		singerLi.appendChild(singerImg);

		var singerName=document.createElement('h4');
		singerName.innerText=singerData.Name;
		singerLi.appendChild(singerName);

		return singerLi;
	}
	//切换导航改变样式
	// change[0].className='actived';
	// for(let i=0;i<change.length;i++){
	// 	change[i].onclick=function(e){					
	// 		e.preventDefault();

	// 		var topIndex = this.parentNode.querySelector('.actived');
	// 		if(this == topIndex)
	// 			return;

	// 		topIndex.className = '';
	// 		this.className = 'actived';
	// 	}
	// }
	indexAct.firstChild.className='actived';
	var pageNumber=0;
	for(var i=0;i<change.length;i++){
		changePageContent(i);
	}
	function changePageContent(index){
	change[index].onclick=function(){

			if(pageNumber == index)
				return;

			change[pageNumber].className = '';
			this.className = 'actived';

			if(index>pageNumber){


				pageChange[pageNumber].className = 'left-out';
	
				pageChange[index].className = 'right-in';				

				pageNumber=index;
			}
			else{
				pageChange[pageNumber].className = 'right-out';

				
				pageChange[index].className = 'left-in';


				pageNumber=index;
			}


		}	
	}

	function addClass(oldClass,newClass){
		if(oldClass.className){
			var str=oldClass.className.split(' ');
			if(str.indexOf(newClass)==-1){
				oldClass.className=oldClass.className+' '+newClass;
			}
		}
		else{
			oldClass.className=newClass;
		}
	}
	function removeClass(oldClass,newClass){
		if(oldClass){
			var str=oldClass.className.split(' ');
			var index=str.indexOf(newClass);
			if(index>=0){
				str.splice(index,1);
				oldClass.className=str.join(' ');
			}
		}
	}
})();