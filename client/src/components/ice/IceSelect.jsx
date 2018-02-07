import React from 'react'
import { find, contains, classes, filter, merge, omit, isNone } from 'utils'
import Icon from 'components/Icon'
import $ from 'jquery/dist/jquery'

export class IceSelect extends React.Component {
	state = {
		selected: null,
		focused: 0
	}

	componentWillMount() {
		this.prepare(this.props)
	}

	componentWillReceiveProps(newProps) {
		if (newProps.defaultValue !== this.props.defaultValue) {
			this.prepare(newProps)
		}
	}

	prepare = (props) => {
		const { multiple, defaultValue } = props
		let selected

		if (!isNone(defaultValue)) {
			if (multiple) {
				selected = []

				if (defaultValue instanceof Array) {
					selected = [...defaultValue]
				}
			}  else {
				// this.select(defaultValue)()
				selected = defaultValue
			}

			this.setState({ selected })
			props.onChange(selected)
		}
	}

	componentDidMount() {
		this.updateDisplay()
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.keydown)
	}

	prepareItems = () => {
		let { config, items } = this.props
		let { display = '' } = this.state
		
		return filter(items, item => contains(item[config.labelProp].toLowerCase(), display.toLowerCase()))
	}

	keydown = (event) => {
		let items = this.prepareItems()
		let { focused } = this.state

		if (event.key === 'Escape') {
			this.close()
		}

		if (event.key === 'ArrowUp') {
			focused -= 1

			if (focused < 0) focused = items.length + focused

			this.fixScroll()
		}

		if (event.key === 'ArrowDown') {
			focused += 1

			if (focused > items.length - 1) focused = focused - items.length

			this.fixScroll()
		}

		if (event.key === 'Enter') {
			this.select(items[focused])()
		}

		this.setState({ focused })
	}

	itemHover = (i) => {
		return () => {
			this.setState({ focused: i })
		}
	}

	fixScroll = () => {
		const scrollFrame = $(this.refs.list)
		const scrollFrameElem = scrollFrame[0]
		const scrollHeight = scrollFrame.height()
		const scrollTop = scrollFrameElem.scrollTop
		const scrollBottom = scrollTop + scrollHeight
		const focusElem = $(this.refs.list).find('.IceSelect--item')[this.state.focused]
		const focusElemTop = focusElem.offsetTop
		const focusElemBottom = focusElemTop + focusElem.clientHeight

		if (focusElemBottom > scrollBottom) {
			scrollFrame.scrollTop((focusElemTop + focusElem.clientHeight) - scrollHeight)
		} else if (focusElemTop < scrollTop) {
			scrollFrame.scrollTop(focusElemTop)
		}
	}

	typing = (event) => {
		this.setState({
			display: event.target.value,
			focused: 0
		})
	}

	select = (item) => {
		return () => {
			const { multiple, onChange } = this.props
			let { selected } = this.state
			let isSelected = false, removeItem = []

			if (!isNone(selected)) {
				if (multiple) {
					isSelected   = find(selected, x => x.id === item.id)
					removeItem   = filter(selected, x => x.id !== item.id)
				} else {
					isSelected   = selected.id === item.id
				}
			}

			selected = !multiple ? item : isSelected ? removeItem : (selected || []).concat(item)
			this.setState({ selected })

			if (onChange) onChange(selected)

			if (!multiple) this.close()
		}
	}

	open = () => {
		window.addEventListener('keydown', this.keydown)

		this.setState({
			focused: 0,
			isOpen: true,
			display: ''
		})
	}

	close = () => {
		window.removeEventListener('keydown', this.keydown)
		this.setState({ isOpen: false }, this.updateDisplay)
		if (this.refs.input) {
			this.refs.input.blur()
		}
	}

	updateDisplay = () => {
		const { items, multiple, config } = this.props
		let { selected, isOpen, placeholder } = this.state

		let display = ''

		placeholder = !isNone(selected) ? (
			multiple ? (
				selected.length ? (selected.length === items.length && items.length ? 'All items selected' : `${selected.length} items selected`) : ''
			) : (
				selected[config.labelProp]
			)
		) : ''

		if (!isOpen) {
			display = placeholder
		}

		this.setState({ display, placeholder })
	}

	clear = () => {
		let selected = this.props.multiple ? [] : ''
		this.props.onChange(selected)
		this.setState({ selected })
		this.updateDisplay()
	}

	render() {
		const { multiple, config, clearable = false } = this.props
		const { isOpen = false, selected, display = '', focused = 0, placeholder } = this.state
		const items = this.prepareItems()
		const isSelected = item => multiple ? !!find(selected || [], x => x.id === item.id) : selected === item

		const elemProps = merge(
			classes('IceSelect', { 'IceSelect--list-open': isOpen }, this.props.className),
			omit(this.props, [
				'className', 'multiple', 'config', 'items',
				'defaultValue', 'onChange', 'clearable'
			])
		)

		const showClear = clearable && ((multiple && selected && selected.length) || (!multiple && selected))

		return (
			<div {...elemProps}>
				<input
					type="text"
					className="form-control IceSelect--input"
					ref="input"
					placeholder={placeholder || 'Search...'}
					value={display || ''}
					onChange={this.typing}
					onFocus={this.open}
				/>

				{showClear ? (
					<button className="IceSelect--close btn btn-light" onClick={this.clear}>
						<Icon symbol="times-circle" />
					</button>
				): null}

				<div className="IceSelect--backdrop" onClick={this.close}></div>

				<ul className="IceSelect--list" ref="list">
					{items.map((item, i) => (
						<li
							{...classes(
								'IceSelect--item',
								focused === i ? 'IceSelect--item-focused' : ''
							)}
							key={i}
							onClick={this.select(item)}
							onMouseOver={this.itemHover(i)}
						>
							{multiple ? (
								<input type="checkbox" className="mr-2" checked={isSelected(item) || false} readOnly />
							) : null}
							{item[config.labelProp]}
						</li>
					))}
				</ul>
			</div>
		)
	}
}
