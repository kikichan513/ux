//find all countries: http://api.worldbank.org/countries?format=json

$(window).bind("load",function(){

	/*COUNTRIES*/
	var urls = ['AGO', 'BEN', 'BFA', 'BWA', 'CAF'];

	var chart = new Highcharts.Chart({
					chart: {
						type: 'spline',
						renderTo: 'container'
					},

					tooltip: {
						valueDemicals: 2,
						shared: true,
						pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}%</b><br/>'
					},

					title: {
						text: ''
					},
					yAxis: {
						labels: {
							format: '{value}%'
						}
					},
					plotOptions: {
						series: {
							marker: {
								enabled: false
							}
						}
					},

					xAxis: {
						reversed: true,
						type: 'category'
					},
					series: []
			});
	
$('#reset_everything').click(function()
	{
				while(chart.series.length != 0)
				{
					chart.series[0].hide();
					chart.series[0].remove();
				}
	});
	$('#selectid').change(function(event) {
		
		// var chart = Highcharts.chart(event.target.value);
		var country = event.target.value;
		var array_final = [];

				$.getJSON('http		://api.worldbank.org/countries/' + 
					country + '/indicators/NY.GDP.MKTP.KD.ZG?per_page=30&MRV=30&format=jsonP&prefix=?',
					
					function(json) {

						$.each(json[1],function(i,data){
							country_name = data.country.value;
							indicatorName = data.indicator.value; //"GDP growth (annual %)"

							//pusing data into arrays
							//name is a year (category on xaxis)
							//y is a value (value on the yAxis)

							if (data.value != null){
								array_final.push({
									y: parseFloat(data.value),
									name: parseInt(data.date,10)
								});
							} else {
								array_final.push({
									y: null,
									name: parseInt(data.date,10)
								});
							}
						});

							// chart.setTitle({
							// 	text:indicatorName,
							// });

							//add new country to chart
							chart.addSeries({
								name: country_name,
								data: array_final
							});
						});
		
		// var chart = Highcharts.chart(chartData[event.target.value]);
		
	})

});