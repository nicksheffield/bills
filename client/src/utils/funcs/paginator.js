import { slice } from 'utils/funcs/array'

export const paginate     = (list, page, limit) => slice(list, (page - 1) * limit, (page) * limit)
export const pageCount    = (list, limit)       => Math.ceil(list.length / limit)

export const getPageRange = (cur, max, range = 2) => {
	let arr = []

	let startPage = (cur < (range + 1))? 1 : cur - range
	let endPage = (range * 2) + startPage
	endPage = (max < endPage) ? max : endPage
	const diff = startPage - endPage + (range * 2)
	startPage -= (startPage - diff > 0) ? diff : 0
	for (let i=startPage; i<=endPage; i++) arr.push(i)

	return arr
}
