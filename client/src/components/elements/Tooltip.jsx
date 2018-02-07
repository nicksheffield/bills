import React from 'react'
import { classes } from 'funcs'

export class Tooltip extends React.Component {
	componentDidMount() {
		$(this.refs.div).tooltip()
	}
	render() {
		return (
			<div
				{...classes(
					'Tooltip',
					this.props.className
				)}
				data-toggle="tooltip"
				data-placement={this.props.side || 'right' }
				title={this.props.title}
				ref="div"
			>
				{this.props.children}
			</div>
		)
	}
}