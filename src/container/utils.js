import React from 'react'

export const connect = (params) => (Comp) => (props) => {
    return <Comp {...props} {...params}/>
}