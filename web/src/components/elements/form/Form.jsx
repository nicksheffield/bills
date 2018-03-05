import React from 'react'
import { classes } from 'funcs'
import { bind, props } from 'decorators'

export class Form extends React.Component {
	
	@bind
	onSubmit(event) {
		event.preventDefault()

		this.props.onSubmit(event)
	}
	
	@props
	render({ className }) {
		return (
			<form onSubmit={this.onSubmit} {...classes('Form', className)}>
				{this.props.children}
			</form>
		)
	}
}