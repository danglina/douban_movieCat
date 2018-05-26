

(function (angular) {
	'use strict'

	var http = angular.module('movieCat.http',[]);
	http.service('HttpService',['$window','$document',function ($window,$document) {
		this.jsonp = function (url,data,callback) {

			var querystring = url.indexOf('?')==-1 ? '?' : '&';
			for(var key in data){
				querystring += key + '='+ data[key] +'&'
			}

            // 添加此处主要作用是干掉之前的自己,防止页面与许多的script脚本
			var suffix = Math.random().toString().replace('.','');
			var cbName = 'danglina_jsonp_make_'+suffix;
			querystring += 'callback=' +cbName;
			var script_make = $document[0].createElement('script');
			script_make.src=url +querystring;
			$window[cbName] = function (data) {
				callback(data);
				$document[0].body.removeChild(script_make);

			};
			$document[0].body.appendChild(script_make);
		}
	}])
})(angular)
