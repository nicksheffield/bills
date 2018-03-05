export const min        = (...nums)     => nums.reduce((s,x) => s === null ? x : (s > x ? x : s), null)
export const max        = (...nums)     => nums.reduce((s,x) => s === null ? x : (s < x ? x : s), null)
export const ceil       = (num)         => Math.ceil(num)
export const floor      = (num)         => Math.floor(num)
export const float      = (x)           => parseFloat(x)
export const int        = (x)           => parseInt(x, 10)
export const numToFixed = (num, places) => float(num.toFixed(places))
export const capMax     = (num, max)    => num > max ? max : num
export const capMin     = (num, min)    => num < min ? min : num