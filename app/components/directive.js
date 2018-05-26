(function (angular) {

	var mymodule = angular.module('movieCat.direct.autoFocus',[]);
	mymodule.directive('autoFocus', ['$location',function($location) {
		return {
			restrict: 'A',

			// 一般我们把，有关操作dom的放在link当中
			link: function($scope, iElem, iAttrs,controller) {

				// 这个里面相当，anguala的小模块，具有监视功能能
				$scope.location = $location;
				// 监视页面地址的变化
				$scope.$watch('location.path()',function (now,old) {
					var a_href = iElem.children().attr('href');
					// 找到匹配的关键字
					var type = a_href.replace(/#(\/.+?)\/\d+/,"$1");
					// 当a_href的匹配值与，地址开头一样，就添加类名
					if(now.startsWith(type)){
						iElem.parent().children().removeClass('active')
						iElem.addClass('active');
					}
				})


				// iElem.on('click',function () {
				// 	iElem.parent().children().removeClass('active')
				// 	iElem.addClass('active');
                //
				// })
			}
		};
	}]);

})(angular)
