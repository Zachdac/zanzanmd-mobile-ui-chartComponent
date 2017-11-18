import './style/chart.css';
var echarts = require('echarts');

import { fetchNumChartData, fetchMoneyChartData, handleParam } from './funcApi'

var param = handleParam(location.search)

function getMoneyData(param){
	return fetchMoneyChartData(param.spShopId)(param.token)
		.then(data => ({
			mainData: (data ? data.coordinateList : []).map(val => val.money),
			xData: (data ? data.coordinateList : []).map(val => val.time)
		}))
}

function getNumData(param){
	return fetchNumChartData(param.spShopId)(param.token)
		.then(data => ({
			mainData: (data ? data.coordinateList : []).map(val => val.number),
			xData: (data ? data.coordinateList : []).map(val => val.time)
		}))
}

function createChart(id){
	// return (id === 'numChart' ? getNumData(param) : getMoneyData(param))
	// 	.then(data => {
			var arr = [{"money":"0","time":"2017-09-19"},{"money":"100","time":"2017-09-20"},{"money":"0","time":"2017-09-21"},{"money":"20","time":"2017-09-22"},{"money":"0","time":"2017-09-23"},{"money":"0","time":"2017-09-24"},{"money":"0","time":"2017-09-25"},{"money":"0","time":"2017-09-26"},{"money":"0","time":"2017-09-27"},{"money":"0","time":"2017-09-28"},{"money":"0","time":"2017-09-29"},{"money":"0","time":"2017-09-30"},{"money":"0","time":"2017-10-01"},{"money":"0","time":"2017-10-02"},{"money":"0","time":"2017-10-03"},{"money":"0","time":"2017-10-04"},{"money":"0","time":"2017-10-05"},{"money":"0","time":"2017-10-06"},{"money":"0","time":"2017-10-07"},{"money":"0","time":"2017-10-08"},{"money":"0","time":"2017-10-09"},{"money":"0","time":"2017-10-10"},{"money":"0","time":"2017-10-11"},{"money":"0","time":"2017-10-12"},{"money":"0","time":"2017-10-13"},{"money":"0","time":"2017-10-14"},{"money":"0","time":"2017-10-15"},{"money":"0","time":"2017-10-16"},{"money":"0","time":"2017-10-17"},{"money":"0","time":"2017-10-18"}]
			var	mainArr = [],
				xArr = []	
			for(var i = 0; i < arr.length; i++){
				mainArr.push(arr[i].money)
				xArr.push(arr[i].time)
			}

			var data = {
				mainData: mainArr,
				xData: xArr
			}

			var Chart = echarts.init(document.getElementById(id))
			var option = {
			    color: ['#3eba6c'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    grid: {
			        left: '2%',
			        right: '2%',
			        bottom: '5%',
			        top: '10%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : data.xData,
			            axisTick: {
			                alignWithLabel: true
			            },
			            axisLine: {
					    	lineStyle: {
					    		color: '#888'
					    	}
					    }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			                show: false
			            },
			            nameTextStyle: {
			            	fontSize: 8
			            },
			            axisLine: {
					    	lineStyle: {
					    		color: '#888'
					    	}
					    }
			        }
			    ],
			    dataZoom: [
			        {
			            type: 'inside'
			        }
			    ],
			    series : [
			        {
			            name:'交易金额',
			            type:'line',
			            barWidth: '60%',
			            data: data.mainData,
			            smooth:true,
			            symbol: 'none',
			            lineStyle: {
			            	normal: {
			            		width: 1
			            	}
			            }
			        }
			    ]
			}

			Chart.setOption(option)
		// })

				

}

window.onload = function(){
	createChart('moneyChart')
	createChart('numChart')

}
