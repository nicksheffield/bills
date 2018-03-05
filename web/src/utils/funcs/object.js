export const isNone     = (x)              => x === null || x === undefined
export const isEmpty    = (x)              => x.length !== undefined ? x.length : JSON.stringify(x) === '{}'
export const get        = (obj, prop, def) => prop.split('.').reduce((s,x) => isNone(s) ? def : s[x], obj)
export const getVal     = (obj, prop)      => typeof prop === 'function' ? prop(obj) : get(obj, prop)
export const merge      = (...objs)        => Object.assign({}, ...objs)
// export const clone      = (obj)            => ({...obj}) // use lodash implementation
export const setPropOn  = (obj, prop, val) => { obj[prop] = val; return obj }

export const overload = (context, oldFuncName, newFunc) => {
	let oldFunc = context[oldFuncName]

	context[oldFuncName] = function(...args) {
		let newFuncOutput = newFunc.apply(this, args)
		
		return oldFunc ? oldFunc.apply(this, args) : newFuncOutput
	}
}

export const walk = (obj, cb) => {
	for(let prop in obj) {
		cb(prop, obj[prop])
	}
}

export const g = get