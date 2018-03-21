(function(){
	var songs=[];
	var songsList=document.querySelector('.paradeSong ul');
	var paradeItem=document.querySelectorAll('.paradeText h3');
	var paradeListSong=document.querySelectorAll('.paradeText i');
	var listSongBack=document.querySelector('.listSong>div>div');
	var listSong=document.querySelector('.listSong');
	var container=document.querySelector('.page-container');
	var pagebox=document.querySelector('#page-box');
	var boxBack=document.querySelector('#boxBack');
	var boxTitle=document.querySelector('.boxTitle');
	var boxSinger=document.querySelector('.boxSinger');
	var boxImg=document.querySelector('#boxImg');
	var musicText=document.querySelector('#musicText');
	var musicplay=document.querySelector('#musicplay');
	var state=document.querySelector('#state');
	var moveTime=document.querySelector('#moveTime');
	var totalTime=document.querySelector('#totalTime');
	var state=document.querySelector('#state');
	var bar=document.querySelector('#bar');
	var count=0;
	var nowListSong=[];
	var next=document.querySelector('#next');
	var prev=document.querySelector('#prev');
	var changeState=document.querySelector('#changeState');
	var changflag=0;

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

	loadParadeList();
	//加载分类
	function loadParadeList(){
		ajax.get({
			url:'http://101.200.58.3/htmlprojectwebapi/SongCategory/list',
			success:function(response){
				if(response.Code == 100){
					var paradeList = response.Data;
					createParadeList(paradeList);
				}
			}
		});		
	}
	function createParadeList(item){
		for(let i=0;i<item.length;i++){
			paradeItem[i].innerText=item[i].Name;
			var paradeSongBtn=paradeListSong[i].parentNode;
			paradeSongBtn.onclick=function(){
				// console.log(i);
				listSong.style.display='block';
				listSongImg.src='image/parade0'+(i+1)+'.jpg';
				// console.log(listSongImg.src);
				addClass(listSong,'right-in');
				addClass(container,'left-out');

				listSongBack.onclick=function(){
					addClass(listSong,'right-out');
					addClass(container,'left-in');

					removeClass(container,'left-out');
					removeClass(listSong,'right-in');

					removeClass(listSong,'left-in');
				}
				removeClass(listSong,'right-out');
				removeClass(container,'left-in');
				
				//记录当前点击分类
				var nowClassifySong = this.firstChild.innerText;
				// console.log(nowClassifySong);
				//将分类后的数据放入result中
				var result = songs.filter(function(item){
					return item.CategoryName == nowClassifySong;
				});
				fillSongsData(result);
				nowListSong=result;
			}
		}
	}

	//加载所有歌曲
	loadAllSongs();
	function loadAllSongs(){
		ajax.get({
			url:'http://101.200.58.3/htmlprojectwebapi/Song/list',
			success:function(response){
				if(response.Code == 100){
					songs = response.Data;
					fillSongsData(songs);
				}
			}
		});		
	}
	function fillSongsData(dataset){
		songsList.innerHTML = '';

		for(let i = 0 ;i < dataset.length; i++){
			var row = createSongDataRow(dataset[i] , i);
			songsList.appendChild(row);
		}
	}
	function createSongDataRow(item,index){
		var songli=document.createElement('li');

		var songIdDiv=document.createElement('div');
		songIdDiv.className='songId';
		songli.appendChild(songIdDiv);
		var songIdNumber=document.createElement('span');
		songIdNumber.innerText=1+index+'.';
		songIdDiv.appendChild(songIdNumber);

		var songNameDiv=document.createElement('div');
		songNameDiv.className='songInformation';
		songli.appendChild(songNameDiv);

		var songName=document.createElement('h5');
		songName.innerText=item.Name;
		songNameDiv.appendChild(songName);

		var singerh=document.createElement('h6');
		songNameDiv.appendChild(singerh);
		var songh=document.createElement('span');
		songh.innerText=item.Name+'-';
		singerh.appendChild(songh);
		var singerNa=document.createElement('span');
		singerNa.innerText=item.SinerName;
		singerh.appendChild(singerNa);

		var songBtn=document.createElement('div');
		songBtn.className='songBtnOn';
		songli.appendChild(songBtn);

		var songBtnI=document.createElement('i');
		songBtnI.className='fa fa-play-circle-o';
		songBtn.appendChild(songBtnI);

		var songLink=songBtnI.parentNode.parentNode;

		songLink.onclick=function(){
			pagebox.style.display='block';
			addClass(pagebox,'right-in');
			addClass(listSong,'left-out');

			var boxData=item;

			boxTitle.innerText=boxData.Name;
			boxSinger.innerText=boxData.SinerName;
			boxImg.src=boxData.Image;
			musicText.innerText=boxData.Word;
			musicplay.src=boxData.Resource;
			count=index;

			musicplay.play();
			//总时间

			state.src='image/stop.png';

			var flag=0;
			//播放，暂停
			state.onclick=function(){
				if(flag==0){
					state.src='image/play.png';
					musicplay.pause();
					flag=1;
					
				}
				else{
					state.src='image/stop.png';
					musicplay.play();
					flag=0;
				
				}
			}
			//返回
			boxBack.onclick=function(){

				addClass(pagebox,'right-out');
				addClass(listSong,'left-in');

				removeClass(listSong,'left-out');
				removeClass(pagebox,'right-in');
			}

			removeClass(listSong,'right-in');
			removeClass(pagebox,'right-out');
			removeClass(listSong,'left-in');

		}
		removeClass(pagebox,'left-out');
	
		return songli;
	}

	musicplay.onloadeddata=function(){
		var time=Math.floor(this.duration);
		var time1=Math.floor(time/60);
		var time2=Math.floor(time%60);
		var countTime=time1+':'+time2;
		totalTime.innerText=countTime;
	}
	//进度条，进度时间
	musicplay.ontimeupdate=function(){
		var time=Math.floor(this.currentTime);
		var time1=Math.floor(time/60);
		var time2=Math.floor(time%60);
		var countTime=time1+':'+time2;
		
		moveTime.innerText=countTime;
		var percent=(this.currentTime/this.duration*100)+'%';
		bar.style.width=percent;
	}

	
	//切换
	changeState.onclick=function(){
		if(changflag==0){
			changeState.src='image/playBox05.png';
			changflag=1;

			randomprevBtn();
			randomnextBtn();
		}
		else{
			changeState.src='image/playBox04.png';
			changflag=0;
			
			// prevBtn();
			// nextBtn();
		}
	}


	function randomprevBtn(){
		prev.onclick=function(e){
			count=Math.floor(Math.random()*(nowListSong.length));
			reSong();
			state.src='image/stop.png';
			boxTitle.innerText=nowListSong[count].Name;
			boxSinger.innerText=nowListSong[count].SinerName;
			boxImg.src=nowListSong[count].Image;
			musicText.innerText=nowListSong[count].Word;
		}
	}
	function randomnextBtn(){
		
		next.onclick=function(e){
			count=Math.floor(Math.random()*(nowListSong.length));
			reSong();

			boxTitle.innerText=nowListSong[count].Name;
			boxSinger.innerText=nowListSong[count].SinerName;
			boxImg.src=nowListSong[count].Image;
			musicText.innerText=nowListSong[count].Word;
		}
	}

	//歌曲自动下一首
	repeateSong();
	prevBtn();
	nextBtn();

	function repeateSong(){
	musicplay.onended=function(){
		// console.log(count);
			if(count<nowListSong.length-1){
				count++;
			}
			else{
				count=0;
			}
			reSong();
		}
	}
	//上一首
	function prevBtn(){
		prev.onclick=function(e){
			if(count>0){
				count--;
			}
			else{
				alert('已经是第一首了');
			}
			reSong();
			state.src='image/stop.png';
			boxTitle.innerText=nowListSong[count].Name;
			boxSinger.innerText=nowListSong[count].SinerName;
			boxImg.src=nowListSong[count].Image;
			musicText.innerText=nowListSong[count].Word;
		}
	}

	
	//下一首
	function nextBtn(){
		next.onclick=function(e){
			if(count<nowListSong.length-1){
				count++;
			}
			else{
				alert('已经到最后一首了');
			}
			reSong();
			

			boxTitle.innerText=nowListSong[count].Name;
			boxSinger.innerText=nowListSong[count].SinerName;
			boxImg.src=nowListSong[count].Image;
			musicText.innerText=nowListSong[count].Word;
		}
	}

	
	//播放歌曲
	function reSong(){
		boxTitle.innerText=nowListSong[count].Name;
		boxSinger.innerText=nowListSong[count].SinerName;
		boxImg.src=nowListSong[count].Image;
		musicText.innerText=nowListSong[count].Word;
		musicplay.src=nowListSong[count].Resource;
		musicplay.play();
	}




})();