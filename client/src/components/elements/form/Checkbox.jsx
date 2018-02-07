import React from 'react'
import { bind } from 'decorators'

export class Checkbox extends React.Component {

	constructor() {
		super()

		this.state = {
			checked: false
		}
	}

	componentWillMount() {
		this.setState({ checked: this.props.defaultValue })
	}

	componentWillReceiveProps(newProps) {
		if (newProps.defaultValue !== this.props.defaultValue) {
			this.setState({ checked: newProps.defaultValue })
		}
	}

	@bind
	onChange(event) {
		let { checked } = event.target

		this.setState({ checked })

		if (this.props.onChange) {
			this.props.onChange(checked || false)
		}
	}

	render() {
		return (
			<div className="input input-checkbox" style={{display: 'inline'}}>
				<input
					type="checkbox"
					id={this.props.name}
					name={this.props.name}
					checked={this.state.checked || false}
					onChange={this.onChange}
				/>
			</div>
		)
	}
}