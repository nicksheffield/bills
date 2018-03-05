import { toPairs, sortBy } from 'lodash'
import store from 'state'
import { beginsWith } from 'utils/funcs/string'
import { get } from 'utils/funcs/object'

export const repeatFn   = (n, fn)     => (...args) => { while (n--) { fn(...args) } }
export const exec       = (fn)        => typeof fn === 'function' ? fn() : fn
export const noop       = ()          => {}

export const isType = (val, type) => {
	if (type === 'array') {
		return val instanceof Array
	}
	if (type === 'date') {
		return val instanceof Date
	}
	return typeof val === type
}

export const classNames = (...names) => {
	return names.reduce((s, x) => {
		if (typeof x === 'string') {
			return s.concat(x)
		} else {
			let pairs = toPairs(x)
			for (let i=0; i<pairs.length; i++) {
				let pair = pairs[i]
				if (pair[1]) s.push(pair[0])
			}
			return s
		}
	}, []).join(' ')
}

export const classes = (...names) => ({className: classNames(...names)})

export const sortWith = (list, by) => {
	if (!by) return list
	list = [...list]
	const reverse = beginsWith(by, '-')
	by = by.replace(/-/g, '').replace(/\+/g, '')
	list = sortBy(list, by)
	return reverse ? list.reverse() : list
}

/**
 * Overload a function on an object
 * @function overload
 * @param    {Object}   context      The object to modify
 * @param    {Function} oldFuncName  The name of the original function to overload
 * @param    {Fucntion} newFunc      The new function to run before running the original function
 */
export const overload = (context, oldFuncName, newFunc) => {
	let oldFunc = context[oldFuncName]

	context[oldFuncName] = function(...args) {
		let newFuncOutput = newFunc.apply(this, args)
		
		return oldFunc ? oldFunc.apply(this, args) : newFuncOutput
	}
}

/**
 * Create an object with two properties sharing the name of the first param that are both extracted from the second param,
 * eg: {
 * 	thing: {
 * 		Id: 1,
 * 		Name: 'My Thing'
 *	},
 *  thingMeta: {
 * 		loading: false
 * 	}
 * } 
 * @param {String} key   This is generally going to be the name of a state type
 * @param {Object} prop  This is generally going to be `this.props`
 */
export const extract = (key, prop) => {
	let values = {}
	values[key + 'Meta'] = prop[key]
	values[key] = (prop[key].hasOwnProperty('record') && prop[key].record) || (prop[key].hasOwnProperty('records') && prop[key].records) || null
	return values
}

export const isLoggedIn = () => localStorage.getItem('token')
export const isAdmin = () => get(store.getState(), 'user.user.admin')