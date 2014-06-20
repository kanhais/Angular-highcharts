var app = angular.module("MyApp", []);


app.controller("TableController", function ($scope, $timeout, $location) {
    // _this pointer will be used to save te reference to controller
    var _this = this;
	var barChartData= [];
	var chartType = 'column';
	$scope.secondColumn = 'calls';
	
	// default selected column when page gets loaded
    $scope.defaultSelectedMetrics = 'name';
	/* array of metrics , 'name' is the json keys using
	 * which we will be accessing json data where title
	 * will be used to show header name */
    $scope.metrics = [{name:'name', title:'Name'},{title:'Calls',name:'calls'},{name:'Date',title:'Date'},{title:'Quantity',name:'quantity'},{title:'Cost',name:'cost'},{title:'Appointments',name:'appointments'}];
	var xAxisData = [];
	
	
	// mock data for table
	$scope.data = [{"name": "12345-2","Date": "8/1/2014","calls": 40,"quantity": 10000,"cost": 3690,"appointments": 20},
	                {"name": "12345-3","Date": "9/1/2014","calls": 41,"quantity": 20000,"cost": 4690,"appointments": 22},
					{"name": "12345-4","Date": "10/1/2014","calls": 42,"quantity": 8000,"cost": 2690,"appointments": 26},
					{"name": "12345-5","Date": "11/1/2014","calls": 39,"quantity": 4000,"cost": 1690,"appointments": 11},
					{"name": "12345-6","Date": "12/1/2014","calls": 30,"quantity": 3000,"cost": 690,"appointments": 15},
					{"name": "12345-7","Date": "13/1/2014","calls": 20,"quantity": 5000,"cost": 500,"appointments": 37}]
	
	angular.forEach($scope.data, function(dataValue){
	     xAxisData.push(dataValue.name);
	});

    /* This method changes the status of sort object 
	 * takes columnName and index(index of column) as arguments */
	$scope.sortTable = function(columnName, index){
	    if(columnName !== $scope.defaultSelectedMetrics){
		$scope.defaultColumnCliked = false;
		$scope.sortObject[columnName].sortOrder = !$scope.sortObject[columnName].sortOrder;
		$scope.selectedHeader = columnName;
		$scope.selectedMetric = $scope.selectedHeader;
		$scope.selectedColumn = index;
		$scope.prepareDataForBarChart(columnName);
		$scope.removeMargin(index);
		}else{
		$scope.defaultColumnCliked = true;
		$scope.sortObject['name'].sortOrder = !$scope.sortObject['name'].sortOrder;
		$scope.selectedMetric = 'name';
		};
	};

	/* This function is to achieve an UI hack where I 
	 * hide over lapping border of inner div
	 * timeout with 0 delay is used because it should
	 * fire only after dom gets rendered */
	$scope.removeMargin = function(index){
		$timeout(function(){
			angular.element('.outer-container').css('margin','0px 0px 0px 0px');
			angular.element('.outer-container')[index-1].style.margin = '0px 0px 0px 1px';
		} , 0);
	};
	
	//This function will be used to change color of chart
	$scope.changeChartColor = function(color){
	   if(chartType === 'column'){
	      angular.element('.highcharts-series rect').css('fill',color.colorName);
	   }else if(chartType === 'line'){
	      angular.element('.highcharts-series path').css({'stroke':color.colorName, 'stroke-width':'1px'});
	   }else{
          angular.element('.highcharts-series path').css('fill',color.colorName);   
	   }
	};
	
	$scope.changeChartType= function(chart){
	   chartType = chart;
	   createBarChartWithHighCharts(barChartData, xAxisData, $scope.selectedHeader, chart);
	};


    // object that keeps track of sort order : false : ascending, true: descending
	$scope.sortObject = {
		"name":{
		   "sortOrder" : false
		},
		"Date":{
		   "sortOrder" : false
		},
		"calls":{
		   "sortOrder" : false
		},
		"quantity":{
		   "sortOrder" : false
		},
		"cost":{
		   "sortOrder" : false
		},
		"appointments":{
		   "sortOrder" : false
		}
	};
	
	// colors drop down 
	$scope.colors = [{
	'colorName' : 'Red',
	'colorCode' : 'red'},
	{
	'colorName' : 'Orange',
	'colorCode' : 'orange'},
	{
	'colorName' : 'Green',
	'colorCode' : 'green'},
	{
	'colorName' : 'Blue',
	'colorCode' : 'blue'},
	{
	'colorName' : 'Gray',
	'colorCode' : 'gray'},
	{
	'colorName' : 'Black',
	'colorCode' : 'black'},
	{
	'colorName' : 'Yellow',
	'colorCode' : 'yellow'},
	{
	'colorName' : 'Cyan',
	'colorCode' : 'cyan'},
	{
	'colorName' : 'DarkSalmon',
	'colorCode' : 'darkSalmon'},
	{
	'colorName' : 'Linen',
	'colorCode' : 'linen'},
	{
	'colorName' : 'Maroon',
	'colorCode' : 'maroon'},
	{
	'colorName' : 'Navy',
	'colorCode' : 'navy'}];
	
	$scope.chartType = ['column','line','area'];
	
	//This function prepares data for bar chart 
	$scope.prepareDataForBarChart = function(columnName){
	    barChartData = [];
	    angular.forEach($scope.data, function(dataValue){
		   barChartData.push(dataValue[columnName]);
		});
		//createBarChart(barChartData);
		createBarChartWithHighCharts(barChartData, xAxisData, $scope.selectedHeader, chartType);
    };
$scope.sortTable('calls', 1);
});	

// this is not needed as of now but it will be handy some time soon
/*app.config(function($routeProvider) {
        $routeProvider.when('/', {
           templateUrl: './index.html', 
           controller: 'TableController'
        });
		$routeProvider.when('/chart', {
           templateUrl: './partials/chart.html', 
           controller: 'TableController'
        });
	});*/	


