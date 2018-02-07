import moment from 'moment'

export const fmt         = (date, format) => date ? moment(date).format(format || 'YYYY-MM-DD') : ''
export const isSameDay   = (date1, date2) => moment(date1).isSame(date2, 'day')
export const isBefore    = (date1, date2) => moment(date1).isBefore(date2)
export const isAfter     = (date1, date2) => moment(date1).isAfter(date2)
export const dayBefore   = (date)         => moment(date).subtract(1, 'day')
export const dayAfter    = (date)         => moment(date).add(1, 'day')
export const isTomorrow  = (date)         => dayBefore(date).isSame(moment(new Date()), 'day')
export const isYesterday = (date)         => dayAfter(date).isSame(moment(new Date()), 'day')
export const fromNow     = (date)         => moment(date).fromNow()
