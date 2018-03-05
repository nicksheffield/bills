import React, { Component } from 'react'
import { omit } from 'funcs'
import { Link } from 'react-router-dom'
import { Icon } from './Icon'
import styled from 'styled-components'

let attrs = {
	className: props => {
		let outline = props.outline ? 'outline-' : ''
		let type = props.type ? `btn-${outline}${props.type}` : `btn-${outline}primary`

		let size = props.size ? `btn-${props.size}` : ''
		let textColor = props.textColor ? `text-${props.textColor}` : ''

		return ['btn', type, size, textColor]
			.filter(x=>x)
			.join(' ')
	}
}

const StyledButton = styled.button.attrs(attrs)`
	text-transform: uppercase !important;
	font-weight: bold !important;
	font-size: 0.9em !important;

	> i.fa {
		margin-right: ${props => {
			return (props['data-icon'] && props['data-text']) ? '0.8em' : '0'
		}}
	}
`

const StyledLink = styled(Link).attrs(attrs)`
	text-transform: uppercase !important;
	font-weight: bold !important;
	font-size: 0.9em !important;

	> i.fa {
		margin-right: ${props => (props['data-icon'] && props['data-text']) ? '0.8em' : '0'}
	}
`

export const Button = (props) => {

	let elemProps = omit(props, [
		'url', 'icon', 'text'
	])

	elemProps['data-icon'] = props.icon
	elemProps['data-text'] = props.text || props.children

	let icon = !props.icon ? null : <Icon symbol={props.icon} fixedWidth={props.text || props.children} />
	
	return props.to ? (
		<StyledLink {...elemProps} to={props.to}>
			{icon}
			{props.text}
			{props.children}
		</StyledLink>
	) : (
		<StyledButton {...elemProps}>
			{icon}
			{props.text}
			{props.children}
		</StyledButton>
	)
}
