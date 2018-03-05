import React from 'react'
import { classes, ife } from 'funcs'
import { layoutClassNames } from './Layout'

export class Page extends React.Component {
	componentDidMount() {
		if (this.props.name) {
			document.head.querySelector('title').innerHTML = `${this.props.name} - Quartermaster`
		}
	}

	render() {
		return (
			<div {...classes(
				'Page',
				ife(this.props.name, this.props.name),
				ife(this.props.className, this.props.className),
				layoutClassNames(this.props)
			)}>
				{this.props.children}
			</div>
		)
	}
}