import React from 'react'
import { classNames, implode } from 'utils'
import Icon from 'components/Icon'
import Button from 'components/Button'
import styled from 'styled-components'

const InputWrapper = styled.div`
	position: relative;
`

const CloseButton = styled(Button).attrs({
	type: 'light',
	icon: 'times-circle'
})`
	position: absolute;
	top: 1px;
	right: 1px;
	line-height: 22px !important;
	border-radius: 0 3px 3px 0 !important;
`

export class Input extends React.Component {

	constructor() {
		super()

		this.state = { value: undefined }
	}

	componentWillMount() {
		if (this.props.defaultValue) {
			this.setState({ value: this.props.defaultValue })
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.defaultValue !== nextProps.defaultValue) {
			this.setState({ value: nextProps.defaultValue })
		}
	}

	onChange = (event) => {
		if (this.props.readOnly || !this.props.onChange) return
		this.setState({ value: event.target.value })
		this.props.onChange(event.target.value, event)
	}

	onFocus = (event) => {
		if (!this.props.onFocus) return
		this.setState({ value: event.target.value })
		this.props.onFocus(event.target.value, event)
	}

	clear = () => {
		this.onChange({ target: { value: null }})
		if (this.props.onClear) {
			this.props.onClear()
		}
	}

	render() {
		let showClear = this.props.clearable && this.state.value || false

		let elemProps = {
			type: this.props.type || 'text',
			id: this.props.name,
			name: this.props.name,
			style: this.props.style,
			className: classNames( 'form-control', this.props.className ),
			value: this.state.value || '',
			placeholder: this.props.placeholder || '',
			onChange: this.onChange,
			onFocus: this.onFocus
		}

		return (
			<InputWrapper className={implode(' ', 'input', `input-${this.props.type}`)}>
				{showClear ? (
					<CloseButton onClick={this.clear} />
				): null}
				<input {...elemProps} />
			</InputWrapper>
		)
	}
}
