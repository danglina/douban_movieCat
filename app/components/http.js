

(function (angular) {
	'use strict'

	var http = angular.module('movieCat.http',[]);
	http.service('HttpService',['$window','$document',function ($window,$document) {
		this.jsonp = function (url,data,callback) {
			var suffix = Math.random().toString().replace('.','');
			var cbName = 'danglina_jsonp_make_'+suffix;
			$window[cbName] = callback;
			var querystring = url.indexOf('?')==-1 ? '?' : '&';
			for(var key in data){
				querystring += key + '='+ data[key] +'&'
			}
			querystring += 'callback=' +cbName;
			var script_make = $document[0].createElement('script');
			script_make.src=url +querystring;
			$document[0].body.appendChild(script_make);
		}
	}])
})(angular)
