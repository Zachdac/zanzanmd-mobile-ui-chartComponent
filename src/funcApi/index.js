import axios from 'axios'

// const baseUrl = 'http://mt.qdxiao2.com/api-mt'
const baseUrl = 'http://m.zanzanmd.cn/api-mt'

export const handleParam = url => Object.assign(...url.substring(1, url.length).split('&').map(val => {
	let obj = {}
	obj[val.substring(0, val.indexOf('='))] = val.substring(val.indexOf('=') + 1, val.length)
	return obj
} ))

const fetchBase = url => id => token => axios({
	method: 'GET',
	url: `${baseUrl}${url}?spShopId=${id}`,
	headers: {
		Authorization: token
	}
})

// const fetchBase = url => id => token => axios({
// 	method: 'GET',
// 	url: `${baseUrl}?spShopId=${id}&token=${token}&path=${url}`
// })

export const fetchNumChartData = id => token => fetchBase('/report/v1/findDataForNumber')(id)(token).then(e => e.data.data)

export const fetchMoneyChartData = id => token => fetchBase('/report/v1/findDataForMoney')(id)(token).then(e => e.data.data)