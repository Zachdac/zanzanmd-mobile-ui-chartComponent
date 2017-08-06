import React from 'react'
import echarts from 'echarts'

import { fetchNumChartData, fetchMoneyChartData } from '../funcApi'

class Chart extends React.Component{
	constructor(props){
		super(props)
	}

	getMoneyData(param){
		return fetchMoneyChartData(param.spShopId)(param.token)
			.then(data => ({
				mainData: data.coordinateList.map(val => val.money),
				xData: data.coordinateList.map(val => val.time)
			}))
	}

	getNumData(param){
		return fetchNumChartData(param.spShopId)(param.token)
			.then(data => ({
				mainData: data.coordinateList.map(val => val.number),
				xData: data.coordinateList.map(val => val.time)
			}))
	}

	createChart(id, _this){
		return (id === 'numChart' ? _this.getNumData(this.props.param) : _this.getMoneyData(this.props.param))
			.then(data => {
				const Chart = echarts.init(document.getElementById(id))

				const option = {
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
			})
	}

	componentDidMount(){
		this.createChart('moneyChart', this)
		this.createChart('numChart', this)
	}

	render(){
		return (
			<div className = 'chart-container'>
				<div className = 'chart-title'>近30天交易趋势</div>
				<div className = 'chart-content'>
					{
						[
							{
								title: '交易金额',
								id: 'moneyChart'
							},{
								title: '交易笔数',
								id: 'numChart'
							}
						].map((val, index) => (
							<div className = 'chart-wrap' key = {index}>
								<div className = 'sym-wrap'>
									<div className = 'chart-sym'>{val.title}</div>
								</div>
								<div id = {val.id}></div>
							</div>
						))
					}
				</div>
			</div>
		)
	}
}

export default Chart