var App = angular.module('App', []);

// Reads the .json file
App.controller('KALiteCtrl', function($scope, $http) {

	$http.get('data.json')
	.then(function(res){
		$scope.data = organizeData(res.data);
	});

	$scope.options = {width: 500, height: 300, 'bar': 'aaa'};
});

// App.directive('barChart', function () {

// 	// The chart is defined in bar_chart.js
// 	var chart = d3.custom.barChart();
// 	return {
// 		restrict: 'E',
// 		replace: true,
// 		template: '<div class="chart"></div>',
// 		scope:{
// 			height: '=height',
// 			data: '=data',
// 			hovered: '&hovered'
// 		},
// 		link: function(scope, element, attrs) {
// 			var chartEl = d3.select(element[0]);
// 			chart.on('customHover', function(d, i){
// 				scope.hovered({args:d});
// 			});

// 			scope.$watch('data', function (newVal, oldVal) {
// 				chartEl.datum(newVal).call(chart);
// 			});

// 			scope.$watch('height', function(d, i){
// 				chartEl.call(chart.height(scope.height));
// 			});
// 		}
// 	};
// });

function organizeData(raw_data){


	var nestedData = d3.nest()
    .key(function(d) {
		return  d.first_sess.substr(0, 10);
    })
    .sortKeys(d3.ascending)
    .entries(raw_data);

    console.log(nestedData);
    return raw_data;
}