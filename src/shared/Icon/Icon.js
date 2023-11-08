import React from 'react'

const Icon = ({ src, width, height }) => {
    console.log(src);
    return (
        <img alt="" src={src} width={width} height={height} />
    );
}

export default Icon;