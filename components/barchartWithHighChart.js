function createBarChartWithHighCharts(data, campaignNames, selectedHeader, chartType){
angular.element('.chart-container').highcharts({
            chart: {
                type: chartType
            },
            xAxis: {
                categories: campaignNames
            },
            yAxis: {
                min: 0,
                title: {
                    text: selectedHeader
                }
            },
			tooltip:{
			},
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
			credits: {
                enabled: false
            },
            series: [{
                name: selectedHeader,
                data: data
    
            }]
        });
};		