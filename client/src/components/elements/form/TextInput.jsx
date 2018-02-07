import React from 'react'
import { Input } from './Input'
import { omit } from 'utils'

export const TextInput = (props) => <Input type="text" {...omit(props, 'type')} />