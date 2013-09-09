var App = angular.module('App', []);

// Reads the .json file
App.controller('KALiteCtrl', function($scope, $http) {

	$http.get('data.json')
	.then(function(res){
		$scope.data = nestbyDate(res.data);
		//$scope.data = "1 2 3 4";
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

	// Constants
	var firstDate = raw_data[0].first_sess,
	//lastDate = raw_data[nModels-1].last_sess,
	nModels=raw_data;

	// Classify the data by date
	var nestedData = d3.nest()
	.key(function(d) {
		return  d.first_sess.substr(0, 10); // Removes the THH:MM:SS"
	})
	.sortKeys(d3.ascending)
	.entries(raw_data)
	.map(function(d){
		var date = d.key;
		var total = 0;

		//Evaluates each device with the same date
		var values = d.values.forEach(function(dd){
			total = total + 1;
		});
		return {'date':date, 'total':total};
	});


	obj = {};

	// We will build the following model:
	// [{'date':date, 'counter':counter},...]
	// for(var i in nestedData){

	// 	while (next_date < cur_date) {

	// 		// Make sure to fill in empty rows for missing dates
	// 		data.addRow([next_date.toLocaleDateString(), 0, ""]);
	// 		next_date.setDate(next_date.getDate()+1);  // move on to the next day
	// 	}

	// }

	return nestedData;

}