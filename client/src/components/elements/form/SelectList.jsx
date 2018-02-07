import React from 'react'
import { map, randstr, isSimilarList, classes, get, clone } from 'funcs'
import { bind, props } from 'decorators'
import { IceSelect } from 'components/ice'
import { Row, Col, Button, Input } from 'components/elements'

export class SelectList extends React.Component {

	constructor() {
		super()

		this.state = {
			selected: []
		}
	}

	componentWillMount() {
		this.setState({
			selected: this.prepareItems(this.props.defaultValues)
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.defaultValues && nextProps.defaultValues.length && !isSimilarList(nextProps.defaultValues, this.props.defaultValues)) {
			this.setState({
				selected: this.prepareItems(nextProps.defaultValues)
			})
		}
	}

	@bind
	prepareItems(defaultValues) {
		let selected
		
		if (!defaultValues) {
			selected = [{ id: randstr(5) }]
		} else {
			selected = defaultValues.filter(x=>x).map(value => {
				return { id: randstr(5), value }
			})
		}

		return selected
	}

	@bind
	change(item) {
		return (val) => {
			let selected = clone(this.state.selected)
			let index = selected.findIndex(x => x.id === item.id)
			let newItem = clone(item)
			newItem.value = val
			selected.splice(index, 1, newItem)

			this.setState({ selected })

			if (this.props.onChange) {
				this.props.onChange(map(selected, x => x.value))
			}
		}
	}

	@bind
	remove(item) {
		return () => {
			let selected = this.state.selected.filter(s => s !== item)

			if (this.props.onChange) {
				this.props.onChange(selected.map(x => x.value))
			}

			if (!selected.length) {
				selected.push({ id: randstr(5) })
			}

			this.setState({ selected })
		}
	}

	@bind
	add() {
		let selected = clone(this.state.selected)
		selected.push({ id: randstr(5) })
		this.setState({ selected })
	}

	@bind
	changeAdditional(su, prop) {
		return (value) => {
			console.log('set', prop, 'to', value)
		}
	}

	@props
	render({ items, config, itemName, additionalControls }, { selected }) {
		return (
			<Col className="select-list">
				{selected.map(su => (
					<Row key={su.id} align="center" justify="between" className="mb-3">
						<IceSelect items={items} onChange={this.change(su)} defaultValue={su.value} config={config} className="f-r1" clearable={false} />
						
						{additionalControls ? additionalControls.map((control, i) => (
							<Input
								key={su.id+' '+i}
								type={control.type}
								defaultValue={get(su.value, control.prop)}
								onChange={this.changeAdditional(su, control.prop)}
								{...classes(control.className, 'SelectList--additional', 'ml-2')}
							/>
						)): null}

						<Button onClick={this.remove(su)} type="danger" icon="times" className="ml-2" outline />
					</Row>
				))}
				<div>
					<Button onClick={this.add} icon="plus" text={'Add ' + (itemName ? itemName : 'item')} outline />
				</div>
			</Col>
		)
	}
}
