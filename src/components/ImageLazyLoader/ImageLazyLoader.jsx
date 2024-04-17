import React from 'react'
import Loader from '@components/Loader/Loader'
import './ImageLazyLoader.scss'

function ImageLazyLoaderFunction(props, ref) {
  return (
    <div ref={ref} className='ImageLazyLoader__wrapper'>
      <div className="ImageLazyLoader__loaderContainer">
        <Loader />
      </div>
    </div>
  )
}

const ImageLazyLoader = React.forwardRef(ImageLazyLoaderFunction)

export default ImageLazyLoader