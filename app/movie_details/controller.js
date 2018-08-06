(function(angular){
	'use strict';
	var myModule = angular.module('movieCat.details', ['ngRoute','movieCat.http'])
	myModule.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/details/:id',{
				templateUrl:'movie_details/view.html',
				controller:'movieDetailController'
			})

	}]);
	myModule.controller('movieDetailController',[
		'$scope',
		'$routeParams',
		'$route',
		'HttpService',
		function ($scope,$routeParams,$route,HttpService) {
			var reqAdd = 'http://api.douban.com/v2/movie/subject/'+$routeParams.id;
			$scope.loading =true;
			// http://api.douban.com/v2/movie/in_theaters?count=20&start=5&q=4
			// 这是索要请求的地址，但是，‘q’ 的参数对其数据都不会有影响
			$scope.title='Loading......';
			HttpService.jsonp(reqAdd,
				{},function (data) {
				$scope.title = data.title;
				$scope.images = data.images.large;
				$scope.summary = data.summary;
					$scope.loading =false;
				$scope.$apply();

				})



			// HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.id,
			// 	{},
			// 	function (data) {
			// 		$scope.subjects = data.subjects;
			// 		$scope.title =  data.title;
			// 		$scope.totalCount = data.total;
			// 		$scope.loading = false;
			// 		// allpages 总共多少页
			// 		$scope.allpages = Math.ceil($scope.totalCount/count)
            //
			// 		$scope.goToPages = function(page){
			// 			if(page>=1 && page<=$scope.allpages)
			// 				$route.updateParams({pages:page})
			// 		}
            //
			// 		$scope.$apply();
			// 		// $applay()  可以让页面的 所有对象都同步，之所以使用是因为加了外部参见模块，即是我自己设置的
			// 		// 就是让指定表达式重新同步
			// 	})


		}])

})(angular)
