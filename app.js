var App = angular.module('App', []);

// Reads the .json file
App.controller('KALiteCtrl', function($scope, $http) {

	$http.get('data.json')
	.then(function(res){
		$scope.devices = res.data;
	});

	$scope.options = {width: 500, height: 300, 'bar': 'aaa'};
	$scope.data = [1, 2, 3, 4];
});

App.directive('barChart', function () {

	// The chart is defined in bar_chart.js
	var chart = d3.custom.barChart();
	return {
		restrict: 'E',
		replace: true,
		template: '<div class="chart"></div>',
		scope:{
			height: '=height',
			data: '=data',
			hovered: '&hovered'
		},
		link: function(scope, element, attrs) {
			var chartEl = d3.select(element[0]);
			chart.on('customHover', function(d, i){
				scope.hovered({args:d});
			});

			scope.$watch('data', function (newVal, oldVal) {
				chartEl.datum(newVal).call(chart);
			});

			scope.$watch('height', function(d, i){
				chartEl.call(chart.height(scope.height));
			})
		}
	}


});
