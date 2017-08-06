import React from 'react'
import ReactDom from 'react-dom'

import { handleParam } from './funcApi'

import './style/chart.less'

import Chart from './page/chart.jsx'

ReactDom.render(
	<Chart param = {handleParam(location.search)}></Chart>,
	document.getElementById('root')
)