var App = angular.module('App', []);

// Reads the .json file
App.controller('KALiteCtrl', function($scope, $http) {

	$http.get('data.json')
	.then(function(res){
		//$scope.data = nestbyDate(res.data);
		$scope.data = "1,2,3,4";
	});
});

App.directive('chart', function ($parse) {

	return {
		restrict: 'E',
		replace: true,
		template: '<div id="chart"></div>',
		link: function (scope, element, attrs) {

			scope.$watch('data', function (newVal, oldVal) {
				
				// if 'data' is undefined, exit
				if (!newVal) {
					return;
				}

				var data = scope.data,
				chart = d3.select('#chart')
				.append("div").attr("class", "chart")
				.selectAll('div')
				.data(data).enter()
				.append("div")
				.transition().ease("elastic")
				.style("width", function(d) { return d + "%"; })
				.text(function(d) { return d + "%"; });

				console.log(data);

			});
		}
	};
});


function nestbyDate(raw_data){

	var nestedData = d3.nest()
	.key(function(d) {
		return  d.first_sess.substr(0, 10); // Removes the THH:MM:SS"
	})
	.sortKeys(d3.ascending)
	.entries(raw_data);

	console.log(nestedData);

	return nestedData;
}