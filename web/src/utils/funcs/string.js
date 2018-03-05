import { toPairs } from 'lodash'

export const isNumberStr = (str)        => String(parseInt(str, 10)) === String(str)
export const ucfirst     = (str)        => str[0].toUpperCase() + str.slice(1)
export const camelCase   = (str)        => str.replace(/-([a-z])/g, c => c[1].toUpperCase())
export const classify    = (str)        => ucfirst(camelCase(str))
export const slugify     = (str)        => str.toLowerCase().replace(/\s/g, '-')
export const unslugify   = (str)        => str.replace(/-/g, ' ')
export const includes    = (str1, str2) => str1.indexOf(str2) !== -1
export const beginsWith  = (str1, str2) => str1.indexOf(str2) === 0
export const endsWith    = (str1, str2) => str1.substr(str1.length - str2.length) === str2
export const isStrOr     = (str1, ...m) => m.reduce((s,x) => s || str1 === x, false)
export const isStrAnd    = (str1, ...m) => m.reduce((s,x) => s && str1 === x, true)
export const concat      = (...parts)   => parts.join('')
export const url         = (...parts)   => parts.join('/')
export const queryString = (obj)        => '?' + toPairs(obj).reduce((s,x) => s.concat(x[0] + '=' + x[1]), []).join('&')
export const px          = (num)        => num + 'px'
export const percent     = (num)        => num + '%'
export const implode  = (char, ...strs) => strs.join(char)

window.implode = implode


export const randstr = (len) => {
	let output = ''
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for (var i = 0; i < len; i++) {
		output += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return output
}