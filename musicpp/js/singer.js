(function(){
	var pageSinger=document.querySelector('#page-singer');
	var listSingers=document.querySelector('#listSingers');
	var listSinger=document.querySelector('.listSinger');
	var container=document.querySelector('.page-container');
	var singerBack=document.querySelector('#singerBack');
	var listSingerName=document.querySelector('#listSingerName');
	var singerAll=null;
	var singerMyData=document.querySelector('.singerMyData');
	var listSinger=document.querySelector('.listSinger');
	var singerDataBack=document.querySelector('.singerMyDataTitle>div');
	var SingerHeader=document.querySelector('#SingerHeader');
	var TitleName=document.querySelector('#TitleName');
	var SingerName=document.querySelector('#SingerName');
	var SingerSex=document.querySelector('#SingerSex');
	var SingerHeight=document.querySelector('#SingerHeight');
	var SingerStar=document.querySelector('#SingerStar');
	var SingerArea=document.querySelector('#SingerArea');
	var SingerBirth=document.querySelector('#SingerBirth');
	var SingerRemark=document.querySelector('#SingerRemark');

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
	//加载所有歌手分类
	loadSingerAddress();
	function loadSingerAddress(){
		ajax.get({
			url:'http://101.200.58.3/htmlprojectwebapi/SingerRegion/list',
			success:function(response){
				if(response.Code == 100){
					var singerClassify = response.Data;
					loadsingerClassify(singerClassify);
				}
			}
		});		
	}
	function loadsingerClassify(singerClassifyData){
		// console.log(singerClassifyData);
		for (var i = 0; i < singerClassifyData.length; i++) {
	        var listLi = createSingerClassifyRow(singerClassifyData[i]);
	        pageSinger.appendChild(listLi);
	    }
	}
	function createSingerClassifyRow(listData){
		var singerClassifyLi=document.createElement('div');
		singerClassifyLi.className='singerList';

		var singerClassifyName=document.createElement('span');
		singerClassifyName.innerText=listData.Name;
		singerClassifyLi.appendChild(singerClassifyName);

		var singerClassifyIcon=document.createElement('i');
		singerClassifyIcon.className='fa fa-chevron-right';
		singerClassifyLi.appendChild(singerClassifyIcon);

		var singerBtn=singerClassifyIcon.parentNode;
		singerBtn.onclick=function(){
			listSinger.style.display='block';
			listSingerName.innerText=listData.Name;
			addClass(listSinger,'right-in');
			addClass(container,'left-out');			
			singerBack.onclick=function(){
				addClass(listSinger,'right-out');
				addClass(container,'left-in');

				removeClass(container,'left-out');
				removeClass(listSinger,'right-in');

			}
			removeClass(listSinger,'right-out');
			removeClass(container,'left-in');
			
			var nowSinger= this.firstChild.innerText;
			// console.log(nowSinger);
			//将分类后的数据放入result中
			var result = singerAll.filter(function(item){
				return item.RegionName == nowSinger;
			});
			// console.log(result);
			loadAllSingers(result);
		}
		return singerClassifyLi;
	}
	//加载所有的歌手
	loadAllSinger();
	function loadAllSinger(){
		ajax.get({
			url:'http://101.200.58.3/htmlprojectwebapi/singer/list',
			success:function(response){
				if(response.Code == 100){
					singerAll=response.Data;
					loadAllSingers(singerAll);
				}
			}
		});	
	}
	function loadAllSingers(singerData){
		listSingers.innerHTML = '';
		for(let i = 0 ;i < singerData.length; i++){
			var item = createSingerAll(singerData[i]);
			listSingers.appendChild(item);
		}
	}
	function createSingerAll(singerItem){
		var singerAllLi=document.createElement('li');

		var singerImg=document.createElement('img');
		singerImg.src=singerItem.Header;
		singerAllLi.appendChild(singerImg);

		var singerName=document.createElement('span');
		singerName.innerText=singerItem.Name;
		singerAllLi.appendChild(singerName);

		var singerAllIcon=document.createElement('i');
		singerAllIcon.className='fa fa-chevron-right';
		singerAllLi.appendChild(singerAllIcon);

		var mySingerData=singerAllIcon.parentNode;

		var singerdataItem=singerItem;
		mySingerData.onclick=function(){
			// console.log(singerdataItem);
			singerMyData.style.display='block';

			SingerHeader.src=singerdataItem.Header;
			TitleName.innerText=singerdataItem.Name;
			SingerName.innerText=singerdataItem.Name;
			SingerSex.innerText=singerdataItem.Sex;
			SingerHeight.innerText=singerdataItem.Height;
			SingerStar.innerText=singerdataItem.Star;
			SingerArea.innerText=singerdataItem.RegionName;
			SingerBirth.innerText=singerdataItem.Birthday;
			SingerRemark.innerText=singerdataItem.Remark;

			addClass(singerMyData,'right-in');
			addClass(listSinger,'left-out');
			
			singerDataBack.onclick=function(){

				addClass(singerMyData,'right-out');
				addClass(listSinger,'left-in');

				removeClass(listSinger,'left-out');
				removeClass(singerMyData,'right-in');
			}

			removeClass(listSinger,'right-in');
			removeClass(singerMyData,'right-out');
			removeClass(listSinger,'left-in');

		}
		removeClass(singerMyData,'left-out');

		return singerAllLi;
	}


})();