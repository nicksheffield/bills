import React from 'react'
import moment from 'moment'
import { int, randstr } from 'utils'
import styled from 'styled-components'
import Button from 'components/Button'
import { TextInput } from 'components/elements/form/TextInput'

const Row = styled.div.attrs({
	className: props => props.className
})`
	display: flex;

	justify-content: ${props => props.justify || 'flex-start'};
`

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.1);
	z-index: 2;
`

const Wrapper = styled.div`
	position: relative;
	width: auto;

	${props => props.open && `
		> div {
			
		}
	`}
`

const Inner = styled.div`
	position: relative;
	z-index: 3;
`

const Calendar = styled.div`
	display: block;
	padding: 1em;
	border-radius: 5px;
	background: #fff;
	position: absolute;
	top: 100%;
	z-index: 3;
`

const Table = styled.table`
	table-layout: fixed;
	cursor: default;
	border: 0 !important;
`

const TableRow = styled.tr`
	&:hover {
		background: inherit !important;
	}
`

const DayHeader = styled.td`
	padding: 0.5em 0;
	font-weight: bold;
	text-align: center;
	width: 43px;
	border: 0 !important;
`

const Day = styled.td`
	padding: 1px !important;
	border: 0 !important;

	> button {
		display: block !important;
		width: 100% !important;
		${props => props.weekend && `
			background: #fff !important;
			border-color: #fff !important;

			&:hover {
				background: whitesmoke !important;
				border-color: whitesmoke !important;
			}
		`}
		${props => props.today && `
			background: #e1e6ea !important;
			border-color: #e1e6ea !important;
			color: #000 !important;
		`}
		${props => props.selected && `
			background: #17a2b8 !important;
			border-color: #17a2b8 !important;
			color: #fff !important;
		`}
	}
`

export class IceCalendar extends React.Component {
	
	constructor() {
		super()

		this.state = {
			days: [],
			selected: null
		}
	}

	componentWillMount() {
		this.prepareDays(this.props.value || new Date())
		this.selectDay({date: this.props.value || new Date()})()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.prepareDays(nextProps.value)
			this.selectDay({date: nextProps.value})()
		}
	}

	prepareDays = (date) => {
		if (date.hasOwnProperty('_isAMomentObject')) date = date.toDate()
		let start = moment(date).startOf('month')
		let end = moment(date).endOf('month')
		let dayCount = end.diff(start, 'days') + 1

		let days = [[]]
		let row = 0

		for (let i = 0; i < dayCount; i++) {
			let day = moment(date).startOf('month').add(i, 'days')
			let dateObj = day.toDate()
			let dayOfWeek = int(day.format('d'))
			let dayOfMonth = int(day.format('D'))
			let newDay = { date: dateObj, dayOfWeek, dayOfMonth, id: randstr(5) }

			if (dayOfWeek === 0) {
				days.push([])
				row++
			}
			days[row].push(newDay)
		}

		days = days.filter(x => x.length)

		this.setState({ days })
	}

	isWeekend(day) {
		const dayOfWeek = moment(day.date).format('d')
		return dayOfWeek === '0' || dayOfWeek === '6'
	}
	
	isToday(day) {
		return moment(day.date).isSame(new Date(), 'day')
	}

	isSelected = (day) => {
		return moment(this.state.selected).isSame(day.date, 'day') // this needs to change obviously
	}

	selectDay = (day) => {
		return (/* event */) => {
			let selected = day ? day.date : ''

			this.setState({ selected })
			if (this.props.onChange) {
				this.props.onChange(selected)
			} else {
				console.warn('There is no onChange method on <IceCalendar />, you have no way to receive the chosen date')
			}
			this.close()
		}
	}

	selectToday = () => {
		this.selectDay({ date: new Date() })()
	}

	addMonth = () => {
		this.state.date = moment(this.state.date).add(1, 'month').toDate()
		this.prepareDays(this.state.date)
	}

	subMonth = () => {
		this.state.date = moment(this.state.date).subtract(1, 'month').toDate()
		this.prepareDays(this.state.date)
	}

	open = () => {
		this.setState({ isOpen: true })
	}

	close = () => {
		this.setState({ isOpen: false })
	}

	clear = () => {
		this.selectDay(null)()
	}

	render() {
		const { format = 'YYYY-MM-DD', placeholder = 'Choose a date...' } = this.props
		const { days, selected = null, isOpen = false } = this.state

		let dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
		const startGap = 7 - days[0].length
		const outputDate = selected ? moment(selected).format(format) : ''
		const thisMonth = moment(days[0][0].date).format('MMMM')
		const thisYear = moment(days[0][0].date).format('YYYY')

		return (
			<Wrapper open={isOpen}>
				{isOpen && <Backdrop onClick={this.close} />}
				<Inner>
					<TextInput
						defaultValue={outputDate}
						onFocus={this.open}
						placeholder={placeholder}
						onClear={this.clear}
						clearable
						readOnly />

					{isOpen && (
						<Calendar>
							<Row justify="space-between">
								<Button icon="arrow-left"  size="sm" onClick={this.subMonth} />
								{ `${thisMonth} ${thisYear}` }
								<Button icon="arrow-right" size="sm" onClick={this.addMonth} />
							</Row>
							<Table>
								<thead>
									<TableRow>
										{dayNames.map((day, i) => (
											<DayHeader key={i} header>{day}</DayHeader>
										))}
									</TableRow>
								</thead>
								<tbody>
									{days.map((week, i) => (
										<TableRow key={i}>
											{startGap && i === 0 ? (
												<Day colSpan={startGap}></Day>
											): null}
											{week.map(day => (
												<Day
													key={day.id}
													today={this.isToday(day)}
													weekend={this.isWeekend(day)}
													selected={this.isSelected(day)}>

													<Button
														type="light"
														size="sm"
														onClick={this.selectDay(day)}>

														{day.dayOfMonth}
													</Button>
												</Day>
											))}
										</TableRow>
									))}
								</tbody>
							</Table>
							<Row justify="center" className="mt-2">
								<Button type="success" text="Today" size="sm" onClick={this.selectToday} />
							</Row>
						</Calendar>
					)}
				</Inner>
			</Wrapper>
		)
	}
}