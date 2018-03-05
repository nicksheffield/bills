export const slice       = (arr, ...args) => Array.prototype.slice.call(arr, ...args)
export const map         = (arr, ...args) => Array.prototype.map.call(arr, ...args)
export const reduce      = (arr, ...args) => Array.prototype.reduce.call(arr, ...args)
export const find        = (arr, ...args) => Array.prototype.find.call(arr, ...args)
export const findIndex   = (arr, ...args) => Array.prototype.findIndex.call(arr, ...args)
export const filter      = (arr, ...args) => Array.prototype.filter.call(arr, ...args)
export const contains    = (arr, item)    => arr.indexOf(item) !== -1
export const first       = (arr)          => arr[0]
export const last        = (arr)          => arr[arr.length - 1]
export const isFirst     = (arr, item)    => first(arr) === item
export const isLast      = (arr, item)    => last(arr) === item
export const addOrRemove = (arr, item)    => contains(arr, item) ? arr.filter(x => x !== item) : arr.concat(item)

export const range = (start, end = null) => {
	const arr = []
	let c = start
	if (end !== null) {
		do { arr.push(c); c++ } while (c <= end)
	} else {
		for (let i=0; i<start; i++) { arr.push(i) }
	}
	return arr
}
