import React from 'react'
import { classes, classNames, ife } from 'funcs'

export const layoutClassNames = (props) => classNames(
	ife(props.col, 'f-c'),
	ife(props.row, 'f-r'),

	ife(props.size, 'f-r' + props.size),

	ife(props.justify  === 'start',    'f-js'),
	ife(props.justify  === 'end',      'f-je'),
	ife(props.justify  === 'center',   'f-jc'),
	ife(props.justify  === 'around',   'f-ja'),
	ife(props.justify  === 'between',  'f-jb'),
	
	ife(props.align    === 'start',    'f-as'),
	ife(props.align    === 'end',      'f-ae'),
	ife(props.align    === 'center',   'f-ac'),
	ife(props.align    === 'stretch',  'f-as'),

	ife(props.col_m, 'f-c-m'),
	ife(props.row_m, 'f-r-m'),

	ife(props.size_m, 'f-r' + props.size + '-m'),

	ife(props.justify_m  === 'start',    'f-js-m'),
	ife(props.justify_m  === 'end',      'f-je-m'),
	ife(props.justify_m  === 'center',   'f-jc-m'),
	ife(props.justify_m  === 'around',   'f-ja-m'),
	ife(props.justify_m  === 'between',  'f-jb-m'),

	ife(props.align_m    === 'start',    'f-as-m'),
	ife(props.align_m    === 'end',      'f-ae-m'),
	ife(props.align_m    === 'center',   'f-ac-m'),
	ife(props.align_m    === 'stretch',  'f-as-m'),
)

export const layoutClasses = (props) => classes(layoutClassNames(props))

export const Row = (props) => (
	<div {...classes(
		ife(props.className, props.className),
		'f-r',
		layoutClassNames(props)
	)}>
		{props.children}
	</div>
)

export const Col = (props) => (
	<div {...classes(
		ife(props.className, props.className),
		'f-c',
		layoutClassNames(props)
	)}>
		{props.children}
	</div>
)

export const Layout = (props) => (
	<div {...classes(
		ife(props.className, props.className),
		layoutClassNames(props)
	)}>
		{props.children}
	</div>
)