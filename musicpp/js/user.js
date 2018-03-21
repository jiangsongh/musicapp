(function(){
	var userResiger=document.querySelector('#userResiger');
	var userLogin=document.querySelector('#userLogin');
	var registerDialog=document.querySelector('#registerDialog');
	var container=document.querySelector('.page-container');
	var btnRegister=document.querySelector('#btnRegister');
	var outBtn=document.querySelector('#outBtn');
	var verifyBtn=document.querySelector('#verifyBtn');
	var loginDiglog=document.querySelector('#loginDiglog');
	var outLoginBtn=document.querySelector('#outLoginBtn');


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
	//用户注册按钮
	userResiger.onclick=function(){
		registerDialog.style.display='block';
		addClass(registerDialog,'right-in');
		addClass(container,'left-out');			
		outBtn.onclick=function(){
			addClass(registerDialog,'right-out');
			addClass(container,'left-in');

			removeClass(container,'left-out');
			removeClass(registerDialog,'right-in');

		}
		removeClass(registerDialog,'right-out');
		removeClass(container,'left-in');
	}

	//用户登录按钮
	userLogin.onclick=function(){
		loginDiglog.style.display='block';
		addClass(loginDiglog,'right-in');
		addClass(container,'left-out');			
		outLoginBtn.onclick=function(){
			addClass(loginDiglog,'right-out');
			addClass(container,'left-in');

			removeClass(container,'left-out');
			removeClass(loginDiglog,'right-in');

		}
		removeClass(loginDiglog,'right-out');
		removeClass(container,'left-in');
	}
	var loginpassword=document.querySelector('#loginpassword');
	var loginphone=document.querySelector('#loginphone');
	var loginphoneVerify=document.querySelector('#loginphoneVerify');


	//验证手机号码
	function checkLoginPhone(){
		textPhoneHit.innerText='';
		if(loginphone.value.length==0){
			textPhoneHit.innerText='手机号码不能为空';
			return;
		}
		var regPhone=/^1[3578]\d{9}$/;
		if(!regPhone.test(loginphone.value)){
			textPhoneHit.innerText='号码以13/5/7/8开头长度为11位的数字';
			return;
		}
		textPhoneHit.innerText='';
	}

	loginphone.onblur=checkLoginPhone;

	//验证手机号码验证码
	function checkLoginPhoneMa(){
		textVerifyHit.innerText='';
		if(loginpassword.value.length==0){
			textVerifyHit.innerText='验证码不能为空';
			return;
		}
		textVerifyHit.innerText='';
	}

	loginpassword.onblur=checkLoginPhoneMa;

	//验证登录密码
	function checkLoginPwd(){
		textPwdHit.innerText='';
		if(loginpassword.value.length==0){
			textPwdHit.innerText='密码不能为空';
			return;
		}
		var regPhone=/^\w{6,12}$/;
		if(!regPhone.test(loginpassword.value)){
			textPwdHit.innerText='密码为6-12位的非空白字符';
			return;
		}
		textPwdHit.innerText='';
	}

	loginpassword.onblur=checkLoginPwd;
	//表单验证登录
	function loginYan(e){
		tele=checkLoginPhone();
		pwd=checkLoginPwd();
		ma=checkLoginPhoneMa();
	}
	//确定登录按钮
	btnLogin.onclick=function(){
		loginYan();
		var phoneLogin =loginphone.value;
		var passwordLogin =loginpassword.value;
		// var phoneLoginma=loginphoneVerify.value;

		var param = 'phone='+ phoneLogin +'&password=' + passwordLogin;

		// 4-3 请求完成登录
		var xhr = new XMLHttpRequest();
		xhr.open('POST' , 'http://101.200.58.3/htmlprojectwebapi/member/login' , true);
		xhr.setRequestHeader('Content-type' , 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function(e){
			if(this.readyState == 4 && this.status == 200){
				var result = JSON.parse(this.responseText);
				console.log(result.Code);
				if(result.Code == 100){
					console.log('登录成功');
					addClass(loginDiglog,'right-out');
					addClass(container,'left-in');
					removeClass(container,'left-out');
					removeClass(loginDiglog,'right-in');
				}
				if (result.Code==110) {
					textHit.innerText='手机号码或密码不正确';
				}
			}
		}

		xhr.send(param);		
	}




	var password=document.querySelector('#password');
	var phone=document.querySelector('#phone');
	var phoneVerify=document.querySelector('#phoneVerify');
	//验证密码
	function checkPwd(){
		textPwdPrompt.innerText='';
		if(password.value.length==0){
			textPwdPrompt.innerText='密码不能为空';
			return;
		}

		var regPwd=/^\w{6,12}$/;
		if(!regPwd.test(password.value)){
			textPwdPrompt.innerText='密码为6-12位的非空白字符';
			return;
		}
	}
	//移失密码焦点
	password.onblur=checkPwd;
		

	//验证手机号码
	function checkPhone(){
		textPhone.innerText='';
		if(phone.value.length==0){
			textPhone.innerText='手机号码不能为空';
			return;
		}
		var regPhone=/^1[3578]\d{9}$/;
		if(!regPhone.test(phone.value)){
			textPhone.innerText='号码以13/5/7/8开头长度为11位的数字';
			return;
		}
	}
	//移失手机号码焦点
	phone.onblur=checkPhone;


	//验证手机号码验证码
	function checkVerify(){
		textVerify.innerText='';
		if(phoneVerify.value.length==0){
			textVerify.innerText='验证码不能为空';
	
			return;
		}
	}
	//移失手机号码焦点
	phoneVerify.onblur=checkVerify;
	var timeNumber=90;
	//发送验证码
	verifyBtn.onclick=function(){
		var self=this;
		self.disabled=true;
		var timer=window.setInterval(function(){
			timeNumber--;
			if(timeNumber==0){
				self.disabled=false;
				self.innerText='重新发送';
				clearInterval(timer);
			}
			else{
				self.innerText=timeNumber+'秒';
			}
		},1000);
		//获取手机号
		var Resigerphone=phone.value;

		ajax.get({ 
			url:'http://101.200.58.3/htmlprojectwebapi/Message/Send',
			params:{
				phone:Resigerphone
			},
			success:function(response){
				if(response.Code == 100){
					var phoneMa = response;
				}
			}
		});	

	}
	//注册按钮
	btnRegister.onclick=function(){
		var self=this;
		registerYan();

		var Resigterphone=phone.value;
		var ResigterPassword=password.value;
		var ResigerMa=phoneVerify.value;

		var param='phone='+ Resigterphone +'&password='+ ResigterPassword+'&code='+ResigerMa;
		console.log(param);

		// 3-3 发请求，完成注册
		var xhr = new XMLHttpRequest();

		xhr.open('POST' , 'http://101.200.58.3/htmlprojectwebapi/member/RegisterWithVerifyCode' , true);
		xhr.setRequestHeader('Content-type' , 'application/x-www-form-urlencoded');
		xhr.onreadystatechange=function(e){
			if(this.readyState==4&&this.status == 200){
				var result=JSON.parse(this.responseText);
				console.log(result.Code);
				if(result.Code == 100){
					console.log('注册成功');
					addClass(registerDialog,'right-out');
					addClass(container,'left-in');
					removeClass(container,'left-out');
					removeClass(registerDialog,'right-in');
				}
			}
		}
		xhr.send(param);	
	}


	//提交表单前验证
	function registerYan(){
			
		checkPhone();
		
		checkPwd();

		checkVerify();
	}
})();