import React from 'react'
import { Input } from './Input'
import { omit } from 'funcs'

export const Password = (props) => <Input type="password" {...omit(props, 'type')} />