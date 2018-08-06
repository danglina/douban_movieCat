(function(angular){
	'use strict';

	var myModule = angular.module('movieCat.list', ['ngRoute','movieCat.http'])
	myModule.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/:active/:pages',{
				templateUrl:'movie_cat_list/view.html',
				controller:'movieCatController'
			})

	}]);
	myModule.controller('movieCatController',[
		'$scope',
		'$routeParams',
		'$route',
		'HttpService',
		function ($scope,$routeParams,$route,HttpService) {
			$scope.subjects =[];
			// 总共条数
			$scope.totalCount =0;
			$scope.loading = true;

			// 分页每一页需要5张
			var count = 5;
			// currentPages获取点击的是第几页
			$scope.currentPages =parseInt($routeParams.pages);
			var start = ( $scope.currentPages -1) * count;
			//  allpages总共多少页, 要暴露数据
			$scope.allpages = 0;
			// 标题
			$scope.title ='Loading......';
			// http://api.douban.com/v2/movie/in_theaters?count=20&start=5&q=4
			// 这是索要请求的地址，但是，‘q’ 的参数对其数据都不会有影响
			HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.active,
				{count:count,start:start,q:$routeParams.q},
				function (data) {
				$scope.subjects = data.subjects;
				$scope.title =  data.title;
				$scope.totalCount = data.total;
				$scope.loading = false;
				// allpages 总共多少页
				$scope.allpages = Math.ceil($scope.totalCount/count)

				$scope.goToPages = function(page){
					if(page>=1 && page<=$scope.allpages)
						$route.updateParams({pages:page})
				}

				$scope.$apply();
				// $applay()  可以让页面的 所有对象都同步，之所以使用是因为加了外部参见模块，即是我自己设置的
				// 就是让指定表达式重新同步
			})

		}])

})(angular)
