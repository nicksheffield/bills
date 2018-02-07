import { setPropOn } from 'utils/funcs/object'

export const enumerate = (arr, prop = 'id') => arr.map((x, i) => setPropOn(x, prop, i))
export const isSimilarList = (listA, listB) => {
	if (!listA || !listB) return false
	return listA.reduce((s, x) => s && listB.findIndex(y => y===x) !== -1, true)
}