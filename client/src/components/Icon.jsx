import React from 'react'
import { classes, ife } from 'utils'

export default (props) => (
	<i {...classes(
		'fa',
		'fa-' + props.symbol,
		ife(props.size, 'fa-' + props.size + 'x'),
		ife(props.fixedWidth, 'fa-fw'),
		ife(props.spinner, 'fa-spin'),
		ife(props.rotate, 'fa-rotate-' + props.rotate),
		ife(props.flip, ife(props.flip === 'vertical', 'fa-flip-vertical', 'fa-flip-horizontal')),
		props.className
	)}></i>
)