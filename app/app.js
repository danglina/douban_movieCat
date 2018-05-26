'use strict';

// Declare app level module which depends on views, and components
var   mymodule = angular.module('movieCat', [
  'ngRoute',
  'movieCat.list',
  'movieCat.direct.autoFocus'
])
   mymodule.config(['$routeProvider', function($routeProvider) {
     $routeProvider
	  .otherwise({redirectTo: '/in_theaters/1'});
}]);

// 设置控制器

// 	mymodule.controller('NavController',['$scope','$location',function ($scope,$location) {
//   		// 将数据进行暴露
// 		$scope.location =$location;
// 		// 然后监视
// 		$scope.$watch('location.path()',function (now,old) {
// 			if(now.startsWith('/in_theaters')){
// 				$scope.type = 'in_theaters';
// 			}else if(now.startsWith('/coming_soon')){
// 				$scope.type = 'coming_soon';
// 			}else if(now.startsWith('/top250')){
// 				$scope.type = 'top250';
// 			}
// 		})
//
// }])
