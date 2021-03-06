export const all  = (...items) => items.reduce((s,x) => s && x, true)
export const any  = (...items) => items.reduce((s,x) => s || x, false)
export const none = (...items) => items.reduce((s,x) => s && !x, true)
export const pipe = (v)        => (...fns) => fns.reduce((s,fn) => fn(s), v)
export const ife  = (t, p = null, f = null) => p !== null ? (t ? p : f) : (t ? t : f)