(function(){
	window.ajax = {
		get:function(config){
			// 检查参数

			// 封装参数
			var parameters = null;
			if(config.params && typeof(config.params) == 'object'){
				for(let key in config.params){
					if(parameters == null){
						parameters = key + '=' + config.params[key];
					}
					else{
						parameters = parameters + '&' + key + '=' + config.params[key];
					}
				}
			}

			var url = config.url;
			if(parameters){
				url = url + '?' + parameters;
			}
			
			// 实现功能
			var xhr = new XMLHttpRequest();
			xhr.open('GET' , url , true);

			xhr.onloadstart = config.startup;
			xhr.onloadend = config.completed;

			xhr.onreadystatechange = function(e){
				if(this.readyState == 4 && this.status == 200){
					if(config.success && typeof(config.success) == 'function' ){
						config.success(JSON.parse(this.responseText));
					}
				}
			}
			xhr.send(null);
		},
		post:function(config){
			// 检查参数
			// if(!config || typeof(config) !== 'object'){
			// 	throw '参数必须为对象类型';
			// }

			// if(!config.url){
			// 	throw '请提供有效的url';
			// }

			// if(!config.params || typeof(config.params) !== 'object'){
			// 	throw '请求参数必须为对象类型';
			// }

			// 封装参数
			var formData = new FormData();

			for(let key in config.params){
				console.log(key + ':' + config.params[key]);
				formData.append(key , config.params[key]);
			}

			// 实现功能
			var xhr = new XMLHttpRequest();
			xhr.open('POST' , config.url , true);

			xhr.onloadstart = config.startup;
			xhr.onloadend = config.completed;
			xhr.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					if(config.success && typeof(config.success) == 'function'){
						// var response = JSON.parse(this.responseText);
						// if(response.Code == 100){
						// 	config.success(response.Data);
						// }
						// else{
						// 	config.failure(response.Message);
						// }
						config.success(JSON.parse(this.responseText));
					}
					// else{
					// 	throw 'success必须是一个函数类型';
					// }
				}
			}
			xhr.send(formData);
		}
	};
})();