import React from 'react'

export default function Avatar (props) {
    const { src, size, ...otherProps } = props
    if (!src) return null
    const realSrc = src.indexOf('?') !== -1
        ? `${src}&s=${size}`
        : `${src}?s=${size}`
    return (
        <img src={realSrc} {...otherProps} />
    )
}
